import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function CtaBannerSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <BlocksContainer
          blocks={blocks}
          zone={zone}
          sectionId={sectionId}
          orientation="vertical"
          className="flex w-full flex-col items-center gap-4"
          emptyHint="Add Heading, Text, or Button blocks here"
        />
      </div>
    </div>
  );
}
