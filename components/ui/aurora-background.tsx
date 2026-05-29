import { cn } from "@/lib/utils";

/**
 * Ambient premium backdrop: drifting aurora blobs + faint grid + film grain.
 * Pure CSS/SVG, GPU-friendly, respects prefers-reduced-motion (see globals.css).
 */
export function AuroraBackground({
  className,
  withGrid = true,
}: {
  className?: string;
  withGrid?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {/* Aurora blobs */}
      <div
        className="absolute -top-[20%] left-[8%] h-[42rem] w-[42rem] rounded-full opacity-[0.5] blur-[120px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 70%, transparent), transparent 70%)",
          animation: "var(--animate-aurora)",
        }}
      />
      <div
        className="absolute top-[6%] right-[2%] h-[34rem] w-[34rem] rounded-full opacity-[0.42] blur-[120px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent-2) 65%, transparent), transparent 70%)",
          animation: "var(--animate-aurora)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[35%] h-[36rem] w-[36rem] rounded-full opacity-[0.32] blur-[130px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent-3) 55%, transparent), transparent 70%)",
          animation: "var(--animate-aurora)",
          animationDelay: "-12s",
        }}
      />
      {withGrid && <div className="grid-bg absolute inset-0 opacity-60" />}
      <div className="noise" />
    </div>
  );
}
