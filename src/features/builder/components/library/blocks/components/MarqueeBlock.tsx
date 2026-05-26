import type { LibraryBlockComponentProps } from "./types";

export function MarqueeBlock({
  title,
  speed = 20,
  direction = "left",
  marqueeLogos = [],
}: LibraryBlockComponentProps) {
  const duration = speed ? `${120 / speed}s` : "10s";
  const animName = direction === "right" ? "marquee-right" : "marquee-left";

  const hasLogos = Array.isArray(marqueeLogos) && marqueeLogos.length > 0;
  const logosToRender: string[] = [];
  if (hasLogos) {
    while (logosToRender.length < 16) {
      logosToRender.push(...marqueeLogos);
    }
  }

  const renderContent = () => {
    if (hasLogos) {
      return logosToRender.map((url, i) => (
        <img
          key={i}
          src={url}
          alt="Brand Logo"
          className="mx-3 h-7 w-auto object-contain opacity-60 transition-opacity hover:opacity-95 pointer-events-none select-none"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ));
    }

    return Array.from({ length: 8 }).map((_, i) => (
      <span key={i} className="text-sm font-semibold uppercase tracking-wider text-foreground">
        {title || "Marquee Text"} &middot;
      </span>
    ));
  };

  return (
    <div className="relative flex w-full overflow-x-hidden border-y py-3">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .marquee-container-${speed}-${direction} {
            display: inline-flex;
            align-items: center;
            gap: 2rem;
            white-space: nowrap;
            animation: ${animName} ${duration} linear infinite;
          }
        `,
        }}
      />
      <div className={`marquee-container-${speed}-${direction}`}>{renderContent()}</div>
      <div className={`marquee-container-${speed}-${direction}`} aria-hidden>
        {renderContent()}
      </div>
    </div>
  );
}
