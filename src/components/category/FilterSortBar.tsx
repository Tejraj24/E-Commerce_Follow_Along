import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { FilterState, SortOption } from "@/pages/Category";

interface FilterSortBarProps {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  itemCount: number;
  totalCount: number;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const CATEGORIES = ["Earrings", "Bracelets", "Rings", "Necklaces", "Watches"];
const COLLECTIONS = [
  "Organic Forms",
  "Shadowline",
  "Circular",
  "Structural",
  "Arc Studies",
];
const PRICE_RANGES = [
  "Under ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "₹2,00,000 – ₹3,00,000",
  "Over ₹3,00,000",
];
const MATERIALS = [
  "18k Gold",
  "18k White Gold",
  "Sterling Silver",
  "18k Gold Plated Sterling Silver",
  "Platinum",
];

const FilterSortBar = ({
  filtersOpen,
  setFiltersOpen,
  itemCount,
  totalCount,
  filters,
  onFiltersChange,
  sort,
  onSortChange,
}: FilterSortBarProps) => {
  const activeFilterCount =
    filters.categories.length +
    filters.collections.length +
    filters.priceRanges.length +
    filters.materials.length +
    filters.availability.length +
    (filters.featured ? 1 : 0) +
    (filters.bestseller ? 1 : 0);

  const toggle = (
    key: "categories" | "collections" | "priceRanges" | "materials" | "availability",
    value: string
  ) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  const clearAll = () =>
    onFiltersChange({
      categories: [],
      collections: [],
      priceRanges: [],
      materials: [],
      availability: [],
      featured: false,
      bestseller: false,
    });

  return (
    <>
      <section className="w-full px-6 mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-light text-muted-foreground">
            {itemCount !== totalCount
              ? `${itemCount} of ${totalCount} items`
              : `${itemCount} items`}
          </p>

          <div className="flex items-center gap-4">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-light hover:bg-transparent relative"
                >
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({activeFilterCount})
                    </span>
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-80 bg-background border-none shadow-none overflow-y-auto"
              >
                <SheetHeader className="mb-6 border-b border-border pb-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-lg font-light">Filters</SheetTitle>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAll}
                        className="text-xs font-light text-muted-foreground hover:text-foreground underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </SheetHeader>

                <div className="space-y-8">
                  {/* Category */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">
                      Category
                    </h3>
                    <div className="space-y-3">
                      {CATEGORIES.map((cat) => (
                        <div key={cat} className="flex items-center space-x-3">
                          <Checkbox
                            id={`cat-${cat}`}
                            checked={filters.categories.includes(cat)}
                            onCheckedChange={() => toggle("categories", cat)}
                            className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                          />
                          <Label
                            htmlFor={`cat-${cat}`}
                            className="text-sm font-light text-foreground cursor-pointer"
                          >
                            {cat}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  {/* Collection */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">
                      Collection
                    </h3>
                    <div className="space-y-3">
                      {COLLECTIONS.map((col) => (
                        <div key={col} className="flex items-center space-x-3">
                          <Checkbox
                            id={`col-${col}`}
                            checked={filters.collections.includes(col)}
                            onCheckedChange={() => toggle("collections", col)}
                            className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                          />
                          <Label
                            htmlFor={`col-${col}`}
                            className="text-sm font-light text-foreground cursor-pointer"
                          >
                            {col}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  {/* Price */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">
                      Price
                    </h3>
                    <div className="space-y-3">
                      {PRICE_RANGES.map((range) => (
                        <div key={range} className="flex items-center space-x-3">
                          <Checkbox
                            id={`price-${range}`}
                            checked={filters.priceRanges.includes(range)}
                            onCheckedChange={() => toggle("priceRanges", range)}
                            className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                          />
                          <Label
                            htmlFor={`price-${range}`}
                            className="text-sm font-light text-foreground cursor-pointer"
                          >
                            {range}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  {/* Material */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">
                      Material
                    </h3>
                    <div className="space-y-3">
                      {MATERIALS.map((mat) => (
                        <div key={mat} className="flex items-center space-x-3">
                          <Checkbox
                            id={`mat-${mat}`}
                            checked={filters.materials.includes(mat)}
                            onCheckedChange={() => toggle("materials", mat)}
                            className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                          />
                          <Label
                            htmlFor={`mat-${mat}`}
                            className="text-sm font-light text-foreground cursor-pointer"
                          >
                            {mat}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  {/* Availability */}
                  <div>
                    <h3 className="text-sm font-light mb-4 text-foreground">
                      Availability
                    </h3>
                    <div className="space-y-3">
                      {["In Stock", "Out of Stock"].map((avail) => (
                        <div key={avail} className="flex items-center space-x-3">
                          <Checkbox
                            id={`avail-${avail}`}
                            checked={filters.availability.includes(avail)}
                            onCheckedChange={() => toggle("availability", avail)}
                            className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                          />
                          <Label
                            htmlFor={`avail-${avail}`}
                            className="text-sm font-light text-foreground cursor-pointer"
                          >
                            {avail}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="border-border" />

                  {/* Featured / Bestseller toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="featured-toggle"
                        className="text-sm font-light text-foreground cursor-pointer"
                      >
                        Featured only
                      </Label>
                      <Switch
                        id="featured-toggle"
                        checked={filters.featured}
                        onCheckedChange={(v) =>
                          onFiltersChange({ ...filters, featured: v })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="bestseller-toggle"
                        className="text-sm font-light text-foreground cursor-pointer"
                      >
                        Bestsellers only
                      </Label>
                      <Switch
                        id="bestseller-toggle"
                        checked={filters.bestseller}
                        onCheckedChange={(v) =>
                          onFiltersChange({ ...filters, bestseller: v })
                        }
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort select */}
            <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
              <SelectTrigger className="w-auto border-none bg-transparent text-sm font-light shadow-none rounded-none pr-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="shadow-none border-none rounded-none bg-background">
                {(
                  [
                    ["featured", "Featured"],
                    ["newest", "Newest"],
                    ["price-low", "Price: Low to High"],
                    ["price-high", "Price: High to Low"],
                    ["name", "Name A–Z"],
                    ["bestselling", "Best Selling"],
                  ] as [SortOption, string][]
                ).map(([value, label]) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pl-2 [&>span:first-child]:hidden"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              ...filters.categories,
              ...filters.collections,
              ...filters.priceRanges,
              ...filters.materials,
              ...filters.availability,
              ...(filters.featured ? ["Featured"] : []),
              ...(filters.bestseller ? ["Bestsellers"] : []),
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1 text-xs font-light text-foreground border border-border px-2 py-1"
              >
                {chip}
                <button
                  onClick={() => {
                    if (chip === "Featured")
                      return onFiltersChange({ ...filters, featured: false });
                    if (chip === "Bestsellers")
                      return onFiltersChange({ ...filters, bestseller: false });
                    for (const k of [
                      "categories",
                      "collections",
                      "priceRanges",
                      "materials",
                      "availability",
                    ] as const) {
                      if (filters[k].includes(chip)) {
                        onFiltersChange({
                          ...filters,
                          [k]: filters[k].filter((v) => v !== chip),
                        });
                        return;
                      }
                    }
                  }}
                  aria-label={`Remove ${chip} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default FilterSortBar;