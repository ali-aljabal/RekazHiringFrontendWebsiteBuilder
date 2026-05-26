import type { SectionDefinition } from "../section-definitions";

type SectionBlockCardProps = {
  item: SectionDefinition;
  onSelect: (item: SectionDefinition) => void;
};

/** Placeholder thumbnail shown when no custom `preview` component is provided. */

export function SectionBlockCard({ item, onSelect }: SectionBlockCardProps) {
  const Preview = item.preview;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex h-full w-full flex-col items-stretch gap-1.5 rounded-lg border border-slate-100 bg-white p-2 text-left transition-all duration-150 ease-out hover:-translate-y-px hover:border-blue-200 hover:shadow-[0_2px_8px_-2px_rgba(59,130,246,0.15)]"
    >
      <div className="aspect-[16/10] w-full overflow-hidden rounded-md bg-slate-50 ring-1 ring-inset ring-slate-100 transition-colors group-hover:bg-blue-50/40">
        {<Preview />}
      </div>
      <span className="truncate px-0.5 text-[11px] font-medium tracking-tight text-slate-700">
        {item.label}
      </span>
    </button>
  );
}