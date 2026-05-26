import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function ImageBannerSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center px-4 py-12 sm:min-h-[400px] sm:px-6 sm:py-16">
      <div className="relative z-10 w-full max-w-xl">
        <BlocksContainer
          blocks={blocks}
          zone={zone}
          sectionId={sectionId}
          orientation="vertical"
          className="flex flex-col items-center gap-4"
          emptyHint="Add Heading, Text, or Button blocks to overlay on the banner"
        />
      </div>
    </div>
  );
}
