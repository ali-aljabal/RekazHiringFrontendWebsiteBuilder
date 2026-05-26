import type { BlockItem, NodeProps, SectionItem, BlockKind } from "@/features/builder/store";
import { clone, uid } from "@/features/builder/lib/builder-uid";
import { createBlockInstance } from "../blocks/defaults";
import { SECTION_DEFINITION_LIST, type SectionKind } from "./section-definitions";

export type { SectionKind };

// ─── Derived SectionSchema & SECTION_DEFAULTS ─────────────────────────────────

export interface SectionSchema {
  kind: SectionKind;
  label: string;
  icon: "box" | "link";
  props: NodeProps;
  defaultBlocks: BlockKind[];
}

/**
 * Derived from SECTION_DEFINITION_LIST — single source of truth.
 * The `icon` field maps to "box" for all sections except "utilities" which uses "link".
 */
export const SECTION_DEFAULTS: Record<SectionKind, SectionSchema> = Object.fromEntries(
  SECTION_DEFINITION_LIST.map((d) => [
    d.kind,
    {
      kind: d.kind,
      label: d.label,
      icon: d.kind === "utilities" ? ("link" as const) : ("box" as const),
      props: { title: d.defaultProps.title, image: d.defaultProps.image },
      defaultBlocks: d.defaultBlocks,
    },
  ]),
) as Record<SectionKind, SectionSchema>;

// ─── Factory ──────────────────────────────────────────────────────────────────

export interface CreatedSection {
  section: SectionItem;
  props: NodeProps;
  blockProps: Record<string, NodeProps>;
}

export function createSectionInstance(kind: SectionKind, idOverride?: string): CreatedSection {
  const schema = SECTION_DEFAULTS[kind];
  const id = idOverride ?? uid("sec");
  const blockProps: Record<string, NodeProps> = {};
  const blocks: BlockItem[] = schema.defaultBlocks.map((bk) => {
    const created = createBlockInstance(bk);
    blockProps[created.block.id] = created.props;
    return created.block;
  });

  return {
    section: {
      id,
      kind,
      label: schema.label,
      icon: schema.icon,
      blocks,
    },
    props: clone(schema.props),
    blockProps,
  };
}
