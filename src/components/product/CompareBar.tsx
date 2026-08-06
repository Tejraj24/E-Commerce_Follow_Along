import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCompare } from "@/context/CompareContext";
import { Button } from "@/components/ui/button";

const CompareBar = () => {
  const { compareItems, isInCompare, toggleCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom duration-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
        <p className="text-sm font-light text-foreground shrink-0">
          Compare ({compareItems.length}/3)
        </p>

        <div className="flex items-center gap-4 flex-1 overflow-x-auto">
          {compareItems.map((p) => (
            <div key={p.id} className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 overflow-hidden bg-muted/20">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground leading-tight">
                  {p.name}
                </p>
                <p className="text-xs font-light text-muted-foreground">
                  {p.price}
                </p>
              </div>
              <button
                onClick={() => toggleCompare(p)}
                className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Remove ${p.name} from compare`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs font-light text-muted-foreground hover:text-foreground underline transition-colors"
          >
            Clear
          </button>
          <Button
            asChild
            size="sm"
            className="rounded-none font-light h-8 text-xs gap-1"
          >
            <Link
              to={`/compare?ids=${compareItems.map((p) => p.id).join(",")}`}
            >
              Compare <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
