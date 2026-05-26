import type { FlexNode } from "@/features/builder/store";

export function findFlexCellNode(node: FlexNode, cellId: string): FlexNode | null {
  if (node.id === cellId) return node;

  for (const child of node.children ?? []) {
    const found = findFlexCellNode(child, cellId);
    if (found) return found;
  }

  for (const block of node.blocks ?? []) {
    if (block.flex) {
      const found = findFlexCellNode(block.flex.root, cellId);
      if (found) return found;
    }
  }

  return null;
}

export function findFlexCellParent(node: FlexNode, cellId: string): FlexNode | null {
  if (node.children?.some((child) => child.id === cellId)) return node;

  for (const child of node.children ?? []) {
    const found = findFlexCellParent(child, cellId);
    if (found) return found;
  }

  for (const block of node.blocks ?? []) {
    if (block.flex) {
      const found = findFlexCellParent(block.flex.root, cellId);
      if (found) return found;
    }
  }

  return null;
}
