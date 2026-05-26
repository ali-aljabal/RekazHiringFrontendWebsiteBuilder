import { usePointerDrag } from "../shared/use-pointer-drag";

type FlexHeightHandleProps = {
  visible: boolean;
  onResize: (deltaY: number, startHeight: number) => void;
  getStartHeight: () => number;
};

export function FlexHeightHandle({ visible, onResize, getStartHeight }: FlexHeightHandleProps) {
  const startPointerDrag = usePointerDrag();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startY = e.clientY;
    const startHeight = getStartHeight();

    startPointerDrag({
      cursor: "row-resize",
      onMove: (event) => onResize(event.clientY - startY, startHeight),
    });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      draggable={false}
      title="Drag to resize height"
      className="absolute bottom-0 left-1/2 z-20 flex h-2 w-16 -translate-x-1/2 translate-y-1/2 cursor-row-resize items-center justify-center rounded-full bg-slate-300 opacity-0 transition-opacity hover:bg-blue-500 group-hover:opacity-100"
      style={visible ? { opacity: 1 } : undefined}
    >
      <div className="h-[2px] w-8 rounded-full bg-white/80" />
    </div>
  );
}
