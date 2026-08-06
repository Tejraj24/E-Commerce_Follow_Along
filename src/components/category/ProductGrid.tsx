import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="w-full px-6 mb-16">
      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm font-light text-muted-foreground">
            No products match your current filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      )}

      <QuickViewModal
        product={quickViewProduct}
        open={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};

export default ProductGrid;