import { Columns2, Rows2 } from "lucide-react";

type FlexSplitToolbarProps = {
  minHeight: number;
  onSplitRow: () => void;
  onSplitColumn: () => void;
};

export function FlexSplitToolbar({ minHeight, onSplitRow, onSplitColumn }: FlexSplitToolbarProps) {
  return (
    <div className="absolute -top-3 right-2 z-30 flex translate-y-[-100%] items-center gap-1 rounded-md border border-slate-200 bg-white p-1 shadow-md">
      <button
        type="button"
        title="Split vertically (add column)"
        onClick={(e) => {
          e.stopPropagation();
          onSplitRow();
        }}
        className="flex h-6 w-6 items-center justify-center rounded text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      >
        <Columns2 className="h-3.5 w-3.5" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        title="Split horizontally (add row)"
        onClick={(e) => {
          e.stopPropagation();
          onSplitColumn();
        }}
        className="flex h-6 w-6 items-center justify-center rounded text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      >
        <Rows2 className="h-3.5 w-3.5" strokeWidth={1.75} />
      </button>
      <span className="mx-0.5 h-4 w-px bg-slate-200" />
      <span className="px-1.5 text-[10px] font-medium text-slate-400">{minHeight}px</span>
    </div>
  );
}
