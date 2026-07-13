"use client";

import Image from "next/image";
import type { ReactNode } from "react";

interface PlateProps {
  /** Remote CIBIL artwork. Always served `unoptimized` — see the note below. */
  src?: string;
  /** Pre-translated. Empty string marks the art as decorative. */
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Arbitrary content instead of an image. */
  children?: ReactNode;
  /** `light` seats the art on a lit white mat, `dark` keeps it on the canvas. */
  surface?: "light" | "dark";
  /** Coloured bloom behind the plate. */
  glow?: boolean;
  className?: string;
  imageClassName?: string;
}

/**
 * The gallery mat.
 *
 * cibil.com's illustrations were all drawn for a white page: some are transparent PNGs with
 * dark linework, some carry their own white background. On a near-black canvas the first kind
 * vanishes and the second becomes an unintentional white rectangle. Rather than recolour brand
 * assets (or guess, since Cloudflare blocks fetching them to check), V2 seats them on a lit
 * plate — art on a mat, hung on a dark wall. It reads as deliberate, and it is correct for
 * either kind of asset.
 *
 * `unoptimized` because next.config.ts (V1's file, which V2 must not touch) whitelists only
 * some cibil.com paths in `remotePatterns`; the optimizer rejects the others outright.
 */
export default function Plate({
  src,
  alt = "",
  width = 720,
  height = 560,
  priority = false,
  children,
  surface = "light",
  glow = true,
  className = "",
  imageClassName = "",
}: PlateProps) {
  return (
    <div className={`relative ${className}`}>
      {glow && (
        // inset-0, not -inset-8: a negative inset is *layout* overflow and pushed the page
        // 12px sideways on a phone. The blur already paints well outside the box, which is
        // pure paint overflow and costs nothing — same bloom, no horizontal scrollbar.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[var(--v2-r-xl)] bg-[radial-gradient(ellipse_at_center,rgba(0,176,240,0.32),transparent_68%)] blur-3xl"
        />
      )}

      <div
        className={`v2-rim relative overflow-hidden rounded-[var(--v2-r-lg)] shadow-[var(--v2-shadow-3)] ${
          surface === "light"
            ? "bg-linear-to-br from-white via-[#f4fbff] to-[#e3f4fd]"
            : "bg-linear-to-br from-[#0a3a52] to-[#0f5773]"
        }`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            unoptimized
            className={`h-auto w-full select-none object-contain ${imageClassName}`}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
