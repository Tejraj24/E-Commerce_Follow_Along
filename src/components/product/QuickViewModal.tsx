import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Heart, Check, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, open, onClose }: QuickViewModalProps) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    setAddedToCart(true);
    toast.success(`${product.name} added to your bag.`);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist", {
      duration: 1500,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setActiveImg(0);
          setQuantity(1);
          setAddedToCart(false);
        }
      }}
    >
      <DialogContent className="max-w-3xl p-0 gap-0 rounded-none border-border overflow-hidden">
        <DialogTitle className="sr-only">{product.name} — Quick View</DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image column */}
          <div className="relative bg-muted/10">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.images[activeImg] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-8 h-8 overflow-hidden border-2 transition-colors ${
                      activeImg === i
                        ? "border-foreground"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            {/* Badges */}
            {product.isNew && (
              <div className="absolute top-3 left-3 text-xs font-medium text-black">
                NEW
              </div>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="absolute top-3 left-3 text-xs font-light text-black/60">
                Only {product.stock} left
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute top-3 left-3 text-xs font-light text-black/60">
                Out of Stock
              </div>
            )}
          </div>

          {/* Info column */}
          <div className="p-8 flex flex-col">
            <p className="text-xs font-light text-muted-foreground tracking-widest uppercase mb-1">
              {product.collection}
            </p>
            <p className="text-sm font-light text-muted-foreground mb-1">
              {product.category}
            </p>
            <h2 className="text-xl font-light text-foreground mb-2">
              {product.name}
            </h2>
            <p className="text-lg font-light text-foreground mb-6">
              {product.price}
            </p>

            {/* Quick specs */}
            <div className="space-y-2 mb-6 text-sm font-light text-muted-foreground">
              <p>
                <span className="text-foreground">Material:</span>{" "}
                {product.material}
              </p>
              <p>
                <span className="text-foreground">Finish:</span> {product.finish}
              </p>
            </div>

            {/* Description snippet */}
            <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {product.description[0]}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-light text-foreground">Qty</span>
              <div className="flex items-center border border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 p-0 hover:bg-transparent rounded-none"
                  aria-label="Decrease"
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="px-4 text-sm font-light min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-9 w-9 p-0 hover:bg-transparent rounded-none"
                  aria-label="Increase"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={handleAddToCart}
                disabled={addedToCart || product.stock === 0}
                className="flex-1 h-11 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none"
              >
                {addedToCart ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Added
                  </span>
                ) : product.stock === 0 ? (
                  "Out of Stock"
                ) : (
                  "Add to Bag"
                )}
              </Button>
              <button
                onClick={handleToggleWishlist}
                className="h-11 w-11 border border-border flex items-center justify-center hover:border-foreground transition-colors"
                aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart
                  className={`h-4 w-4 transition-all ${
                    wishlisted ? "fill-foreground" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* View full details */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-sm font-light text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              View full details →
            </Link>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-foreground hover:text-muted-foreground transition-colors"
          aria-label="Close quick view"
        >
          <X className="h-5 w-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
