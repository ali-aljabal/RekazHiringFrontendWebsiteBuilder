import type { BlockItem, ZoneKey } from "@/features/builder/store";
import { useBuilderStore, setActiveBlock } from "@/features/builder/store";
import { useDnd } from "@/features/builder/lib/builder-dnd";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ActiveLabelChip } from "../shared/ActiveLabelChip";
import { DropLine } from "../shared/DropLine";
import { blockWrapperStyle, selectableBlockClass } from "../shared/block-wrapper-styles";
import type { DropOrientation } from "../types";
import { BlockBody } from "./BlockBody";
import { FlexBlock } from "../../library/blocks";

type SelectableBlockProps = {
  block: BlockItem;
  zone: ZoneKey;
  sectionId: string;
  index: number;
  orientation: DropOrientation;
};

export function SelectableBlock({
  block,
  zone,
  sectionId,
  index,
  orientation,
}: SelectableBlockProps) {
  const isActive = useBuilderStore((s) => s.activeBlockId === block.id);
  const props = useBuilderStore((s) => s.blockProps[block.id]) ?? { title: block.label, image: "" };
  const { sourceRef, indicator, setSource, setIndicator } = useDnd();

  const matchIndicator =
    indicator?.kind === "block" &&
    indicator.zone === zone &&
    indicator.sectionId === sectionId &&
    indicator.index === index;
  const showBefore = matchIndicator && indicator.position === "before";
  const showAfter = matchIndicator && indicator.position === "after";

  if (block.kind === "flex" && block.flex) {
    return (
      <>
        {showBefore ? <DropLine orientation={orientation} /> : null}
        <div className="group w-full">
          <FlexBlock block={block} zone={zone} />
        </div>
        {showAfter ? <DropLine orientation={orientation} /> : null}
      </>
    );
  }

  // dnd-kit draggable/droppable hooks. We set the draggable id separate from droppable id.
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({
    id: `draggable-block-${block.id}`,
    data: { kind: "block", zone, sectionId, index, blockId: block.id } as unknown as object,
  });
  const { setNodeRef: setDropRef } = useDroppable({ id: `block-${block.id}` });

  // combine refs for draggable + droppable
  const setRefs = (node: HTMLElement | null) => {
    setDragRef(node);
    setDropRef(node);
    if (node) {
      node.dataset.zone = zone as string;
      node.dataset.sectionId = sectionId;
      node.dataset.index = String(index);
    }
  };

  const styleTransform = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <>
      {showBefore ? <DropLine orientation={orientation} /> : null}
      <div
        id={`block-${block.id}`}
        ref={setRefs}
        style={{ ...blockWrapperStyle(props), ...styleTransform }}
        onClick={(e) => {
          e.stopPropagation();
          setActiveBlock(block.id);
        }}
        className={selectableBlockClass(isActive)}
        {...attributes}
        {...listeners}
      >
        {isActive ? <ActiveLabelChip label={props.title || block.label} /> : null}
        {props.customCss && (
          <style
            dangerouslySetInnerHTML={{
              __html: `#block-${block.id} { ${props.customCss} }`,
            }}
          />
        )}
        <BlockBody kind={block.kind} {...props} />
      </div>
      {showAfter ? <DropLine orientation={orientation} /> : null}
    </>
  );
}
