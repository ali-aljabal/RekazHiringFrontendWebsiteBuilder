import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { temporal } from "zundo";
import type { BuilderState } from "./types";
import { buildInitialState } from "./initial-state";

const initialData = buildInitialState();

const initialState: BuilderState = {
  // UI slice
  active: "header",
  activeBlockId: null,
  activeFlexCell: null,
  viewport: "desktop",
  leftOpen: false,
  rightOpen: false,

  // Page slice
  pages: [
    { id: "home", label: "Home page" },
    { id: "about", label: "About us" },
    { id: "contact", label: "Contact" },
  ],

  // Tree slice & Props slice (seeding from initial-state)
  zones: initialData.zones,
  sectionProps: initialData.sectionProps,
  blockProps: initialData.blockProps,
};

export const useBuilderStore = create<BuilderState>()(
  temporal(
    immer(() => initialState),
    {
      // Only track structural + content changes in undo history
      partialize: (state) => ({
        zones: state.zones,
        sectionProps: state.sectionProps,
        blockProps: state.blockProps,
      }),
      limit: 50,
    },
  ),
);
export type { BuilderState };
export default useBuilderStore;
