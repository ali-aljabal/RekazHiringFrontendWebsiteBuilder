import { useCallback } from "react";
import { useBuilderStore, moveSection } from "@/features/builder/store";
import type { ZoneKey } from "@/features/builder/store";
import type { SectionDefinition } from "@/features/builder/components/library/sections";
import { BuilderAnimatePresence } from "@/components/BuilderMotion";
import { SectionBlocksDrawer } from "./section-picker/SectionBlocksDrawer";
import { LayersTreePanel } from "./layers-tree/LayersTreePanel";

export function LeftSidebarPanels({
  drawerZone,
  onToggleDrawer,
  onCloseDrawer,
  onPickSection,
}: {
  drawerZone: ZoneKey | null;
  onToggleDrawer: (zone: ZoneKey) => void;
  onCloseDrawer: () => void;
  onPickSection: (item: SectionDefinition) => void;
}) {
  const zones = useBuilderStore((s) => s.zones);

  const handleReorder = useCallback(
    (zone: ZoneKey, from: number, to: number) => {
      moveSection(zone, from, to);
    },
    [moveSection],
  );

  return (
    <>
      <LayersTreePanel
        zones={zones}
        onReorder={handleReorder}
        onAddSection={onToggleDrawer}
        drawerZone={drawerZone}
      />
      <BuilderAnimatePresence>
        {drawerZone ? (
          <SectionBlocksDrawer zone={drawerZone} onPick={onPickSection} onClose={onCloseDrawer} />
        ) : null}
      </BuilderAnimatePresence>
    </>
  );
}
