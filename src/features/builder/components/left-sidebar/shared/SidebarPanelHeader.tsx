import type { ReactNode } from "react";
import { X } from "lucide-react";

type SidebarPanelHeaderProps = {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  trailing?: ReactNode;
};

export function SidebarPanelHeader({
  title,
  subtitle,
  onClose,
  trailing,
}: SidebarPanelHeaderProps) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-100 px-3">
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="text-[13px] font-semibold tracking-tight text-slate-900">{title}</span>
        {subtitle ? (
          <span className="truncate text-[10px] uppercase tracking-wider text-slate-400">
            {subtitle}
          </span>
        ) : null}
      </div>
      {trailing ??
        (onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
            aria-label="Close panel"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null)}
    </div>
  );
}
