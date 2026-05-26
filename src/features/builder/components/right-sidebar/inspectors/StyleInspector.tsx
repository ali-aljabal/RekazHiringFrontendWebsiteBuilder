"use client";

import React, { useState, useId } from "react";
import { useBuilderStore, patchBlockProps, patchSectionProps } from "@/features/builder/store";
import { InspectorSection } from "../ui/InspectorSection";
import { SpacingBox } from "../ui/SpacingBox";
import { inspectorTextInputClass } from "../ui/input-styles";
import { useDebouncedField } from "@/features/builder/hooks/use-debounced-field";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

type StyleInspectorProps = {
  id: string;
  type: "block" | "section";
};

/* ─── Shared sub-components ──────────────────────────────────────────────── */

/** A colour swatch button + hex text input side by side. */
function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const uid = useId();
  const [hex, setHex, flush] = useDebouncedField(value || "", onChange);

  return (
    <div className="flex items-center justify-between py-1.5 gap-3">
      <label htmlFor={uid} className="text-[11px] tracking-tight text-slate-500 shrink-0 w-[68px]">
        {label}
      </label>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* colour swatch */}
        <label
          className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md ring-1 ring-slate-200 hover:ring-blue-400 transition-all"
          style={{ backgroundColor: hex || "#ffffff" }}
          title="Click to pick colour"
        >
          <input
            type="color"
            value={hex || "#ffffff"}
            onChange={(e) => {
              setHex(e.target.value);
              onChange(e.target.value);
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
        {/* hex text */}
        <input
          id={uid}
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          onBlur={flush}
          placeholder="#000000"
          spellCheck={false}
          className={`${inspectorTextInputClass} font-mono uppercase flex-1 min-w-0`}
        />
        {/* clear swatch if transparent wanted */}
        {hex && (
          <button
            type="button"
            onClick={() => {
              setHex("");
              onChange("");
            }}
            className="shrink-0 text-[10px] text-slate-400 hover:text-slate-600"
            title="Clear colour"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

function DebouncedInput({
  label,
  value: initialValue,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [val, setVal, flush] = useDebouncedField(initialValue, onChange);
  return (
    <div className="flex items-center justify-between py-1.5 gap-3">
      <span className="text-[11px] tracking-tight text-slate-500 shrink-0 w-[68px]">{label}</span>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={flush}
        placeholder={placeholder}
        className={`${inspectorTextInputClass} flex-1`}
      />
    </div>
  );
}

function RangeRow({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "px",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}) {
  const [val, setVal] = React.useState(value);
  React.useEffect(() => setVal(value), [value]);

  return (
    <div className="flex items-center justify-between py-1.5 gap-3">
      <span className="text-[11px] tracking-tight text-slate-500 shrink-0 w-[68px]">{label}</span>
      <div className="flex items-center gap-2 flex-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={val}
          onChange={(e) => {
            const n = Number(e.target.value);
            setVal(n);
            onChange(n);
          }}
          className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-[11px] font-semibold text-slate-700 w-[38px] text-right tabular-nums">
          {val}
          {unit}
        </span>
      </div>
    </div>
  );
}

function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: (v: any) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 gap-3">
      <span className="text-[11px] tracking-tight text-slate-500 shrink-0 w-[68px]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inspectorTextInputClass} flex-1`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Small number input cell — used in inline 4-up grids */
function NumberCell({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [val, setVal] = React.useState(String(value ?? 0));
  React.useEffect(() => setVal(String(value ?? 0)), [value]);

  return (
    <div className="flex flex-col items-center gap-0.5">
      <input
        type="number"
        value={val}
        min={0}
        onChange={(e) => {
          setVal(e.target.value);
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange(n);
        }}
        className="w-full rounded-md bg-white px-1.5 py-1 text-center text-[11px] font-semibold text-slate-800 ring-1 ring-inset ring-slate-200 focus:outline-none focus:ring-blue-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <span className="text-[9px] tracking-wider text-slate-400 uppercase">{label}</span>
    </div>
  );
}

/** 4-up grid for Padding or Margin inline editing */
function SpacingGrid({
  values,
  onChange,
}: {
  values: { t: number; r: number; b: number; l: number };
  onChange: (side: "t" | "r" | "b" | "l", v: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <NumberCell label="Top" value={values.t} onChange={(v) => onChange("t", v)} />
      <NumberCell label="Right" value={values.r} onChange={(v) => onChange("r", v)} />
      <NumberCell label="Bottom" value={values.b} onChange={(v) => onChange("b", v)} />
      <NumberCell label="Left" value={values.l} onChange={(v) => onChange("l", v)} />
    </div>
  );
}

/** Row of icon toggle buttons for text-align */
function AlignButtons({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const opts = [
    { v: "left", Icon: AlignLeft },
    { v: "center", Icon: AlignCenter },
    { v: "right", Icon: AlignRight },
    { v: "justify", Icon: AlignJustify },
  ];
  return (
    <div className="flex items-center justify-between py-1.5 gap-3">
      <span className="text-[11px] tracking-tight text-slate-500 shrink-0 w-[68px]">Align</span>
      <div className="flex gap-1">
        {opts.map(({ v, Icon }) => (
          <button
            key={v}
            type="button"
            title={v[0].toUpperCase() + v.slice(1)}
            onClick={() => onChange(v)}
            className={`rounded-md p-1.5 transition-colors ${
              value === v
                ? "bg-blue-50 text-blue-600 ring-1 ring-blue-300"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function StyleInspector({ id, type }: StyleInspectorProps) {
  const [cssOpen, setCssOpen] = useState(false);

  const current =
    useBuilderStore((s) => (type === "block" ? s.blockProps[id] : s.sectionProps[id])) ?? {};

  const patch = (p: any) => (type === "block" ? patchBlockProps(id, p) : patchSectionProps(id, p));

  /* spacing helpers */
  const margin = {
    t: current.marginTop ?? current.margin?.t ?? 0,
    r: current.marginRight ?? current.margin?.r ?? 0,
    b: current.marginBottom ?? current.margin?.b ?? 0,
    l: current.marginLeft ?? current.margin?.l ?? 0,
  };
  const padding = {
    t: current.paddingTop ?? 0,
    r: current.paddingRight ?? 0,
    b: current.paddingBottom ?? 0,
    l: current.paddingLeft ?? 0,
  };

  const onMargin = (side: "t" | "r" | "b" | "l", v: number) => {
    const leg = current.margin ?? { t: 0, r: 0, b: 0, l: 0 };
    const key = { t: "marginTop", r: "marginRight", b: "marginBottom", l: "marginLeft" }[side];
    patch({ [key]: v, margin: { ...leg, [side]: v } });
  };
  const onPadding = (side: "t" | "r" | "b" | "l", v: number) => {
    const key = { t: "paddingTop", r: "paddingRight", b: "paddingBottom", l: "paddingLeft" }[side];
    patch({ [key]: v });
  };

  /* max width */
  const stdWidths = ["none", "800px", "1000px", "1200px", "1400px", "1600px"];
  const resolvedMW = current.maxWidth || "none";
  const isCustomMW = !stdWidths.includes(resolvedMW);
  const customMWNum = isCustomMW ? parseInt(resolvedMW, 10) || 1200 : 1200;

  return (
    <div className="flex flex-col pb-6">
      {/* ── 1. Spacing ─────────────────────────────────────────── */}
      <InspectorSection title="Spacing">
        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Padding
            </p>
            <SpacingGrid values={padding} onChange={onPadding} />
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Margin
            </p>
            <SpacingGrid values={margin} onChange={onMargin} />
          </div>
        </div>
      </InspectorSection>

      {/* ── 2. Layout ──────────────────────────────────────────── */}
      <InspectorSection title="Layout" defaultOpen={false}>
        <SelectRow
          label="Max Width"
          value={isCustomMW ? "custom" : resolvedMW}
          options={[
            { label: "Full Width", value: "none" },
            { label: "800px", value: "800px" },
            { label: "1000px", value: "1000px" },
            { label: "1200px", value: "1200px" },
            { label: "1400px", value: "1400px" },
            { label: "1600px", value: "1600px" },
            { label: "Custom…", value: "custom" },
          ]}
          onChange={(v) => {
            if (v === "custom") patch({ maxWidth: "1200px" });
            else patch({ maxWidth: v });
          }}
        />
        {isCustomMW && (
          <RangeRow
            label="Width"
            value={customMWNum}
            min={200}
            max={2000}
            step={10}
            onChange={(v) => patch({ maxWidth: `${v}px` })}
          />
        )}
      </InspectorSection>

      {/* ── 3. Typography ──────────────────────────────────────── */}
      <InspectorSection title="Typography" defaultOpen={false}>
        <ColorRow
          label="Color"
          value={current.textColor || ""}
          onChange={(v) => patch({ textColor: v || undefined })}
        />
        <RangeRow
          label="Size"
          value={current.fontSize ?? 16}
          min={10}
          max={96}
          onChange={(v) => patch({ fontSize: v })}
        />
        <SelectRow
          label="Weight"
          value={current.fontWeight || "normal"}
          options={[
            { label: "Normal (400)", value: "normal" },
            { label: "Medium (500)", value: "medium" },
            { label: "Semibold (600)", value: "semibold" },
            { label: "Bold (700)", value: "bold" },
            { label: "Extrabold (800)", value: "extrabold" },
          ]}
          onChange={(v) => patch({ fontWeight: v })}
        />
        <AlignButtons
          value={current.textAlign || "left"}
          onChange={(v) => patch({ textAlign: v })}
        />
        <SelectRow
          label="Line Ht."
          value={current.lineHeight || "1.5"}
          options={[
            { label: "Tight (1.2)", value: "1.2" },
            { label: "Normal (1.5)", value: "1.5" },
            { label: "Relaxed (1.75)", value: "1.75" },
            { label: "Loose (2.0)", value: "2" },
          ]}
          onChange={(v) => patch({ lineHeight: v })}
        />
        <SelectRow
          label="Tracking"
          value={current.letterSpacing || "normal"}
          options={[
            { label: "Tight (−0.05em)", value: "-0.05em" },
            { label: "Normal", value: "normal" },
            { label: "Wide (0.1em)", value: "0.1em" },
          ]}
          onChange={(v) => patch({ letterSpacing: v })}
        />
      </InspectorSection>

      {/* ── 4. Background ──────────────────────────────────────── */}
      <InspectorSection title="Background" defaultOpen={false}>
        <ColorRow
          label="Fill"
          value={current.bgColor || ""}
          onChange={(v) => patch({ bgColor: v || undefined })}
        />
        <DebouncedInput
          label="Image URL"
          value={current.bgImage || ""}
          onChange={(v) => patch({ bgImage: v || undefined })}
          placeholder="https://..."
        />
        {current.bgImage && (
          <RangeRow
            label="Opacity"
            value={current.bgOpacity ?? 100}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => patch({ bgOpacity: v })}
          />
        )}
      </InspectorSection>

      {/* ── 5. Border ──────────────────────────────────────────── */}
      <InspectorSection title="Border & Radius" defaultOpen={false}>
        <RangeRow
          label="Radius"
          value={current.borderRadius ?? 0}
          min={0}
          max={100}
          onChange={(v) => patch({ borderRadius: v })}
        />
        <RangeRow
          label="Width"
          value={current.borderWidth ?? 0}
          min={0}
          max={20}
          onChange={(v) => patch({ borderWidth: v })}
        />
        <ColorRow
          label="Color"
          value={current.borderColor || "#e2e8f0"}
          onChange={(v) => patch({ borderColor: v || undefined })}
        />
        <SelectRow
          label="Style"
          value={current.borderStyle || "none"}
          options={[
            { label: "None", value: "none" },
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
            { label: "Dotted", value: "dotted" },
          ]}
          onChange={(v) => patch({ borderStyle: v })}
        />
      </InspectorSection>

      {/* ── 6. Shadow ──────────────────────────────────────────── */}
      <InspectorSection title="Shadow" defaultOpen={false}>
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {(["none", "sm", "md", "lg", "xl"] as const).map((s) => {
            const active = (current.boxShadow || "none") === s;
            const shadowVal =
              s === "sm"
                ? "0 1px 2px rgba(0,0,0,.08)"
                : s === "md"
                  ? "0 4px 6px rgba(0,0,0,.10)"
                  : s === "lg"
                    ? "0 10px 15px rgba(0,0,0,.12)"
                    : s === "xl"
                      ? "0 20px 25px rgba(0,0,0,.15)"
                      : "none";
            return (
              <button
                key={s}
                type="button"
                onClick={() => patch({ boxShadow: s })}
                title={s.toUpperCase()}
                className={`flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-all ${
                  active
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className="h-6 w-6 rounded-md bg-white"
                  style={{ boxShadow: shadowVal, border: "1px solid #e2e8f0" }}
                />
                <span
                  className={`text-[9px] font-semibold uppercase ${active ? "text-blue-600" : "text-slate-400"}`}
                >
                  {s}
                </span>
              </button>
            );
          })}
        </div>
      </InspectorSection>

      {/* ── 7. Custom CSS ──────────────────────────────────────── */}
      <div className="border-t border-slate-100 px-4 pt-3">
        <button
          type="button"
          onClick={() => setCssOpen((o) => !o)}
          className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-800 focus:outline-none"
        >
          <span>Custom CSS</span>
          <span className="text-[10px] normal-case font-normal text-slate-400">
            {cssOpen ? "Hide" : "Show"}
          </span>
        </button>
        {cssOpen && (
          <div className="mt-2 space-y-1.5">
            <textarea
              value={current.customCss || ""}
              onChange={(e) => patch({ customCss: e.target.value })}
              placeholder={"color: red;\npadding: 10px;\nbackground: #f0f0f0;"}
              rows={5}
              className="w-full rounded-md bg-slate-50 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-slate-800 ring-1 ring-inset ring-slate-200 focus:outline-none focus:ring-blue-300 resize-y"
            />
            <p className="text-[9px] text-slate-400">
              Enter CSS properties that will be applied directly to this element. Do not include a
              selector.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
