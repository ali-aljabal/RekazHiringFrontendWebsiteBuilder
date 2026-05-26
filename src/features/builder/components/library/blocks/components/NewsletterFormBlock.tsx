import type { LibraryBlockComponentProps } from "./types";
import { Mail } from "lucide-react";
import { buttonVariants } from "../primitives/shadcn-button";
import { cn } from "@/features/builder/lib/utils";

export function NewsletterFormBlock({ title, image }: LibraryBlockComponentProps) {
  const buttonText = title || "Subscribe";
  const placeholder = image || "Your email address";

  return (
    <div className="pointer-events-none mx-auto w-full max-w-md">
      <div className="flex flex-col gap-2 rounded-lg sm:flex-row sm:items-stretch sm:border sm:bg-card sm:p-1 sm:shadow-sm">
        <div className="relative flex flex-1 items-center">
          <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            placeholder={placeholder}
            className="w-full rounded-lg border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 sm:border-none sm:rounded-none sm:bg-transparent sm:py-1.5 sm:focus:ring-0"
            readOnly
          />
        </div>
        <span
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "flex shrink-0 items-center justify-center rounded-lg px-5 py-2.5 font-medium shadow-sm transition-all sm:py-0",
          )}
        >
          {buttonText}
        </span>
      </div>
    </div>
  );
}
