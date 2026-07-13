"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import Callout from "@/components/v3/ui/Callout";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The statutory notes — the CIC (Regulation) Act 2005 clause, the RBI onus clause and the 30-day
 * resolution clause — numbered and ruled, the way a document sets its provisos.
 *
 * The fourth of V1's "important points" is the reassurance that disputes are free, which is not a
 * proviso at all; it is the opposite, so it closes the block as a pine-ruled note rather than
 * sitting as clause 04 among three regulatory restrictions.
 *
 * Shared by the consumer and microfinance dispute pages, exactly as in V1.
 */
const POINTS: TranslationKey[] = ["pointNoCorrection", "pointRbiGuidelines", "pointResolveWithin30"];

export default function ImportantPoints({ index }: { index: string }) {
  const { t, t3 } = useV3();

  return (
    <Section space="lg" ruled>
      <Container>
        <SectionHead index={index} folio={t3("v3KeyPoints")} title={t("importantPointsHeading")} />

        <ol className="mt-4 border-t border-[var(--v3-line)]">
          {POINTS.map((point, i) => (
            <Reveal
              key={point}
              as="li"
              variant="rise"
              delay={i * 70}
              className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-8"
            >
              <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-fg-3)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[64ch] text-pretty text-sm leading-relaxed text-[var(--v3-fg-2)] sm:text-base">
                {t(point)}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal variant="rise" className="mt-12">
          <Callout tone="success">
            <p className="text-base leading-relaxed text-[var(--v3-fg)] sm:text-lg">
              {t("disputeFreeServiceBanner")}
            </p>
          </Callout>
        </Reveal>
      </Container>
    </Section>
  );
}
