import type { LibraryBlockComponentProps } from "./types";

export function LiquidBlock({ description }: LibraryBlockComponentProps) {
  const code = description || "";
  if (code) {
    return <div dangerouslySetInnerHTML={{ __html: code }} />;
  }
  return (
    <code className="block rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
      {"{{ liquid/html }}"}
    </code>
  );
}
