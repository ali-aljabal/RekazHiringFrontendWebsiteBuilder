import { useBuilderStore } from "../store";
import type { Viewport, ActiveFlexCell } from "../types";

export const setActive = (id: string | null) => {
  useBuilderStore.setState((state) => {
    state.active = id;
    if (id !== null) {
      state.activeBlockId = null;
      state.activeFlexCell = null;
      state.rightOpen = true;
    }
  });
};

export const setActiveBlock = (id: string | null) => {
  useBuilderStore.setState((state) => {
    state.activeBlockId = id;
    if (id !== null) {
      state.active = null;
      state.activeFlexCell = null;
      state.rightOpen = true;
    }
  });
};

export const setActiveFlexCell = (v: ActiveFlexCell | null) => {
  useBuilderStore.setState((state) => {
    state.activeFlexCell = v;
    if (v !== null) {
      state.active = null;
      state.activeBlockId = null;
      state.rightOpen = true;
    }
  });
};

export const setViewport = (v: Viewport) => {
  useBuilderStore.setState((state) => {
    state.viewport = v;
  });
};

export const setLeftOpen = (b: boolean) => {
  useBuilderStore.setState((state) => {
    state.leftOpen = b;
  });
};

export const setRightOpen = (b: boolean) => {
  useBuilderStore.setState((state) => {
    state.rightOpen = b;
  });
};
