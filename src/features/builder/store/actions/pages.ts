import { useBuilderStore } from "../store";
import { uid } from "@/features/builder/lib/builder-uid";

export const addPage = (label: string) => {
  useBuilderStore.setState((state) => {
    state.pages.push({ id: uid("page"), label: label || "Untitled page" });
  });
};

export const removePage = (id: string) => {
  useBuilderStore.setState((state) => {
    state.pages = state.pages.filter((p) => p.id !== id);
  });
};

export const renamePage = (id: string, label: string) => {
  useBuilderStore.setState((state) => {
    const page = state.pages.find((p) => p.id === id);
    if (page) page.label = label;
  });
};
