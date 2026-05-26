import type { CSSProperties } from "react";

type BlockMargin = { t?: number; r?: number; b?: number; l?: number };

export function blockWrapperStyle(props: any = {}): CSSProperties {
  const {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    margin,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    align,
    textAlign,
    textColor,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    bgColor,
    borderRadius,
    borderWidth,
    borderColor,
    borderStyle,
    boxShadow,
    maxWidth,
  } = props;

  const resolvedMarginTop =
    marginTop !== undefined
      ? `${marginTop}px`
      : margin?.t !== undefined
        ? `${margin.t}px`
        : undefined;
  const resolvedMarginRight =
    marginRight !== undefined
      ? `${marginRight}px`
      : margin?.r !== undefined
        ? `${margin.r}px`
        : undefined;
  const resolvedMarginBottom =
    marginBottom !== undefined
      ? `${marginBottom}px`
      : margin?.b !== undefined
        ? `${margin.b}px`
        : undefined;
  const resolvedMarginLeft =
    marginLeft !== undefined
      ? `${marginLeft}px`
      : margin?.l !== undefined
        ? `${margin.l}px`
        : undefined;

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

  return {
    marginTop: resolvedMarginTop,
    marginRight: resolvedMarginRight,
    marginBottom: resolvedMarginBottom,
    marginLeft: resolvedMarginLeft,
    paddingTop: paddingTop !== undefined ? `${paddingTop}px` : undefined,
    paddingRight: paddingRight !== undefined ? `${paddingRight}px` : undefined,
    paddingBottom: paddingBottom !== undefined ? `${paddingBottom}px` : undefined,
    paddingLeft: paddingLeft !== undefined ? `${paddingLeft}px` : undefined,
    textAlign: (textAlign || align) as CSSProperties["textAlign"],
    color: textColor || undefined,
    fontSize: fontSize !== undefined ? `${fontSize}px` : undefined,
    fontWeight: fontWeight || undefined,
    lineHeight: lineHeight || undefined,
    letterSpacing: letterSpacing || undefined,
    backgroundColor: bgColor || undefined,
    borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
    borderWidth: borderWidth !== undefined ? `${borderWidth}px` : undefined,
    borderColor: borderColor || undefined,
    borderStyle: borderStyle && borderStyle !== "none" ? borderStyle : undefined,
    boxShadow: resolvedBoxShadow,
    maxWidth: maxWidth || undefined,
    width: typeof (props as any).width === "number" ? `${(props as any).width}px` : undefined,
    height: typeof (props as any).height === "number" ? `${(props as any).height}px` : undefined,
  };
}

export const selectableBlockClass = (isActive: boolean) =>
  `relative cursor-pointer rounded-sm transition-all duration-150 ease-out ${
    isActive
      ? "outline outline-[1.5px] outline-blue-600 outline-offset-2"
      : "hover:outline hover:outline-[1px] hover:outline-blue-300 hover:outline-offset-2"
  }`;

export const selectableSectionClass = (isActive: boolean) =>
  `relative cursor-pointer transition-all duration-150 ease-out ${
    isActive
      ? "outline outline-[1.5px] outline-blue-600 outline-offset-[-1px]"
      : "hover:outline hover:outline-[1px] hover:outline-blue-300 hover:outline-offset-[-1px]"
  }`;
