type InspectorToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export function InspectorToggle({ checked, onChange, label }: InspectorToggleProps) {
  return (
    <div className="flex items-center justify-between py-1">
      {label ? <span className="text-[11px] tracking-tight text-slate-600">{label}</span> : null}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-[18px] w-[30px] rounded-full transition-colors duration-200 ease-out ${
          checked ? "bg-blue-600" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
            checked ? "translate-x-[14px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}
