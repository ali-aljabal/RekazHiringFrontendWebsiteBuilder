import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function FeaturedSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-6 sm:px-6">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="vertical"
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4"
        emptyHint="Add a block to this section"
      />
    </div>
  );
}
