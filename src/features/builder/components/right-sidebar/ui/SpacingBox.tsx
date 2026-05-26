type SpacingSides = { t: number; r: number; b: number; l: number };

function SpacingInput({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className: string;
}) {
  return (
    <input
      type="number"
      value={value ?? 0}
      onChange={(e) => {
        const val = e.target.value === "" ? 0 : Number(e.target.value);
        onChange(Number.isFinite(val) ? val : 0);
      }}
      placeholder="0"
      className={`${className} w-8 bg-transparent text-center text-[10px] font-medium focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
    />
  );
}

type SpacingBoxProps = {
  margin: SpacingSides;
  padding: SpacingSides;
  onChangeMargin: (side: keyof SpacingSides, value: number) => void;
  onChangePadding: (side: keyof SpacingSides, value: number) => void;
};

/** Visual margin/padding editor wired to state props. */
export function SpacingBox({
  margin = { t: 0, r: 0, b: 0, l: 0 },
  padding = { t: 0, r: 0, b: 0, l: 0 },
  onChangeMargin,
  onChangePadding,
}: SpacingBoxProps) {
  return (
    <div className="relative rounded-md bg-slate-50/70 p-2 ring-1 ring-inset ring-slate-100">
      <span className="absolute left-2 top-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
        Margin
      </span>
      <div className="mt-4 rounded border border-dashed border-slate-300 px-2 pb-2 pt-3">
        {/* Margin Top */}
        <div className="mb-1 flex justify-center">
          <SpacingInput
            value={margin.t}
            onChange={(v) => onChangeMargin("t", v)}
            className="text-slate-700"
          />
        </div>

        <div className="flex items-stretch gap-1">
          {/* Margin Left */}
          <SpacingInput
            value={margin.l}
            onChange={(v) => onChangeMargin("l", v)}
            className="w-6 text-slate-700"
          />

          <div className="relative flex-1 rounded border border-dashed border-blue-300 bg-white px-2 py-2.5">
            <span className="absolute left-1 top-0.5 text-[8px] font-semibold uppercase tracking-wider text-blue-400">
              Padding
            </span>

            {/* Padding Top */}
            <div className="mt-2 flex justify-center">
              <SpacingInput
                value={padding.t}
                onChange={(v) => onChangePadding("t", v)}
                className="text-blue-700"
              />
            </div>

            <div className="flex items-center gap-1">
              {/* Padding Left */}
              <SpacingInput
                value={padding.l}
                onChange={(v) => onChangePadding("l", v)}
                className="w-6 text-blue-700"
              />

              <div className="flex-1 rounded-sm border border-slate-200 bg-slate-50/80 py-2.5" />

              {/* Padding Right */}
              <SpacingInput
                value={padding.r}
                onChange={(v) => onChangePadding("r", v)}
                className="w-6 text-blue-700"
              />
            </div>

            {/* Padding Bottom */}
            <div className="mt-1 flex justify-center">
              <SpacingInput
                value={padding.b}
                onChange={(v) => onChangePadding("b", v)}
                className="text-blue-700"
              />
            </div>
          </div>

          {/* Margin Right */}
          <SpacingInput
            value={margin.r}
            onChange={(v) => onChangeMargin("r", v)}
            className="w-6 text-slate-700"
          />
        </div>

        {/* Margin Bottom */}
        <div className="mt-1 flex justify-center">
          <SpacingInput
            value={margin.b}
            onChange={(v) => onChangeMargin("b", v)}
            className="text-slate-700"
          />
        </div>
      </div>
    </div>
  );
}
