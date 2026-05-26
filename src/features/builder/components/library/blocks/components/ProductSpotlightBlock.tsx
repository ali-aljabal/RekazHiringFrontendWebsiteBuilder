import { ShoppingCart } from "lucide-react";
import type { LibraryBlockComponentProps } from "./types";

export function ProductSpotlightBlock({
  title,
  image,
  description,
  price,
  size = "default",
}: LibraryBlockComponentProps) {
  const productName = title || "Premium Ergonomic Chair";
  const productPrice = price || "$249.00";
  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=80";
  const desc =
    description ||
    "Engineered for absolute comfort and posture support.";

  const isCompact = size === "compact";

  return (
    <div
      className={`flex w-full max-w-4xl flex-col gap-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6 md:flex-row md:items-center ${
        isCompact ? "md:flex-col" : ""
      }`}
    >
      <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted md:w-1/2 md:aspect-square">
        <img
          src={imageUrl}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col items-start">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Featured Product
        </span>

        <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">
          {productName}
        </h3>

        <span className="mb-3 text-lg font-bold text-foreground">{productPrice}</span>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{desc}</p>

        <span className="inline-flex cursor-default items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm transition-all pointer-events-none">
          <ShoppingCart className="h-4 w-4" />
          Buy Now
        </span>
      </div>
    </div>
  );
}
