import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const WISHLIST_KEY = "shivi_wishlist";

interface WishlistContextValue {
  wishlistIds: Set<string>;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Initialise from localStorage for instant UI (works for guests too)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      return stored ? new Set<string>(JSON.parse(stored) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  // Keep localStorage in sync on every change
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify([...wishlistIds]));
    } catch {
      // ignore storage errors
    }
  }, [wishlistIds]);

  // When a user logs in, fetch their wishlist from the DB and merge with local
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const { data, error } = await supabase
          .from("wishlist_items")
          .select("product_id")
          .eq("user_id", user.id);

        if (error) {
          // Table may not exist yet — silently fall back to localStorage
          console.warn("Wishlist sync skipped:", error.message);
          return;
        }

        if (data && data.length > 0) {
          const remoteIds = data.map((row) => row.product_id as string);
          // Merge remote IDs with any local IDs accumulated while logged out
          setWishlistIds((prev) => new Set([...prev, ...remoteIds]));
        }
      } catch {
        // Sync is best-effort; localStorage remains the source of truth
      }
    })();
  }, [user]);

  const isWishlisted = useCallback(
    (id: string) => wishlistIds.has(id),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlistIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          // Remove from DB (best-effort, non-blocking)
          if (user) {
            supabase
              .from("wishlist_items")
              .delete()
              .eq("user_id", user.id)
              .eq("product_id", id)
              .then(({ error }) => {
                if (error) console.warn("Wishlist remove failed:", error.message);
              });
          }
        } else {
          next.add(id);
          // Insert into DB (best-effort, non-blocking)
          if (user) {
            supabase
              .from("wishlist_items")
              .insert({ user_id: user.id, product_id: id })
              .then(({ error }) => {
                if (error) console.warn("Wishlist insert failed:", error.message);
              });
          }
        }
        return next;
      });
    },
    [user]
  );

  return (
    <WishlistContext.Provider value={{ wishlistIds, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
