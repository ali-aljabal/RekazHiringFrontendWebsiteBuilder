import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type InspectorSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function InspectorSection({ title, children, defaultOpen = true }: InspectorSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-slate-50/60"
        aria-expanded={open}
      >
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
          {title}
        </h3>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ease-out ${
            open ? "" : "-rotate-90"
          }`}
        />
      </button>
      {open ? <div className="px-4 pb-3 pt-1">{children}</div> : null}
    </div>
  );
}
