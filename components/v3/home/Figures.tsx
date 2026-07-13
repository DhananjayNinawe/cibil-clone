"use client";

import { useV3 } from "@/lib/v3/useV3";
import { V3_STATS } from "@/lib/v3/libraryData";
import { Container, Section, Folio } from "@/components/v3/ui/Layout";
import Tally from "@/components/v3/motion/Tally";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The figures — the only ink band in the body of the page.
 *
 * Three numbers, set enormous, each hung on its own rule with the claim beneath it, and a reader's
 * own words pulled out beside them. The inversion is doing real work: after several screens of
 * paper, a black spread reads as the moment the document raises its voice, which is exactly what
 * "183 million people monitor their credit here" deserves.
 *
 * The figures count up on arrival (Tally), in tabular figures so nothing reflows while they climb.
 * The *printed* value comes from V1's catalog either way — "46%" stays "46%", because the catalog
 * is the truth and the animation only stages the approach to it.
 */
export default function Figures() {
  const { t, t3 } = useV3();

  return (
    <Section space="xl" tone="ink">
      <Container>
        <Folio index="03">{t3("v3StatsKicker")}</Folio>

        <div className="mt-14 grid gap-x-14 gap-y-16 lg:grid-cols-[1.55fr_1fr]">
          <div>
            {V3_STATS.map((stat, i) => {
              const printed = t(stat.valueKey);
              // "46%" carries its own unit; "183" takes one from a separate key ("M"). Splitting
              // the numerals off the suffix is what lets the tally count the number and still
              // print exactly what the catalog says.
              const suffix = printed.replace(/[\d\s,.]/g, "");

              return (
                <Reveal key={stat.key} variant="rise" delay={i * 90}>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-2 border-t border-[var(--v3-line)] py-8 sm:gap-x-12 sm:py-10">
                    <p className="flex items-baseline">
                      <span className="v3-num text-5xl leading-none font-medium tracking-tight text-[var(--v3-fg)] sm:text-6xl lg:text-7xl">
                        <Tally value={stat.value} suffix={suffix} />
                      </span>
                      {stat.unitKey && (
                        <span className="v3-folio ml-3 text-[var(--v3-gold)]">{t(stat.unitKey)}</span>
                      )}
                    </p>

                    <p className="max-w-[34ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* The pull quote. Set in the display serif, italic, with the reader's handle in the
              mono voice beneath — a printed testimonial, not a review card with five stars. */}
          <Reveal variant="wipe" delay={120} className="lg:pt-10">
            <figure className="border-t border-[var(--v3-line-3)] pt-10">
              <blockquote>
                <p className="v3-h3 v3-em text-pretty text-[var(--v3-fg)]">“{t("statQuote")}”</p>
              </blockquote>
              <figcaption className="v3-folio mt-8 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[var(--v3-line-2)]" />
                {/* A username is a proper noun — it is the same in every locale. */}
                {t("statQuoteAuthor")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
