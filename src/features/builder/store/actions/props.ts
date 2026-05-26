import { useBuilderStore } from "../store";
import type { NodeProps } from "../types";

export const updateSectionProp = (id: string, key: "title" | "image", value: string) => {
  useBuilderStore.setState((state) => {
    const cur = state.sectionProps[id] ?? { title: "", image: "" };
    if (cur[key] === value) return;
    state.sectionProps[id] = { ...cur, [key]: value };
  });
};

export const patchSectionProps = (id: string, patch: Partial<NodeProps>) => {
  useBuilderStore.setState((state) => {
    const cur = state.sectionProps[id] ?? { title: "", image: "" };
    state.sectionProps[id] = { ...cur, ...patch };
  });
};

export const updateBlockProp = (id: string, key: "title" | "image", value: string) => {
  useBuilderStore.setState((state) => {
    const cur = state.blockProps[id] ?? { title: "", image: "" };
    if (cur[key] === value) return;
    state.blockProps[id] = { ...cur, [key]: value };
  });
};

export const patchBlockProps = (id: string, patch: Partial<NodeProps>) => {
  useBuilderStore.setState((state) => {
    const cur = state.blockProps[id] ?? { title: "", image: "" };
    state.blockProps[id] = { ...cur, ...patch };
  });
};
