export type BlockContentSize = "default" | "compact";

export type BlockContentProps = {
  title: string;
  image: string;
  fallbackLabel?: string;
  subtitle?: string;
  description?: string;
  rating?: number;
  price?: string;
  iconName?: string;
  // Typography
  fontSize?: number;
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  textAlign?: "left" | "center" | "right";
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
  // Custom CSS
  customCss?: string;
};
