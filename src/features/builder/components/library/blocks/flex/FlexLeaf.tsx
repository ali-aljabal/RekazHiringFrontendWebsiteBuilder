"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useBuilderStore, flexMoveExistingBlockIntoLeaf } from "@/features/builder/store";
import type { BlockKind, FlexNode, ZoneKey } from "@/features/builder/store";
import { useDnd } from "@/features/builder/lib/builder-dnd";
import { useDroppable } from "@dnd-kit/core";
import { BlockKindMiniPopover } from "../pickers/BlockKindMiniPopover";
import { FLEX_ALIGN_MAP } from "./flex-tree-utils";
import { FlexInnerBlock } from "./FlexInnerBlock";

type FlexLeafProps = {
  node: FlexNode;
  containerBlockId: string;
  zone: ZoneKey;
  isRoot: boolean;
  onAddBlock: (leafId: string, kind: BlockKind) => void;
};

export function FlexLeaf({ node, containerBlockId, zone, isRoot, onAddBlock }: FlexLeafProps) {
  const { sourceRef, setSource, setIndicator } = useDnd();
  const [pickerAnchor, setPickerAnchor] = useState<DOMRect | null>(null);
  const [isOver, setIsOver] = useState(false);
  const { setNodeRef: setLeafRef } = useDroppable({ id: `flex-leaf-${node.id}` });

  const blocks = node.blocks ?? [];
  const justifyContent = FLEX_ALIGN_MAP[node.alignY ?? "start"];
  const alignItems = FLEX_ALIGN_MAP[node.alignX ?? "start"];

  const openPicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPickerAnchor(e.currentTarget.getBoundingClientRect());
  };

  const setRefs = (nodeEl: HTMLElement | null) => {
    setLeafRef(nodeEl);
    if (nodeEl) {
      nodeEl.dataset.containerBlockId = containerBlockId;
      nodeEl.dataset.leafId = node.id;
      nodeEl.dataset.zone = zone as string;
      nodeEl.dataset.index = String(0);
    }
  };

  return (
    <div
      ref={setRefs}
      style={{ justifyContent, alignItems }}
      className={`relative flex h-full min-h-[80px] w-full flex-col gap-2 rounded ${
        isRoot ? "" : "p-2"
      } ${
        isOver
          ? "bg-blue-50/60 outline outline-2 outline-blue-500"
          : "outline outline-1 outline-dashed outline-slate-200 hover:outline-slate-300"
      }`}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      {blocks.length === 0 ? (
        <button
          type="button"
          onClick={openPicker}
          className="m-auto flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 hover:text-blue-600 hover:ring-blue-300"
        >
          <Plus className="h-3 w-3" /> Add block
        </button>
      ) : (
        <>
          {blocks.map((block) => (
            <FlexInnerBlock
              key={block.id}
              block={block}
              containerBlockId={containerBlockId}
              leafId={node.id}
              zone={zone}
            />
          ))}
          <button
            type="button"
            onClick={openPicker}
            className="mt-1 flex items-center justify-center gap-1 self-start rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-400 hover:bg-slate-100 hover:text-blue-600"
          >
            <Plus className="h-2.5 w-2.5" /> Add
          </button>
        </>
      )}

      {pickerAnchor ? (
        <BlockKindMiniPopover
          anchor={pickerAnchor}
          onClose={() => setPickerAnchor(null)}
          onPick={(kind) => onAddBlock(node.id, kind)}
        />
      ) : null}
    </div>
  );
}
