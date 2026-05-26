import { buttonVariants } from "../primitives/shadcn-button";
import { cn } from "@/features/builder/lib/utils";
import type { LibraryBlockComponentProps } from "./types";

export function ButtonBlock({
  title,
  variant = "default",
  btnSize,
  size = "default",
  fullWidth,
}: LibraryBlockComponentProps) {
  const resolvedSize = btnSize || (size === "compact" ? "sm" : "default");
  return (
    <span
      className={cn(
        buttonVariants({
          variant: variant as any,
          size: resolvedSize as any,
        }),
        "pointer-events-none cursor-default",
        fullWidth ? "flex w-full justify-center text-center" : "inline-flex",
      )}
    >
      {title || "Button"}
    </span>
  );
}
