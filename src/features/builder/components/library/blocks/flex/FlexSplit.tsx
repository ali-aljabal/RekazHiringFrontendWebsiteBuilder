"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import {
  useBuilderStore,
  flexResize,
  setActiveFlexCell,
  flexRemoveCell,
} from "@/features/builder/store";
import type { BlockKind, FlexNode, ZoneKey } from "@/features/builder/store";
import { usePointerDrag } from "../shared/use-pointer-drag";
import { FlexNodeRender } from "./FlexNodeRender";
import { FlexResizeGutter } from "./FlexResizeGutter";

type FlexSplitProps = {
  node: FlexNode;
  containerBlockId: string;
  zone: ZoneKey;
  gap: number;
  onAddBlock: (leafId: string, kind: BlockKind) => void;
};

export function FlexSplit({ node, containerBlockId, zone, gap, onAddBlock }: FlexSplitProps) {
  const activeFlexCell = useBuilderStore((s) => s.activeFlexCell);
  const startPointerDrag = usePointerDrag();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sizes = node.sizes ?? (node.children ?? []).map(() => 1);
  const direction = node.direction!;
  const isRow = direction === "row";

  const startResize = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const total = isRow ? rect.width : rect.height;
    const startPos = isRow ? e.clientX : e.clientY;
    const startSizes = [...sizes];
    const pairSum = startSizes[index] + startSizes[index + 1];

    startPointerDrag({
      cursor: isRow ? "col-resize" : "row-resize",
      onMove: (event) => {
        const pos = isRow ? event.clientX : event.clientY;
        const delta = ((pos - startPos) / total) * startSizes.reduce((a, b) => a + b, 0);
        const next = [...startSizes];
        let a = startSizes[index] + delta;
        let b = startSizes[index + 1] - delta;
        const min = pairSum * 0.1;

        if (a < min) {
          a = min;
          b = pairSum - min;
        }
        if (b < min) {
          b = min;
          a = pairSum - min;
        }

        next[index] = a;
        next[index + 1] = b;
        flexResize(containerBlockId, node.id, next);
      },
    });
  };

  return (
    <div
      ref={containerRef}
      style={{ gap }}
      className={`flex h-full w-full ${isRow ? "flex-row" : "flex-col"}`}
    >
      {(node.children ?? []).map((child, index) => {
        const isCellActive =
          activeFlexCell?.containerId === containerBlockId && activeFlexCell?.cellId === child.id;

        return (
          <div
            key={child.id}
            style={{
              flexGrow: sizes[index] ?? 1,
              flexBasis: 0,
              flexShrink: 1,
              minWidth: 0,
              minHeight: 0,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFlexCell({ containerId: containerBlockId, cellId: child.id });
            }}
            className={`relative flex rounded-sm transition-all ${
              isCellActive ? "outline outline-[1.5px] outline-blue-500 outline-offset-[-2px]" : ""
            }`}
          >
            <FlexNodeRender
              node={child}
              containerBlockId={containerBlockId}
              zone={zone}
              isRoot={false}
              gap={gap}
              onAddBlock={onAddBlock}
            />
            {isCellActive ? (
              <button
                type="button"
                title="Remove cell"
                onClick={(e) => {
                  e.stopPropagation();
                  flexRemoveCell(containerBlockId, child.id);
                }}
                className="absolute right-1 top-1 z-30 flex h-5 w-5 items-center justify-center rounded bg-white text-rose-500 shadow-sm ring-1 ring-rose-300 hover:bg-rose-50"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            ) : null}
            {index < node.children!.length - 1 ? (
              <FlexResizeGutter direction={direction} onMouseDown={startResize(index)} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
