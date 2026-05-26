import { useEffect, type RefObject } from "react";

export function useDismissOnOutside(
  ref: RefObject<HTMLElement | null>,
  onDismiss: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onDismiss();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled, onDismiss, ref]);
}
