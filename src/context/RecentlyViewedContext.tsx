import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const RV_KEY = "shivi_recently_viewed";
const MAX_RECENT = 8;

interface RecentlyViewedContextValue {
  recentIds: string[];
  trackView: (id: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(
  undefined
);

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RV_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(RV_KEY, JSON.stringify(recentIds));
    } catch {
      // ignore
    }
  }, [recentIds]);

  const trackView = (id: string) => {
    setRecentIds((prev) => {
      // Move to front, deduplicate, cap at MAX_RECENT
      const filtered = prev.filter((i) => i !== id);
      return [id, ...filtered].slice(0, MAX_RECENT);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentIds, trackView }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx)
    throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
};
