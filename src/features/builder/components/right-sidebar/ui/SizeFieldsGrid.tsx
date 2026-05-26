import { NumberField } from "./NumberField";

export type SizeFieldConfig = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
};

type SizeFieldsGridProps = {
  fields: SizeFieldConfig[];
};

export function SizeFieldsGrid({ fields }: SizeFieldsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {fields.map((field) => (
        <div key={field.label}>
          <div className="mb-1 text-[10px] tracking-tight text-slate-500">{field.label}</div>
          <NumberField value={field.value} onChange={field.onChange} unit={field.unit} />
        </div>
      ))}
    </div>
  );
}
