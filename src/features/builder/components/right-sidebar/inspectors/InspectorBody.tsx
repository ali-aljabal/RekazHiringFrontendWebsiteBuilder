import { useState } from "react";
import { BlockContentInspector } from "./BlockContentInspector";
import { FlexCellInspector } from "./FlexCellInspector";
import { FlexContainerInspector } from "./FlexContainerInspector";
import { SectionContentInspector } from "./SectionContentInspector";
import { HeaderSectionInspector } from "./HeaderSectionInspector";
import { StyleInspector } from "./StyleInspector";
import type { InspectorTarget } from "../use-inspector-target";

type InspectorBodyProps = {
  target: Exclude<InspectorTarget, { type: "none" }>;
};

export function InspectorBody({ target }: InspectorBodyProps) {
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

  if (target.type === "flex-cell") {
    return (
      <div className="flex-1 overflow-y-auto">
        <FlexCellInspector />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden h-full">
      {/* Horizontal Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-md transition-all ${
            activeTab === "content"
              ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Content
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("style")}
          className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-md transition-all ${
            activeTab === "style"
              ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Design & Style
        </button>
      </div>

      {/* Tab Panel Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "content" ? (
          <div className="space-y-4">
            {target.type === "block" && (
              <>
                <BlockContentInspector blockId={target.block.id} />
                {target.isFlexContainer && <FlexContainerInspector blockId={target.block.id} />}
              </>
            )}
            {target.type === "section" && (
              <>
                <SectionContentInspector sectionId={target.section.id} />
                {target.isHeader && <HeaderSectionInspector sectionId={target.section.id} />}
              </>
            )}
          </div>
        ) : (
          <StyleInspector
            id={target.type === "block" ? target.block.id : target.section.id}
            type={target.type === "block" ? "block" : "section"}
          />
        )}
      </div>
    </div>
  );
}
