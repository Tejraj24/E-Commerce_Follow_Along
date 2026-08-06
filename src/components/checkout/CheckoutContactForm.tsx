import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export interface CustomerDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AddressDetails {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface BillingDetails extends CustomerDetails, AddressDetails {}

interface CheckoutContactFormProps {
  customerDetails: CustomerDetails;
  onCustomerChange: (field: keyof CustomerDetails, value: string) => void;
  shippingAddress: AddressDetails;
  onShippingChange: (field: keyof AddressDetails, value: string) => void;
  hasSeparateBilling: boolean;
  onSeparateBillingChange: (val: boolean) => void;
  billingDetails: BillingDetails;
  onBillingChange: (field: keyof BillingDetails, value: string) => void;
}

const CheckoutContactForm = ({
  customerDetails,
  onCustomerChange,
  shippingAddress,
  onShippingChange,
  hasSeparateBilling,
  onSeparateBillingChange,
  billingDetails,
  onBillingChange,
}: CheckoutContactFormProps) => {
  return (
    <div className="bg-muted/20 p-8 rounded-none">
      <h2 className="text-lg font-light text-foreground mb-6">Customer Details</h2>

      <div className="space-y-6">
        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm font-light text-foreground">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={customerDetails.email}
            onChange={(e) => onCustomerChange("email", e.target.value)}
            className="mt-2 rounded-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-light text-foreground">First Name *</Label>
            <Input
              id="firstName"
              type="text"
              value={customerDetails.firstName}
              onChange={(e) => onCustomerChange("firstName", e.target.value)}
              className="mt-2 rounded-none"
              placeholder="First name"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-light text-foreground">Last Name *</Label>
            <Input
              id="lastName"
              type="text"
              value={customerDetails.lastName}
              onChange={(e) => onCustomerChange("lastName", e.target.value)}
              className="mt-2 rounded-none"
              placeholder="Last name"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm font-light text-foreground">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={customerDetails.phone}
            onChange={(e) => onCustomerChange("phone", e.target.value)}
            className="mt-2 rounded-none"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Shipping Address */}
        <div className="border-t border-muted-foreground/20 pt-6 mt-8">
          <h3 className="text-base font-light text-foreground mb-4">Shipping Address</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="shippingAddress" className="text-sm font-light text-foreground">Address *</Label>
              <Input
                id="shippingAddress"
                type="text"
                value={shippingAddress.address}
                onChange={(e) => onShippingChange("address", e.target.value)}
                className="mt-2 rounded-none"
                placeholder="Street address"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="shippingCity" className="text-sm font-light text-foreground">City *</Label>
                <Input
                  id="shippingCity"
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => onShippingChange("city", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="shippingState" className="text-sm font-light text-foreground">State *</Label>
                <Input
                  id="shippingState"
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) => onShippingChange("state", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="shippingPostalCode" className="text-sm font-light text-foreground">PIN Code *</Label>
                <Input
                  id="shippingPostalCode"
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) => onShippingChange("postalCode", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="PIN code"
                  maxLength={6}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shippingCountry" className="text-sm font-light text-foreground">Country *</Label>
              <Input
                id="shippingCountry"
                type="text"
                value={shippingAddress.country}
                onChange={(e) => onShippingChange("country", e.target.value)}
                className="mt-2 rounded-none"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        {/* Separate Billing Toggle */}
        <div className="border-t border-muted-foreground/20 pt-6 mt-8">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="separateBilling"
              checked={hasSeparateBilling}
              onCheckedChange={(checked) => onSeparateBillingChange(checked === true)}
            />
            <Label htmlFor="separateBilling" className="text-sm font-light text-foreground cursor-pointer">
              Other billing address
            </Label>
          </div>
        </div>

        {/* Billing Details (conditional) */}
        {hasSeparateBilling && (
          <div className="space-y-6 pt-4">
            <h3 className="text-base font-light text-foreground">Billing Details</h3>
            <div>
              <Label htmlFor="billingEmail" className="text-sm font-light text-foreground">Email Address *</Label>
              <Input
                id="billingEmail"
                type="email"
                value={billingDetails.email}
                onChange={(e) => onBillingChange("email", e.target.value)}
                className="mt-2 rounded-none"
                placeholder="Enter billing email"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingFirstName" className="text-sm font-light text-foreground">First Name *</Label>
                <Input
                  id="billingFirstName"
                  type="text"
                  value={billingDetails.firstName}
                  onChange={(e) => onBillingChange("firstName", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="billingLastName" className="text-sm font-light text-foreground">Last Name *</Label>
                <Input
                  id="billingLastName"
                  type="text"
                  value={billingDetails.lastName}
                  onChange={(e) => onBillingChange("lastName", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="billingPhone" className="text-sm font-light text-foreground">Phone Number</Label>
              <Input
                id="billingPhone"
                type="tel"
                value={billingDetails.phone}
                onChange={(e) => onBillingChange("phone", e.target.value)}
                className="mt-2 rounded-none"
                placeholder="Enter billing phone number"
              />
            </div>
            <div>
              <Label htmlFor="billingAddress" className="text-sm font-light text-foreground">Address *</Label>
              <Input
                id="billingAddress"
                type="text"
                value={billingDetails.address}
                onChange={(e) => onBillingChange("address", e.target.value)}
                className="mt-2 rounded-none"
                placeholder="Street address"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="billingCity" className="text-sm font-light text-foreground">City *</Label>
                <Input
                  id="billingCity"
                  type="text"
                  value={billingDetails.city}
                  onChange={(e) => onBillingChange("city", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="billingState" className="text-sm font-light text-foreground">State *</Label>
                <Input
                  id="billingState"
                  type="text"
                  value={billingDetails.state}
                  onChange={(e) => onBillingChange("state", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="billingPostalCode" className="text-sm font-light text-foreground">PIN Code *</Label>
                <Input
                  id="billingPostalCode"
                  type="text"
                  value={billingDetails.postalCode}
                  onChange={(e) => onBillingChange("postalCode", e.target.value)}
                  className="mt-2 rounded-none"
                  placeholder="PIN code"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="billingCountry" className="text-sm font-light text-foreground">Country *</Label>
              <Input
                id="billingCountry"
                type="text"
                value={billingDetails.country}
                onChange={(e) => onBillingChange("country", e.target.value)}
                className="mt-2 rounded-none"
                placeholder="Country"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutContactForm;
