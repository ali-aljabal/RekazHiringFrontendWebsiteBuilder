import type { ZoneKey } from "@/features/builder/store";

/** @deprecated Use SectionDefinition from @/features/builder/components/library/sections instead */
export type { SectionDefinition as SectionBlockCard } from "@/features/builder/components/library/sections";

export interface SectionDragInfo {
  zone: ZoneKey;
  index: number;
}
