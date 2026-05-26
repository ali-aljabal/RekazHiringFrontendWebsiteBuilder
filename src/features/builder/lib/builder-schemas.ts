/**
 * Re-exports from block/section libraries and shared utilities.
 * Import from here or from `@/features/builder/components/library/*` directly.
 */
export type { SectionKind } from "@/features/builder/components/library/sections/defaults";
export type { BlockSchema, CreatedBlock } from "@/features/builder/components/library/blocks/defaults";
export type { SectionSchema, CreatedSection } from "@/features/builder/components/library/sections/defaults";

export { BLOCK_DEFAULTS, createBlockInstance } from "@/features/builder/components/library/blocks/defaults";
export {
  SECTION_DEFAULTS,
  createSectionInstance,
} from "@/features/builder/components/library/sections/defaults";
export { uid, clone } from "./builder-uid";
