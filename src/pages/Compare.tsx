import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const SPECS: { label: string; key: keyof typeof products[0] }[] = [
  { label: "Category", key: "category" },
  { label: "Collection", key: "collection" },
  { label: "Material", key: "material" },
  { label: "Finish", key: "finish" },
  { label: "Dimensions", key: "dimensions" },
  { label: "Weight", key: "weight" },
  { label: "Price", key: "price" },
];

const Compare = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const ids = (searchParams.get("ids") ?? "").split(",").filter(Boolean);
  const compareProducts = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  const handleAdd = (product: typeof products[0]) => {
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
          <div className="mb-10">
            <h1 className="text-3xl font-light text-foreground">
              Compare Products
            </h1>
            <p className="text-sm text-muted-foreground font-light mt-1">
              {compareProducts.length} items selected
            </p>
          </div>

          {compareProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground font-light mb-6">
                No products selected for comparison.
              </p>
              <Button asChild className="rounded-none font-light">
                <Link to="/category/shop">Browse Collection</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-light text-muted-foreground pb-6 pr-6 w-32">
                      &nbsp;
                    </th>
                    {compareProducts.map((p) => (
                      <th
                        key={p.id}
                        className="text-left pb-6 pr-6 align-top"
                      >
                        <Link to={`/product/${p.id}`}>
                          <div className="aspect-square w-full max-w-[200px] overflow-hidden bg-muted/10 mb-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <p className="text-sm font-medium text-foreground hover:underline">
                            {p.name}
                          </p>
                        </Link>
                        <Button
                          onClick={() => handleAdd(p)}
                          disabled={p.stock === 0}
                          size="sm"
                          className="mt-3 rounded-none font-light h-8 text-xs w-full max-w-[200px]"
                        >
                          {p.stock === 0 ? "Out of Stock" : "Add to Bag"}
                        </Button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SPECS.map(({ label, key }) => (
                    <tr
                      key={key}
                      className="border-t border-border"
                    >
                      <td className="text-sm font-light text-muted-foreground py-4 pr-6">
                        {label}
                      </td>
                      {compareProducts.map((p) => (
                        <td
                          key={p.id}
                          className="text-sm font-light text-foreground py-4 pr-6"
                        >
                          {String(p[key] ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Stock row */}
                  <tr className="border-t border-border">
                    <td className="text-sm font-light text-muted-foreground py-4 pr-6">
                      Availability
                    </td>
                    {compareProducts.map((p) => (
                      <td
                        key={p.id}
                        className={`text-sm font-light py-4 pr-6 ${
                          p.stock > 0
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
