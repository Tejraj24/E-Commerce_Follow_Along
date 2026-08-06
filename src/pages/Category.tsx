import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import FilterSortBar from "../components/category/FilterSortBar";
import ProductGrid from "../components/category/ProductGrid";
import { useProductsByCategory } from "@/hooks/useProducts";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface FilterState {
  categories: string[];
  collections: string[];
  priceRanges: string[];
  materials: string[];
  availability: string[];
  featured: boolean;
  bestseller: boolean;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "name"
  | "bestselling";

// ─── Price range helpers ─────────────────────────────────────────────────────
const parsePrice = (priceStr: string): number => {
  // strips "₹", commas, and spaces → number
  return parseInt(priceStr.replace(/[₹,\s]/g, ""), 10) || 0;
};

const priceInRange = (price: number, range: string): boolean => {
  if (range === "Under ₹1,00,000")         return price < 100_000;
  if (range === "₹1,00,000 – ₹2,00,000")   return price >= 100_000 && price < 200_000;
  if (range === "₹2,00,000 – ₹3,00,000")   return price >= 200_000 && price < 300_000;
  if (range === "Over ₹3,00,000")           return price >= 300_000;
  return false;
};

// ─── Component ───────────────────────────────────────────────────────────────
const Category = () => {
  const { category } = useParams();
  const categoryParam = category || "shop";

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    collections: [],
    priceRanges: [],
    materials: [],
    availability: [],
    featured: false,
    bestseller: false,
  });

  // Fetch base products for this route
  const { data: baseProducts = [], isLoading } = useProductsByCategory(categoryParam);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = baseProducts;

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.collections.length > 0) {
      result = result.filter((p) => filters.collections.includes(p.collection));
    }
    if (filters.priceRanges.length > 0) {
      result = result.filter((p) => {
        const price = parsePrice(p.price);
        return filters.priceRanges.some((r) => priceInRange(price, r));
      });
    }
    if (filters.materials.length > 0) {
      result = result.filter((p) =>
        filters.materials.some((m) => p.material.includes(m))
      );
    }
    if (filters.availability.length > 0) {
      result = result.filter((p) => {
        if (
          filters.availability.includes("In Stock") &&
          filters.availability.includes("Out of Stock")
        )
          return true;
        if (filters.availability.includes("In Stock"))   return p.stock > 0;
        if (filters.availability.includes("Out of Stock")) return p.stock === 0;
        return true;
      });
    }
    if (filters.featured)   result = result.filter((p) => p.isFeatured);
    if (filters.bestseller) result = result.filter((p) => p.isBestseller);

    return result;
  }, [baseProducts, filters]);

  // Apply sort
  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sort) {
      case "price-low":
        return copy.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case "price-high":
        return copy.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case "name":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "bestselling":
        return copy.sort((a, b) =>
          (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
        );
      case "newest":
        return copy.sort((a, b) =>
          (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        );
      case "featured":
      default:
        return copy.sort((a, b) =>
          (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
    }
  }, [filteredProducts, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <CategoryHeader category={category || "All Products"} />

        <FilterSortBar
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          itemCount={sortedProducts.length}
          totalCount={baseProducts.length}
          filters={filters}
          onFiltersChange={setFilters}
          sort={sort}
          onSortChange={setSort}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <ProductGrid products={sortedProducts} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;