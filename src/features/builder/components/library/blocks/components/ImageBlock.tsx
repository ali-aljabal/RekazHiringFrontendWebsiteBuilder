import { AspectRatio } from "../primitives/shadcn-aspect-ratio";
import { cn } from "@/features/builder/lib/utils";
import type { LibraryBlockComponentProps } from "./types";

export function ImageBlock({
  image,
  alt,
  objectFit = "cover",
  borderRadius,
}: LibraryBlockComponentProps) {
  const roundedStyle =
    borderRadius !== undefined ? { borderRadius: `${borderRadius}px` } : undefined;

  if (image) {
    return (
      <AspectRatio ratio={16 / 9} className="overflow-hidden bg-muted" style={roundedStyle}>
        <img src={image} alt={alt || ""} className="h-full w-full" style={{ objectFit }} />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden bg-muted" style={roundedStyle}>
      <div className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        Image
      </div>
    </AspectRatio>
  );
}
