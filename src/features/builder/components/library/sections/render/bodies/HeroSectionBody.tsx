import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function HeroSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="relative flex w-full items-center justify-center px-6 sm:px-12">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="vertical"
        className="flex w-full max-w-3xl flex-col items-center gap-6 text-center"
        emptyHint="Add a Heading, Text, or Button block to the Hero"
      />
    </div>
  );
}
