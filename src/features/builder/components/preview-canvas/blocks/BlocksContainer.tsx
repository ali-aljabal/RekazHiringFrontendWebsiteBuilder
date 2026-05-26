import type { BlockItem, ZoneKey } from "@/features/builder/store";
import { moveBlockBetween } from "@/features/builder/store";
import { useDnd, resolveDropIndex } from "@/features/builder/lib/builder-dnd";
import { useDroppable } from "@dnd-kit/core";
import type { DropOrientation } from "../types";
import { SelectableBlock } from "./SelectableBlock";

type BlocksContainerProps = {
  blocks: BlockItem[];
  zone: ZoneKey;
  sectionId: string;
  orientation: DropOrientation;
  className?: string;
  emptyHint?: string;
};

export function BlocksContainer({
  blocks,
  zone,
  sectionId,
  orientation,
  className,
  emptyHint = "Drop blocks here",
}: BlocksContainerProps) {
  const { sourceRef, indicator } = useDnd();
  const { setNodeRef: setContainerRef } = useDroppable({ id: `section-${sectionId}` });

  if (!blocks.length) {
    return (
      <div
        ref={setContainerRef}
        id={`section-${sectionId}`}
        data-zone={zone}
        data-section-id={sectionId}
        data-index={String(blocks.length > 0 ? blocks.length - 1 : 0)}
        className="flex min-h-[60px] w-full items-center justify-center rounded border border-dashed border-neutral-300 px-3 py-4 text-[11px] italic text-neutral-400"
      >
        {emptyHint}
      </div>
    );
  }

  return (
    <div
      ref={setContainerRef}
      id={`section-${sectionId}`}
      data-zone={zone}
      data-section-id={sectionId}
      data-index={String(blocks.length > 0 ? blocks.length - 1 : 0)}
      className={className}
    >
      {blocks.map((block, index) => (
        <SelectableBlock
          key={block.id}
          block={block}
          zone={zone}
          sectionId={sectionId}
          index={index}
          orientation={orientation}
        />
      ))}
    </div>
  );
}
