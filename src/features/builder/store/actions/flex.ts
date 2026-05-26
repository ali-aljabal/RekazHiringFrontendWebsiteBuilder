import { useBuilderStore } from "../store";
import { createBlockInstance } from "@/features/builder/lib/builder-schemas";
import { uid } from "@/features/builder/lib/builder-uid";
import { collectBlockIds, mapFlexTree, removeBlockFromFlex } from "../tree-utils";
import { ZONE_KEYS } from "../types";
import type { BlockItem, BlockKind, FlexNode, FlexState, ZoneState } from "../types";

/** Applies a transform to the FlexState of a specific container block. */
const updateFlexContainer = (
  containerBlockId: string,
  transform: (state: FlexState) => FlexState,
) => {
  useBuilderStore.setState((state) => {
    for (const zone of ZONE_KEYS) {
      for (const section of state.zones[zone]) {
        const idx = section.blocks.findIndex((b) => b.id === containerBlockId && b.flex);
        if (idx === -1) continue;
        const block = section.blocks[idx];
        section.blocks[idx] = { ...block, flex: transform(block.flex!) };
        return; // found and updated — early exit
      }
    }
  });
};

// ─── Split a leaf into two children ───────────────────────────────────
export const flexSplit = (
  containerBlockId: string,
  leafId: string,
  direction: "row" | "column",
) => {
  updateFlexContainer(containerBlockId, (state) => {
    const root = mapFlexTree(state.root, (node) => {
      if (node.id !== leafId || !node.blocks) return node;
      const leafA: FlexNode = { id: uid("flx"), blocks: node.blocks ?? [] };
      const leafB: FlexNode = { id: uid("flx"), blocks: [] };
      return { id: node.id, direction, sizes: [1, 1], children: [leafA, leafB] };
    });
    return { ...state, root };
  });
};

// ─── Resize split proportions ─────────────────────────────────────────
export const flexResize = (containerBlockId: string, splitId: string, sizes: number[]) => {
  updateFlexContainer(containerBlockId, (state) => {
    const root = mapFlexTree(state.root, (node) =>
      node.id === splitId && node.children ? { ...node, sizes } : node,
    );
    return { ...state, root };
  });
};

// ─── Minimum height ───────────────────────────────────────────────────
export const flexSetMinHeight = (containerBlockId: string, px: number) => {
  const height = Math.max(60, Math.round(px));
  updateFlexContainer(containerBlockId, (state) =>
    state.minHeight === height ? state : { ...state, minHeight: height },
  );
};

// ─── Add a new block inside a leaf ────────────────────────────────────
export const flexAddBlockToLeaf = (containerBlockId: string, leafId: string, kind: BlockKind) => {
  const { block, props } = createBlockInstance(kind);
  useBuilderStore.setState((state) => {
    state.blockProps[block.id] = props;
    state.activeBlockId = block.id;
    state.active = null;
  });
  updateFlexContainer(containerBlockId, (flexState) => {
    const root = mapFlexTree(flexState.root, (node) =>
      node.id === leafId && node.blocks ? { ...node, blocks: [...node.blocks, block] } : node,
    );
    return { ...flexState, root };
  });
};

// ─── Remove a block from a leaf ───────────────────────────────────────
export const flexRemoveBlockFromLeaf = (
  containerBlockId: string,
  leafId: string,
  childBlockId: string,
) => {
  updateFlexContainer(containerBlockId, (flexState) => {
    const root = mapFlexTree(flexState.root, (node) =>
      node.id === leafId && node.blocks
        ? { ...node, blocks: node.blocks.filter((b) => b.id !== childBlockId) }
        : node,
    );
    return { ...flexState, root };
  });
  useBuilderStore.setState((state) => {
    delete state.blockProps[childBlockId];
    if (state.activeBlockId === childBlockId) state.activeBlockId = null;
  });
};

// ─── Move an existing top-level/flex block into a leaf ────────────────
export const flexMoveExistingBlockIntoLeaf = (
  containerBlockId: string,
  leafId: string,
  sourceBlockId: string,
) => {
  if (sourceBlockId === containerBlockId) return;

  useBuilderStore.setState((state) => {
    let removed: BlockItem | null = null;
    const zones = state.zones as ZoneState;

    // Phase 1: find & remove the source block from wherever it lives
    for (const zone of ZONE_KEYS) {
      for (let si = 0; si < zones[zone].length; si++) {
        const section = zones[zone][si];
        if (removed) break;

        const idx = section.blocks.findIndex((b) => b.id === sourceBlockId);
        if (idx >= 0) {
          removed = section.blocks[idx];
          section.blocks.splice(idx, 1);
          break;
        }

        // Check inside flex containers
        for (let bi = 0; bi < section.blocks.length; bi++) {
          const block = section.blocks[bi];
          if (!block.flex) continue;
          const result = removeBlockFromFlex(block.flex.root, sourceBlockId);
          if (result.removed) {
            removed = result.removed;
            section.blocks[bi] = { ...block, flex: { ...block.flex, root: result.node } };
            break;
          }
        }
      }
      if (removed) break;
    }

    if (!removed) return;

    // Phase 2: insert into the target leaf inside the container
    const capturedRemoved = removed;
    for (const zone of ZONE_KEYS) {
      for (const section of zones[zone]) {
        const idx = section.blocks.findIndex((b) => b.id === containerBlockId && b.flex);
        if (idx === -1) continue;
        const block = section.blocks[idx];
        const root = mapFlexTree(block.flex!.root, (node) =>
          node.id === leafId && node.blocks
            ? { ...node, blocks: [...node.blocks, capturedRemoved] }
            : node,
        );
        section.blocks[idx] = { ...block, flex: { ...block.flex!, root } };
        return;
      }
    }
  });
};

// ─── Remove a cell (collapsing siblings up) ───────────────────────────
export const flexRemoveCell = (containerBlockId: string, cellId: string) => {
  const removedBlockIds: string[] = [];

  const removeFromNode = (node: FlexNode): FlexNode => {
    if (!node.children?.length) return node;
    const idx = node.children.findIndex((c) => c.id === cellId);
    if (idx >= 0) {
      collectBlockIds(node.children[idx], removedBlockIds);
      const remaining = node.children.filter((_, i) => i !== idx);
      const baseSizes = node.sizes ?? node.children.map(() => 1);
      const newSizes = baseSizes.filter((_, i) => i !== idx);
      if (remaining.length === 1) {
        return { ...remaining[0], id: node.id };
      }
      return { ...node, children: remaining, sizes: newSizes };
    }
    return { ...node, children: node.children.map(removeFromNode) };
  };

  updateFlexContainer(containerBlockId, (state) => {
    if (state.root.id === cellId) return state;
    return { ...state, root: removeFromNode(state.root) };
  });

  if (removedBlockIds.length) {
    useBuilderStore.setState((state) => {
      removedBlockIds.forEach((id) => delete state.blockProps[id]);
      if (removedBlockIds.includes(state.activeFlexCell?.cellId ?? "")) {
        state.activeFlexCell = null;
      }
    });
  }

  useBuilderStore.setState((state) => {
    if (state.activeFlexCell?.cellId === cellId) state.activeFlexCell = null;
  });
};

// ─── Gap ─────────────────────────────────────────────────────────────
export const flexSetGap = (containerBlockId: string, gap: number) => {
  const g = Math.max(0, Math.round(gap));
  updateFlexContainer(containerBlockId, (state) =>
    (state.gap ?? 0) === g ? state : { ...state, gap: g },
  );
};

// ─── Cell alignment ───────────────────────────────────────────────────
export const flexSetCellAlign = (
  containerBlockId: string,
  cellId: string,
  axis: "alignX" | "alignY",
  value: "start" | "center" | "end",
) => {
  updateFlexContainer(containerBlockId, (state) => {
    const root = mapFlexTree(state.root, (node) =>
      node.id === cellId ? { ...node, [axis]: value } : node,
    );
    return { ...state, root };
  });
};
