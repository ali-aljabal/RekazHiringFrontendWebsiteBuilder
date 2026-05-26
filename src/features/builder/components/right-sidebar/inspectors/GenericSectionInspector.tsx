"use client";
import React, { useState } from "react";
import { useBuilderStore } from "@/features/builder/store";
import { patchSectionProps } from "@/features/builder/store/actions/props";
import { InspectorRow } from "../ui/InspectorRow";
import { InspectorSection } from "../ui/InspectorSection";
import { inspectorTextInputClass } from "../ui/input-styles";
import { useDebouncedField } from "@/features/builder/hooks/use-debounced-field";

type GenericSectionInspectorProps = {
  label: string;
  sectionId: string;
};

type DebouncedInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

function DebouncedInput({
  label,
  value: initialValue,
  onChange,
  placeholder,
  type = "text",
}: DebouncedInputProps) {
  const [val, setVal, flush] = useDebouncedField(initialValue, onChange);
  return (
    <InspectorRow label={label}>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={flush}
        placeholder={placeholder}
        className={inspectorTextInputClass}
      />
    </InspectorRow>
  );
}

function SimpleSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: (value: any) => void;
}) {
  return (
    <InspectorRow label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inspectorTextInputClass}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </InspectorRow>
  );
}

function DebouncedRangeInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  const [val, setVal] = React.useState(value);
  React.useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <InspectorRow label={`${label} (${val})`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => {
          const num = Number(e.target.value);
          setVal(num);
          onChange(num);
        }}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </InspectorRow>
  );
}

export function GenericSectionInspector({ label, sectionId }: GenericSectionInspectorProps) {
  const { sectionProps } = useBuilderStore((s) => ({ sectionProps: s.sectionProps }));
  // patchSectionProps is already imported
  const [cssOpen, setCssOpen] = useState(false);

  const current = sectionProps[sectionId] ?? {};

  return (
    <div className="flex flex-col space-y-4 pb-6">
      <div className="border-b border-slate-100 px-4 py-3">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Styling <span className="font-semibold text-slate-700">{label}</span>. Adjust backgrounds,
          spacing and layout options.
        </p>
      </div>

      <InspectorSection title="Background Settings">
        <DebouncedInput
          label="Background Color"
          value={current.bgColor || ""}
          onChange={(v) => patchSectionProps(sectionId, { bgColor: v })}
          placeholder="e.g. #ffffff or transparent"
        />
        <DebouncedInput
          label="Background Image URL"
          value={current.bgImage || ""}
          onChange={(v) => patchSectionProps(sectionId, { bgImage: v })}
          placeholder="https://..."
        />
        {current.bgImage && (
          <DebouncedRangeInput
            label="Image Opacity (%)"
            value={current.bgOpacity !== undefined ? current.bgOpacity : 100}
            min={0}
            max={100}
            onChange={(v) => patchSectionProps(sectionId, { bgOpacity: v })}
          />
        )}
      </InspectorSection>

      <InspectorSection title="Spacing & Layout">
        <DebouncedRangeInput
          label="Padding Top (px)"
          value={current.paddingTop !== undefined ? current.paddingTop : 64}
          min={0}
          max={200}
          onChange={(v) => patchSectionProps(sectionId, { paddingTop: v })}
        />
        <DebouncedRangeInput
          label="Padding Bottom (px)"
          value={current.paddingBottom !== undefined ? current.paddingBottom : 64}
          min={0}
          max={200}
          onChange={(v) => patchSectionProps(sectionId, { paddingBottom: v })}
        />
        <SimpleSelect
          label="Max Width"
          value={current.maxWidth || "none"}
          options={[
            { label: "Full Width", value: "none" },
            { label: "800px (Compact)", value: "800px" },
            { label: "1000px (Medium)", value: "1000px" },
            { label: "1200px (Standard)", value: "1200px" },
            { label: "1400px (Wide)", value: "1400px" },
            { label: "1600px (X-Wide)", value: "1600px" },
          ]}
          onChange={(v) => patchSectionProps(sectionId, { maxWidth: v })}
        />
      </InspectorSection>

      {/* Collapsible Custom CSS */}
      <div className="border-t border-slate-100 pt-3 px-4">
        <button
          type="button"
          onClick={() => setCssOpen(!cssOpen)}
          className="flex w-full items-center justify-between text-[11px] font-semibold text-slate-700 hover:text-slate-900 focus:outline-none"
        >
          <span>Custom CSS</span>
          <span className="text-[10px] text-slate-400">{cssOpen ? "Hide" : "Show"}</span>
        </button>
        {cssOpen && (
          <div className="mt-2 space-y-2">
            <textarea
              value={current.customCss || ""}
              onChange={(e) => patchSectionProps(sectionId, { customCss: e.target.value })}
              placeholder="selector {&#10;  border: 2px solid red;&#10;}"
              rows={4}
              className={`${inspectorTextInputClass} font-mono text-[10px] resize-y w-full`}
            />
            <p className="text-[9px] text-slate-400">
              Use <code>selector</code> to target this section's container.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
