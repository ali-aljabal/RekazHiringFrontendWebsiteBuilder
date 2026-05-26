"use client";

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useBuilderStore } from "@/features/builder/store";
import { patchBlockProps } from "@/features/builder/store/actions/props";
import { IconSegmentedControl } from "../ui/IconSegmentedControl";
import { InspectorRow } from "../ui/InspectorRow";
import { InspectorSection } from "../ui/InspectorSection";
import { NumberField } from "../ui/NumberField";

type BlockLayoutInspectorProps = {
  blockId: string;
};

type MarginKey = "t" | "r" | "b" | "l";

const MARGIN_LABELS: { key: MarginKey; label: string }[] = [
  { key: "t", label: "Top" },
  { key: "r", label: "Right" },
  { key: "b", label: "Bottom" },
  { key: "l", label: "Left" },
];

export function BlockLayoutInspector({ blockId }: BlockLayoutInspectorProps) {
  const blockProps = useBuilderStore((s) => s.blockProps);
  const current = blockProps[blockId] ?? { title: "", image: "" };
  const align = current.align ?? "left";
  const margin = current.margin ?? { t: 0, r: 0, b: 0, l: 0 };

  const setMargin = (side: MarginKey, value: number) =>
    patchBlockProps(blockId, {
      margin: { ...margin, [side]: Number.isFinite(value) ? value : 0 },
    });

  return (
    <>
      <InspectorSection title="Alignment">
        <InspectorRow label="Align">
          <IconSegmentedControl
            value={align}
            onChange={(v) => patchBlockProps(blockId, { align: v })}
            options={[
              { value: "left", icon: AlignLeft, label: "Left" },
              { value: "center", icon: AlignCenter, label: "Center" },
              { value: "right", icon: AlignRight, label: "Right" },
            ]}
          />
        </InspectorRow>
      </InspectorSection>

      <InspectorSection title="Spacing">
        <div className="grid grid-cols-2 gap-2">
          {MARGIN_LABELS.map(({ key, label }) => (
            <div key={key}>
              <div className="mb-1 text-[10px] tracking-tight text-slate-500">{label}</div>
              <NumberField value={margin[key]} onChange={(n) => setMargin(key, n)} />
            </div>
          ))}
        </div>
      </InspectorSection>
    </>
  );
}
