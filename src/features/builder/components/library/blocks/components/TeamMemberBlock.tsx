import type { LibraryBlockComponentProps } from "./types";

export function TeamMemberBlock({
  title,
  image,
  subtitle,
  size = "default",
}: LibraryBlockComponentProps) {
  const name = title || "Alexander Cole";
  const role = subtitle || "Co-Founder & CEO";
  const photoUrl =
    image ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";

  return (
    <div
      className={`flex w-full flex-col items-center rounded-2xl border bg-card p-5 text-center shadow-sm transition-shadow hover:shadow-md ${
        size === "compact" ? "max-w-xs" : ""
      }`}
    >
      <div className="mb-3.5 h-20 w-20 shrink-0 overflow-hidden rounded-full border ring-2 ring-border">
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      </div>
      <h4 className="mb-0.5 text-sm font-semibold leading-snug text-foreground">{name}</h4>
      <p className="text-[11px] font-medium text-muted-foreground">{role}</p>
    </div>
  );
}
