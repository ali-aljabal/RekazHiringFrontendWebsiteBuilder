"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LibraryBlockComponentProps } from "./types";

export function FaqItemBlock({ title, description }: LibraryBlockComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const question = title || "How long does shipping take?";
  const answer =
    description ||
    "Domestic shipping takes 3-5 business days. International orders usually arrive in 8-14 business days.";

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/50 sm:px-5 sm:py-4"
      >
        <span className="pr-4">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[500px] border-t" : "max-h-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3.5 text-xs leading-relaxed text-muted-foreground sm:px-5 sm:py-4">
          {answer}
        </div>
      </div>
    </div>
  );
}
