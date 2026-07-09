import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Minus, Plus, Heart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

const ProductInfo = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

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
    toast({
      description: `${product.name} added to your bag.`,
      duration: 2500,
    });

    setTimeout(() => setAddedToCart(false), 2500);
  };

  const categoryHref = `/category/${product.category.toLowerCase()}`;

  return (
    <div className="space-y-6">
      {/* Breadcrumb - Show only on desktop */}
      <div className="hidden lg:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={categoryHref}>{product.category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Collection tag */}
      <p className="text-xs font-light text-muted-foreground tracking-widest uppercase">
        {product.collection}
      </p>

      {/* Product title and price */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-light text-muted-foreground mb-1">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-light text-foreground">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-xs font-light text-muted-foreground mt-1">
                {product.sku}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xl font-light text-foreground">{product.price}</p>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-xs font-light text-muted-foreground mt-1">
                Only {product.stock} left
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="space-y-4 py-4 border-b border-border">
        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Material</h3>
          <p className="text-sm font-light text-muted-foreground">
            {product.material}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Finish</h3>
          <p className="text-sm font-light text-muted-foreground">
            {product.finish}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Dimensions</h3>
          <p className="text-sm font-light text-muted-foreground">
            {product.dimensions}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Weight</h3>
          <p className="text-sm font-light text-muted-foreground">
            {product.weight}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">
            Editor's notes
          </h3>
          <p className="text-sm font-light text-muted-foreground italic">
            {product.editorNotes}
          </p>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-light text-foreground">Quantity</span>
          <div className="flex items-center border border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="h-10 flex items-center px-4 text-sm font-light min-w-12 justify-center border-l border-r border-border">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={incrementQuantity}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none transition-all duration-200"
          onClick={handleAddToCart}
          disabled={addedToCart}
          id="add-to-bag-btn"
        >
          {addedToCart ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Added to Bag
            </span>
          ) : (
            "Add to Bag"
          )}
        </Button>

        <button
          onClick={() => setWishlist((w) => !w)}
          className="w-full h-12 border border-border flex items-center justify-center gap-2 text-sm font-light text-foreground hover:border-foreground transition-colors duration-200"
          aria-label="Save to wishlist"
          id="wishlist-btn"
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${
              wishlist ? "fill-foreground" : ""
            }`}
            strokeWidth={1.5}
          />
          {wishlist ? "Saved to Wishlist" : "Save to Wishlist"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;