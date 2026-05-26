import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import type { BlockKind } from "@/features/builder/store";
import { LEAF_BLOCK_PICKER_ITEMS } from "../block-definitions";
import { useDismissOnOutside } from "../shared/use-dismiss-on-outside";
import { BLOCK_KIND_ICONS } from "../block-definitions";

type BlockKindMiniPopoverProps = {
  anchor: DOMRect;
  onPick: (kind: BlockKind) => void;
  onClose: () => void;
};

const POPOVER_WIDTH = 220;

export function BlockKindMiniPopover({ anchor, onPick, onClose }: BlockKindMiniPopoverProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");

  useDismissOnOutside(ref, onClose);

  const items = LEAF_BLOCK_PICKER_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const top = Math.min(anchor.bottom + 6, window.innerHeight - 280);
  const left = Math.min(anchor.left, window.innerWidth - POPOVER_WIDTH - 8);

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label="Add block"
      onClick={(e) => e.stopPropagation()}
      style={{ position: "fixed", top, left, width: POPOVER_WIDTH }}
      className="z-[120] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)]"
    >
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-2 py-1.5">
        <Search className="h-3 w-3 text-slate-400" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blocks"
          className="w-full bg-transparent text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <div className="max-h-[240px] overflow-y-auto py-1">
        {items.map((item) => {
          const Icon = BLOCK_KIND_ICONS[item.kind];
          return (
            <button
              key={item.kind}
              type="button"
              onClick={() => {
                onPick(item.kind);
                onClose();
              }}
              className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[11px] font-medium text-slate-700 hover:bg-slate-50"
            >
              <Icon className="h-3.5 w-3.5 text-slate-500" strokeWidth={1.75} />
              <span>{item.label}</span>
            </button>
          );
        })}
        {items.length === 0 ? (
          <div className="px-2.5 py-2 text-[11px] text-slate-400">No matches</div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
