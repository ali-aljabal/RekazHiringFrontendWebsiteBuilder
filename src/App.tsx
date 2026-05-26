"use client";

import { BuilderDndProvider } from "@/features/builder/lib/builder-dnd";
import { BuilderMotionProvider } from "./components/BuilderMotion";
import { LeftSidebar } from "./features/builder/components/left-sidebar/LeftSidebar";
import { PreviewCanvas } from "./features/builder/components/preview-canvas/PreviewCanvas";
import { RightSidebar } from "./features/builder/components/right-sidebar/RightSidebar";
import { TopBar } from "./features/builder/components/TopBar";
 

export function App() {
  return (
    <BuilderMotionProvider>
      <BuilderDndProvider>
        <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 font-sans tracking-tight text-slate-900 antialiased">
          <TopBar />
          <main className="flex min-h-0 flex-1">
            <LeftSidebar />
            <section className="min-w-0 flex-1">
              <PreviewCanvas />
            </section>
            <RightSidebar />
          </main>
        </div>
      </BuilderDndProvider>
    </BuilderMotionProvider>
  );
}
