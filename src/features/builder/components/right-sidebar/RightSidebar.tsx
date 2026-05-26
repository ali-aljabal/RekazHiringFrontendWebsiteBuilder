import { useBuilderStore, setRightOpen } from "@/features/builder/store";
import {
  AnimatedBottomSheet,
  AnimatedFade,
  AnimatedRightPanel,
  BuilderAnimatePresence,
} from "@/components/BuilderMotion";
import { InspectorBody } from "./inspectors/InspectorBody";
import { InspectorPanel } from "./shell/InspectorPanel";
import { hasInspectorSelection, useInspectorTarget } from "./use-inspector-target";

function RightSidebarPanel({ onClose }: { onClose: () => void }) {
  const target = useInspectorTarget();

  if (!hasInspectorSelection(target)) return null;

  return (
    <InspectorPanel
      badge={target.badge}
      title={target.title}
      subtitle={target.subtitle}
      onClose={onClose}
    >
      <InspectorBody target={target} />
    </InspectorPanel>
  );
}

export function RightSidebar() {
  const rightOpen = useBuilderStore((s) => s.rightOpen);
  const target = useInspectorTarget();

  if (!hasInspectorSelection(target)) return null;

  const panel = <RightSidebarPanel onClose={() => setRightOpen(false)} />;

  return (
    <>
      <AnimatedRightPanel className="hidden w-[280px] shrink-0 border-l border-slate-100 md:block">
        {panel}
      </AnimatedRightPanel>

      <BuilderAnimatePresence>
        {rightOpen ? (
          <AnimatedFade className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setRightOpen(false)}
              aria-label="Close inspector"
            />
            <AnimatedBottomSheet className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white shadow-2xl">
              <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-200" aria-hidden />
              {panel}
            </AnimatedBottomSheet>
          </AnimatedFade>
        ) : null}
      </BuilderAnimatePresence>
    </>
  );
}
