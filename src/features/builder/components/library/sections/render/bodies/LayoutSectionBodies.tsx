import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";

export function Row1SectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-6 sm:px-6">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="vertical"
        className="flex w-full flex-col gap-3"
        emptyHint="Drop a block into this row"
      />
    </div>
  );
}

export function Cols2SectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-6 sm:px-6">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="vertical"
        className="grid gap-4 sm:grid-cols-2"
        emptyHint="Drop blocks into this 2-column layout"
      />
    </div>
  );
}

export function Cols3SectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-6 sm:px-6">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="vertical"
        className="grid gap-4 sm:grid-cols-3"
        emptyHint="Drop blocks into this 3-column layout"
      />
    </div>
  );
}

export function BlankSectionBody({ zone, sectionId, blocks }: SectionBodyProps) {
  return (
    <div className="px-4 py-6 sm:px-6">
      <BlocksContainer
        blocks={blocks}
        zone={zone}
        sectionId={sectionId}
        orientation="vertical"
        className="flex w-full flex-col gap-3"
        emptyHint="Empty container — drop blocks here"
      />
    </div>
  );
}
