import { memo, type ReactNode } from "react";
import { ActiveLabelChip } from "../shared/ActiveLabelChip";
import { selectableSectionClass } from "../shared/block-wrapper-styles";
import { AnimatedCanvasSection } from "@/components/BuilderMotion";
import type { NodeProps } from "@/features/builder/store";

type SelectableSectionProps = {
  id: string;
  label: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  children: ReactNode;
  className?: string;
  props?: Partial<NodeProps>;
};

export const SelectableSection = memo(function SelectableSection({
  id,
  label,
  isActive,
  onSelect,
  children,
  className = "",
  props = {},
}: SelectableSectionProps) {
  const {
    bgColor,
    bgImage,
    bgOpacity,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    borderRadius,
    borderWidth,
    borderColor,
    borderStyle,
    boxShadow,
    maxWidth,
    customCss,
  } = props;

  const resolvedBoxShadow =
    boxShadow === "sm"
      ? "0 1px 2px 0 rgb(0 0 0 / 0.05)"
      : boxShadow === "md"
        ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        : boxShadow === "lg"
          ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
          : boxShadow === "xl"
            ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            : undefined;

  return (
    <AnimatedCanvasSection
      id={`section-${id}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      className={`${selectableSectionClass(isActive)} ${className} relative overflow-hidden`}
      style={{
        backgroundColor: bgColor || undefined,
        paddingTop: paddingTop !== undefined ? `${paddingTop}px` : undefined,
        paddingRight: paddingRight !== undefined ? `${paddingRight}px` : undefined,
        paddingBottom: paddingBottom !== undefined ? `${paddingBottom}px` : undefined,
        paddingLeft: paddingLeft !== undefined ? `${paddingLeft}px` : undefined,
        marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
        marginRight: marginRight !== undefined ? `${marginRight}px` : undefined,
        marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
        marginLeft: marginLeft !== undefined ? `${marginLeft}px` : undefined,
        borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
        borderWidth: borderWidth !== undefined ? `${borderWidth}px` : undefined,
        borderColor: borderColor || undefined,
        borderStyle: borderStyle && borderStyle !== "none" ? borderStyle : undefined,
        boxShadow: resolvedBoxShadow,
      }}
    >
      {/* Absolute background image layer with opacity */}
      {bgImage && (
        <div
          className="absolute inset-0 pointer-events-none bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            opacity: bgOpacity !== undefined ? bgOpacity / 100 : 1,
            zIndex: 0,
          }}
        />
      )}

      {/* Scoped CSS Injector */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          #section-${id} > div:not(.pointer-events-none),
          #section-${id} > div > div:not(.pointer-events-none) {
            ${bgColor || bgImage ? "background: transparent !important; background-image: none !important;" : ""}
          }
          #section-${id} > div:not(.pointer-events-none) {
            ${paddingTop !== undefined ? "padding-top: 0 !important;" : ""}
            ${paddingBottom !== undefined ? "padding-bottom: 0 !important;" : ""}
            ${paddingLeft !== undefined ? "padding-left: 0 !important;" : ""}
            ${paddingRight !== undefined ? "padding-right: 0 !important;" : ""}
          }
          #section-${id} .max-w-6xl,
          #section-${id} .max-w-2xl,
          #section-${id} .max-w-4xl,
          #section-${id} .max-w-5xl,
          #section-${id} [class*="max-w-"] {
            ${maxWidth !== undefined && maxWidth !== "none" ? `max-width: ${maxWidth} !important;` : ""}
          }
          ${customCss ? `#section-${id} { ${customCss} }` : ""}
        `,
        }}
      />

      {/* Content wrapper for active states and children */}
      <div
        className="relative z-10"
        style={{
          maxWidth: maxWidth && maxWidth !== "none" ? maxWidth : undefined,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {isActive ? <ActiveLabelChip label={label} /> : null}
        {children}
      </div>
    </AnimatedCanvasSection>
  );
});
