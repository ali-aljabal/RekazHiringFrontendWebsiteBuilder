import { ZONE_KEYS } from "@/features/builder/store";
import type { ZoneKey } from "@/features/builder/store";

export const PREVIEW_ZONE_ORDER: ZoneKey[] = ZONE_KEYS;

export const EMPTY_SECTION_PROPS = { title: "", image: "" } as const;
