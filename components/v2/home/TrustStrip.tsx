"use client";

import { useV2 } from "@/lib/v2/useV2";
import Marquee from "@/components/v2/motion/Marquee";

/**
 * Ticker between the hero and the catalogue.
 *
 * Every line is existing copy — the lender-trust note, the scale of the user base, the years of
 * operation, the certification line. It is a legibility device, not decoration: the marquee
 * pauses on hover so a reader can actually finish a sentence.
 */
export default function TrustStrip() {
  const { t } = useV2();

  const lines = [
    t("scoreCardNote"),
    t("statUsersLabel"),
    t("statYearsLabel"),
    t("footerCertifications"),
    t("infoForGood"),
  ];

  return (
    <section
      aria-label={t("infoForGood")}
      className="relative overflow-hidden border-y border-[var(--v2-line)] bg-[var(--v2-bg-2)] py-5"
    >
      {/* Feathered edges, so the strip reads as continuous rather than cropped. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[var(--v2-bg-2)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[var(--v2-bg-2)] to-transparent"
      />

      <Marquee duration={64}>
        {lines.map((line, index) => (
          <span key={index} className="flex items-center whitespace-nowrap">
            <span className="px-8 text-xs tracking-wide text-[var(--v2-text-2)]">{line}</span>
            <span
              aria-hidden
              className="h-1 w-1 shrink-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_8px_rgba(0,176,240,0.9)]"
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
