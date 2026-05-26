import { SectionDefinition } from "@/features/builder/components/library/sections";

export function SectionPlaceholder({
  icon: Icon,
  label,
}: {
  icon: SectionDefinition["icon"];
  label: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-slate-400">
      <Icon className="h-5 w-5 stroke-[1.5]" />
      <span className="text-[9px] font-medium tracking-tight">{label}</span>
    </div>
  );
}
