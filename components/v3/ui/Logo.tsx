"use client";

import Image from "next/image";
import Link from "next/link";
import { toV3 } from "@/lib/v3/routes";

/** The CIBIL lockup. A trademark — an asset to place, never a thing to redraw. */
const CIBIL_LOGO =
  "https://www.cibil.com/content/dam/cibil/content-fragments/header/cibil-logo.png";

/**
 * The brand mark.
 *
 * V3 is free to redesign the *site* — its grid, its type, its colour, its motion. It is not free
 * to redesign the *brand*. The logo is CIBIL's identity and TransUnion's trademark, so it ships
 * here exactly as V1 ships it: the same asset, the same proportions, untouched. Setting the
 * wordmark in the site's display serif would have been a new logotype, which is not a design
 * decision anyone on this side of the contract gets to make.
 *
 * The lockup is drawn for a light background. On paper it simply sits on the page. On an ink
 * band it would disappear, so — rather than recolour someone else's trademark — it is seated on
 * a paper plate: the asset stays untouched and legible, and the plate is already the design's own
 * language for mounting CIBIL artwork (see <Plate>). V2 reached the same conclusion.
 *
 * The alt text is the brand's own, and is allowlisted in scripts/check-i18n.mjs as a proper noun.
 */
export default function Logo({
  tone = "paper",
  href,
  className = "",
}: {
  tone?: "paper" | "ink";
  /** Defaults to the V3 home page. Pass `null`-ish only where the mark must not be a link. */
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
      unoptimized
      className="h-8 w-auto select-none sm:h-9"
    />
  );

  return (
    <Link href={href ?? toV3("/")} className={`v3-focus flex shrink-0 items-center ${className}`}>
      {tone === "ink" ? (
        <span className="v3-plate v3-plate-mount flex items-center px-3 py-2">{mark}</span>
      ) : (
        mark
      )}
    </Link>
  );
}
