import { useCallback } from "react";

type PointerDragOptions = {
  cursor: string;
  onMove: (event: MouseEvent) => void;
  onEnd?: () => void;
};

export function usePointerDrag() {
  return useCallback(({ cursor, onMove, onEnd }: PointerDragOptions) => {
    const handleMove = (event: MouseEvent) => onMove(event);
    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      onEnd?.();
    };

    document.body.style.cursor = cursor;
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  }, []);
}
