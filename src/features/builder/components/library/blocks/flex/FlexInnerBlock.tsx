"use client";

import { X } from "lucide-react";
import { useBuilderStore, setActiveBlock, flexRemoveBlockFromLeaf } from "@/features/builder/store";
import type { BlockItem, ZoneKey } from "@/features/builder/store";
import { BlockContent } from "../render/BlockContent";

type FlexInnerBlockProps = {
  block: BlockItem;
  containerBlockId: string;
  leafId: string;
  zone: ZoneKey;
};

export function FlexInnerBlock({ block, containerBlockId, leafId }: FlexInnerBlockProps) {
  const activeBlockId = useBuilderStore((s) => s.activeBlockId);
  const props = useBuilderStore((s) => s.blockProps[block.id]);

  const isActive = activeBlockId === block.id;
  const margin = props?.margin;

  const style: React.CSSProperties = {
    marginTop: margin?.t,
    marginRight: margin?.r,
    marginBottom: margin?.b,
    marginLeft: margin?.l,
    textAlign: props?.align,
    alignSelf:
      props?.align === "center"
        ? "center"
        : props?.align === "right"
          ? "flex-end"
          : props?.align === "left"
            ? "flex-start"
            : undefined,
  };

  return (
    <div
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        setActiveBlock(block.id);
      }}
      className={`group relative cursor-pointer rounded-sm transition-all ${
        isActive
          ? "outline outline-[1.5px] outline-blue-600 outline-offset-2"
          : "hover:outline hover:outline-[1px] hover:outline-blue-300 hover:outline-offset-2"
      }`}
      draggable={false}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          flexRemoveBlockFromLeaf(containerBlockId, leafId, block.id);
        }}
        title="Remove"
        className="absolute -right-2 -top-2 z-10 hidden h-4 w-4 items-center justify-center rounded-full bg-white text-rose-500 ring-1 ring-rose-300 hover:bg-rose-50 group-hover:flex"
      >
        <X className="h-2.5 w-2.5" />
      </button>
      <BlockContent
        kind={block.kind}
        title={props?.title ?? block.label}
        image={props?.image ?? ""}
        size="compact"
        fallbackLabel={block.label}
      />
    </div>
  );
}
