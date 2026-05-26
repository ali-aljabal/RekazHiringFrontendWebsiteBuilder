"use client";

import { useBuilderStore, updateSectionProp } from "@/features/builder/store";
import { TitleImageFields } from "../ui/TitleImageFields";

type SectionContentInspectorProps = {
  sectionId: string;
};

export function SectionContentInspector({ sectionId }: SectionContentInspectorProps) {
  const current = useBuilderStore((s) => s.sectionProps[sectionId]) ?? { title: "", image: "" };

  return (
    <TitleImageFields
      title={current.title}
      image={current.image}
      onTitleChange={(v) => updateSectionProp(sectionId, "title", v)}
      onImageChange={(v) => updateSectionProp(sectionId, "image", v)}
    />
  );
}
