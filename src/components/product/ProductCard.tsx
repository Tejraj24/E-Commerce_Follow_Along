import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { toast } from "sonner";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";
import circularCollection from "@/assets/circular-collection.png";
import ringsCollection from "@/assets/rings-collection.png";
import shadowline from "@/assets/shadowline.jpg";

// Derive a hover image: prefer images[1], fall back to category-based asset
const getHoverImage = (product: Product): string => {
  if (product.images.length > 1) return product.images[1];
  switch (product.category) {
    case "Earrings": return organicEarring;
    case "Bracelets": return linkBracelet;
    case "Rings": return ringsCollection;
    case "Necklaces": return circularCollection;
    default: return shadowline;
  }
};

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const [hovering, setHovering] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const inCompare = isInCompare(product.id);
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isOutOfStock = product.stock === 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist", {
      duration: 1500,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
    toast(
      inCompare ? `${product.name} removed from compare` : `${product.name} added to compare`,
      { duration: 1500 }
    );
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link to={`/product/${product.id}`}>
        {/* Image container */}
        <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
          {/* Primary image */}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-300 ${
              hovering ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Hover image */}
          <img
            src={getHoverImage(product)}
            alt={`${product.name} lifestyle`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
              hovering ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Overlay tint */}
          <div className="absolute inset-0 bg-black/[0.03]" />

          {/* Badges — top-left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="text-xs font-medium text-black tracking-wide">
                NEW
              </span>
            )}
            {product.isBestseller && !product.isNew && (
              <span className="text-xs font-light text-black/60 tracking-wide">
                BESTSELLER
              </span>
            )}
            {isLowStock && (
              <span className="text-xs font-light text-black/50">
                Only {product.stock} left
              </span>
            )}
            {isOutOfStock && (
              <span className="text-xs font-light text-black/50">
                Out of Stock
              </span>
            )}
            {product.isFeatured && !product.isNew && !product.isBestseller && (
              <span className="text-xs font-light text-black/40 tracking-wide">
                FEATURED
              </span>
            )}
          </div>

          {/* Action buttons — top-right, visible on hover */}
          <div
            className={`absolute top-2 right-2 flex flex-col gap-1.5 transition-all duration-200 ${
              hovering ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="w-8 h-8 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-all ${
                  wishlisted ? "fill-foreground text-foreground" : "text-foreground"
                }`}
                strokeWidth={1.5}
              />
            </button>

            {/* Quick View */}
            {onQuickView && (
              <button
                onClick={handleQuickView}
                className="w-8 h-8 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Quick view"
              >
                <Eye className="h-3.5 w-3.5 text-foreground" strokeWidth={1.5} />
              </button>
            )}

            {/* Compare */}
            <button
              onClick={handleCompare}
              className={`w-8 h-8 backdrop-blur-sm flex items-center justify-center transition-colors ${
                inCompare
                  ? "bg-foreground"
                  : "bg-background/90 hover:bg-background"
              }`}
              aria-label={inCompare ? "Remove from compare" : "Add to compare"}
            >
              <SlidersHorizontal
                className={`h-3.5 w-3.5 ${
                  inCompare ? "text-background" : "text-foreground"
                }`}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-1">
          <p className="text-sm font-light text-foreground">{product.category}</p>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
            <p className="text-sm font-light text-foreground">{product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
