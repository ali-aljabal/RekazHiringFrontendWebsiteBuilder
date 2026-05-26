"use client";

import { useMemo } from "react";
import { useBuilderStore, findBlock, findSection } from "@/features/builder/store";
import type { BlockItem, SectionItem } from "@/features/builder/store";

export type InspectorTarget =
  | { type: "none" }
  | { type: "flex-cell"; title: string; subtitle: string; badge: string }
  | {
      type: "block";
      block: BlockItem;
      title: string;
      subtitle: string;
      badge: string;
      isFlexContainer: boolean;
    }
  | {
      type: "section";
      section: SectionItem;
      title: string;
      subtitle: string;
      badge: string;
      isHeader: boolean;
    };

export function useInspectorTarget(): InspectorTarget {
  const active = useBuilderStore((s) => s.active);
  const activeBlockId = useBuilderStore((s) => s.activeBlockId);
  const activeFlexCell = useBuilderStore((s) => s.activeFlexCell);
  const zones = useBuilderStore((s) => s.zones);

  const target = useMemo((): InspectorTarget => {
    if (activeFlexCell) {
      return {
        type: "flex-cell",
        title: "Flex cell",
        subtitle: "Inside Flex container",
        badge: "Flex cell",
      };
    }

    if (activeBlockId) {
      const state = useBuilderStore.getState();
      const blockHit = findBlock(state, activeBlockId);
      if (blockHit) {
        return {
          type: "block",
          block: blockHit.block,
          title: blockHit.block.label,
          subtitle: `Block · ${blockHit.block.kind}`,
          badge: "Block",
          isFlexContainer: blockHit.block.kind === "flex",
        };
      }
    }

    if (active) {
      const state = useBuilderStore.getState();
      const sectionHit = findSection(state, active);
      if (sectionHit) {
        return {
          type: "section",
          section: sectionHit.section,
          title: sectionHit.section.label,
          subtitle: "1 on this page",
          badge: "Selector",
          isHeader: sectionHit.section.kind === "header",
        };
      }
    }

    return { type: "none" };
  }, [active, activeBlockId, activeFlexCell, zones]);

  return target;
}

export function hasInspectorSelection(
  target: InspectorTarget,
): target is Exclude<InspectorTarget, { type: "none" }> {
  return target.type !== "none";
}
