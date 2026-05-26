type Position = "before" | "after";

export function DropIndicatorLine({ position }: { position: Position }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-10 h-0.5 rounded-full bg-blue-600 ${
        position === "before" ? "-top-px" : "-bottom-px"
      }`}
    />
  );
}
