import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface CartItem {
  id: string;       // product_id
  name: string;
  price: string;    // formatted string e.g. "₹2,85,000"
  image: string;
  quantity: number;
  category: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  totalItems: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CART_KEY = "shivi_cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Restore cart from localStorage on first render (instant, works for guests)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {
      // Silently ignore storage errors
    }
  }, [cartItems]);

  // When user logs in, fetch their remote cart and merge with local
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const { data, error } = await supabase
          .from("cart_items")
          .select("product_id, name, price, image, category, quantity")
          .eq("user_id", user.id);

        if (error) {
          // Table may not exist yet — silently fall back to localStorage
          console.warn("Cart sync skipped:", error.message);
          return;
        }

        if (data && data.length > 0) {
          setCartItems((prev) => {
            // Merge: local items take priority (user may have added items while logged out)
            const merged = [...prev];
            for (const remote of data) {
              const existing = merged.find((i) => i.id === remote.product_id);
              if (!existing) {
                merged.push({
                  id: remote.product_id as string,
                  name: remote.name as string,
                  price: remote.price as string,
                  image: remote.image as string,
                  category: remote.category as string,
                  quantity: remote.quantity as number,
                });
              }
            }
            return merged;
          });
        }
      } catch {
        // Sync is best-effort; localStorage is the source of truth
      }
    })();
  }, [user]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        const newQuantity = existing ? existing.quantity + 1 : 1;
        const next = existing
          ? prev.map((i) => (i.id === item.id ? { ...i, quantity: newQuantity } : i))
          : [...prev, { ...item, quantity: 1 }];

        // Sync to DB (best-effort, non-blocking)
        if (user) {
          supabase
            .from("cart_items")
            .upsert(
              {
                user_id: user.id,
                product_id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                category: item.category,
                quantity: newQuantity,
              },
              { onConflict: "user_id,product_id" }
            )
            .then(({ error }) => {
              if (error) console.warn("Cart upsert failed:", error.message);
            });
        }

        return next;
      });
    },
    [user]
  );

  const updateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      if (newQuantity <= 0) {
        // Remove item
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        if (user) {
          supabase
            .from("cart_items")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", id)
            .then(({ error }) => {
              if (error) console.warn("Cart delete failed:", error.message);
            });
        }
      } else {
        // Update quantity
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
        if (user) {
          supabase
            .from("cart_items")
            .update({ quantity: newQuantity })
            .eq("user_id", user.id)
            .eq("product_id", id)
            .then(({ error }) => {
              if (error) console.warn("Cart update failed:", error.message);
            });
        }
      }
    },
    [user]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_KEY);
    } catch {
      // ignore
    }
    // Clear from DB too
    if (user) {
      supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .then(({ error }) => {
          if (error) console.warn("Cart clear failed:", error.message);
        });
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cartItems, totalItems, addToCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
