import type { ReactNode } from "react";

type InspectorRowProps = {
  label: string;
  children: ReactNode;
};

export function InspectorRow({ label, children }: InspectorRowProps) {
  return (
    <div className="grid grid-cols-[68px_1fr] items-center gap-3 py-1">
      <label className="text-[11px] tracking-tight text-slate-500">{label}</label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
