import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { BlockKind } from "@/features/builder/store";
import { BLOCK_LIBRARY_GROUPS } from "../../block-definitions";
import { useDismissOnOutside } from "../../shared/use-dismiss-on-outside";
import { SidebarSearchField } from "@/features/builder/components/left-sidebar/shared/SidebarSearchField";
import { CollapsibleHeader } from "@/components/CollapsibleHeader";
import { BLOCK_KIND_ICONS } from "../../block-definitions";

type BlockLibraryPopoverProps = {
  anchor: DOMRect;
  onPick: (kind: BlockKind) => void;
  onClose: () => void;
};

const POPOVER_WIDTH = 260;
const POPOVER_MARGIN = 8;

function computePopoverPosition(anchor: DOMRect) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = anchor.right + POPOVER_MARGIN;
  let top = anchor.top;

  if (left + POPOVER_WIDTH + POPOVER_MARGIN > vw) {
    left = Math.min(anchor.left, vw - POPOVER_WIDTH - POPOVER_MARGIN);
    top = anchor.bottom + POPOVER_MARGIN;
  }

  top = Math.max(POPOVER_MARGIN, Math.min(top, vh - POPOVER_MARGIN - 100));

  return { left, top };
}

export function BlockLibraryPopover({ anchor, onPick, onClose }: BlockLibraryPopoverProps) {
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(BLOCK_LIBRARY_GROUPS.map((g) => [g.title, true])),
  );
  const ref = useRef<HTMLDivElement | null>(null);

  useDismissOnOutside(ref, onClose);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOCK_LIBRARY_GROUPS.map((group) => ({
      ...group,
      items: q ? group.items.filter((item) => item.label.toLowerCase().includes(q)) : group.items,
    })).filter((group) => group.items.length > 0);
  }, [query]);

  const position = computePopoverPosition(anchor);

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label="Block library"
      onClick={(e) => e.stopPropagation()}
      style={{ position: "fixed", left: position.left, top: position.top, width: POPOVER_WIDTH }}
      className="z-[100] flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)] animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="border-b border-slate-100 p-2.5">
        <SidebarSearchField value={query} onChange={setQuery} autoFocus variant="popover" />
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        {groups.map((group) => {
          const open = openGroups[group.title] ?? true;
          return (
            <div key={group.title} className="border-t border-slate-100">
              <CollapsibleHeader
                isOpen={open}
                onClick={() => setOpenGroups((prev) => ({ ...prev, [group.title]: !open }))}
                className="px-3 py-1.5 hover:bg-slate-50"
                iconClassName="h-3 w-3" // Make icons smaller to match your original
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {group.title}
                </span>
              </CollapsibleHeader>
              {open ? (
                <div className="pb-1">
                  {group.items.map((item) => {
                    const Icon = BLOCK_KIND_ICONS[item.kind];
                    return (
                      <button
                        key={`${group.title}-${item.kind}`}
                        type="button"
                        onClick={() => onPick(item.kind)}
                        className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[12px] font-medium tracking-tight text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <Icon className="h-3.5 w-3.5 text-slate-500" strokeWidth={1.75} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}
