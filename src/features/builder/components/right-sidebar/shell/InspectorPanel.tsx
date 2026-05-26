import type { ReactNode } from "react";
import { AnimatedRightSidebarItem, AnimatedStaggerList } from "@/components/BuilderMotion";
import { InspectorHeader } from "./InspectorHeader";
import { InspectorTargetChip } from "./InspectorTargetChip";

type InspectorPanelProps = {
  badge: string;
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
};

export function InspectorPanel({ badge, title, subtitle, onClose, children }: InspectorPanelProps) {
  return (
    <AnimatedStaggerList className="flex h-full flex-col bg-white">
      <AnimatedRightSidebarItem>
        <InspectorHeader badge={badge} onClose={onClose} />
      </AnimatedRightSidebarItem>
      <AnimatedRightSidebarItem>
        <InspectorTargetChip title={title} subtitle={subtitle} />
      </AnimatedRightSidebarItem>
      <AnimatedRightSidebarItem className="flex min-h-0 flex-1 flex-col">
        {children}
      </AnimatedRightSidebarItem>
    </AnimatedStaggerList>
  );
}
