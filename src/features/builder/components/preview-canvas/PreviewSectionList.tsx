import { useBuilderStore, useHiddenSectionIds } from "@/features/builder/store";
import { EMPTY_SECTION_PROPS, PREVIEW_ZONE_ORDER } from "./constants";
import { SectionRenderer } from "@/features/builder/components/library/sections";
import { SectionDnDWrapper } from "./sections/SectionDnDWrapper";
import { SelectableSection } from "./sections/SelectableSection";

type PreviewSectionListProps = {
  isMobile: boolean;
  activeSectionId: string | null;
  onSelectSection: (id: string) => void;
};

export function PreviewSectionList({
  isMobile,
  activeSectionId,
  onSelectSection,
}: PreviewSectionListProps) {
  const sectionProps = useBuilderStore((s) => s.sectionProps);
  const hiddenSectionIds = useHiddenSectionIds();
  const zones = useBuilderStore((s) => s.zones);

  return (
    <>
      {PREVIEW_ZONE_ORDER.map((zoneKey) =>
        zones[zoneKey].map((section, index) => {
          if (hiddenSectionIds.has(section.id)) return null;

          const props = sectionProps[section.id] ?? EMPTY_SECTION_PROPS;

          return (
            <SectionDnDWrapper key={section.id} zone={zoneKey} index={index}>
              <SelectableSection
                id={section.id}
                label={section.label}
                isActive={activeSectionId === section.id}
                onSelect={onSelectSection}
                props={props}
              >
                <SectionRenderer
                  kind={section.kind}
                  props={{
                    zone: zoneKey,
                    sectionId: section.id,
                    blocks: section.blocks,
                    isMobile,
                    image: props.image,
                  }}
                />
              </SelectableSection>
            </SectionDnDWrapper>
          );
        }),
      )}
    </>
  );
}
