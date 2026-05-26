import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Columns2,
  Columns3,
  FileImage,
  Footprints,
  GalleryHorizontalEnd,
  Grid2x2,
  LayoutTemplate,
  Megaphone,
  MessageSquare,
  Rows3,
  Settings2,
  SquareDashed,
  Mail,
  Sparkles,
  HelpCircle,
  Users,
  BarChart3,
  Grid,
  Image as ImageIcon,
} from "lucide-react"; 
import type { SectionBodyProps } from "./types";

import { AnnouncementSectionBody } from "./render/bodies/AnnouncementSectionBody";
import { HeaderSectionBody } from "./render/bodies/HeaderSectionBody";
import { HeroSectionBody } from "./render/bodies/HeroSectionBody";
import { FeaturedSectionBody } from "./render/bodies/FeaturedSectionBody";
import { FooterSectionBody } from "./render/bodies/FooterSectionBody";
import { UtilitiesSectionBody } from "./render/bodies/UtilitiesSectionBody";
import {
  BlankSectionBody,
  Cols2SectionBody,
  Cols3SectionBody,
  Row1SectionBody,
} from "./render/bodies/LayoutSectionBodies";
import { TestimonialsSectionBody } from "./render/bodies/TestimonialsSectionBody";
import { ProductHeroSectionBody } from "./render/bodies/ProductHeroSectionBody";
import { NewsletterSignupSectionBody } from "./render/bodies/NewsletterSignupSectionBody";
import { FeaturesSectionBody } from "./render/bodies/FeaturesSectionBody";
import { ImageBannerSectionBody } from "./render/bodies/ImageBannerSectionBody";
import { FaqSectionBody } from "./render/bodies/FaqSectionBody";
import { TeamSectionBody } from "./render/bodies/TeamSectionBody";
import { StatsSectionBody } from "./render/bodies/StatsSectionBody";
import { CtaBannerSectionBody } from "./render/bodies/CtaBannerSectionBody";
import { ProductGridSectionBody } from "./render/bodies/ProductGridSectionBody";

import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import type {
  BlockKind,
  SectionKind as BuilderSectionKind,
  ZoneKey as SectionZone,
} from "@/features/builder/store";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SectionDefinition = {
  kind: BuilderSectionKind;
  label: string;
  zone: SectionZone;
  icon: LucideIcon;
  nodeId?: string;
  defaultProps: {
    title: string;
    image: string;
  };
  defaultBlocks: BlockKind[];
  component: ComponentType<SectionBodyProps>;
  preview: ComponentType;
  showInPicker?: boolean;
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const SECTION_DEFINITION_LIST: SectionDefinition[] = [
  // ── Header zone ──────────────────────────────────────────────────────────
  {
    kind: "announcement",
    label: "Announcement bar",
    zone: "header",
    icon: Megaphone,
    nodeId: "announcement",
    defaultProps: { title: "Welcome to our store", image: "" },
    defaultBlocks: ["text"],
    component: AnnouncementSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
    showInPicker: false,
  },
  {
    kind: "header",
    label: "Header",
    zone: "header",
    icon: AppWindow,
    nodeId: "header",
    defaultProps: { title: "My Store", image: "" },
    defaultBlocks: ["logo"],
    component: HeaderSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },

  // ── Template zone ────────────────────────────────────────────────────────
  {
    kind: "hero",
    label: "Hero",
    zone: "template",
    icon: FileImage,
    nodeId: "hero",
    defaultProps: { title: "Hero", image: "" },
    defaultBlocks: ["heading", "text", "button"],
    component: HeroSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "featured",
    label: "Featured collection",
    zone: "template",
    icon: Grid2x2,
    nodeId: "featured",
    defaultProps: { title: "Products", image: "" },
    defaultBlocks: ["heading", "text"],
    component: FeaturedSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "testimonials",
    label: "Testimonials",
    zone: "template",
    icon: MessageSquare,
    defaultProps: { title: "Reviews", image: "" },
    defaultBlocks: ["heading", "testimonial", "testimonial", "testimonial"],
    component: TestimonialsSectionBody,
    preview: () => SectionPlaceholder({ icon: MessageSquare, label: "Testimonials" }),
  },
  {
    kind: "product-hero",
    label: "Product Hero",
    zone: "template",
    icon: FileImage,
    defaultProps: { title: "Featured Product", image: "" },
    defaultBlocks: ["product-spotlight"],
    component: ProductHeroSectionBody,
    preview: () => SectionPlaceholder({ icon: FileImage, label: "Product Hero" }),
  },
  {
    kind: "newsletter-signup",
    label: "Newsletter Signup",
    zone: "template",
    icon: Mail,
    defaultProps: { title: "Subscribe to our Newsletter", image: "" },
    defaultBlocks: ["heading", "text", "newsletter-form"],
    component: NewsletterSignupSectionBody,
    preview: () => SectionPlaceholder({ icon: Mail, label: "Newsletter Signup" }),
  },
  {
    kind: "features",
    label: "Features / Benefits",
    zone: "template",
    icon: Sparkles,
    defaultProps: { title: "Why Choose Us", image: "" },
    defaultBlocks: ["heading", "feature-item", "feature-item", "feature-item"],
    component: FeaturesSectionBody,
    preview: () => SectionPlaceholder({ icon: Sparkles, label: "Features" }),
  },
  {
    kind: "image-banner",
    label: "Image Banner",
    zone: "template",
    icon: ImageIcon,
    defaultProps: {
      title: "Summer Collection",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
    },
    defaultBlocks: ["heading", "text", "button"],
    component: ImageBannerSectionBody,
    preview: () => SectionPlaceholder({ icon: FileImage, label: "Image Banner" }),
  },
  {
    kind: "faq",
    label: "FAQ Accordion",
    zone: "template",
    icon: HelpCircle,
    defaultProps: { title: "Frequently Asked Questions", image: "" },
    defaultBlocks: ["heading", "faq-item", "faq-item", "faq-item"],
    component: FaqSectionBody,
    preview: () => SectionPlaceholder({ icon: HelpCircle, label: "FAQ Accordion" }),
  },
  {
    kind: "team",
    label: "Team / About",
    zone: "template",
    icon: Users,
    defaultProps: { title: "Meet the Team", image: "" },
    defaultBlocks: ["heading", "team-member", "team-member", "team-member"],
    component: TeamSectionBody,
    preview: () => SectionPlaceholder({ icon: Users, label: "Team / About" }),
  },
  {
    kind: "stats",
    label: "Stats / Numbers",
    zone: "template",
    icon: BarChart3,
    defaultProps: { title: "Our Achievements", image: "" },
    defaultBlocks: ["heading", "stat-item", "stat-item", "stat-item"],
    component: StatsSectionBody,
    preview: () => SectionPlaceholder({ icon: BarChart3, label: "Stats / Numbers" }),
  },
  {
    kind: "cta-banner",
    label: "CTA Banner",
    zone: "template",
    icon: Megaphone,
    defaultProps: { title: "Ready to get started?", image: "" },
    defaultBlocks: ["heading", "text", "button"],
    component: CtaBannerSectionBody,
    preview: () => SectionPlaceholder({ icon: Megaphone, label: "CTA Banner" }),
  },
  {
    kind: "product-grid",
    label: "Product Grid (Catalog)",
    zone: "template",
    icon: Grid,
    defaultProps: { title: "Browse our Catalog", image: "" },
    defaultBlocks: ["heading", "product-grid"],
    component: ProductGridSectionBody,
    preview: () => SectionPlaceholder({ icon: Grid, label: "Product Grid" }),
  },
  {
    kind: "row-1",
    label: "1-Column Row",
    zone: "template",
    icon: Rows3,
    defaultProps: { title: "Row", image: "" },
    defaultBlocks: [],
    component: Row1SectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "cols-2",
    label: "2-Column Split",
    zone: "template",
    icon: Columns2,
    defaultProps: { title: "2 Columns", image: "" },
    defaultBlocks: [],
    component: Cols2SectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "cols-3",
    label: "3-Column Grid",
    zone: "template",
    icon: Columns3,
    defaultProps: { title: "3 Columns", image: "" },
    defaultBlocks: [],
    component: Cols3SectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "blank",
    label: "Blank Section",
    zone: "template",
    icon: SquareDashed,
    nodeId: "blank",
    defaultProps: { title: "Container", image: "" },
    defaultBlocks: [],
    component: BlankSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "gallery",
    label: "Gallery",
    zone: "template",
    icon: GalleryHorizontalEnd,
    defaultProps: { title: "Gallery", image: "" },
    defaultBlocks: [],
    component: BlankSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "form",
    label: "Contact Form",
    zone: "template",
    icon: MessageSquare,
    defaultProps: { title: "Contact us", image: "" },
    defaultBlocks: [],
    component: BlankSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },

  // ── Footer zone ──────────────────────────────────────────────────────────
  {
    kind: "footer",
    label: "Footer",
    zone: "footer",
    icon: Footprints,
    nodeId: "footer",
    defaultProps: { title: "Footer", image: "" },
    defaultBlocks: ["logo", "text"],
    component: FooterSectionBody,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
  {
    kind: "utilities",
    label: "Utilities",
    zone: "footer",
    icon: Settings2,
    nodeId: "utilities",
    defaultProps: { title: "Utilities", image: "" },
    defaultBlocks: [],
    component: UtilitiesSectionBody,
    showInPicker: false,
    preview: () =>
      SectionPlaceholder({
        icon: Megaphone,
        label: "Announcement bar",
      }),
  },
];

// ─── Derived types & maps ─────────────────────────────────────────────────────

export type SectionKind = BuilderSectionKind;

/** O(1) lookup by kind. */
export const SECTION_DEFINITIONS = Object.fromEntries(
  SECTION_DEFINITION_LIST.map((d) => [d.kind, d]),
) as Record<SectionKind, SectionDefinition>;

/** kind → LucideIcon. */
export const SECTION_KIND_ICONS = Object.fromEntries(
  SECTION_DEFINITION_LIST.map((d) => [d.kind, d.icon]),
) as Record<SectionKind, LucideIcon>;

/** kind → body renderer component. */
export const SECTION_RENDER_REGISTRY = Object.fromEntries(
  SECTION_DEFINITION_LIST.map((d) => [d.kind, d.component]),
) as Record<SectionKind, ComponentType<SectionBodyProps>>;

/** Picker-visible definitions grouped by zone. */
export const SECTION_PICKER_BY_ZONE: Record<SectionZone, SectionDefinition[]> = {
  header: SECTION_DEFINITION_LIST.filter((d) => d.zone === "header" && d.showInPicker !== false),
  template: SECTION_DEFINITION_LIST.filter(
    (d) => d.zone === "template" && d.showInPicker !== false,
  ),
  footer: SECTION_DEFINITION_LIST.filter((d) => d.zone === "footer" && d.showInPicker !== false),
};
