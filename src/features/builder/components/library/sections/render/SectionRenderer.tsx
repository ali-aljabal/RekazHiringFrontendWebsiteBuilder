import type { SectionKind } from "@/features/builder/store";
import type { SectionBodyProps } from "../types";
import { SECTION_RENDER_REGISTRY } from "../section-definitions";

export function SectionRenderer({ kind, props }: { kind: SectionKind; props: SectionBodyProps }) {
  const Renderer = SECTION_RENDER_REGISTRY[kind];
  return Renderer ? <Renderer {...props} /> : null;
}

/** @deprecated Use SectionRenderer */
export const SectionBodyRenderer = SectionRenderer;
