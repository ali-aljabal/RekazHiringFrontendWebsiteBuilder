import { MoreHorizontal, Square, X } from "lucide-react";

type InspectorHeaderProps = {
  badge: string;
  onClose: () => void;
};

export function InspectorHeader({ badge, onClose }: InspectorHeaderProps) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-100 px-3">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
          <Square className="h-3 w-3" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-semibold tracking-tight text-slate-900">
            {badge}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          aria-label="Close inspector"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
