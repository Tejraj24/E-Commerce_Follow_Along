import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import FilterSortBar from "../components/category/FilterSortBar";
import ProductGrid from "../components/category/ProductGrid";
import { getProductsByCategory } from "@/data/products";

const Category = () => {
  const { category } = useParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryParam = category || "shop";
  const filteredProducts = getProductsByCategory(categoryParam);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <CategoryHeader
          category={category || "All Products"}
        />

        <FilterSortBar
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          itemCount={filteredProducts.length}
        />

        <ProductGrid category={categoryParam} />
      </main>

      <Footer />
    </div>
  );
};

export default Category;