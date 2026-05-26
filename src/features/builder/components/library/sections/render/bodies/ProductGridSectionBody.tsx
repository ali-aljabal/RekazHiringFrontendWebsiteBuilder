import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function ProductGridSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <BlocksContainer
          blocks={blocks}
          zone={zone}
          sectionId={sectionId}
          orientation="vertical"
          className="flex flex-col gap-6"
          emptyHint="Add Heading, Text, or Product Grid blocks here"
        />
      </div>
    </div>
  );
}
