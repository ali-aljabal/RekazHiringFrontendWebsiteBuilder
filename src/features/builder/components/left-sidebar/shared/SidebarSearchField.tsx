import { Search, X } from "lucide-react";

type SidebarSearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  variant?: "popover" | "panel";
};

export function SidebarSearchField({
  value,
  onChange,
  placeholder = "Search blocks",
  autoFocus = false,
  variant = "panel",
}: SidebarSearchFieldProps) {
  const isPopover = variant === "popover";

  return (
    <div
      className={
        isPopover
          ? "flex items-center gap-2 rounded-md bg-white px-2 py-1.5 ring-1 ring-inset ring-slate-200 transition-colors focus-within:ring-blue-400"
          : "flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5 ring-1 ring-inset ring-slate-100 transition-colors focus-within:ring-blue-200"
      }
    >
      <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs tracking-tight text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-slate-300 hover:text-slate-600"
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </button>
      ) : null}
    </div>
  );
}
