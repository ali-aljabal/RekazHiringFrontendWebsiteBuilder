import { cn } from "@/features/builder/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

type TreeExpandButtonProps = {
  expanded: boolean;
  active?: boolean;
  onClick: (e: React.MouseEvent) => void;
};

export function TreeExpandButton({ expanded, active, onClick }: TreeExpandButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded",
        active ? "text-white/80 hover:bg-white/10" : "text-slate-400 hover:bg-slate-100",
      )}
    >
      {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
    </button>
  );
}
