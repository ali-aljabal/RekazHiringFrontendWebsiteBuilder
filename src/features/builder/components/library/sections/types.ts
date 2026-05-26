import type { BlockItem, ZoneKey } from "@/features/builder/store";

export type SectionBodyProps = {
  zone: ZoneKey;
  sectionId: string;
  blocks: BlockItem[];
  isMobile: boolean;
  image?: string;
};
