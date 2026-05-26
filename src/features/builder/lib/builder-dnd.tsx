import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  DndContext,
  type DragStartEvent,
  type DragMoveEvent,
  type DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import type { ZoneKey } from "@/features/builder/store";
import {
  moveBlockBetween,
  flexMoveExistingBlockIntoLeaf,
  moveSection,
} from "@/features/builder/store";

export type DragSource =
  | { kind: "section"; zone: ZoneKey; index: number }
  | { kind: "block"; zone: ZoneKey; sectionId: string; index: number };

export type DropIndicator =
  | { kind: "section"; zone: ZoneKey; index: number; position: "before" | "after" }
  | {
      kind: "block";
      zone: ZoneKey;
      sectionId: string;
      index: number;
      position: "before" | "after";
    };

interface Ctx {
  sourceRef: React.MutableRefObject<DragSource | null>;
  indicator: DropIndicator | null;
  setIndicator: (i: DropIndicator | null) => void;
  setSource: (s: DragSource | null) => void;
}

const C = createContext<Ctx | null>(null);

function computePositionFromCoords(
  clientX: number,
  clientY: number,
  el: HTMLElement | null,
  orientation: "vertical" | "horizontal",
) {
  if (!el) return "after" as const;
  const rect = el.getBoundingClientRect();
  if (orientation === "vertical") return clientY < rect.top + rect.height / 2 ? "before" : "after";
  return clientX < rect.left + rect.width / 2 ? "before" : "after";
}

export function BuilderDndProvider({ children }: { children: ReactNode }) {
  const sourceRef = useRef<DragSource | null>(null);
  const [indicator, setIndicatorRaw] = useState<DropIndicator | null>(null);

  const setIndicator = useCallback((i: DropIndicator | null) => {
    setIndicatorRaw((prev) => {
      if (prev === i) return prev;
      if (!prev || !i) return i;
      if (prev.kind !== i.kind) return i;
      if (prev.kind === "section" && i.kind === "section") {
        if (prev.zone === i.zone && prev.index === i.index && prev.position === i.position)
          return prev;
      }
      if (prev.kind === "block" && i.kind === "block") {
        if (
          prev.zone === i.zone &&
          prev.sectionId === i.sectionId &&
          prev.index === i.index &&
          prev.position === i.position
        )
          return prev;
      }
      return i;
    });
  }, []);

  const setSource = useCallback((s: DragSource | null) => {
    sourceRef.current = s;
  }, []);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Prevent rendering dnd-kit context during SSR to avoid hydration id mismatches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active?.data?.current as DragSource | undefined;
    if (data) sourceRef.current = data;
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const src = sourceRef.current;
    const overId = event.over?.id as string | undefined;
    const coords = (event as any).pointerCoordinates;
    if (!src || !overId || !coords) return;

    // If dragging a block and hovering over a block element, compute before/after
    if (src.kind === "block") {
      // overId expected to be `block-<id>` or `section-<id>`
      const el = document.getElementById(String(overId));
      const position = computePositionFromCoords(coords.x, coords.y, el, "vertical");

      // read dataset from element for zone/section/index
      const zone = el?.dataset.zone as ZoneKey | undefined;
      const sectionId = el?.dataset.sectionId;
      const index = el?.dataset.index ? Number(el.dataset.index) : undefined;

      if (!zone || !sectionId || index === undefined) return;

      setIndicator({ kind: "block", zone, sectionId, index, position });
    }
    // handle section dragging indicator
    if (src.kind === "section") {
      const el = document.getElementById(String(overId));
      const position = computePositionFromCoords(coords.x, coords.y, el, "vertical");
      const zone = el?.dataset.zone as ZoneKey | undefined;
      const index = el?.dataset.index ? Number(el.dataset.index) : undefined;
      if (!zone || index === undefined) return;
      setIndicator({ kind: "section", zone, index, position });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const src = sourceRef.current;
    const overId = event.over?.id as string | undefined;
    const coords = (event as any).pointerCoordinates;

    if (src && src.kind === "block") {
      if (overId) {
        const el = document.getElementById(String(overId));
        // flex leaf handling
        if (String(overId).startsWith("flex-leaf-")) {
          const containerBlockId = el?.dataset.containerBlockId;
          const leafId = el?.dataset.leafId;
          const blockId = (src as any).blockId as string | undefined;
          if (containerBlockId && leafId && blockId) {
            flexMoveExistingBlockIntoLeaf(containerBlockId, leafId, blockId);
          }
        }

        const zone = el?.dataset.zone as ZoneKey | undefined;
        const sectionId = el?.dataset.sectionId;
        const index = el?.dataset.index ? Number(el.dataset.index) : undefined;

        if (zone && sectionId && index !== undefined) {
          const position = computePositionFromCoords(
            coords?.x ?? 0,
            coords?.y ?? 0,
            el,
            "vertical",
          );
          const baseTo = position === "before" ? index : index + 1;
          const to =
            src.sectionId === sectionId ? (src.index < baseTo ? baseTo - 1 : baseTo) : baseTo;
          moveBlockBetween(zone, src.sectionId, src.index, sectionId, to);
        }
      }
    }

    // handle section drops
    if (src && src.kind === "section") {
      if (overId) {
        const el = document.getElementById(String(overId));
        const zone = el?.dataset.zone as ZoneKey | undefined;
        const index = el?.dataset.index ? Number(el.dataset.index) : undefined;
        if (zone && index !== undefined) {
          const position = computePositionFromCoords(
            coords?.x ?? 0,
            coords?.y ?? 0,
            el,
            "vertical",
          );
          const baseTo = position === "before" ? index : index + 1;
          const to = src.index < baseTo ? baseTo - 1 : baseTo;
          moveSection(zone, src.index, to);
        }
      }
    }

    // clear
    sourceRef.current = null;
    setIndicatorRaw(null);
  };

  return (
    <C.Provider value={{ sourceRef, indicator, setIndicator, setSource }}>
      {mounted ? (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          {children}
        </DndContext>
      ) : (
        <>{children}</>
      )}
    </C.Provider>
  );
}

export function useDnd() {
  const c = useContext(C);
  if (!c) throw new Error("useDnd must be used inside BuilderDndProvider");
  return c;
}

/** Translate a (from, indicator) pair into the final destination index. */
export function resolveDropIndex(
  from: number,
  indicatorIndex: number,
  position: "before" | "after",
) {
  let to = position === "before" ? indicatorIndex : indicatorIndex + 1;
  if (from < to) to -= 1;
  return to;
}
