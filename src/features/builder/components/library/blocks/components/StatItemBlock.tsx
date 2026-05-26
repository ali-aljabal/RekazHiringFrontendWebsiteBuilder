import type { LibraryBlockComponentProps } from "./types";

export function StatItemBlock({ title, description }: LibraryBlockComponentProps) {
  const statVal = title || "99.9%";
  const statLabel = description || "Server Uptime Guarantee";

  return (
    <div className="flex w-full min-w-[150px] flex-col items-center justify-center rounded-xl border bg-card p-6 text-center shadow-sm">
      <span className="mb-1.5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {statVal}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {statLabel}
      </span>
    </div>
  );
}
