import type { ReactNode } from "react";
import type { ZoneKey } from "@/features/builder/store";
import { moveSection } from "@/features/builder/store";
import { useDnd, resolveDropIndex, type DropIndicator } from "@/features/builder/lib/builder-dnd";
import { useDraggable, useDroppable } from "@dnd-kit/core";

type SectionDnDWrapperProps = {
  zone: ZoneKey;
  index: number;
  children: ReactNode;
};

export function SectionDnDWrapper({ zone, index, children }: SectionDnDWrapperProps) {
  const { sourceRef, indicator, setSource, setIndicator } = useDnd();

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({
    id: `draggable-section-${zone}-${index}`,
    data: { kind: "section", zone, index } as unknown as object,
  });
  const { setNodeRef: setDropRef } = useDroppable({ id: `section-drop-${zone}-${index}` });
  const setRefs = (node: HTMLElement | null) => {
    setDragRef(node);
    setDropRef(node);
    if (node) {
      node.dataset.zone = zone as string;
      node.dataset.index = String(index);
    }
  };
  const styleTransform = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const showBefore =
    indicator?.kind === "section" &&
    indicator.zone === zone &&
    indicator.index === index &&
    indicator.position === "before";

  const showAfter =
    indicator?.kind === "section" &&
    indicator.zone === zone &&
    indicator.index === index &&
    indicator.position === "after";

  // dnd-kit handles the drag lifecycle via the provider; we only need refs/attributes here

  return (
    <div
      ref={setRefs}
      id={`section-drop-${zone}-${index}`}
      style={styleTransform}
      className="relative"
      {...attributes}
      {...listeners}
    >
      {showBefore ? (
        <div className="pointer-events-none absolute inset-x-0 -top-px z-20 h-0.5 bg-blue-600" />
      ) : null}
      {children}
      {showAfter ? (
        <div className="pointer-events-none absolute inset-x-0 -bottom-px z-20 h-0.5 bg-blue-600" />
      ) : null}
    </div>
  );
}
