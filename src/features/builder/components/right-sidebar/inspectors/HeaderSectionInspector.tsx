"use client";

import { useState } from "react";
import { useBuilderStore, patchSectionProps } from "@/features/builder/store";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDownToLine,
  ArrowUpToLine,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { MenuItemsInspector } from "./MenuItemsInspector";
import { IconSegmentedControl } from "../ui/IconSegmentedControl";
import { InspectorRow } from "../ui/InspectorRow";
import { InspectorSection } from "../ui/InspectorSection";
import { InspectorSelect } from "../ui/InspectorSelect";
import { InspectorToggle } from "../ui/InspectorToggle";
import { NumberField } from "../ui/NumberField";
import { SizeFieldsGrid } from "../ui/SizeFieldsGrid";
import { SpacingBox } from "../ui/SpacingBox";

type HeaderSectionInspectorProps = {
  sectionId: string;
};

export function HeaderSectionInspector({ sectionId }: HeaderSectionInspectorProps) {
  const props = useBuilderStore((s) => s.sectionProps[sectionId]);
  const [align, setAlign] = useState<"left" | "center" | "right" | "justify">("left");
  const [weight, setWeight] = useState<"bold" | "italic" | "underline">("bold");
  const [row, setRow] = useState<"top" | "bottom">("top");
  const [search, setSearch] = useState(true);
  const [country, setCountry] = useState(true);
  const [lang, setLang] = useState(true);
  const margin = {
    t: props?.marginTop ?? 0,
    r: props?.marginRight ?? 0,
    b: props?.marginBottom ?? 0,
    l: props?.marginLeft ?? 0,
  };
  const padding = {
    t: props?.paddingTop ?? 0,
    r: props?.paddingRight ?? 0,
    b: props?.paddingBottom ?? 0,
    l: props?.paddingLeft ?? 0,
  };
  const marginProp = {
    t: "marginTop",
    r: "marginRight",
    b: "marginBottom",
    l: "marginLeft",
  } as const;
  const paddingProp = {
    t: "paddingTop",
    r: "paddingRight",
    b: "paddingBottom",
    l: "paddingLeft",
  } as const;

  return (
    <>
      <MenuItemsInspector sectionId={sectionId} />

      <InspectorSection title="Layout">
        <InspectorRow label="Align">
          <IconSegmentedControl
            value={align}
            onChange={setAlign}
            options={[
              { value: "left", icon: AlignLeft, label: "Left" },
              { value: "center", icon: AlignCenter, label: "Center" },
              { value: "right", icon: AlignRight, label: "Right" },
              { value: "justify", icon: AlignJustify, label: "Justify" },
            ]}
          />
        </InspectorRow>
        <InspectorRow label="Row">
          <IconSegmentedControl
            value={row}
            onChange={setRow}
            options={[
              { value: "top", icon: ArrowUpToLine, label: "Top" },
              { value: "bottom", icon: ArrowDownToLine, label: "Bottom" },
            ]}
          />
        </InspectorRow>
        <InspectorRow label="Style">
          <IconSegmentedControl
            value={weight}
            onChange={setWeight}
            options={[
              { value: "bold", icon: Bold, label: "Bold" },
              { value: "italic", icon: Italic, label: "Italic" },
              { value: "underline", icon: Underline, label: "Underline" },
            ]}
          />
        </InspectorRow>
      </InspectorSection>

      <InspectorSection title="Spacing">
        <SpacingBox
          margin={margin}
          padding={padding}
          onChangeMargin={(side, value) =>
            patchSectionProps(sectionId, { [marginProp[side]]: value })
          }
          onChangePadding={(side, value) =>
            patchSectionProps(sectionId, { [paddingProp[side]]: value })
          }
        />
      </InspectorSection>

      <InspectorSection title="Size">
        <SizeFieldsGrid
          fields={[
            { label: "Width", value: 1280, onChange: () => {} },
            { label: "Height", value: 72, onChange: () => {} },
            { label: "Min W", value: 320, onChange: () => {} },
            { label: "Min H", value: 48, onChange: () => {} },
          ]}
        />
      </InspectorSection>

      <InspectorSection title="Search">
        <InspectorToggle label="Show icon" checked={search} onChange={setSearch} />
      </InspectorSection>

      <InspectorSection title="Localization">
        <InspectorToggle label="Country / Region" checked={country} onChange={setCountry} />
        <InspectorToggle label="Language selector" checked={lang} onChange={setLang} />
        <InspectorRow label="Font">
          <InspectorSelect value="Heading 1" />
        </InspectorRow>
      </InspectorSection>
    </>
  );
}
