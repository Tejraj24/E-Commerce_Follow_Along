import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CartItem } from "@/context/CartContext";

interface CheckoutOrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
  updateQuantity: (id: string, qty: number) => void;
  showDiscountInput: boolean;
  discountCode: string;
  onToggleDiscount: () => void;
  onDiscountCodeChange: (code: string) => void;
  onDiscountSubmit: () => void;
}

const CheckoutOrderSummary = ({
  cartItems,
  subtotal,
  shippingCost,
  taxAmount,
  total,
  updateQuantity,
  showDiscountInput,
  discountCode,
  onToggleDiscount,
  onDiscountCodeChange,
  onDiscountSubmit,
}: CheckoutOrderSummaryProps) => {
  return (
    <div className="bg-muted/20 p-8 rounded-none sticky top-6">
      <h2 className="text-lg font-light text-foreground mb-6">Order Summary</h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 bg-muted rounded-none overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-light text-foreground truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center border border-muted-foreground/20">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0 rounded-none border-0"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium text-foreground min-w-[2ch] text-center px-2">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0 rounded-none border-0"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-foreground font-medium text-sm flex-shrink-0">{item.price}</div>
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <div className="mt-8 pt-6 border-t border-muted-foreground/20">
        {!showDiscountInput ? (
          <button
            onClick={onToggleDiscount}
            className="text-sm text-foreground underline hover:no-underline transition-all"
          >
            Discount code
          </button>
        ) : (
          <div className="flex gap-2">
            <Input
              type="text"
              value={discountCode}
              onChange={(e) => onDiscountCodeChange(e.target.value)}
              placeholder="Enter discount code"
              className="flex-1 rounded-none"
            />
            <button
              onClick={onDiscountSubmit}
              className="text-sm text-foreground underline hover:no-underline transition-all px-2"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="border-t border-muted-foreground/20 mt-4 pt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {shippingCost === 0 ? "Free" : `₹${shippingCost.toLocaleString("en-IN")}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">GST (18%)</span>
          <span className="text-foreground">₹{taxAmount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm font-medium border-t border-muted-foreground/20 pt-3">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
