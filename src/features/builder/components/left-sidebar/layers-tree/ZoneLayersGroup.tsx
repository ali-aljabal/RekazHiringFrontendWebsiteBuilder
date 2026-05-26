import type { RefObject } from "react";
import { Plus } from "lucide-react";
import type { BlockKind, SectionItem, ZoneKey } from "@/features/builder/store";
import { SectionTreeRow } from "./SectionTreeRow";
import { useDnd } from "@/features/builder/lib/builder-dnd";
import { TextButton } from "@/components/InlineButton";
import { AnimatedSidebarItem, AnimatedStaggerList } from "@/components/BuilderMotion";

type ZoneLayersGroupProps = {
  zoneKey: ZoneKey;
  title: string;
  items: SectionItem[];
  expanded: Record<string, boolean>;
  onToggleExpanded: (sectionId: string, next: boolean) => void;
  activeSectionId: string | null;
  drawerZone: ZoneKey | null;
  onSelect: (sectionId: string) => void;
  onRemove: (zone: ZoneKey, sectionId: string) => void;
  onToggleHidden: (zone: ZoneKey, sectionId: string) => void;
  onAddBlock: (zone: ZoneKey, sectionId: string, kind: BlockKind) => void;
  onRemoveBlock: (zone: ZoneKey, sectionId: string, blockId: string) => void;
  onAddSection: (zone: ZoneKey) => void;
};

export function ZoneLayersGroup({
  zoneKey,
  title,
  items,
  expanded,
  onToggleExpanded,
  activeSectionId,
  drawerZone,
  onSelect,
  onRemove,
  onToggleHidden,
  onAddBlock,
  onRemoveBlock,
  onAddSection,
}: ZoneLayersGroupProps) {
  const { indicator } = useDnd();
  return (
    <div className="px-2 py-1.5">
      <div className="px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </div>
      <AnimatedStaggerList className="flex flex-col gap-0.5">
        {items.map((item, index) => {
          const isActive = activeSectionId === item.id;
          const isExpanded = expanded[item.id] ?? isActive;
          return (
            <AnimatedSidebarItem key={item.id}>
              <SectionTreeRow
                item={item}
                zone={zoneKey}
                expanded={isExpanded}
                onToggleExpand={() => onToggleExpanded(item.id, !isExpanded)}
                active={isActive}
                index={index}
                dragging={
                  indicator?.kind === "section" &&
                  indicator.zone === zoneKey &&
                  indicator.index === index
                }
                isOver={
                  indicator?.kind === "section" &&
                  indicator.zone === zoneKey &&
                  indicator.index === index
                }
                onSelect={() => onSelect(item.id)}
                onRemove={() => onRemove(zoneKey, item.id)}
                onToggleHidden={() => onToggleHidden(zoneKey, item.id)}
                onAddBlock={(kind) => onAddBlock(zoneKey, item.id, kind)}
                onRemoveBlock={(blockId) => onRemoveBlock(zoneKey, item.id, blockId)}
              />
            </AnimatedSidebarItem>
          );
        })}
      </AnimatedStaggerList>

      <TextButton
        active={drawerZone === zoneKey}
        onClick={() => onAddSection(zoneKey)}
        icon={<Plus className="h-3.5 w-3.5" />}
        className="mt-1 w-full"
      >
        Add section
      </TextButton>
    </div>
  );
}
