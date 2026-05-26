import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function AnnouncementSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-3 py-1.5 sm:px-4 sm:py-2">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="horizontal"
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-muted-foreground"
        emptyHint="Add a block to this announcement bar"
      />
    </div>
  );
}
