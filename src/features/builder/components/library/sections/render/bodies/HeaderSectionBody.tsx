import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { BlocksContainer } from "@/features/builder/components/preview-canvas/blocks/BlocksContainer";
import type { SectionBodyProps } from "../../types";
import { HeaderNavLinks } from "../HeaderNavLinks";

export function HeaderSectionBody({ zone, sectionId, blocks, isMobile }: SectionBodyProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2.5 sm:px-4 sm:py-3">
      {isMobile ? (
        <>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Menu className="h-4 w-4" />
            <Search className="h-4 w-4" />
          </div>
          <BlocksContainer
            blocks={blocks}
            zone={zone}
            sectionId={sectionId}
            orientation="horizontal"
            className="flex min-w-0 flex-1 items-center justify-center gap-2"
            emptyHint="Add a block"
          />
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <ShoppingBag className="h-4 w-4" />
          </div>
        </>
      ) : (
        <>
          <div className="flex min-w-0 items-center gap-6">
            <BlocksContainer
              blocks={blocks}
              zone={zone}
              sectionId={sectionId}
              orientation="horizontal"
              className="flex items-center gap-3"
              emptyHint="Add a block"
            />
            <nav className="hidden items-center gap-4 sm:flex">
              <HeaderNavLinks sectionId={sectionId} />
            </nav>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Search className="h-4 w-4" />
            <User className="h-4 w-4" />
            <ShoppingBag className="h-4 w-4" />
          </div>
        </>
      )}
    </div>
  );
}
