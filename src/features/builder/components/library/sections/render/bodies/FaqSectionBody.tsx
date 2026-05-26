import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function FaqSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <BlocksContainer
          blocks={blocks}
          zone={zone}
          sectionId={sectionId}
          orientation="vertical"
          className="flex flex-col gap-3"
          emptyHint="Add Heading, Text, or FAQ Item blocks here"
        />
      </div>
    </div>
  );
}
