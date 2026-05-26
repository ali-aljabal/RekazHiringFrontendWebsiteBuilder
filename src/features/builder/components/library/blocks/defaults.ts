import type { BlockItem, FlexState, NodeProps, BlockKind } from "@/features/builder/store";
import { clone, uid } from "@/features/builder/lib/builder-uid";
import { BLOCK_DEFAULTS, type BlockSchema } from "./block-definitions";

export { BLOCK_DEFAULTS, type BlockSchema };

export interface CreatedBlock {
  block: BlockItem;
  props: NodeProps;
}

export function createBlockInstance(kind: BlockKind): CreatedBlock {
  const schema = BLOCK_DEFAULTS[kind];
  const id = uid("blk");
  const block: BlockItem = { id, kind, label: schema.label };

  if (kind === "flex") {
    const flex: FlexState = {
      minHeight: 220,
      root: { id: uid("flx"), blocks: [] },
    };
    block.flex = flex;
  }

  return { block, props: clone(schema.props) };
}
