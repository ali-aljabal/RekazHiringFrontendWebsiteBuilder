"use client";

import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, Minus } from "lucide-react";
import {
  useBuilderStore,
  findBlock,
  flexSetCellAlign,
  flexRemoveCell,
  flexResize,
} from "@/features/builder/store";
import { findFlexCellNode, findFlexCellParent } from "../flex/flex-tree";
import { IconSegmentedControl } from "../ui/IconSegmentedControl";
import { InspectorRow } from "../ui/InspectorRow";
import { InspectorSection } from "../ui/InspectorSection";
import { NumberField } from "../ui/NumberField";

export function FlexCellInspector() {
  const activeFlexCell = useBuilderStore((s) => s.activeFlexCell);
  const containerId = activeFlexCell?.containerId;
  const cellId = activeFlexCell?.cellId;

  const flexState = useBuilderStore((s) => {
    if (!containerId) return null;
    const hit = findBlock(s, containerId);
    return hit?.block.flex ?? null;
  });

  if (!activeFlexCell || !flexState) return null;

  const root = flexState.root;
  const cell = findFlexCellNode(root, cellId!);
  if (!cell) return null;

  const parent = findFlexCellParent(root, cell.id);
  const childIndex = parent?.children?.findIndex((c) => c.id === cell.id) ?? -1;
  const sizes = parent?.sizes ?? parent?.children?.map(() => 1) ?? [];
  const cellSize = childIndex >= 0 ? (sizes[childIndex] ?? 1) : 1;

  const alignX = cell.alignX ?? "start";
  const alignY = cell.alignY ?? "start";

  return (
    <>
      <InspectorSection title="Alignment">
        <InspectorRow label="Horizontal">
          <IconSegmentedControl
            value={alignX}
            onChange={(v) => flexSetCellAlign(activeFlexCell.containerId, cell.id, "alignX", v)}
            options={[
              { value: "start", icon: AlignLeft, label: "Left" },
              { value: "center", icon: AlignCenter, label: "Center" },
              { value: "end", icon: AlignRight, label: "Right" },
            ]}
          />
        </InspectorRow>
        <InspectorRow label="Vertical">
          <IconSegmentedControl
            value={alignY}
            onChange={(v) => flexSetCellAlign(activeFlexCell.containerId, cell.id, "alignY", v)}
            options={[
              { value: "start", icon: ArrowUp, label: "Top" },
              { value: "center", icon: Minus, label: "Middle" },
              { value: "end", icon: ArrowDown, label: "Bottom" },
            ]}
          />
        </InspectorRow>
      </InspectorSection>

      {parent && childIndex >= 0 ? (
        <InspectorSection title={parent.direction === "row" ? "Width ratio" : "Height ratio"}>
          <InspectorRow label="Size">
            <NumberField
              value={Math.round(cellSize * 100) / 100}
              onChange={(n) => {
                if (!Number.isFinite(n) || n <= 0) return;
                const next = [...sizes];
                next[childIndex] = n;
                flexResize(activeFlexCell.containerId, parent.id, next);
              }}
              unit="fr"
            />
          </InspectorRow>
          <p className="px-0.5 pt-1 text-[10px] tracking-tight text-slate-400">
            Drag the gutter on the canvas for visual resizing.
          </p>
        </InspectorSection>
      ) : null}

      <InspectorSection title="Cell">
        <button
          type="button"
          onClick={() => flexRemoveCell(activeFlexCell.containerId, cell.id)}
          className="flex w-full items-center justify-center gap-1.5 rounded-md bg-rose-50 px-2 py-2 text-[11px] font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 hover:bg-rose-100"
        >
          Remove cell
        </button>
      </InspectorSection>
    </>
  );
}
