import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlignLeft,
  Code2,
  FolderClosed,
  Heading,
  Image as ImageIcon,
  LayoutTemplate,
  Megaphone,
  MousePointerClick,
  MoveVertical,
  Scan,
  Type,
  Mail,
  MessageSquare,
  ShoppingBag,
  Sparkles,
  HelpCircle,
  Users,
  BarChart3,
  Grid,
} from "lucide-react";
import { ButtonBlock } from "./components/ButtonBlock";
import { GroupBlock } from "./components/GroupBlock";
import { HeadingBlock } from "./components/HeadingBlock";
import { ImageBlock } from "./components/ImageBlock";
import { JumboBlock } from "./components/JumboBlock";
import { LiquidBlock } from "./components/LiquidBlock";
import { LogoBlock } from "./components/LogoBlock";
import { MarqueeBlock } from "./components/MarqueeBlock";
import { SpacerBlock } from "./components/SpacerBlock";
import { TextBlock } from "./components/TextBlock";
import { NewsletterFormBlock } from "./components/NewsletterFormBlock";
import { TestimonialBlock } from "./components/TestimonialBlock";
import { ProductSpotlightBlock } from "./components/ProductSpotlightBlock";
import { FeatureItemBlock } from "./components/FeatureItemBlock";
import { FaqItemBlock } from "./components/FaqItemBlock";
import { TeamMemberBlock } from "./components/TeamMemberBlock";
import { StatItemBlock } from "./components/StatItemBlock";
import { ProductGridBlock } from "./components/ProductGridBlock";
import type { LibraryBlockComponentProps } from "./components/types";

export type BlockCategory = "basic" | "decorative" | "layout";

export type BlockDefaultProps = { title: string; image: string };

type CanvasBlockDefinition = {
  kind: string;
  label: string;
  category: BlockCategory;
  icon: LucideIcon;
  defaultProps: BlockDefaultProps;
  component: ComponentType<LibraryBlockComponentProps>;
  showInPicker?: boolean;
  allowInFlexLeaf?: boolean;
};

type FlexBlockDefinition = {
  kind: "flex";
  label: string;
  category: BlockCategory;
  icon: LucideIcon;
  defaultProps: BlockDefaultProps;
  component: null;
  showInPicker?: boolean;
  allowInFlexLeaf: false;
};

export type BlockDefinition = CanvasBlockDefinition | FlexBlockDefinition;

export const BLOCK_DEFINITION_LIST: BlockDefinition[] = [
  {
    kind: "button",
    label: "Button",
    category: "basic",
    icon: MousePointerClick,
    defaultProps: { title: "Shop now", image: "" },
    component: ButtonBlock,
  },
  {
    kind: "heading",
    label: "Heading",
    category: "basic",
    icon: Heading,
    defaultProps: { title: "Welcome to our store", image: "" },
    component: HeadingBlock,
  },
  {
    kind: "logo",
    label: "Logo",
    category: "basic",
    icon: Scan,
    defaultProps: { title: "Logo", image: "" },
    component: LogoBlock,
  },
  {
    kind: "text",
    label: "Text",
    category: "basic",
    icon: AlignLeft,
    defaultProps: { title: "Share something about your store.", image: "" },
    component: TextBlock,
  },
  {
    kind: "jumbo",
    label: "Jumbo text",
    category: "decorative",
    icon: Type,
    defaultProps: { title: "Big bold statement", image: "" },
    component: JumboBlock,
  },
  {
    kind: "marquee",
    label: "Marquee",
    category: "decorative",
    icon: Megaphone,
    defaultProps: { title: "Free shipping over $50 · New drop every Friday", image: "" },
    component: MarqueeBlock,
  },
  {
    kind: "group",
    label: "Group",
    category: "layout",
    icon: FolderClosed,
    defaultProps: { title: "Group", image: "" },
    component: GroupBlock,
  },
  {
    kind: "spacer",
    label: "Spacer",
    category: "layout",
    icon: MoveVertical,
    defaultProps: { title: "Spacer", image: "" },
    component: SpacerBlock,
  },
  {
    kind: "flex",
    label: "Flex Container",
    category: "layout",
    icon: LayoutTemplate,
    defaultProps: { title: "Flex Container", image: "" },
    component: null,
    allowInFlexLeaf: false,
  },
  {
    kind: "image",
    label: "Image",
    category: "basic",
    icon: ImageIcon,
    defaultProps: { title: "Image", image: "" },
    component: ImageBlock,
    showInPicker: false,
  },
  {
    kind: "liquid",
    label: "Custom Liquid",
    category: "basic",
    icon: Code2,
    defaultProps: { title: "{{ shop.name }}", image: "" },
    component: LiquidBlock,
    showInPicker: false,
  },
  {
    kind: "newsletter-form",
    label: "Newsletter Form",
    category: "basic",
    icon: Mail,
    defaultProps: { title: "Subscribe", image: "Your email address" },
    component: NewsletterFormBlock,
  },
  {
    kind: "testimonial",
    label: "Testimonial",
    category: "basic",
    icon: MessageSquare,
    defaultProps: { title: "Sarah Jenkins", image: "" },
    component: TestimonialBlock,
  },
  {
    kind: "product-spotlight",
    label: "Product Spotlight",
    category: "basic",
    icon: ShoppingBag,
    defaultProps: { title: "Premium Ergonomic Chair", image: "" },
    component: ProductSpotlightBlock,
  },
  {
    kind: "feature-item",
    label: "Feature / Benefit",
    category: "basic",
    icon: Sparkles,
    defaultProps: { title: "Premium Quality", image: "" },
    component: FeatureItemBlock,
  },
  {
    kind: "faq-item",
    label: "FAQ Item",
    category: "basic",
    icon: HelpCircle,
    defaultProps: { title: "How long does shipping take?", image: "" },
    component: FaqItemBlock,
  },
  {
    kind: "team-member",
    label: "Team Member",
    category: "basic",
    icon: Users,
    defaultProps: { title: "Alexander Cole", image: "" },
    component: TeamMemberBlock,
  },
  {
    kind: "stat-item",
    label: "Stat Item",
    category: "basic",
    icon: BarChart3,
    defaultProps: { title: "99.9%", image: "" },
    component: StatItemBlock,
  },
  {
    kind: "product-grid",
    label: "Product Grid",
    category: "basic",
    icon: Grid,
    defaultProps: { title: "Products", image: "" },
    component: ProductGridBlock,
  },
];

export type BlockKind = (typeof BLOCK_DEFINITION_LIST)[number]["kind"];

export const BLOCK_DEFINITIONS = Object.fromEntries(
  BLOCK_DEFINITION_LIST.map((definition) => [definition.kind, definition]),
) as { [K in BlockKind]: Extract<(typeof BLOCK_DEFINITION_LIST)[number], { kind: K }> };

const CATEGORY_TITLES: Record<BlockCategory, string> = {
  basic: "Basic",
  decorative: "Decorative",
  layout: "Layout",
};

const CATEGORY_ORDER: BlockCategory[] = ["basic", "decorative", "layout"];

export interface BlockSchema {
  kind: BlockKind;
  label: string;
  props: BlockDefaultProps;
}

export const BLOCK_DEFAULTS: Record<BlockKind, BlockSchema> = Object.fromEntries(
  BLOCK_DEFINITION_LIST.map((definition) => [
    definition.kind,
    {
      kind: definition.kind,
      label: definition.label,
      props: definition.defaultProps,
    },
  ]),
) as Record<BlockKind, BlockSchema>;

export const BLOCK_KIND_ICONS = Object.fromEntries(
  BLOCK_DEFINITION_LIST.map((definition) => [definition.kind, definition.icon]),
) as Record<BlockKind, LucideIcon>;

export type CanvasBlockKind = Exclude<BlockKind, "flex">;

export const BLOCK_RENDER_REGISTRY = Object.fromEntries(
  BLOCK_DEFINITION_LIST.filter(
    (
      definition,
    ): definition is typeof definition & { component: ComponentType<LibraryBlockComponentProps> } =>
      definition.component !== null,
  ).map((definition) => [definition.kind, definition.component]),
) as Record<CanvasBlockKind, ComponentType<LibraryBlockComponentProps>>;

export interface BlockPickerItem {
  kind: BlockKind;
  label: string;
}

export const BLOCK_LIBRARY_GROUPS: { title: string; items: BlockPickerItem[] }[] =
  CATEGORY_ORDER.map((category) => ({
    title: CATEGORY_TITLES[category],
    items: BLOCK_DEFINITION_LIST.filter(
      (definition) => definition.category === category && definition.showInPicker !== false,
    ).map((definition) => ({ kind: definition.kind, label: definition.label })),
  })).filter((group) => group.items.length > 0);

/** Flat list for compact pickers (e.g. flex leaf). Excludes flex containers. */
export const LEAF_BLOCK_PICKER_ITEMS: BlockPickerItem[] = BLOCK_DEFINITION_LIST.filter(
  (definition) => definition.showInPicker !== false && definition.allowInFlexLeaf !== false,
).map((definition) => ({ kind: definition.kind, label: definition.label }));
