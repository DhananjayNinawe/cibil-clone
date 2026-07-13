"use client";

import { Container, Section } from "@/components/v4/ui/Layout";
import { Reveal, Tick } from "@/components/v4/motion/Reveal";
import { useInView } from "@/lib/v4/motion";
import { useV4 } from "@/lib/v4/useV4";

/**
 * By the numbers.
 *
 * A night band, and the second place in V4 where data is drawn rather than merely stated. Three
 * figures the company already publishes — 25 years, 183M self-monitoring consumers, 46% who
 * improved their score within six months — and one customer's own words.
 *
 * The 46% is the only one of the three that is a *proportion*, so it is the only one that gets a
 * bar: a proportion has a whole to be measured against, and "25 years" does not. Drawing all three
 * as bars because they happened to arrive together would be decoration impersonating a chart.
 *
 * Each figure is a `<div>` inside the `<dl>` holding a `<dt>` (the label) and a `<dd>` (the value),
 * which is the association a screen reader actually announces. The value is *visually* first and
 * the label second — `order` does that in CSS, without inverting the markup, because a definition
 * list whose description precedes its term is not a definition list.
 */
export default function Figures() {
  const { t, t4 } = useV4();
  const { ref } = useInView<HTMLDivElement>();

  return (
    <Section tone="night" aria-labelledby="v4-figures-heading">
      <Container width="wide">
        <h2 id="v4-figures-heading" className="v4-label">
          <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
          <span className="ml-2.5">{t4("v4SectionFigures")}</span>
        </h2>

        <div ref={ref} className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <dl className="grid gap-10 sm:grid-cols-2">
            <Reveal as="div" index={0} className="flex flex-col">
              <dd className="v4-num order-1 flex items-baseline gap-1.5 text-[3.25rem] font-medium leading-none text-[var(--v4-fg)] sm:text-[3.5rem]">
                <Tick value={t("statYearsValue")} />
                {/* The ticking figure is aria-hidden; the true value is announced once, here, so a
                    screen reader reads a number rather than every frame of an animation. */}
                <span className="v4-sr">{t("statYearsValue")}</span>
                <span className="text-[1.25rem] font-normal text-[var(--v4-fg-3)]">
                  {t("statYearsUnit")}
                </span>
              </dd>
              <dt className="v4-caption order-2 mt-3.5">{t("statYearsLabel")}</dt>
            </Reveal>

            <Reveal as="div" index={1} className="flex flex-col">
              <dd className="v4-num order-1 flex items-baseline gap-1 text-[3.25rem] font-medium leading-none text-[var(--v4-fg)] sm:text-[3.5rem]">
                <Tick value={t("statUsersValue")} />
                <span className="v4-sr">{t("statUsersValue")}</span>
                <span className="text-[2rem]">{t("statUsersUnit")}</span>
              </dd>
              <dt className="v4-caption order-2 mt-3.5">{t("statUsersLabel")}</dt>
            </Reveal>

            <Reveal as="div" index={2} className="flex flex-col sm:col-span-2">
              <dd className="order-1">
                <span className="v4-num block text-[3.25rem] font-medium leading-none text-[var(--v4-fg)] sm:text-[3.5rem]">
                  <Tick value={t("statImprovedValue")} />
                  <span className="v4-sr">{t("statImprovedValue")}</span>
                </span>

                {/* The bar. Its track is the whole (every self-monitoring consumer); its fill is the
                    46%. Announced as one image with its figure and its label, because a bar with no
                    text alternative is a decoration to a screen reader. */}
                <span
                  role="img"
                  aria-label={`${t("statImprovedValue")} — ${t("statImprovedLabel")}`}
                  className="mt-5 block h-2.5 w-full overflow-hidden rounded-full bg-[var(--v4-surface-2)]"
                >
                  <span
                    aria-hidden="true"
                    className="v4-grow-x block h-full w-[46%] rounded-full bg-[linear-gradient(90deg,var(--v4-c3),var(--v4-c-stroke))]"
                  />
                </span>
              </dd>
              <dt className="v4-caption order-2 mt-3.5 max-w-[34rem]">{t("statImprovedLabel")}</dt>
            </Reveal>
          </dl>

          {/* One customer, in their own words. Set as a quote, not a testimonial card under five
              gold stars — CIBIL is a bureau, not a marketplace. */}
          <Reveal as="figure" index={3} className="lg:border-l lg:border-[var(--v4-edge)] lg:pl-12">
            <blockquote className="text-[1.375rem] font-medium leading-snug tracking-[-0.015em] text-[var(--v4-fg)]">
              {t("statQuote")}
            </blockquote>
            <figcaption className="v4-label mt-6">{t("statQuoteAuthor")}</figcaption>
            <p className="v4-caption mt-10 border-t border-[var(--v4-edge)] pt-5">
              {t4("v4StatsSource")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
