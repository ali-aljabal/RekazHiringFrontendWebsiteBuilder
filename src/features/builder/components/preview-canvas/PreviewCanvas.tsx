import { useCallback } from "react";
import { useBuilderStore, setActive, setActiveBlock } from "@/features/builder/store";
import { PreviewCanvasFrame } from "./PreviewCanvasFrame";
import { PreviewSectionList } from "./PreviewSectionList";

export function PreviewCanvas() {
  const viewport = useBuilderStore((s) => s.viewport);
  const active = useBuilderStore((s) => s.active);
  const isMobile = viewport === "mobile";

  const onSelectSection = useCallback((id: string) => setActive(id), []);

  const clearSelection = useCallback(() => {
    setActive(null);
    setActiveBlock(null);
  }, []);

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <PreviewCanvasFrame
      isMobile={isMobile}
      onClearSelection={clearSelection}
      onStopPropagation={stopPropagation}
    >
      <PreviewSectionList
        isMobile={isMobile}
        activeSectionId={active}
        onSelectSection={onSelectSection}
      />
    </PreviewCanvasFrame>
  );
}
