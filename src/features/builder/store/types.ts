import type { NodeId, Viewport } from "@/features/builder/lib/builder-types"; 
import { BlockKind } from "../components/library/blocks/block-definitions";

/** Section template id (same union as legacy `NodeId`). */
export type SectionKind = NodeId;
export type { NodeId, Viewport, BlockKind };

export type ZoneKey = "header" | "template" | "footer";

export const ZONE_KEYS: ZoneKey[] = ["header", "template", "footer"];

export interface FlexNode {
  id: string;
  direction?: "row" | "column";
  sizes?: number[];
  children?: FlexNode[];
  blocks?: BlockItem[];
  alignX?: "start" | "center" | "end";
  alignY?: "start" | "center" | "end";
}

export interface FlexState {
  root: FlexNode;
  minHeight: number;
  gap?: number;
}

export interface BlockItem {
  id: string;
  label: string;
  kind: BlockKind;
  flex?: FlexState;
}

export interface SectionItem {
  id: string;
  kind: SectionKind;
  label: string;
  icon: "box" | "link";
  hidden?: boolean;
  blocks: BlockItem[];
}

export type ZoneState = Record<ZoneKey, SectionItem[]>;

export interface BlockMargin {
  t: number;
  r: number;
  b: number;
  l: number;
}

export interface NavLink {
  id: string;
  label: string;
  pageId: string;
}

export interface NodeProps {
  title: string;
  image: string;
  align?: "left" | "center" | "right";
  margin?: BlockMargin;
  links?: NavLink[];
  subtitle?: string;
  description?: string;
  rating?: number;
  price?: string;
  iconName?: string;

  // Typography
  fontSize?: number;
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  textAlign?: "left" | "center" | "right";
  textColor?: string;
  lineHeight?: string;
  letterSpacing?: string;

  // Button
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  btnSize?: "sm" | "default" | "lg";
  fullWidth?: boolean;

  // Image
  alt?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  borderRadius?: number;

  // Spacer
  spacerHeight?: number;

  // Marquee
  speed?: number;
  direction?: "left" | "right";
  marqueeLogos?: string[];

  // Logo
  logoWidth?: number;

  // Spacing & Layout
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  maxWidth?: string;
  // Explicit width/height for blocks (px)
  width?: number;
  height?: number;

  // Borders & Corner Radius
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "none";

  // Shadows
  boxShadow?: "none" | "sm" | "md" | "lg" | "xl";

  // Section-level background
  bgColor?: string;
  bgImage?: string;
  bgOpacity?: number;

  // Custom CSS (both blocks and sections)
  customCss?: string;
}

export interface Page {
  id: string;
  label: string;
}

export type SectionPropsMap = Record<string, NodeProps>;
export type BlockPropsMap = Record<string, NodeProps>;

export interface BuilderSnapshot {
  version: 2;
  active: string | null;
  viewport: Viewport;
  zones: ZoneState;
  sectionProps: SectionPropsMap;
  blockProps: BlockPropsMap;
}

export interface ActiveFlexCell {
  containerId: string;
  cellId: string;
}

export interface BuilderState {
  // UI slice
  active: string | null;
  activeBlockId: string | null;
  activeFlexCell: ActiveFlexCell | null;
  viewport: Viewport;
  leftOpen: boolean;
  rightOpen: boolean;

  // Page slice
  pages: Page[];

  // Tree slice
  zones: ZoneState;

  // Props slice
  sectionProps: SectionPropsMap;
  blockProps: BlockPropsMap;
}
