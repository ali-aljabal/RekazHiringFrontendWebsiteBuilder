import type { LibraryBlockComponentProps } from "./types";

export function LogoBlock({ title, image, logoWidth }: LibraryBlockComponentProps) {
  const widthStyle = logoWidth !== undefined ? `${logoWidth}px` : "120px";
  if (image) {
    return (
      <img
        src={image}
        alt={title || "Logo"}
        style={{ width: widthStyle, height: "auto", objectFit: "contain" }}
        className="max-h-12 sm:max-h-16"
      />
    );
  }
  return (
    <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">
      {title || "Logo"}
    </span>
  );
}
