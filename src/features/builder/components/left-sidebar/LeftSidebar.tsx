import { useCallback, useState } from "react";
import { useBuilderStore, addSection, setLeftOpen } from "@/features/builder/store";
import type { SectionKind, ZoneKey } from "@/features/builder/store";
import type { SectionDefinition } from "@/features/builder/components/library/sections";
import {
  AnimatedBottomSheet,
  AnimatedFade,
  AnimatedLeftPanel,
  BuilderAnimatePresence,
} from "@/components/BuilderMotion";
import { LeftSidebarPanels } from "./LeftSidebarPanels";

export function LeftSidebar() {
  const leftOpen = useBuilderStore((s) => s.leftOpen);
  const [drawerZone, setDrawerZone] = useState<ZoneKey | null>(null);

  const toggleSectionsDrawer = useCallback((zone: ZoneKey) => {
    setDrawerZone((current) => (current === zone ? null : zone));
  }, []);

  const appendSection = useCallback(
    (item: SectionDefinition) => {
      if (!drawerZone) return;
      addSection(drawerZone, item.kind as SectionKind);
      setDrawerZone(null);
    },
    [addSection, drawerZone],
  );

  const panels = (
    <LeftSidebarPanels
      drawerZone={drawerZone}
      onToggleDrawer={toggleSectionsDrawer}
      onCloseDrawer={() => setDrawerZone(null)}
      onPickSection={appendSection}
    />
  );

  return (
    <>
      <AnimatedLeftPanel className="hidden shrink-0 border-r border-slate-100 md:flex">
        {panels}
      </AnimatedLeftPanel>

      <BuilderAnimatePresence>
        {leftOpen ? (
          <AnimatedFade className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setLeftOpen(false)}
              aria-label="Close sidebar"
            />
            <AnimatedBottomSheet className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white shadow-2xl">
              <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-200" aria-hidden />
              <div className="flex h-[80vh]">{panels}</div>
            </AnimatedBottomSheet>
          </AnimatedFade>
        ) : null}
      </BuilderAnimatePresence>
    </>
  );
}
