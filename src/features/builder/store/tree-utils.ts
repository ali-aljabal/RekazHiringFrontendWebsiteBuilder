import type { BlockItem, BuilderSnapshot, FlexNode } from "./types";
import { ZONE_KEYS } from "./types";

export function findBlockInFlex(node: FlexNode, blockId: string): BlockItem | null {
  if (node.blocks) {
    const direct = node.blocks.find((b) => b.id === blockId);
    if (direct) return direct;

    for (const block of node.blocks) {
      if (block.flex) {
        const nested = findBlockInFlex(block.flex.root, blockId);
        if (nested) return nested;
      }
    }
    return null;
  }

  for (const child of node.children ?? []) {
    const found = findBlockInFlex(child, blockId);
    if (found) return found;
  }

  return null;
}

export function mapFlexTree(node: FlexNode, fn: (n: FlexNode) => FlexNode): FlexNode {
  const next = fn(node);
  if (next.children?.length) {
    next.children = next.children.map((child) => mapFlexTree(child, fn));
  }
  return next;
}

export function collectBlockIds(node: FlexNode, out: string[]): void {
  if (node.blocks) {
    node.blocks.forEach((block) => out.push(block.id));
  }
  (node.children ?? []).forEach((child) => collectBlockIds(child, out));
}

export function removeBlockFromFlex(
  node: FlexNode,
  blockId: string,
): { node: FlexNode; removed: BlockItem | null } {
  let removed: BlockItem | null = null;

  if (node.blocks) {
    const index = node.blocks.findIndex((b) => b.id === blockId);
    if (index >= 0) {
      removed = node.blocks[index];
      return {
        node: { ...node, blocks: node.blocks.filter((_, i) => i !== index) },
        removed,
      };
    }

    const nextBlocks = node.blocks.map((block) => {
      if (removed || !block.flex) return block;
      const result = removeBlockFromFlex(block.flex.root, blockId);
      if (result.removed) {
        removed = result.removed;
        return { ...block, flex: { ...block.flex, root: result.node } };
      }
      return block;
    });

    return { node: { ...node, blocks: nextBlocks }, removed };
  }

  const children = node.children ?? [];
  const nextChildren = children.map((child) => {
    if (removed) return child;
    const result = removeBlockFromFlex(child, blockId);
    if (result.removed) removed = result.removed;
    return result.node;
  });

  return { node: { ...node, children: nextChildren }, removed };
}

export function isValidSnapshot(value: unknown): value is BuilderSnapshot {
  if (!value || typeof value !== "object") return false;

  const snapshot = value as Record<string, unknown>;
  if (snapshot.version !== 2) return false;

  const zones = snapshot.zones as Record<string, unknown> | undefined;
  if (!zones || typeof zones !== "object") return false;

  for (const key of ZONE_KEYS) {
    if (!Array.isArray(zones[key])) return false;
  }

  return true;
}
