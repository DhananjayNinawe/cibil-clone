"use client";

import { useV2 } from "@/lib/v2/useV2";
import Backdrop from "@/components/v2/ui/Backdrop";
import StatBlock from "@/components/v2/ui/StatBlock";
import { Container, Section, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { QuoteIcon } from "@/components/icons";

/**
 * The proof band.
 *
 * V1 renders these as four white boxes on a pale blue field; here they are set directly into a
 * lit dark band with no boxes at all — the numbers are large enough to be the structure. Each
 * counts up as it enters the viewport.
 */
export default function Stats() {
  const { t, tv } = useV2();

  return (
    <Section space="lg" tone="deep" className="isolate overflow-hidden">
      <Backdrop tone="cyan" />

      <Container className="relative">
        <Reveal variant="fade">
          <Eyebrow index="03">{tv("v2StatsKicker")}</Eyebrow>
        </Reveal>

        <div className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <Reveal variant="up">
            <StatBlock value={t("statYearsValue")} unit={t("statYearsUnit")} label={t("statYearsLabel")} />
          </Reveal>

          <Reveal variant="up" delay={100}>
            <StatBlock value={t("statUsersValue")} unit={t("statUsersUnit")} label={t("statUsersLabel")} />
          </Reveal>

          <Reveal variant="up" delay={200}>
            <StatBlock value={t("statImprovedValue")} label={t("statImprovedLabel")} />
          </Reveal>

          <Reveal variant="up" delay={300}>
            <figure className="v2-glass v2-rim relative flex h-full flex-col justify-between rounded-[var(--v2-r-lg)] p-7">
              <QuoteIcon className="h-8 w-8 text-[var(--v2-cyan)]" />
              <blockquote className="mt-5 text-[15px] leading-relaxed text-[var(--v2-text)]">
                {t("statQuote")}
              </blockquote>
              {/* A username, not a sentence — left as authored, in Latin script. */}
              <figcaption className="mt-6 text-sm font-bold text-[var(--v2-cyan)]">
                {t("statQuoteAuthor")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
