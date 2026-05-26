import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  useBuilderStore,
  setActive,
  removeSection,
  toggleSectionHidden,
  addBlock,
  removeBlock,
} from "@/features/builder/store";
import type { ZoneKey, ZoneState } from "@/features/builder/store";
import { BUILDER_ZONES } from "../constants";
import { ZoneLayersGroup } from "./ZoneLayersGroup";

type LayersTreePanelProps = {
  zones: ZoneState;
  onReorder: (zone: ZoneKey, from: number, to: number) => void;
  onAddSection: (zone: ZoneKey) => void;
  drawerZone: ZoneKey | null;
};

export function LayersTreePanel({
  zones,
  onReorder,
  onAddSection,
  drawerZone,
}: LayersTreePanelProps) {
  const active = useBuilderStore((s) => s.active);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="flex w-[260px] flex-col bg-white">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-100 px-3">
        <span className="text-[13px] font-semibold tracking-tight text-slate-900">Home page</span>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          aria-label="Page options"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {BUILDER_ZONES.map((zone) => (
          <ZoneLayersGroup
            key={zone.key}
            zoneKey={zone.key}
            title={zone.title}
            items={zones[zone.key]}
            expanded={expanded}
            onToggleExpanded={(sectionId, next) =>
              setExpanded((prev) => ({ ...prev, [sectionId]: next }))
            }
            activeSectionId={active}
            drawerZone={drawerZone}
            onSelect={setActive}
            onRemove={removeSection}
            onToggleHidden={toggleSectionHidden}
            onAddBlock={addBlock}
            onRemoveBlock={removeBlock}
            onAddSection={onAddSection}
          />
        ))}
      </div>
    </div>
  );
}
