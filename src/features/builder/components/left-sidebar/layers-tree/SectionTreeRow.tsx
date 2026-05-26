import { useState } from "react";
import type { BlockKind, SectionItem, ZoneKey } from "@/features/builder/store";
import { BlockTreeRow } from "./BlockTreeRow";
import { TreeRowIconButton } from "./TreeRowIconButton";
import { TreeExpandButton } from "@/components/TreeExpandButton";
import { Link2, Box, GripVertical, EyeOff, Eye, Trash2 } from "lucide-react";
import { AddBlockButton } from "../../library/blocks";
import { useDraggable, useDroppable } from "@dnd-kit/core";

type SectionTreeRowProps = {
  item: SectionItem;
  zone: ZoneKey;
  expanded: boolean;
  onToggleExpand: () => void;
  active: boolean;
  dragging: boolean;
  isOver: boolean;
  index: number;
  onSelect: () => void;
  onRemove: () => void;
  onToggleHidden: () => void;
  onAddBlock: (kind: BlockKind) => void;
  onRemoveBlock: (blockId: string) => void;
};

export function SectionTreeRow({
  item,
  zone,
  expanded,
  onToggleExpand,
  active,
  dragging,
  isOver,
  index,
  onSelect,
  onRemove,
  onToggleHidden,
  onAddBlock,
  onRemoveBlock,
}: SectionTreeRowProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const blocks = item.blocks ?? [];
  const hidden = !!item.hidden;
  const Icon = item.icon === "link" ? Link2 : Box;

  const safeIndex = Number.isFinite(index) ? index : 0;

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({
    id: `draggable-section-tree-${zone}-${item.id}`,
    data: { kind: "section", zone, index: safeIndex } as unknown as object,
  });
  const { setNodeRef: setDropRef } = useDroppable({ id: `section-tree-${zone}-${safeIndex}` });
  // We want the whole row to be droppable, but only the small grip to be the drag handle.
  const setRefs = (node: HTMLElement | null) => {
    setDropRef(node);
    if (node) {
      node.dataset.zone = zone as string;
      node.dataset.index = String(safeIndex);
    }
  };
  const setDragHandleRef = (node: HTMLElement | null) => {
    setDragRef(node);
  };
  const styleTransform = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div className="flex flex-col">
      <div
        ref={setRefs}
        id={`section-tree-${zone}-${index}`}
        style={styleTransform}
        onClick={onSelect}
        className={`group relative flex h-8 items-center gap-1 rounded-md pl-0.5 pr-1 text-xs tracking-tight transition-colors duration-150 ease-out ${
          active ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-50"
        } ${dragging ? "opacity-40" : ""} ${isOver ? "ring-1 ring-blue-400" : ""} ${
          hidden && !active ? "opacity-50" : ""
        }`}
        // Note: draggable attributes/listeners are applied to the small grip node only below
      >
        <TreeExpandButton
          expanded={expanded}
          active={active}
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
        />

        <span
          ref={setDragHandleRef}
          {...attributes}
          {...listeners}
          className="flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical
            className={`h-3 w-3 shrink-0 ${
              active ? "text-white/60" : "text-slate-300 group-hover:text-slate-400"
            }`}
          />
        </span>

        <Icon
          className={`h-3.5 w-3.5 shrink-0 ${active ? "text-white/90" : "text-slate-400"}`}
          strokeWidth={1.75}
        />

        <span className="truncate font-medium">{item.label}</span>

        <div
          className={`ml-auto flex items-center gap-0.5 transition-opacity ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <TreeRowIconButton
            active={active}
            title={hidden ? "Show in preview" : "Hide from preview"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleHidden();
            }}
          >
            {hidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </TreeRowIconButton>
          <TreeRowIconButton
            active={active}
            title="Remove section"
            dangerOnHover
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </TreeRowIconButton>
        </div>
      </div>

      {expanded ? (
        <div className="ml-5 mt-0.5 flex flex-col gap-0.5 border-l border-slate-100 pl-2">
          <AddBlockButton
            open={pickerOpen}
            onToggle={() => setPickerOpen((v) => !v)}
            onPick={(kind) => {
              onAddBlock(kind);
              setPickerOpen(false);
            }}
            onClose={() => setPickerOpen(false)}
          />
          {blocks.map((block, blockIndex) => (
            <BlockTreeRow
              key={block.id}
              block={block}
              zone={zone}
              sectionId={item.id}
              index={blockIndex}
              onRemove={() => onRemoveBlock(block.id)}
            />
          ))}
          {blocks.length === 0 && !pickerOpen ? (
            <p className="px-1.5 py-1 text-[10px] italic tracking-tight text-slate-400">
              No blocks
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
