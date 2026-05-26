import { Card } from "../primitives/shadcn-card";
import type { LibraryBlockComponentProps } from "./types";

export function GroupBlock({ title }: LibraryBlockComponentProps) {
  return (
    <Card className="border-dashed px-3 py-2 text-[11px] text-muted-foreground shadow-none">
      {title || "Group"}
    </Card>
  );
}
