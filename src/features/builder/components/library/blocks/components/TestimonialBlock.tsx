import { Star } from "lucide-react";
import type { LibraryBlockComponentProps } from "./types";

export function TestimonialBlock({
  title,
  image,
  subtitle,
  description,
  rating = 5,
  size = "default",
}: LibraryBlockComponentProps) {
  const authorName = title || "Sarah Jenkins";
  const role = subtitle || "Verified Buyer";
  const avatarUrl =
    image ||
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80";
  const reviewText =
    description ||
    "Absolutely exceeded my expectations! The quality is amazing and customer support was super helpful.";
  const starsCount = Math.min(5, Math.max(1, rating));

  return (
    <div
      className={`w-full rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md ${
        size === "compact" ? "max-w-sm" : ""
      }`}
    >
      <div className="mb-3 flex items-center gap-3.5">
        <img
          src={avatarUrl}
          alt={authorName}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
        />
        <div>
          <h4 className="text-sm font-semibold leading-tight text-foreground">{authorName}</h4>
          <span className="text-[11px] font-medium text-muted-foreground">{role}</span>
        </div>
      </div>

      <div className="mb-2.5 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < starsCount ? "fill-amber-400 text-amber-400" : "text-border"
            }`}
          />
        ))}
      </div>

      <p className="text-xs leading-relaxed italic text-muted-foreground">&ldquo;{reviewText}&rdquo;</p>
    </div>
  );
}
