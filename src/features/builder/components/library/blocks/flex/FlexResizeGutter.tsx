type FlexResizeGutterProps = {
  direction: "row" | "column";
  onMouseDown: (e: React.MouseEvent) => void;
};

export function FlexResizeGutter({ direction, onMouseDown }: FlexResizeGutterProps) {
  const isRow = direction === "row";

  return (
    <div
      onMouseDown={onMouseDown}
      onClick={(e) => e.stopPropagation()}
      draggable={false}
      className={`absolute z-20 flex items-center justify-center bg-transparent hover:bg-blue-400/30 ${
        isRow
          ? "right-0 top-0 h-full w-1.5 translate-x-1/2 cursor-col-resize"
          : "bottom-0 left-0 h-1.5 w-full translate-y-1/2 cursor-row-resize"
      }`}
    >
      <div className={`rounded-full bg-blue-500/60 ${isRow ? "h-6 w-[2px]" : "h-[2px] w-6"}`} />
    </div>
  );
}
