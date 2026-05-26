import type { DropOrientation } from "../types";

export function DropLine({ orientation }: { orientation: DropOrientation }) {
  if (orientation === "horizontal") {
    return (
      <span
        aria-hidden
        className="mx-0.5 inline-block h-6 w-0.5 shrink-0 rounded-full bg-blue-600"
      />
    );
  }

  return <div aria-hidden className="my-0.5 h-0.5 w-full rounded-full bg-blue-600" />;
}
