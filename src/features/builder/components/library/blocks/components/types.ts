import type { BlockContentProps, BlockContentSize } from "../render/types";

export type LibraryBlockComponentProps = BlockContentProps & {
  size?: BlockContentSize;
  fallbackLabel?: string;
};
