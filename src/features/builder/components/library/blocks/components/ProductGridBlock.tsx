"use client";

import { useState, useMemo } from "react";
import { Star, ShoppingBag, Eye } from "lucide-react";
import type { LibraryBlockComponentProps } from "./types";

interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  category: "Living" | "Tabletop" | "Decor";
  image: string;
  tag?: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Umber Ceramic Vase",
    price: "$89.00",
    rating: 5,
    category: "Decor",
    image:
      "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=350&auto=format&fit=crop&q=80",
    tag: "Best Seller",
  },
  {
    id: "p2",
    name: "Linen Throw Blanket",
    price: "$65.00",
    rating: 4,
    category: "Living",
    image:
      "https://images.unsplash.com/photo-1604167499046-5c48a5d83490?w=350&auto=format&fit=crop&q=80",
    tag: "New",
  },
  {
    id: "p3",
    name: "Stoneware Dinner Set",
    price: "$120.00",
    rating: 5,
    category: "Tabletop",
    image:
      "https://images.unsplash.com/photo-1514428631868-a400b561ff44?w=350&auto=format&fit=crop&q=80",
  },
  {
    id: "p4",
    name: "Scented Soy Candle Trio",
    price: "$42.00",
    rating: 5,
    category: "Decor",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=350&auto=format&fit=crop&q=80",
    tag: "Sale",
  },
  {
    id: "p5",
    name: "Woven Cotton Rug",
    price: "$150.00",
    rating: 4,
    category: "Living",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=350&auto=format&fit=crop&q=80",
  },
  {
    id: "p6",
    name: "Matte Ceramic Mug Set",
    price: "$34.00",
    rating: 5,
    category: "Tabletop",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=350&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES = ["All", "Living", "Tabletop", "Decor"];

export function ProductGridBlock({}: LibraryBlockComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full rounded-2xl border bg-card p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCategory(category);
            }}
            className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-tight transition-all duration-150 sm:px-4 sm:py-1.5 ${
              selectedCategory === category
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute left-2.5 top-2.5 rounded bg-foreground/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-background shadow-sm">
                  {product.tag}
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground shadow-md transition-all hover:scale-105 hover:text-foreground pointer-events-none">
                  <Eye className="h-4 w-4" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground shadow-md transition-all hover:scale-105 hover:text-foreground pointer-events-none">
                  <ShoppingBag className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-3.5 sm:p-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {product.category}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < product.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="mb-2 flex-1 text-xs font-bold leading-snug tracking-tight text-foreground line-clamp-2">
                {product.name}
              </h4>

              <span className="text-sm font-extrabold text-foreground">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
