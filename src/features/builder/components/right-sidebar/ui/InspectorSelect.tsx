import { ChevronDown } from "lucide-react";

type InspectorSelectProps = {
  value: string;
};

/** Placeholder select — wired to real options when theme settings support it. */
export function InspectorSelect({ value }: InspectorSelectProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1.5 text-[11px] font-medium tracking-tight text-slate-700 ring-1 ring-inset ring-slate-200 transition-colors hover:ring-slate-300"
    >
      <span className="truncate">{value}</span>
      <ChevronDown className="h-3 w-3 text-slate-400" />
    </button>
  );
}
