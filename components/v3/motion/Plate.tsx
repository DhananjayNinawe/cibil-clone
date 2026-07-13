"use client";

import Image from "next/image";
import { useInView, usePlateDrift } from "@/lib/v3/motion";

interface PlateProps {
  src: string;
  /** Pre-translated. Pass `t("key")` — never a literal. Empty string for purely decorative art. */
  alt: string;
  /** `mount` puts CIBIL's white-background artwork on a paper mat so it can sit on an ink band. */
  mount?: boolean;
  /** The image drifts slowly inside its fixed frame as the page scrolls. */
  drift?: boolean;
  priority?: boolean;
  /** Aspect ratio of the frame, as a CSS value: "4 / 3", "16 / 9", "1 / 1". */
  ratio?: string;
  /** `cover` crops to fill; `contain` fits the whole image (right for CIBIL's diagrams). */
  fit?: "cover" | "contain";
  className?: string;
  sizes?: string;
}

/**
 * A plate: artwork cropped by a ruled frame.
 *
 * The frame is square-cornered and hairlined; the *image* moves, the frame never does. That
 * inversion is the whole idea — V2 floats a rounded card and lights it; V3 mounts a print and
 * lets the page slide past the window it is seen through.
 *
 * Three elements, each load-bearing:
 *   · the outer box is what the observer watches — it is never clipped, because a clipped target
 *     never intersects and the reveal would never fire (see components/v3/motion/Reveal.tsx);
 *   · the middle box carries the frame and the left-to-right unveil;
 *   · the inner box is taller than the frame and drifts, so the image can travel without ever
 *     exposing an edge.
 *
 * `unoptimized` because next.config.ts is V1's file and only whitelists some cibil.com paths; the
 * optimizer rejects the rest. V1 and V2 hit the same wall.
 */
export default function Plate({
  src,
  alt,
  mount = false,
  drift = false,
  priority = false,
  ratio = "4 / 3",
  fit = "contain",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: PlateProps) {
  const { ref: revealRef } = useInView<HTMLDivElement>();
  const driftRef = usePlateDrift<HTMLDivElement>(drift ? 22 : 0);

  return (
    <div ref={revealRef} className={`relative ${className}`} style={{ aspectRatio: ratio }}>
      {/*
        `h-full w-full`, NOT `absolute inset-0`.
        `.v3-plate` declares `position: relative` (v3.css), and v3.css is loaded after Tailwind —
        so at equal specificity it wins, and Tailwind's `absolute` utility on this element is
        silently ignored. The frame then stayed in flow with no in-flow content (its only child is
        the absolutely-positioned drift box), collapsed to the 2px of its own border, and rendered
        as a stray hairline where the artwork should be. Sizing the frame instead of insetting it
        sidesteps the cascade entirely.
      */}
      <div
        className={`v3-plate v3-reveal v3-reveal-plate h-full w-full ${mount ? "v3-plate-mount" : ""}`}
      >
        <div ref={driftRef} className="absolute inset-x-0 -inset-y-4">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized
            className={fit === "cover" ? "object-cover" : "object-contain"}
          />
        </div>
      </div>
    </div>
  );
}
