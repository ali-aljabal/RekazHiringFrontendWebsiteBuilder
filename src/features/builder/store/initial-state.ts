import { createSectionInstance, createBlockInstance } from "@/features/builder/lib/builder-schemas";
import { uid, resetUidCounter } from "@/features/builder/lib/builder-uid";
import type { NodeProps, SectionItem, ZoneKey } from "./types";
import type { BlockPropsMap, SectionPropsMap, ZoneState } from "./types";

export interface BuilderInitialState {
  zones: ZoneState;
  sectionProps: SectionPropsMap;
  blockProps: BlockPropsMap;
}

export function buildInitialState(): BuilderInitialState {
  resetUidCounter();
  const sectionProps: SectionPropsMap = {};
  const blockProps: BlockPropsMap = {};
  const zones: ZoneState = { header: [], template: [], footer: [] };

  const spawn = (
    zone: ZoneKey,
    kind: Parameters<typeof createSectionInstance>[0],
    fixedId?: string,
    sectionOverrides?: Partial<NodeProps>,
    blockOverridesList?: Array<Partial<NodeProps> | null>,
  ): SectionItem => {
    const { section, props, blockProps: bps } = createSectionInstance(kind, fixedId);

    sectionProps[section.id] = { ...props, ...sectionOverrides };

    const blockIds = section.blocks.map((b) => b.id);
    blockIds.forEach((id, i) => {
      blockProps[id] = {
        ...bps[id],
        ...(blockOverridesList?.[i] ?? {}),
      };
    });

    zones[zone].push(section);
    return section;
  };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * HEADER ZONE
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  spawn(
    "header",
    "announcement",
    "announcement",
    {
      title: "Free shipping on orders over $75 · Use code AURA15 for 15% off your first order",
      bgColor: "#ffff",
      paddingTop: 10,
      paddingBottom: 10,
    },
    [
      {
        title: "🎁 Free shipping on orders over $75 · Use code AURA15 for 15% off your first order",
        textAlign: "center",
        fontSize: 12,
        textColor: "#e2d9cc",
      },
    ],
  );

  spawn(
    "header",
    "header",
    "header",
    {
      title: "Aura",
      links: [
        { id: uid("nav"), label: "New Arrivals", pageId: "home" },
        { id: uid("nav"), label: "Shop All", pageId: "home" },
        { id: uid("nav"), label: "Collections", pageId: "home" },
        { id: uid("nav"), label: "About", pageId: "about" },
        { id: uid("nav"), label: "Contact", pageId: "contact" },
      ],
    },
    [{ title: "Aura", logoWidth: 110 }],
  );

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * TEMPLATE ZONE
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  // 1 ── Hero
  spawn(
    "template",
    "hero",
    "hero",
    {
      title: "Hero",
      bgImage: "https://i.pinimg.com/1200x/a6/68/f6/a668f6f6dbc11a1e031d3b98832e8aec.jpg",
      bgOpacity: 40,
      bgColor: "#0f0e0d",
      paddingTop: 140,
      paddingBottom: 140,
      maxWidth: "1200px",
    },
    [
     
      // subtitle

      
    ],
  );

  // 2 ── Marquee
  {
    const { section, props, blockProps: bps } = createSectionInstance("row-1");
    sectionProps[section.id] = {
      ...props,
      bgColor: "#ffff",
      paddingTop: 16,
      paddingBottom: 16,
    };
    const marqueeCreated = createBlockInstance("marquee");
    blockProps[marqueeCreated.block.id] = {
      ...marqueeCreated.props,
      title:
        "Free Shipping Over $75 · New Arrivals Every Week · Sustainably Sourced · Made to Last · Join 50,000+ Happy Customers",
      speed: 2,
      direction: "left",
      textColor: "#c9b99a",
      fontSize: 14,
      paddingTop: 4,
      paddingBottom: 4,
    };
    section.blocks = [marqueeCreated.block];
    zones.template.push(section);
  }

  // 3 ── Features / Benefits
  spawn(
    "template",
    "features",
    undefined,
    {
      title: "Why Choose Aura",
      bgColor: "#fafaf8",
      paddingTop: 100,
      paddingBottom: 100,
      maxWidth: "1200px",
    },
    [
      // heading
      {
        title: "Why Thousands Choose Aura",
        fontSize: 38,
        fontWeight: "bold",
        textAlign: "center",
        textColor: "#1a1714",
        letterSpacing: "-0.02em",
      },
      // feature 1
      {
        title: "Premium Materials",
        description:
          "Every piece is crafted from sustainably sourced materials that are built to last for years, not seasons.",
        iconName: "Shield",
        textAlign: "center",
      },
      // feature 2
      {
        title: "Fast & Free Delivery",
        description: "Orders over $75 ship free with express 2-day delivery available nationwide.",
        iconName: "Package",
        textAlign: "center",
      },
      // feature 3
      {
        title: "30-Day Returns",
        description:
          "Love it or return it, no questions asked. We stand behind every product we sell.",
        iconName: "Heart",
        textAlign: "center",
      },
    ],
  );

  // 4 ── Featured Collection
  spawn(
    "template",
    "featured",
    "featured",
    {
      title: "Featured Collection",
      bgColor: "#ffffff",
      paddingTop: 100,
      paddingBottom: 40,
      maxWidth: "1200px",
    },
    [
      // heading
      {
        title: "New Arrivals",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        textColor: "#1a1714",
        letterSpacing: "-0.02em",
      },
      // subtext
      {
        title: "Hand-picked pieces that landed this week — before they sell out.",
        fontSize: 17,
        textAlign: "center",
        textColor: "#6b6561",
        lineHeight: "1.65",
      },
    ],
  );

  

   

  // 8 ── Testimonials
  spawn(
    "template",
    "testimonials",
    undefined,
    {
      title: "Customer Reviews",
      bgColor: "#ffffff",
      paddingTop: 100,
      paddingBottom: 100,
      maxWidth: "1200px",
    },
    [
      // heading
      {
        title: "Real People, Real Results",
        fontSize: 38,
        fontWeight: "bold",
        textAlign: "center",
        textColor: "#1a1714",
        letterSpacing: "-0.02em",
      },
      // testimonial 1
      {
        title: "Emma Thornton",
        subtitle: "Interior Designer, London",
        description:
          "I've tried dozens of home goods brands and Aura is in a league of its own. The quality is exceptional and everything arrives beautifully packaged.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      },
      // testimonial 2
      {
        title: "Marcus Oyelaran",
        subtitle: "Verified Buyer",
        description:
          "The Umber Vase is even more stunning in person than in photos. Arrived in perfect condition and looks incredible on my sideboard.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      },
      // testimonial 3
      {
        title: "Sofia Andersson",
        subtitle: "Lifestyle Blogger",
        description:
          "My Aura linen throw has been washed 30+ times and still looks and feels brand new. The attention to detail in everything is just unmatched.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
      },
    ],
  );

  // 9 ── Image Banner
  spawn(
    "template",
    "image-banner",
    undefined,
    {
      title: "Summer Collection",
      bgImage:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&auto=format&fit=crop&q=80",
      bgOpacity: 45,
      paddingTop: 120,
      paddingBottom: 120,
      maxWidth: "1200px",
    },
    [
      // heading
      {
        title: "The Summer Living Edit",
        fontSize: 48,
        fontWeight: "extrabold",
        textAlign: "center",
        textColor: "#ffffff",
        letterSpacing: "-0.025em",
      },
      // subtext
      {
        title:
          "Breezy textures, warm tones, and open-air pieces to make every day feel like a retreat.",
        fontSize: 18,
        textAlign: "center",
        textColor: "#ffffff",
        lineHeight: "1.75",
      },
      // button
      {
        title: "Explore the Edit",
        variant: "outline",
        btnSize: "lg",
        textAlign: "center",
      },
    ],
  );

  // 10 ── Newsletter Signup
  spawn(
    "template",
    "newsletter-signup",
    undefined,
    {
      title: "Stay in the Loop",
      bgColor: "#f5f0ea",
      paddingTop: 100,
      paddingBottom: 100,
      maxWidth: "560px",
    },
    [
      // heading
      {
        title: "Get 15% Off Your First Order",
        fontSize: 38,
        fontWeight: "bold",
        textAlign: "center",
        textColor: "#1a1714",
        letterSpacing: "-0.02em",
      },
      // subtext
      {
        title:
          "Join the Aura community for early access to new arrivals, exclusive member-only offers, and interior inspiration delivered straight to your inbox.",
        fontSize: 16,
        textAlign: "center",
        textColor: "#6b6561",
        lineHeight: "1.75",
      },
      // form
      {
        title: "Subscribe & Save 15%",
        image: "Enter your email address",
      },
    ],
  );

  // 11 ── FAQ
  spawn(
    "template",
    "faq",
    undefined,
    {
      title: "Frequently Asked Questions",
      bgColor: "#ffffff",
      paddingTop: 100,
      paddingBottom: 100,
      maxWidth: "760px",
    },
    [
      // heading
      {
        title: "Frequently Asked Questions",
        fontSize: 38,
        fontWeight: "bold",
        textAlign: "center",
        textColor: "#1a1714",
        letterSpacing: "-0.02em",
      },
      // faq 1
      {
        title: "How long does shipping take?",
        description:
          "Standard shipping takes 3–5 business days. Express 2-day shipping is available at checkout. Orders over $75 qualify for free standard shipping.",
      },
      // faq 2
      {
        title: "What is your returns policy?",
        description:
          "We offer hassle-free 30-day returns on all items in their original condition. Simply contact our support team and we'll arrange a prepaid return label.",
      },
      // faq 3
      {
        title: "Are your products sustainably made?",
        description:
          "Yes! All Aura products are made from sustainably sourced or recycled materials. We partner exclusively with certified ethical manufacturers.",
      },
    ],
  );

  // 12 ── CTA Banner
  spawn(
    "template",
    "cta-banner",
    undefined,
    {
      title: "Ready to get started?",
      bgColor: "#c9b99a",
      paddingTop: 100,
      paddingBottom: 100,
      maxWidth: "900px",
    },
    [
      // heading
      {
        title: "Your Home Deserves Something Special",
        fontSize: 44,
        fontWeight: "extrabold",
        textAlign: "center",
        textColor: "#1a1714",
        letterSpacing: "-0.025em",
      },
      // subtext
      {
        title:
          "From statement vases to cozy throws — every piece is waiting to find a home in yours.",
        fontSize: 18,
        textAlign: "center",
        textColor: "#3d3530",
        lineHeight: "1.7",
      },
      // button
      {
        title: "Shop All Products",
        variant: "default",
        btnSize: "lg",
        textAlign: "center",
      },
    ],
  );

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * FOOTER ZONE
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  spawn("footer", "footer", "footer", { title: "Aura" }, [
    { title: "Aura", logoWidth: 90 },
    {
      title:
        "© 2024 Aura Home & Lifestyle. All rights reserved. Made with ♥ for those who love beautiful spaces.",
      fontSize: 13,
      textColor: "#9e9189",
      textAlign: "center",
    },
  ]);

  spawn("footer", "utilities", "utilities");

  return { zones, sectionProps, blockProps };
}
