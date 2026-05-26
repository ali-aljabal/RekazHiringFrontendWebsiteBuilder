import type { FlexNode } from "@/features/builder/store";

export function findFirstFlexLeaf(node: FlexNode): FlexNode | null {
  if (!node.children) return node;

  for (const child of node.children) {
    const leaf = findFirstFlexLeaf(child);
    if (leaf) return leaf;
  }

  return null;
}

export const FLEX_ALIGN_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
} as const;
