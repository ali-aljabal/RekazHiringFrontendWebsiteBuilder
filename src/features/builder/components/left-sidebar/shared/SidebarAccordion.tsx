import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type SidebarAccordionProps = {
  title: string;
  defaultOpen?: boolean;
  titleClassName?: string;
  children: ReactNode;
};

export function SidebarAccordion({
  title,
  defaultOpen = true,
  titleClassName = "text-[11px] font-semibold uppercase tracking-wider text-slate-700",
  children,
}: SidebarAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
        aria-expanded={open}
      >
        <span className={titleClassName}>{title}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ease-out ${
            open ? "" : "-rotate-90"
          }`}
        />
      </button>
      {open ? <div className="px-3 pb-3">{children}</div> : null}
    </div>
  );
}
