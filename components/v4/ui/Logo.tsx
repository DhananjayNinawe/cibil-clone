"use client";

import Image from "next/image";
import Link from "next/link";
import { toV4 } from "@/lib/v4/routes";

/** The CIBIL lockup. A trademark — an asset to place, never a thing to redraw. */
const CIBIL_LOGO =
  "https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png";

/**
 * The brand mark.
 *
 * V4 is free to redesign the *site* — its grid, its type, its colour, its motion, its whole
 * information architecture. It is not free to redesign the *brand*. The logo is CIBIL's identity
 * and TransUnion's trademark, so it ships here exactly as V1 ships it: same asset, same
 * proportions, untouched. Re-setting the wordmark in Manrope would have been a new logotype, and
 * that is not a decision anyone on this side of the contract gets to make. V2 and V3 both drew the
 * same line.
 *
 * The lockup is drawn for a light background, so on a night band it is seated on a white mount
 * (`.v4-mount`) rather than recoloured — you do not tint someone else's trademark to match your
 * section. On a day band it simply sits on the plane.
 *
 * The alt text is the brand's own and is allowlisted in scripts/check-i18n.mjs as a proper noun,
 * which is why it is a literal here rather than a `t()` call.
 */
export default function Logo({
  tone = "day",
  href,
  className = "",
}: {
  tone?: "day" | "night";
  href?: string;
  className?: string;
}) {
  const mark = (
    <Image
      src={CIBIL_LOGO}
      alt="CIBIL - Part of TransUnion"
      width={182}
      height={82}
      priority
      // The asset is a PNG served from CIBIL's own CDN, whose edge intermittently 403s the
      // optimiser's fetch. V1 hit this and pinned it; unoptimized keeps the mark on the page.
      unoptimized
      className="h-8 w-auto select-none sm:h-9"
    />
  );

  return (
    <Link
      href={href ?? toV4("/")}
      className={`flex shrink-0 items-center rounded-[var(--v4-r-xs)] ${className}`}
    >
      {tone === "night" ? (
        <span className="v4-mount flex items-center px-3 py-1.5">{mark}</span>
      ) : (
        mark
      )}
    </Link>
  );
}
