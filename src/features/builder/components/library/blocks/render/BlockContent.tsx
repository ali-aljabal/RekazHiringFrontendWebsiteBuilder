import type { BlockKind } from "@/features/builder/store";
import { BLOCK_RENDER_REGISTRY, type CanvasBlockKind } from "./block-registry";
import type { BlockContentProps, BlockContentSize } from "./types";

type BlockContentComponentProps = BlockContentProps & {
  kind: BlockKind;
  size?: BlockContentSize;
  fallbackLabel?: string;
};

export function BlockContent(props: BlockContentComponentProps) {
  const { kind, fallbackLabel = "Block", size = "default" } = props;
  if (kind === "flex") return null;

  const Renderer = BLOCK_RENDER_REGISTRY[kind as CanvasBlockKind];
  if (!Renderer) {
    return <div className="text-[10px] text-muted-foreground">{fallbackLabel}</div>;
  }

  return <Renderer {...props} size={size} fallbackLabel={fallbackLabel} />;
}
