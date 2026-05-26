import { useMemo } from "react";
import { useStore } from "zustand";
import { useBuilderStore } from "./store";
import { findBlockInFlex } from "./tree-utils";
import type { BuilderState, SectionItem, ZoneKey, BlockItem } from "./types";
import { ZONE_KEYS } from "./types";

// ─── Non-hook lookup selectors ───────────────────────────────────────

export function findSection(state: BuilderState, id: string): { section: SectionItem; zone: ZoneKey } | null {
  for (const zone of ZONE_KEYS) {
    const section = state.zones[zone].find((item) => item.id === id);
    if (section) return { section, zone };
  }
  return null;
}

export function findBlock(
  state: BuilderState,
  id: string,
): { block: BlockItem; zone: ZoneKey; sectionId: string } | null {
  for (const zone of ZONE_KEYS) {
    for (const section of state.zones[zone]) {
      for (const block of section.blocks) {
        if (block.id === id) return { block, zone, sectionId: section.id };
        if (block.kind === "flex" && block.flex) {
          const nested = findBlockInFlex(block.flex.root, id);
          if (nested) return { block: nested, zone, sectionId: section.id };
        }
      }
    }
  }
  return null;
}

// ─── Derived state selectors ─────────────────────────────────────────

/** Returns a Set of all section IDs that are hidden. */
export function useHiddenSectionIds(): Set<string> {
  const zones = useBuilderStore((state) => state.zones);
  return useMemo(() => {
    const hidden = new Set<string>();
    ZONE_KEYS.forEach((zone) => {
      zones[zone].forEach((item) => {
        if (item.hidden) hidden.add(item.id);
      });
    });
    return hidden;
  }, [zones]);
}

// ─── Temporal (undo/redo) selectors ──────────────────────────────────

export function useCanUndo(): boolean {
  return useStore(useBuilderStore.temporal, (s) => s.pastStates.length > 0);
}

export function useCanRedo(): boolean {
  return useStore(useBuilderStore.temporal, (s) => s.futureStates.length > 0);
}

export function useUndoRedo() {
  const { undo, redo, clear } = useBuilderStore.temporal.getState();
  return { undo, redo, clear };
}
