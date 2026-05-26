import type { ZoneKey } from "@/features/builder/store";

export const BUILDER_ZONES: { key: ZoneKey; title: string }[] = [
  { key: "header", title: "Header" },
  { key: "template", title: "Template" },
  { key: "footer", title: "Footer" },
];
