import { useBuilderStore } from "../store";
import { createBlockInstance, createSectionInstance } from "@/features/builder/lib/builder-schemas";
import type { ZoneKey, SectionKind, BlockKind } from "../types";

// ─── Section operations ───────────────────────────────────────────────

export const addSection = (zone: ZoneKey, kind: SectionKind) => {
  const { section, props, blockProps: sectionBlockProps } = createSectionInstance(kind);
  useBuilderStore.setState((state) => {
    // Register props in the props slice
    state.sectionProps[section.id] = props;
    Object.assign(state.blockProps, sectionBlockProps);
    // Push into the zone
    state.zones[zone].push(section);
    // Update selection
    state.active = section.id;
    state.activeBlockId = null;
  });
};

export const removeSection = (zone: ZoneKey, sectionId: string) => {
  useBuilderStore.setState((state) => {
    const target = state.zones[zone].find((s) => s.id === sectionId);
    const blockIds = target?.blocks.map((b) => b.id) ?? [];

    // Clean up block props
    blockIds.forEach((id) => delete state.blockProps[id]);

    // Remove the section from the zone
    state.zones[zone] = state.zones[zone].filter((s) => s.id !== sectionId);

    // Clean up section props
    delete state.sectionProps[sectionId];

    // Deselect if active
    if (state.active === sectionId) state.active = null;
  });
};

export const toggleSectionHidden = (zone: ZoneKey, sectionId: string) => {
  useBuilderStore.setState((state) => {
    const section = state.zones[zone].find((s) => s.id === sectionId);
    if (section) section.hidden = !section.hidden;
  });
};

export const moveSection = (zone: ZoneKey, from: number, to: number) => {
  if (from === to) return;
  useBuilderStore.setState((state) => {
    const list = state.zones[zone];
    if (from < 0 || from >= list.length) return;
    const [moved] = list.splice(from, 1);
    const clamped = Math.max(0, Math.min(to, list.length));
    list.splice(clamped, 0, moved);
  });
};

// ─── Block operations ────────────────━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const addBlock = (zone: ZoneKey, sectionId: string, kind: BlockKind) => {
  const { block, props } = createBlockInstance(kind);
  useBuilderStore.setState((state) => {
    const section = state.zones[zone].find((s) => s.id === sectionId);
    if (!section) return;
    section.blocks.push(block);
    state.blockProps[block.id] = props;
    state.activeBlockId = block.id;
    state.active = null;
  });
};

export const removeBlock = (zone: ZoneKey, sectionId: string, blockId: string) => {
  useBuilderStore.setState((state) => {
    const section = state.zones[zone].find((s) => s.id === sectionId);
    if (!section) return;
    section.blocks = section.blocks.filter((b) => b.id !== blockId);
    delete state.blockProps[blockId];
    if (state.activeBlockId === blockId) state.activeBlockId = null;
  });
};

export const moveBlock = (zone: ZoneKey, sectionId: string, from: number, to: number) => {
  if (from === to) return;
  useBuilderStore.setState((state) => {
    const section = state.zones[zone].find((s) => s.id === sectionId);
    if (!section) return;
    const list = section.blocks;
    if (from < 0 || from >= list.length) return;
    const [moved] = list.splice(from, 1);
    const clamped = Math.max(0, Math.min(to, list.length));
    list.splice(clamped, 0, moved);
  });
};

export const moveBlockBetween = (
  zone: ZoneKey,
  fromSectionId: string,
  fromIndex: number,
  toSectionId: string,
  toIndex: number,
) => {
  useBuilderStore.setState((state) => {
    if (fromSectionId === toSectionId) {
      const section = state.zones[zone].find((s) => s.id === fromSectionId);
      if (!section) return;
      const list = section.blocks;
      if (fromIndex < 0 || fromIndex >= list.length) return;
      if (fromIndex === toIndex) return;
      const [moved] = list.splice(fromIndex, 1);
      const clamped = Math.max(0, Math.min(toIndex, list.length));
      list.splice(clamped, 0, moved);
      return;
    }
    const fromSection = state.zones[zone].find((s) => s.id === fromSectionId);
    const toSection = state.zones[zone].find((s) => s.id === toSectionId);
    if (!fromSection || !toSection) return;
    const moved = fromSection.blocks[fromIndex];
    if (!moved) return;
    fromSection.blocks.splice(fromIndex, 1);
    const clamped = Math.max(0, Math.min(toIndex, toSection.blocks.length));
    toSection.blocks.splice(clamped, 0, moved);
  });
};
