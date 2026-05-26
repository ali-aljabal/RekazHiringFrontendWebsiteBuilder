import type { BlockKind, FlexNode, ZoneKey } from "@/features/builder/store";
import { FlexLeaf } from "./FlexLeaf";
import { FlexSplit } from "./FlexSplit";

type FlexNodeRenderProps = {
  node: FlexNode;
  containerBlockId: string;
  zone: ZoneKey;
  isRoot: boolean;
  gap: number;
  onAddBlock: (leafId: string, kind: BlockKind) => void;
};

export function FlexNodeRender({
  node,
  containerBlockId,
  zone,
  isRoot,
  gap,
  onAddBlock,
}: FlexNodeRenderProps) {
  if (node.children?.length) {
    return (
      <FlexSplit
        node={node}
        containerBlockId={containerBlockId}
        zone={zone}
        gap={gap}
        onAddBlock={onAddBlock}
      />
    );
  }

  return (
    <FlexLeaf
      node={node}
      containerBlockId={containerBlockId}
      zone={zone}
      isRoot={isRoot}
      onAddBlock={onAddBlock}
    />
  );
}
