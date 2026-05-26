import type { LibraryBlockComponentProps } from "./types";

export function JumboBlock({ title, fontSize, textAlign }: LibraryBlockComponentProps) {
  const style: React.CSSProperties = {
    fontSize: fontSize ? `${fontSize}px` : undefined,
    textAlign,
  };
  return (
    <div
      style={style}
      className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl"
    >
      {title || "Jumbo"}
    </div>
  );
}
