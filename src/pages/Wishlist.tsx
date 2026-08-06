import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import type { Product } from "@/types/product";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Wishlist = () => {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { data: allProducts = [], isLoading } = useProducts();

  const wishlistProducts = allProducts.filter((p) => wishlistIds.has(p.id));

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to your bag.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-3xl font-light text-foreground">Wishlist</h1>
            <p className="text-sm text-muted-foreground font-light mt-1">
              {wishlistProducts.length} saved{" "}
              {wishlistProducts.length === 1 ? "item" : "items"}
            </p>
          </div>

          {isLoading ? (
            <div className="py-24 text-center">
              <p className="text-sm text-muted-foreground font-light">Loading wishlist...</p>
            </div>
          ) : wishlistProducts.length === 0 ? (
            <div className="text-center py-24">
              <Heart
                className="mx-auto h-12 w-12 text-muted-foreground mb-6"
                strokeWidth={1}
              />
              <h2 className="text-xl font-light text-foreground mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-muted-foreground font-light mb-8">
                Save items you love by clicking the heart icon on any product.
              </p>
              <Button asChild className="rounded-none font-light">
                <Link to="/category/shop">Explore Collection</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Remove button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-3.5 w-3.5 text-foreground" />
                  </button>

                  <Link to={`/product/${product.id}`}>
                    {/* Image */}
                    <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Badges */}
                      {product.isNew && (
                        <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-black">
                          NEW
                        </div>
                      )}
                      {product.isBestseller && !product.isNew && (
                        <div className="absolute top-2 left-2 px-2 py-1 text-xs font-light text-black/60">
                          BESTSELLER
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <span className="text-xs font-light text-foreground">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="space-y-1">
                    <p className="text-sm font-light text-muted-foreground">
                      {product.category}
                    </p>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-sm font-light text-foreground">
                        {product.price}
                      </p>
                    </div>
                  </div>

                  {/* Add to bag */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="mt-3 w-full text-xs font-light py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
