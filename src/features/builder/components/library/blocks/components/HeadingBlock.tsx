import type { LibraryBlockComponentProps } from "./types";

export function HeadingBlock({
  title,
  size = "default",
  fontSize,
  fontWeight,
  textAlign,
}: LibraryBlockComponentProps) {
  const compact = size === "compact";
  const style: React.CSSProperties = {
    fontSize: fontSize ? `${fontSize}px` : undefined,
    fontWeight,
    textAlign,
  };

  if (compact) {
    return (
      <h3 className="text-xl font-semibold tracking-tight text-foreground" style={style}>
        {title || "Heading"}
      </h3>
    );
  }

  return (
    <h2
      className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
      style={style}
    >
      {title || "Heading"}
    </h2>
  );
}
