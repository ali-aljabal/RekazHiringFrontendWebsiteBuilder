export type { SectionBodyProps } from "@/features/builder/components/library/sections";

export type DropOrientation = "vertical" | "horizontal";

export type BlockViewProps = {
  title: string;
  image: string;
  subtitle?: string;
  description?: string;
  rating?: number;
  price?: string;
  iconName?: string;
};
