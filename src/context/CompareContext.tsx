import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

const MAX_COMPARE = 3;

interface CompareContextValue {
  compareItems: Product[];
  isInCompare: (id: string) => boolean;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const isInCompare = (id: string) => compareItems.some((p) => p.id === id);

  const toggleCompare = (product: Product) => {
    setCompareItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= MAX_COMPARE) {
        // Replace oldest item
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider
      value={{ compareItems, isInCompare, toggleCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
};
