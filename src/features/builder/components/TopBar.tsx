import { useRef } from "react";
import {
  ChevronDown,
  Monitor,
  Smartphone,
  Undo2,
  Redo2,
  MenuIcon,
  PanelBottom,
  Download,
  Upload,
} from "lucide-react";
import {
  useBuilderStore,
  isValidSnapshot,
  exportSnapshot,
  importSnapshot,
  setViewport,
  setLeftOpen,
  setRightOpen,
  useCanUndo,
  useCanRedo,
  useUndoRedo,
  type BuilderSnapshot,
} from "@/features/builder/store";

export function TopBar() {
  const viewport = useBuilderStore((s) => s.viewport);
  const leftOpen = useBuilderStore((s) => s.leftOpen);
  const rightOpen = useBuilderStore((s) => s.rightOpen);
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const { undo, redo } = useUndoRedo();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const snap = exportSnapshot();
    const blob = new Blob([JSON.stringify(snap, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "builder-layout.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileRef.current?.click();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);
      if (!isValidSnapshot(parsed)) {
        alert("Invalid layout file: schema mismatch.");
        return;
      }
      importSnapshot(parsed as BuilderSnapshot);
    } catch {
      alert("Could not parse JSON file. Please upload a valid builder-layout.json.");
    }
  };

  return (
    <header className="relative flex h-12 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-2 tracking-tight sm:px-3">
      {/* Left */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile: toggle left panel */}
        <button
          onClick={() => setLeftOpen(!leftOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 md:hidden"
          aria-label="Toggle sections"
        >
          <MenuIcon className="h-4 w-4" />
        </button>
        <div className="hidden items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-neutral-800 hover:bg-neutral-100 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Website Builder</span>
        </div>
        <button className="hidden items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-neutral-800 hover:bg-neutral-100 md:flex">
          <span>Home page</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Center viewport toggle */}
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-md border border-neutral-200 bg-white p-0.5 sm:flex">
        <button
          onClick={() => setViewport("desktop")}
          className={`flex h-7 w-9 items-center justify-center rounded ${
            viewport === "desktop"
              ? "bg-neutral-900 text-white"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Monitor className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setViewport("mobile")}
          className={`flex h-7 w-9 items-center justify-center rounded ${
            viewport === "mobile"
              ? "bg-neutral-900 text-white"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Smartphone className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => undo()}
          disabled={!canUndo}
          className="hidden h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent sm:flex"
          aria-label="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => redo()}
          disabled={!canRedo}
          className="hidden h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent sm:flex"
          aria-label="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </button>
        <button
          onClick={handleExport}
          title="Export JSON"
          aria-label="Export JSON"
          className="hidden h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2 text-xs font-medium tracking-tight text-slate-700 transition-colors duration-150 ease-out hover:bg-slate-50 sm:flex"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Export</span>
        </button>
        <button
          onClick={handleImportClick}
          title="Import JSON"
          aria-label="Import JSON"
          className="hidden h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2 text-xs font-medium tracking-tight text-slate-700 transition-colors duration-150 ease-out hover:bg-slate-50 sm:flex"
        >
          <Upload className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Import</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={handleFile}
        />
        {/* Mobile right toggle */}
        <button
          onClick={() => setRightOpen(!rightOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 md:hidden"
          aria-label="Toggle properties"
        >
          <PanelBottom className="h-4 w-4" />
        </button>
        <button className="ml-1 h-8 rounded-md bg-blue-600 px-3.5 text-xs font-semibold text-white shadow-sm transition-colors duration-150 ease-out hover:bg-blue-700">
          Publish
        </button>
      </div>
    </header>
  );
}
