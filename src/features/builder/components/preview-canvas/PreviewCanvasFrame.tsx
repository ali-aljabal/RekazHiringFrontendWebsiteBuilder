import type { ReactNode } from "react";

type PreviewCanvasFrameProps = {
  isMobile: boolean;
  children: ReactNode;
  onClearSelection: () => void;
  onStopPropagation: (e: React.MouseEvent) => void;
};

export function PreviewCanvasFrame({
  isMobile,
  children,
  onClearSelection,
  onStopPropagation,
}: PreviewCanvasFrameProps) {
  return (
    <div
      className="flex h-full w-full items-start justify-center overflow-auto bg-slate-100 p-4 sm:p-8"
      onClick={onClearSelection}
    >
      <div
        className={`relative overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 transition-all duration-300 ease-out ${
          isMobile ? "w-[375px]" : "w-full max-w-[1280px]"
        }`}
        onClick={onStopPropagation}
      >
        <div className="flex h-full w-full flex-col bg-white">{children}</div>
      </div>
    </div>
  );
}
