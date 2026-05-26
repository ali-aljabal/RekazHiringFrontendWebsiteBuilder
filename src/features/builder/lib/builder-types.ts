export type NodeId =
  | "announcement"
  | "header"
  | "hero"
  | "featured"
  | "footer"
  | "utilities"
  | "row-1"
  | "cols-2"
  | "cols-3"
  | "blank"
  | "gallery"
  | "form"
  | "newsletter"
  | "testimonials"
  | "product-hero"
  | "newsletter-signup"
  | "features"
  | "image-banner"
  | "faq"
  | "team"
  | "stats"
  | "cta-banner"
  | "product-grid";

export type Viewport = "desktop" | "mobile";

export interface TreeItem {
  id: NodeId;
  label: string;
  icon: "box" | "link";
}

export interface TreeGroup {
  title: string;
  items: TreeItem[];
}

export const TREE: TreeGroup[] = [
  {
    title: "Header",
    items: [
      { id: "announcement", label: "Announcement bar", icon: "box" },
      { id: "header", label: "Header", icon: "box" },
    ],
  },
  {
    title: "Template",
    items: [
      { id: "hero", label: "Hero", icon: "box" },
      { id: "featured", label: "Featured collection", icon: "box" },
      { id: "testimonials", label: "Testimonials", icon: "box" },
      { id: "product-hero", label: "Product Hero", icon: "box" },
      { id: "newsletter-signup", label: "Newsletter Signup", icon: "box" },
      { id: "features", label: "Features", icon: "box" },
      { id: "image-banner", label: "Image Banner", icon: "box" },
      { id: "faq", label: "FAQ", icon: "box" },
      { id: "team", label: "Team", icon: "box" },
      { id: "stats", label: "Stats", icon: "box" },
      { id: "cta-banner", label: "CTA Banner", icon: "box" },
      { id: "product-grid", label: "Product Grid", icon: "box" },
    ],
  },
  {
    title: "Footer",
    items: [
      { id: "footer", label: "Footer", icon: "box" },
      { id: "utilities", label: "Utilities", icon: "link" },
    ],
  },
];
