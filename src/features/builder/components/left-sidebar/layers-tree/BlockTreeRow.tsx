"use client";

import { X } from "lucide-react";
import { useBuilderStore, setActiveBlock, moveBlock } from "@/features/builder/store";
import type { BlockItem, ZoneKey } from "@/features/builder/store";
import { useDnd, resolveDropIndex } from "@/features/builder/lib/builder-dnd";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import { DropIndicatorLine } from "../shared/DropIndicatorLine";
import { BLOCK_KIND_ICONS } from "../../library/blocks";

type BlockTreeRowProps = {
  block: BlockItem;
  zone: ZoneKey;
  sectionId: string;
  index: number;
  onRemove: () => void;
};

export function BlockTreeRow({ block, zone, sectionId, index, onRemove }: BlockTreeRowProps) {
  const activeBlockId = useBuilderStore((s) => s.activeBlockId);
  const { sourceRef, indicator, setSource, setIndicator } = useDnd();

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({
    id: `draggable-tree-block-${block.id}`,
    data: { kind: "block", zone, sectionId, index, blockId: block.id } as unknown as object,
  });
  const { setNodeRef: setDropRef } = useDroppable({ id: `block-${block.id}` });
  const setRefs = (node: HTMLElement | null) => {
    setDragRef(node);
    setDropRef(node);
    if (node) {
      node.dataset.zone = zone as string;
      node.dataset.sectionId = sectionId;
      node.dataset.index = String(index);
    }
  };
  const styleTransform = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const Icon = BLOCK_KIND_ICONS[block.kind];
  const isActive = activeBlockId === block.id;

  const showBefore =
    indicator?.kind === "block" &&
    indicator.zone === zone &&
    indicator.sectionId === sectionId &&
    indicator.index === index &&
    indicator.position === "before";

  const showAfter =
    indicator?.kind === "block" &&
    indicator.zone === zone &&
    indicator.sectionId === sectionId &&
    indicator.index === index &&
    indicator.position === "after";

  // dnd-kit drag bindings: provider handles the state updates; keep datasets for provider

  return (
    <div className="relative">
      {showBefore ? <DropIndicatorLine position="before" /> : null}
      <div
        ref={setRefs}
        id={`block-${block.id}`}
        style={styleTransform}
        onClick={(e) => {
          e.stopPropagation();
          setActiveBlock(block.id);
        }}
        className={`group flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-1.5 text-[11px] tracking-tight transition-colors ${
          isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"
        }`}
        {...attributes}
        {...listeners}
      >
        <Icon
          className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white/90" : "text-slate-400"}`}
          strokeWidth={1.75}
        />
        <span className="truncate font-medium">{block.label}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={`ml-auto flex h-5 w-5 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 ${
            isActive
              ? "text-white/80 hover:bg-white/15"
              : "text-slate-300 hover:bg-slate-100 hover:text-rose-600"
          }`}
          title="Remove block"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      {showAfter ? <DropIndicatorLine position="after" /> : null}
    </div>
  );
}
