import type { CSSProperties } from "react";

type BackdropTone = "cyan" | "gold" | "duo" | "deep";

interface BackdropProps {
  tone?: BackdropTone;
  /** Faint 88px rule grid, masked to a soft ellipse. */
  grid?: boolean;
  /** Film grain over the gradients — kills the banding that big soft blurs produce. */
  noise?: boolean;
  /** Slow, 26s drift on the light blooms. */
  animate?: boolean;
  className?: string;
}

const TONES: Record<BackdropTone, { color: string; style: CSSProperties }[]> = {
  cyan: [
    { color: "rgba(0,176,240,0.30)", style: { top: "-22%", left: "-6%", width: "58vw", height: "58vw" } },
    { color: "rgba(10,58,82,0.55)", style: { bottom: "-30%", right: "-10%", width: "62vw", height: "62vw" } },
  ],
  gold: [
    { color: "rgba(245,197,24,0.20)", style: { top: "-18%", right: "-8%", width: "50vw", height: "50vw" } },
    { color: "rgba(0,176,240,0.18)", style: { bottom: "-26%", left: "-12%", width: "56vw", height: "56vw" } },
  ],
  duo: [
    { color: "rgba(0,176,240,0.26)", style: { top: "-24%", left: "-10%", width: "56vw", height: "56vw" } },
    { color: "rgba(245,197,24,0.14)", style: { top: "8%", right: "-14%", width: "44vw", height: "44vw" } },
    { color: "rgba(10,58,82,0.6)", style: { bottom: "-34%", left: "22%", width: "60vw", height: "60vw" } },
  ],
  deep: [
    { color: "rgba(10,58,82,0.7)", style: { top: "-30%", left: "10%", width: "70vw", height: "70vw" } },
    { color: "rgba(0,176,240,0.14)", style: { bottom: "-24%", right: "-6%", width: "48vw", height: "48vw" } },
  ],
};

/**
 * The atmosphere layer: gradient-mesh blooms, an optional rule grid, and grain.
 *
 * Pure CSS — no canvas, no WebGL, nothing on the main thread. It is a server component and
 * `pointer-events: none` throughout, so it costs one paint and never blocks interaction.
 */
export default function Backdrop({
  tone = "duo",
  grid = false,
  noise = true,
  animate = true,
  className = "",
}: BackdropProps) {
  return (
    <div
      aria-hidden
      className={`v2-mesh ${noise ? "v2-noise" : ""} ${className}`}
    >
      {TONES[tone].map((blob, index) => (
        <div
          key={index}
          className={`v2-mesh-blob ${animate ? "v2-drift" : ""}`}
          style={{
            ...blob.style,
            background: blob.color,
            // Offsetting the phase stops the blooms pulsing in lockstep, which would read
            // as one shape breathing rather than three lights drifting.
            animationDelay: `${index * -7}s`,
          }}
        />
      ))}
      {grid && <div className="v2-grid-lines" />}
    </div>
  );
}
