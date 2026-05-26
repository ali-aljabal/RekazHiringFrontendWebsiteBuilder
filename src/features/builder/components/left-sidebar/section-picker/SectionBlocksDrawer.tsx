import { useMemo, useState } from "react";
import type { ZoneKey } from "@/features/builder/store";
import {
  SECTION_PICKER_BY_ZONE,
  SectionBlockCard,
  type SectionDefinition,
} from "@/features/builder/components/library/sections";
import {
  AnimatedLeftPanel,
  AnimatedSidebarItem,
  AnimatedStaggerList,
} from "@/components/BuilderMotion";
import { BUILDER_ZONES } from "../constants";
import { SidebarPanelHeader } from "../shared/SidebarPanelHeader";
import { SidebarSearchField } from "../shared/SidebarSearchField";

type SectionBlocksDrawerProps = {
  zone: ZoneKey;
  onPick: (item: SectionDefinition) => void;
  onClose: () => void;
};

export function SectionBlocksDrawer({ zone, onPick, onClose }: SectionBlocksDrawerProps) {
  const [query, setQuery] = useState("");
  const zoneLabel = BUILDER_ZONES.find((z) => z.key === zone)?.title ?? "";

  /** All picker-visible definitions for this zone, filtered by search query. */
  const filteredItems = useMemo(() => {
    const items = SECTION_PICKER_BY_ZONE[zone as ZoneKey] ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((d) => d.label.toLowerCase().includes(q));
  }, [zone, query]);

  return (
    <AnimatedLeftPanel
      className="flex w-[280px] flex-col border-l border-slate-100 bg-white"
      exit={{ opacity: 0, x: -18 }}
    >
      <SidebarPanelHeader title={zoneLabel} subtitle={`into ${zone}`} onClose={onClose} />

      <div className="border-b border-slate-100 px-3 py-2">
        <SidebarSearchField value={query} onChange={setQuery} />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filteredItems.length === 0 ? (
          <p className="px-3 py-6 text-center text-[11px] tracking-tight text-slate-400">
            No sections match your search
          </p>
        ) : (
          <AnimatedStaggerList className="grid grid-cols-2 gap-2">
            {filteredItems.map((item) => (
              <AnimatedSidebarItem key={item.kind}>
                <SectionBlockCard item={item} onSelect={onPick} />
              </AnimatedSidebarItem>
            ))}
          </AnimatedStaggerList>
        )}
      </div>
    </AnimatedLeftPanel>
  );
}
