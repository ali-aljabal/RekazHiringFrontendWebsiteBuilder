import { ChevronDown } from "lucide-react";

type InspectorTargetChipProps = {
  title: string;
  subtitle: string;
};

export function InspectorTargetChip({ title, subtitle }: InspectorTargetChipProps) {
  return (
    <div className="border-b border-slate-100 px-3 py-2">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md bg-blue-50/60 px-2 py-1.5 ring-1 ring-inset ring-blue-100 transition-colors hover:bg-blue-50"
      >
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span className="text-[11px] font-semibold tracking-tight text-blue-700">{title}</span>
        </div>
        <ChevronDown className="h-3 w-3 text-blue-400" />
      </button>
      <p className="mt-1.5 px-0.5 text-[10px] tracking-tight text-slate-400">{subtitle}</p>
    </div>
  );
}
