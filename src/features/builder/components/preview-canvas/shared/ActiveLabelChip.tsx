type ActiveLabelChipProps = {
  label: string;
};

export function ActiveLabelChip({ label }: ActiveLabelChipProps) {
  return (
    <span className="pointer-events-none absolute -top-[18px] left-0 z-10 inline-flex h-[18px] items-center rounded-t-[3px] bg-blue-600 px-1.5 text-[10px] font-medium tracking-tight text-white">
      {label}
    </span>
  );
}
