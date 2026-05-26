import {
  Shield,
  Sparkles,
  Zap,
  Heart,
  Gift,
  Clock,
  Package,
  Star,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import type { LibraryBlockComponentProps } from "./types";

const IconMap: Record<string, React.ComponentType<any>> = {
  Shield,
  Sparkles,
  Zap,
  Heart,
  Gift,
  Clock,
  Package,
  Star,
  TrendingUp,
};

export function FeatureItemBlock({ title, description, iconName }: LibraryBlockComponentProps) {
  const featureTitle = title || "Premium Quality";
  const featureDesc =
    description || "Crafted from top-tier materials and engineered to last under high demand.";
  const resolvedIcon = iconName ? IconMap[iconName] : Shield;
  const IconComponent = resolvedIcon || HelpCircle;

  return (
    <div className="flex w-full gap-4 rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
        <IconComponent className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h4 className="mb-1 text-sm font-semibold leading-snug tracking-tight text-foreground">
          {featureTitle}
        </h4>
        <p className="text-xs leading-relaxed text-muted-foreground">{featureDesc}</p>
      </div>
    </div>
  );
}
