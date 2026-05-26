import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function FooterSectionBody({ zone, sectionId, blocks, isMobile }: SectionBodyProps) {
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="vertical"
        className={`grid gap-4 ${isMobile ? "grid-cols-1" : "sm:grid-cols-3"}`}
        emptyHint="Add blocks to your footer"
      />
    </div>
  );
}
