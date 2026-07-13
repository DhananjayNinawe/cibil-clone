"use client";

import Link from "next/link";
import { COMMERCIAL_CREDIT_CARDS, COMMERCIAL_CREDIT_HERO } from "@/lib/blogCards";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { ArrowRight } from "@/components/v3/ui/Icons";

/**
 * Commercial Credit — the Knowledge Center's business collection.
 *
 * V1 sets this as a hero and then thirteen identical thumbnails in a three-across grid, which
 * tells the reader that all thirteen articles matter exactly the same amount. They do not: the
 * first is the lead.
 *
 * So the collection is set as a newspaper page instead — the lead story runs large down the left,
 * and the remaining twelve are a ruled index in the narrow right column, each a hairline with a
 * headline on it. Same articles, same order, same titles (per-locale, straight out of V1's
 * `lib/blogCards.ts` — imported, never copied).
 */
export default function CommercialCreditContent() {
  const { t, language } = useV3();

  const [lead, ...rest] = COMMERCIAL_CREDIT_CARDS;

  return (
    <>
      <PageHeader
        size="full"
        folio={t("productBusinessTag")}
        breadcrumbs={[
          { label: t("navProducts"), href: toV3("/choose-subscription") },
          { label: t("filterCommercialCredit") },
        ]}
        title={[t("commercialCreditTitle")]}
        lede={t("featuredArticlesDesc")}
        media={
          <Plate
            src={COMMERCIAL_CREDIT_HERO}
            alt=""
            priority
            fit="cover"
            ratio="16 / 10"
            drift
          />
        }
      />

      {/* 01 — the collection. A lead story, then the index. */}
      <Section space="lg">
        <Container>
          <SectionHead index="01" folio={t("blogTag")} title={t("topicsHeading")} />

          <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-[1.25fr_1fr]">
            {lead && (
              <Reveal variant="rise">
                <article className="group">
                  {/* A card without artwork falls back to a plain ruled plate — a quiet gap, not a
                      broken image. (`image` is optional on BlogCard.) */}
                  {lead.image ? (
                    <Plate
                      src={lead.image}
                      alt=""
                      mount
                      fit="cover"
                      ratio="16 / 9"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  ) : (
                    <div className="v3-plate aspect-[16/9] w-full" />
                  )}

                  <div className="mt-6 border-t border-[var(--v3-line-2)] pt-5">
                    <p className="v3-folio mb-4">{t("blogTag")}</p>
                    <h3 className="v3-h3 text-pretty">{lead.title[language]}</h3>

                    <Link
                      href={toV3("/blog/main")}
                      className="v3-focus v3-num mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-accent)]"
                    >
                      {t("blogReadMore")}
                      <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-[3px]" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            )}

            <div className="border-t border-[var(--v3-line-2)]">
              {rest.map((card, i) => (
                <Reveal key={card.title.en} variant="rise" delay={40 + i * 40}>
                  <Link
                    href={toV3("/blog/main")}
                    className="v3-focus group flex items-start gap-5 border-b border-[var(--v3-line)] py-5"
                  >
                    <span aria-hidden className="v3-num pt-1 text-[0.625rem] text-[var(--v3-fg-3)]">
                      {String(i + 2).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-pretty text-sm leading-snug font-medium text-[var(--v3-fg)]">
                        <span className="v3-link-draw">{card.title[language]}</span>
                      </span>
                      <span className="v3-folio mt-2 block transition-colors group-hover:text-[var(--v3-accent)]">
                        {t("blogReadMore")}
                      </span>
                    </span>

                    {card.image && (
                      <span
                        aria-hidden
                        className="v3-plate v3-plate-mount relative hidden h-16 w-24 shrink-0 sm:block"
                        style={{
                          backgroundImage: `url(${card.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* The subscribe line. A ruled band, the claim and the action on one rule. */}
      <Section space="md" tone="sunken" ruled>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="v3-h3 max-w-[28ch] text-balance">{t("blogSubscribeBanner")}</p>
            <Button href={toV3("/choose-subscription")} size="lg" arrow>
              {t("sidebarSubscribeNowBtn")}
            </Button>
          </div>
        </Container>
      </Section>

      {/* The disclaimer, in the small print it belongs in. */}
      <Section space="md">
        <Container>
          <p className="v3-caption max-w-[90ch] leading-relaxed">{t("blogDisclaimer")}</p>
        </Container>
      </Section>
    </>
  );
}
