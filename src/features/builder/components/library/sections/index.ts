// ─── Definition registry (single source of truth) ────────────────────────────
export {
  SECTION_DEFINITION_LIST,
  SECTION_DEFINITIONS,
  SECTION_KIND_ICONS,
  SECTION_RENDER_REGISTRY,
  SECTION_PICKER_BY_ZONE,
  type SectionDefinition,
} from "./section-definitions";

// ─── Defaults & factory ──────────────────────────────────────────────────────
export {
  SECTION_DEFAULTS,
  createSectionInstance,
  type SectionKind,
  type SectionSchema,
  type CreatedSection,
} from "./defaults";

// ─── Rendering ────────────────────────────────────────────────────────────────
export { SectionRenderer, SectionBodyRenderer } from "./render/SectionRenderer";
export type { SectionBodyProps } from "./types";

// ─── Preview components ───────────────────────────────────────────────────────
export { SectionBlockCard } from "./preview/SectionBlockCard";

// ─── Backwards compatibility (deprecated) ─────────────────────────────────────
/** @deprecated Use SECTION_PICKER_BY_ZONE instead */
export { SECTION_PICKER_BY_ZONE as SECTION_PICKER_GROUPS } from "./section-definitions";
/** @deprecated Use SECTION_PICKER_BY_ZONE instead */
export { SECTION_PICKER_BY_ZONE as SECTION_CATALOG } from "./section-definitions";
/** @deprecated Use SectionDefinition instead */
export type { SectionDefinition as SectionCatalogCard } from "./section-definitions";
