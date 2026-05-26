import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function TestimonialsSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <BlocksContainer
          blocks={blocks}
          zone={zone}
          sectionId={sectionId}
          orientation="vertical"
          className="flex flex-col items-center gap-6 md:flex-row md:flex-wrap md:items-stretch md:justify-center"
          emptyHint="Add Heading, Text, or Testimonial blocks here"
        />
      </div>
    </div>
  );
}
