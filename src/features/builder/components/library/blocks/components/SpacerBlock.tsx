import type { LibraryBlockComponentProps } from "./types";

export function SpacerBlock({ size = "default", spacerHeight }: LibraryBlockComponentProps) {
  const heightStyle =
    spacerHeight !== undefined ? `${spacerHeight}px` : size === "compact" ? "16px" : "24px";
  return <div style={{ height: heightStyle, width: "100%" }} aria-hidden />;
}
