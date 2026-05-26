import { useLayoutEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import type { BlockKind } from "@/features/builder/store";
import { BlockLibraryPopover } from "./BlockLibraryPopover";
import { TextButton } from "@/components/InlineButton";

type AddBlockButtonProps = {
  open: boolean;
  onToggle: () => void;
  onPick: (kind: BlockKind) => void;
  onClose: () => void;
};

export function AddBlockButton({ open, onToggle, onPick, onClose }: AddBlockButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (open && btnRef.current) {
      setAnchor(btnRef.current.getBoundingClientRect());
    } else {
      setAnchor(null);
    }
  }, [open]);

  return (
    <>
      <TextButton
        ref={btnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        icon={<Plus className="h-3.5 w-3.5" />}
        className={`flex h-7 w-full items-center cursor-pointer gap-1.5 rounded-md px-1.5 text-[11px] font-medium tracking-tight transition-colors ${
          open ? "bg-blue-50 text-blue-700" : "text-blue-600 hover:bg-blue-50/60"
        }`}
      >
        Add block
      </TextButton>

      {open && anchor ? (
        <BlockLibraryPopover anchor={anchor} onPick={onPick} onClose={onClose} />
      ) : null}
    </>
  );
}
