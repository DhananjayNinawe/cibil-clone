"use client";

import { useV2 } from "@/lib/v2/useV2";
import { useScrollProgress } from "@/lib/v2/motion";

/** Hairline reading-progress rail pinned under the header. */
export default function ScrollProgress() {
  const { tv } = useV2();
  const progress = useScrollProgress();

  return (
    <div
      role="progressbar"
      aria-label={tv("v2ReadingProgress")}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px"
    >
      <div
        className="h-full origin-left bg-linear-to-r from-[var(--v2-cyan)] via-[var(--v2-cyan-soft)] to-[var(--v2-gold)]"
        style={{
          transform: `scaleX(${progress})`,
          boxShadow: "0 0 12px rgba(0,176,240,0.9)",
        }}
      />
    </div>
  );
}
