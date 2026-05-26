import { useBuilderStore } from "../store";
import type { BuilderSnapshot } from "../types";

export const exportSnapshot = (): BuilderSnapshot => {
  const { active, viewport, zones, sectionProps, blockProps } = useBuilderStore.getState();
  return {
    version: 2,
    active,
    viewport,
    zones,
    sectionProps,
    blockProps,
  };
};

export const importSnapshot = (snap: BuilderSnapshot) => {
  useBuilderStore.setState((state) => {
    state.zones = snap.zones;
    state.active = snap.active;
    state.activeBlockId = null;
    state.activeFlexCell = null;
    state.viewport = snap.viewport;
    state.sectionProps = snap.sectionProps;
    state.blockProps = snap.blockProps;
  });
};
