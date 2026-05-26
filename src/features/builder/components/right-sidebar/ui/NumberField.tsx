type NumberFieldProps = {
  value: number;
  onChange: (value: number) => void;
  unit?: string;
};

export function NumberField({ value, onChange, unit = "px" }: NumberFieldProps) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-white px-1.5 py-1 ring-1 ring-inset ring-slate-200 transition-colors focus-within:ring-blue-300">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-transparent text-center text-[11px] font-medium tracking-tight text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="text-[10px] font-medium tracking-tight text-slate-400">{unit}</span>
    </div>
  );
}
