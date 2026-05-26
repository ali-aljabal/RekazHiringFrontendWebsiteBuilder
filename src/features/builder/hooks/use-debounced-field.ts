import { useEffect, useRef, useState } from "react";

/**
 * Maintains an isolated local value for snappy typing, while debouncing
 * commits to the upstream store. Prevents parent tree re-renders on every
 * keystroke.
 */
export function useDebouncedField<T>(
  value: T,
  commit: (next: T) => void,
  delay = 180,
): [T, (next: T) => void, () => void] {
  const [local, setLocal] = useState<T>(value);
  const timer = useRef<number | null>(null);
  const committedRef = useRef<T>(value);

  // Sync down only when the upstream value changes from outside (e.g. import).
  useEffect(() => {
    if (value !== committedRef.current) {
      committedRef.current = value;
      setLocal(value);
    }
  }, [value]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const onChange = (next: T) => {
    setLocal(next);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      committedRef.current = next;
      commit(next);
    }, delay);
  };

  const flush = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    committedRef.current = local;
    commit(local);
  };

  return [local, onChange, flush];
}
