"use client";

import { useBuilderStore } from "@/features/builder/store";

type HeaderNavLinksProps = {
  sectionId: string;
};

export function HeaderNavLinks({ sectionId }: HeaderNavLinksProps) {
  const rawLinks = useBuilderStore((s) => s.sectionProps[sectionId]?.links);
  const links = rawLinks ?? [];

  if (links.length === 0) {
    return <span className="text-xs italic text-muted-foreground">No menu links added yet</span>;
  }

  return (
    <>
      {links.map((link) => (
        <span key={link.id} className="text-xs text-foreground/70 hover:text-foreground">
          {link.label || "Untitled"}
        </span>
      ))}
    </>
  );
}
