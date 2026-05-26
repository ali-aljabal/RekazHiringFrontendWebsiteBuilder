"use client";

import React from "react";
import { useBuilderStore, findBlock } from "@/features/builder/store";
import { patchBlockProps } from "@/features/builder/store/actions/props";
import { useDebouncedField } from "@/features/builder/hooks/use-debounced-field";
import { InspectorSection } from "../ui/InspectorSection";
import { inspectorTextInputClass } from "../ui/input-styles";

type BlockContentInspectorProps = { blockId: string };

/* ─── Small shared sub-components ──────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      {children}
    </div>
  );
}

function TextInput({
  label,
  value: init,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [val, setVal, flush] = useDebouncedField(init, onChange);
  return (
    <Field label={label}>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={flush}
        placeholder={placeholder}
        className={inspectorTextInputClass}
      />
    </Field>
  );
}

function TextareaInput({
  label,
  value: init,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const [val, setVal, flush] = useDebouncedField(init, onChange);
  return (
    <Field label={label}>
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={flush}
        placeholder={placeholder}
        rows={rows}
        className={`${inspectorTextInputClass} resize-y`}
      />
    </Field>
  );
}

function SelectInput({
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
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inspectorTextInputClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function RangeInput({
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
    <Field label={`${label} — ${val}${unit}`}>
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
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </Field>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div>
        <p className="text-[11px] font-medium text-slate-700">{label}</p>
        {description && <p className="text-[10px] text-slate-400">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
          checked ? "bg-blue-500" : "bg-slate-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function MarqueeLogoManager({
  logos = [],
  onChange,
}: {
  logos: string[];
  onChange: (v: string[]) => void;
}) {
  const [newUrl, setNewUrl] = React.useState("");

  const presets = [
    { name: "Nike", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    {
      name: "Apple",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    { name: "Sony", url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
    { name: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  ];

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    onChange([...logos, newUrl.trim()]);
    setNewUrl("");
  };

  const handleRemove = (index: number) => {
    onChange(logos.filter((_, i) => i !== index));
  };

  const handleAddPreset = (url: string) => {
    if (logos.includes(url)) return;
    onChange([...logos, url]);
  };

  return (
    <div className="flex flex-col gap-3 pt-2 border-t border-slate-100 mt-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        Marquee Logos / Brands
      </span>

      {/* Preset Badges */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => {
          const isAdded = logos.includes(p.url);
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => handleAddPreset(p.url)}
              disabled={isAdded}
              className={`px-2 py-1 text-[10px] font-medium rounded-full border transition-all ${
                isAdded
                  ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              + {p.name}
            </button>
          );
        })}
      </div>

      {/* Input + Add button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Paste brand logo URL..."
          className={`${inspectorTextInputClass} flex-1 text-xs`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-sm transition-all"
        >
          Add
        </button>
      </div>

      {/* Active logos list */}
      {logos.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mt-1 max-h-[160px] overflow-y-auto pr-1">
          {logos.map((url, i) => (
            <div
              key={i}
              className="relative group flex items-center justify-between p-2 rounded-md border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all h-[52px]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={url}
                  alt="brand logo"
                  className="h-6 w-10 object-contain bg-white rounded border border-slate-200/50 p-0.5 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=40&auto=format&fit=crop&q=40";
                  }}
                />
                <span className="text-[10px] text-slate-500 truncate w-14" title={url}>
                  {url.split("/").pop() || "logo"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-slate-400 hover:text-red-500 rounded p-1 hover:bg-red-50 transition-colors"
                title="Remove logo"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 border border-dashed border-slate-200 rounded-md bg-slate-50/30">
          <p className="text-[10px] text-slate-400">
            No logos added. Falling back to marquee text.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function BlockContentInspector({ blockId }: BlockContentInspectorProps) {
  const block = useBuilderStore((s) => findBlock(s, blockId)?.block);
  const current = useBuilderStore((s) => s.blockProps[blockId]) ?? { title: "", image: "" };

  const patch = (p: any) => patchBlockProps(blockId, p);

  if (!block) {
    // Block not found (e.g. during re-render transition) — show basic fallback
    return (
      <div className="px-4 py-6 text-center">
        <p className="text-[11px] text-slate-400">Select a block to edit its content.</p>
      </div>
    );
  }

  const renderFields = () => {
    switch (block.kind) {
      /* ─── Heading ─────────────────────────── */
      case "heading":
        return (
          <InspectorSection title="Heading">
            <TextInput
              label="Text"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Enter heading text…"
            />
          </InspectorSection>
        );

      /* ─── Text ────────────────────────────── */
      case "text":
        return (
          <InspectorSection title="Text Block">
            <TextareaInput
              label="Content"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Enter paragraph text…"
              rows={4}
            />
          </InspectorSection>
        );

      /* ─── Button ──────────────────────────── */
      case "button":
        return (
          <InspectorSection title="Button">
            <TextInput
              label="Label"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Shop now"
            />
            <SelectInput
              label="Variant"
              value={current.variant || "default"}
              options={[
                { label: "Default (filled)", value: "default" },
                { label: "Outline", value: "outline" },
                { label: "Ghost", value: "ghost" },
                { label: "Secondary", value: "secondary" },
                { label: "Destructive", value: "destructive" },
              ]}
              onChange={(v) => patch({ variant: v })}
            />
            <SelectInput
              label="Size"
              value={current.btnSize || "default"}
              options={[
                { label: "Small", value: "sm" },
                { label: "Default", value: "default" },
                { label: "Large", value: "lg" },
              ]}
              onChange={(v) => patch({ btnSize: v })}
            />
            <Toggle
              label="Full Width"
              description="Stretch button across its container"
              checked={!!current.fullWidth}
              onChange={(v) => patch({ fullWidth: v })}
            />
          </InspectorSection>
        );

      /* ─── Image ───────────────────────────── */
      case "image":
        return (
          <InspectorSection title="Image">
            <TextInput
              label="Image URL"
              value={current.image || ""}
              onChange={(v) => patch({ image: v })}
              placeholder="https://example.com/photo.jpg"
            />
            <TextInput
              label="Alt Text"
              value={current.alt || ""}
              onChange={(v) => patch({ alt: v })}
              placeholder="Describe the image…"
            />
            <SelectInput
              label="Fit Mode"
              value={current.objectFit || "cover"}
              options={[
                { label: "Cover (crop to fill)", value: "cover" },
                { label: "Contain (letterbox)", value: "contain" },
                { label: "Fill (stretch)", value: "fill" },
                { label: "None (original size)", value: "none" },
              ]}
              onChange={(v) => patch({ objectFit: v })}
            />
            <RangeInput
              label="Corner Radius"
              value={current.borderRadius ?? 0}
              min={0}
              max={50}
              onChange={(v) => patch({ borderRadius: v })}
            />
          </InspectorSection>
        );

      /* ─── Spacer ──────────────────────────── */
      case "spacer":
        return (
          <InspectorSection title="Spacer">
            <RangeInput
              label="Height"
              value={current.spacerHeight ?? 24}
              min={8}
              max={200}
              onChange={(v) => patch({ spacerHeight: v })}
            />
          </InspectorSection>
        );

      /* ─── Marquee ─────────────────────────── */
      case "marquee":
        return (
          <InspectorSection title="Marquee">
            <TextInput
              label="Text"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Free shipping · New arrivals every week"
            />
            <RangeInput
              label="Speed"
              value={current.speed ?? 20}
              min={1}
              max={100}
              unit="s"
              onChange={(v) => patch({ speed: v })}
            />
            <SelectInput
              label="Direction"
              value={current.direction || "left"}
              options={[
                { label: "← Left (default)", value: "left" },
                { label: "→ Right", value: "right" },
              ]}
              onChange={(v) => patch({ direction: v })}
            />
            <MarqueeLogoManager
              logos={current.marqueeLogos || []}
              onChange={(logos) => patch({ marqueeLogos: logos })}
            />
          </InspectorSection>
        );

      /* ─── Jumbo ───────────────────────────── */
      case "jumbo":
        return (
          <InspectorSection title="Jumbo Text">
            <TextareaInput
              label="Text"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Big bold statement"
              rows={3}
            />
          </InspectorSection>
        );

      /* ─── Logo ────────────────────────────── */
      case "logo":
        return (
          <InspectorSection title="Logo">
            <TextInput
              label="Image URL"
              value={current.image || ""}
              onChange={(v) => patch({ image: v })}
              placeholder="https://example.com/logo.svg"
            />
            <RangeInput
              label="Width"
              value={current.logoWidth ?? 120}
              min={40}
              max={400}
              onChange={(v) => patch({ logoWidth: v })}
            />
          </InspectorSection>
        );

      /* ─── Liquid / Custom HTML ────────────── */
      case "liquid":
        return (
          <InspectorSection title="Custom HTML / Liquid">
            <Field label="Code">
              <textarea
                value={current.description || ""}
                onChange={(e) => patch({ description: e.target.value })}
                placeholder={"<div class='p-4 bg-blue-50 rounded'>\n  Hello from Liquid!\n</div>"}
                rows={8}
                spellCheck={false}
                className="w-full rounded-md bg-slate-50 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-slate-800 ring-1 ring-inset ring-slate-200 focus:outline-none focus:ring-blue-300 resize-y"
              />
            </Field>
            <p className="text-[9px] text-slate-400 pt-1">
              Supports raw HTML and Liquid template tags like{" "}
              <code className="bg-slate-100 px-1 rounded font-mono">{"{{ product.title }}"}</code>.
            </p>
          </InspectorSection>
        );

      /* ─── Testimonial ─────────────────────── */
      case "testimonial":
        return (
          <InspectorSection title="Testimonial">
            <TextInput
              label="Author Name"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Sarah Jenkins"
            />
            <TextInput
              label="Role / Source"
              value={current.subtitle || ""}
              onChange={(v) => patch({ subtitle: v })}
              placeholder="Verified Buyer"
            />
            <TextareaInput
              label="Review Text"
              value={current.description || ""}
              onChange={(v) => patch({ description: v })}
              placeholder="This product completely changed how I work…"
            />
            <SelectInput
              label="Rating"
              value={current.rating ?? 5}
              options={[
                { label: "★★★★★ 5 stars", value: 5 },
                { label: "★★★★☆ 4 stars", value: 4 },
                { label: "★★★☆☆ 3 stars", value: 3 },
                { label: "★★☆☆☆ 2 stars", value: 2 },
                { label: "★☆☆☆☆ 1 star", value: 1 },
              ]}
              onChange={(v) => patch({ rating: Number(v) })}
            />
            <TextInput
              label="Avatar URL"
              value={current.image || ""}
              onChange={(v) => patch({ image: v })}
              placeholder="https://..."
            />
          </InspectorSection>
        );

      /* ─── Product Spotlight ───────────────── */
      case "product-spotlight":
        return (
          <InspectorSection title="Product Spotlight">
            <TextInput
              label="Product Name"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Premium Ergonomic Chair"
            />
            <TextInput
              label="Price"
              value={current.price || ""}
              onChange={(v) => patch({ price: v })}
              placeholder="$199.00"
            />
            <TextareaInput
              label="Description"
              value={current.description || ""}
              onChange={(v) => patch({ description: v })}
              placeholder="Describe the product…"
            />
            <TextInput
              label="Image URL"
              value={current.image || ""}
              onChange={(v) => patch({ image: v })}
              placeholder="https://..."
            />
          </InspectorSection>
        );

      /* ─── Feature Item ────────────────────── */
      case "feature-item":
        return (
          <InspectorSection title="Feature / Benefit">
            <TextInput
              label="Title"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Lightning Fast"
            />
            <TextareaInput
              label="Description"
              value={current.description || ""}
              onChange={(v) => patch({ description: v })}
              placeholder="Describe this feature briefly…"
            />
            <SelectInput
              label="Icon"
              value={current.iconName || "Shield"}
              options={[
                { label: "🛡 Shield — Security", value: "Shield" },
                { label: "✨ Sparkles — Premium", value: "Sparkles" },
                { label: "⚡ Zap — Speed", value: "Zap" },
                { label: "❤️ Heart — Care", value: "Heart" },
                { label: "🎁 Gift — Offers", value: "Gift" },
                { label: "🕐 Clock — Time", value: "Clock" },
                { label: "📦 Package — Delivery", value: "Package" },
                { label: "⭐ Star — Rating", value: "Star" },
                { label: "📈 Trending — Growth", value: "TrendingUp" },
              ]}
              onChange={(v) => patch({ iconName: v })}
            />
          </InspectorSection>
        );

      /* ─── FAQ Item ────────────────────────── */
      case "faq-item":
        return (
          <InspectorSection title="FAQ Item">
            <TextInput
              label="Question"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="How long does shipping take?"
            />
            <TextareaInput
              label="Answer"
              value={current.description || ""}
              onChange={(v) => patch({ description: v })}
              placeholder="Standard shipping takes 3–5 business days…"
              rows={4}
            />
          </InspectorSection>
        );

      /* ─── Team Member ─────────────────────── */
      case "team-member":
        return (
          <InspectorSection title="Team Member">
            <TextInput
              label="Name"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Alexander Cole"
            />
            <TextInput
              label="Role / Title"
              value={current.subtitle || ""}
              onChange={(v) => patch({ subtitle: v })}
              placeholder="Co-Founder & CEO"
            />
            <TextInput
              label="Photo URL"
              value={current.image || ""}
              onChange={(v) => patch({ image: v })}
              placeholder="https://..."
            />
          </InspectorSection>
        );

      /* ─── Stat Item ───────────────────────── */
      case "stat-item":
        return (
          <InspectorSection title="Metric / Stat">
            <TextInput
              label="Number"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="10k+"
            />
            <TextInput
              label="Label"
              value={current.description || ""}
              onChange={(v) => patch({ description: v })}
              placeholder="Happy customers"
            />
          </InspectorSection>
        );

      /* ─── Newsletter Form ─────────────────── */
      case "newsletter-form":
        return (
          <InspectorSection title="Newsletter Form">
            <TextInput
              label="Button Text"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Subscribe"
            />
            <TextInput
              label="Placeholder"
              value={current.image || ""}
              onChange={(v) => patch({ image: v })}
              placeholder="Your email address"
            />
          </InspectorSection>
        );

      /* ─── Product Grid ────────────────────── */
      case "product-grid":
        return (
          <InspectorSection title="Product Grid">
            <TextInput
              label="Section Title"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
              placeholder="Our Products"
            />
          </InspectorSection>
        );

      /* ─── Default fallback ────────────────── */
      default:
        return (
          <InspectorSection title="Content">
            <TextInput
              label="Title"
              value={current.title || ""}
              onChange={(v) => patch({ title: v })}
            />
            <TextInput
              label="Image URL"
              value={current.image || ""}
              onChange={(v) => patch({ image: v })}
              placeholder="https://..."
            />
          </InspectorSection>
        );
    }
  };

  return <div className="flex flex-col pb-4">{renderFields()}</div>;
}
