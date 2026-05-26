"use client";

import { useBuilderStore, findBlock, flexSetGap, flexSetMinHeight } from "@/features/builder/store";
import { InspectorRow } from "../ui/InspectorRow";
import { InspectorSection } from "../ui/InspectorSection";
import { NumberField } from "../ui/NumberField";

type FlexContainerInspectorProps = {
  blockId: string;
};

export function FlexContainerInspector({ blockId }: FlexContainerInspectorProps) {
  const flex = useBuilderStore((s) => {
    const hit = findBlock(s, blockId);
    return hit?.block.flex ?? null;
  });

  if (!flex) return null;

  const gap = flex.gap ?? 0;
  const minHeight = flex.minHeight;

  return (
    <InspectorSection title="Container">
      <InspectorRow label="Gap">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={64}
            value={gap}
            onChange={(e) => flexSetGap(blockId, Number(e.target.value))}
            className="flex-1 accent-blue-600"
          />
          <span className="w-9 text-right text-[10px] font-medium tabular-nums tracking-tight text-slate-500">
            {gap}px
          </span>
        </div>
      </InspectorRow>
      <InspectorRow label="Min H">
        <NumberField value={minHeight} onChange={(n) => flexSetMinHeight(blockId, n)} />
      </InspectorRow>
    </InspectorSection>
  );
}
