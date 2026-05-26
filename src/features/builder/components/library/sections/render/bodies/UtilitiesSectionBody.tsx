import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function UtilitiesSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-2.5 sm:px-6 sm:py-3">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="horizontal"
        className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground"
        emptyHint="Add utility links (privacy, terms, …)"
      />
    </div>
  );
}
