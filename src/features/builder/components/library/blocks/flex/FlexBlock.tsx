"use client";

import { useCallback } from "react";
import {
  useBuilderStore,
  setActiveBlock,
  flexSplit,
  flexSetMinHeight,
  flexAddBlockToLeaf,
} from "@/features/builder/store";
import type { BlockItem, BlockKind, ZoneKey } from "@/features/builder/store";
import { findFirstFlexLeaf } from "./flex-tree-utils";
import { FlexHeightHandle } from "./FlexHeightHandle";
import { FlexNodeRender } from "./FlexNodeRender";
import { FlexSplitToolbar } from "./FlexSplitToolbar";

type FlexBlockProps = {
  block: BlockItem;
  zone: ZoneKey;
};

export function FlexBlock({ block, zone }: FlexBlockProps) {
  const activeBlockId = useBuilderStore((s) => s.activeBlockId);

  const flex = block.flex!;
  const isActive = activeBlockId === block.id;
  const rootIsLeaf = !flex.root.children;

  const handleAddBlockToLeaf = useCallback(
    (leafId: string, kind: BlockKind) => {
      flexAddBlockToLeaf(block.id, leafId, kind);
    },
    [block.id, flexAddBlockToLeaf],
  );

  const splitRoot = (direction: "row" | "column") => {
    if (rootIsLeaf) {
      flexSplit(block.id, flex.root.id, direction);
      return;
    }

    const firstLeaf = findFirstFlexLeaf(flex.root);
    if (firstLeaf) flexSplit(block.id, firstLeaf.id, direction);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setActiveBlock(block.id);
      }}
      className={`group relative w-full rounded-md bg-white transition-all ${
        isActive
          ? "outline outline-[1.5px] outline-blue-600 outline-offset-2"
          : "hover:outline hover:outline-[1px] hover:outline-blue-300 hover:outline-offset-2"
      }`}
      style={{ minHeight: flex.minHeight }}
    >
      {isActive ? (
        <span className="pointer-events-none absolute -top-[18px] left-0 z-10 inline-flex h-[18px] items-center rounded-t-[3px] bg-blue-600 px-1.5 text-[10px] font-medium tracking-tight text-white">
          {block.label}
        </span>
      ) : null}

      <div className="flex h-full w-full" style={{ minHeight: flex.minHeight }}>
        <FlexNodeRender
          node={flex.root}
          containerBlockId={block.id}
          zone={zone}
          isRoot
          gap={flex.gap ?? 0}
          onAddBlock={handleAddBlockToLeaf}
        />
      </div>

      {isActive ? (
        <FlexSplitToolbar
          minHeight={flex.minHeight}
          onSplitRow={() => splitRoot("row")}
          onSplitColumn={() => splitRoot("column")}
        />
      ) : null}

      <FlexHeightHandle
        visible={isActive}
        getStartHeight={() => flex.minHeight}
        onResize={(deltaY, startHeight) => flexSetMinHeight(block.id, startHeight + deltaY)}
      />
    </div>
  );
}
