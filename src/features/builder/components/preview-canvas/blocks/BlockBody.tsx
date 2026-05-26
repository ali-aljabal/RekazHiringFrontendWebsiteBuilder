import type { BlockKind, NodeProps } from "@/features/builder/store"; 
import { BlockContent } from "../../library/blocks";

type BlockBodyProps = NodeProps & {
  kind: BlockKind;
};

/** Canvas-sized block preview — delegates to shared block library renderer. */
export function BlockBody({ kind, ...props }: BlockBodyProps) {
  return <BlockContent kind={kind} size="default" {...props} />;
}
