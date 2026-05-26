"use client";

import { Plus, Trash2 } from "lucide-react";
import { useBuilderStore, patchSectionProps } from "@/features/builder/store";
import { uid } from "@/features/builder/lib/builder-schemas";
import { InspectorSection } from "../ui/InspectorSection";
import { inspectorTextInputClass } from "../ui/input-styles";

type MenuItemsInspectorProps = {
  sectionId: string;
};

export function MenuItemsInspector({ sectionId }: MenuItemsInspectorProps) {
  const rawLinks = useBuilderStore((s) => s.sectionProps[sectionId]?.links);
  const links = rawLinks ?? [];
  const pages = useBuilderStore((s) => s.pages);

  const setLinks = (next: typeof links) => patchSectionProps(sectionId, { links: next });

  const addItem = () =>
    setLinks([...links, { id: uid("lnk"), label: "New link", pageId: pages[0]?.id ?? "" }]);

  const updateItem = (id: string, patch: Partial<(typeof links)[number]>) =>
    setLinks(links.map((link) => (link.id === id ? { ...link, ...patch } : link)));

  const removeItem = (id: string) => setLinks(links.filter((link) => link.id !== id));

  return (
    <InspectorSection title="Menu Items">
      <div className="flex flex-col gap-2">
        {links.length === 0 ? (
          <p className="px-0.5 text-[10px] tracking-tight text-slate-400">
            No menu links yet. Add one below.
          </p>
        ) : null}

        {links.map((link) => (
          <div
            key={link.id}
            className="flex flex-col gap-1.5 rounded-md bg-slate-50 p-2 ring-1 ring-inset ring-slate-100"
          >
            <div className="flex items-center gap-1.5">
              <input
                value={link.label}
                onChange={(e) => updateItem(link.id, { label: e.target.value })}
                placeholder="Link label"
                className={`min-w-0 flex-1 ${inspectorTextInputClass}`}
              />
              <button
                type="button"
                onClick={() => removeItem(link.id)}
                title="Remove"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 ring-1 ring-inset ring-slate-200 hover:bg-rose-50 hover:text-rose-500 hover:ring-rose-200"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <select
              value={link.pageId}
              onChange={(e) => updateItem(link.id, { pageId: e.target.value })}
              className={inspectorTextInputClass}
            >
              {pages.length === 0 ? <option value="">No pages</option> : null}
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-1.5 rounded-md bg-blue-50 px-2 py-2 text-[11px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
        >
          <Plus className="h-3 w-3" /> Add Menu Item
        </button>
      </div>
    </InspectorSection>
  );
}
