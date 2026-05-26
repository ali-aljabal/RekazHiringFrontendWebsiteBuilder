/**
 * UID generator.
 *
 * For deterministic server/client rendering we use a simple incremental
 * counter so the same sequence of IDs is produced during initial state
 * construction on both server and client. This avoids React hydration
 * mismatches caused by random UUIDs generated independently on each side.
 *
 * At runtime (after initial render), callers may still rely on unique IDs
 * from this generator; the counter will continue incrementing per session.
 */
let _uidCounter = 0;

/** Reset the counter — used before building initial state so that SSR and
 *  client hydration produce identical IDs from the same sequence. */
export function resetUidCounter(): void {
  _uidCounter = 0;
}

export function uid(prefix = ""): string {
  _uidCounter += 1;
  const id = `${_uidCounter.toString(36)}`;
  return prefix ? `${prefix}_${id}` : id;
}

export const clone = <T>(v: T): T =>
  typeof structuredClone === "function" ? structuredClone(v) : JSON.parse(JSON.stringify(v));
