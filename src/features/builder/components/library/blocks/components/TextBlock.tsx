import type { LibraryBlockComponentProps } from "./types";

export function TextBlock({ title, fontSize, textAlign }: LibraryBlockComponentProps) {
  const style: React.CSSProperties = {
    fontSize: fontSize ? `${fontSize}px` : undefined,
    textAlign,
  };
  return (
    <p className="text-sm leading-relaxed text-muted-foreground" style={style}>
      {title || "Text"}
    </p>
  );
}
