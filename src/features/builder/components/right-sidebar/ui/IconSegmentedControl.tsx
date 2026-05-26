import type { LucideIcon } from "lucide-react";

export type SegmentedOption<T extends string> = {
  value: T;
  icon: LucideIcon;
  label: string;
};

type IconSegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function IconSegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: IconSegmentedControlProps<T>) {
  return (
    <div className="flex w-full items-center rounded-md bg-slate-50 p-0.5 ring-1 ring-inset ring-slate-100">
      {options.map((option) => {
        const Icon = option.icon;
        const active = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            title={option.label}
            aria-label={option.label}
            aria-pressed={active}
            className={`flex h-7 flex-1 items-center justify-center rounded transition-all duration-150 ease-out ${
              active
                ? "bg-white text-blue-600 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
