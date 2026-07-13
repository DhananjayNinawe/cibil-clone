"use client";

import Image from "next/image";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Reveal } from "@/components/v4/motion/Reveal";
import { COMMERCIAL_CREDIT_CARDS } from "@/lib/blogCards";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Commercial Credit — the Knowledge Center's collection for businesses.
 *
 * Sixteen articles. V1 sets them as sixteen identical thumbnails in a three-across grid, which
 * tells the reader that all sixteen matter exactly the same amount and that none of them is worth
 * starting with. A collection has a *first* article; so this one is set the way a page of a
 * newspaper is set — the lead runs large, and the rest are a ruled index beside it, each a headline
 * on a hairline.
 *
 * The only page of the eight with no aside in its hero, and deliberately: a library's opening is
 * its own name, at full measure. Every headline is per-locale, straight out of `lib/blogCards.ts` —
 * imported, never re-typed.
 *
 * The articles themselves have no routes on this site — this repo holds CIBIL's headlines but not a
 * word of their bodies, which is why V1 hangs every card off `href="#"`. So the headlines here are
 * teasers rather than links, and the section's own button carries the reader to the library. See the
 * note at the collection below.
 */
export default function CommercialCreditContent() {
  const { t, language } = useV4();

  const [lead, ...rest] = COMMERCIAL_CREDIT_CARDS;

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navKnowledge"), href: toV4("/credit-advice") }}
        label={t("blogTag")}
        title={t("commercialCreditTitle")}
        lede={t("featuredArticlesDesc")}
        actions={
          <ButtonLink href={toV4("/blog/main")} size="lg" variant="secondary" arrow>
            {t("footerBlog")}
          </ButtonLink>
        }
      />

      {/* ── The collection: a lead, then the index. ─────────────────────────────────────────── */}
      <Section tone="day" space="md" aria-labelledby="v4-cc-topics">
        <Container width="wide">
          <SectionHead id="v4-cc-topics" label={t("blogTag")} title={t("topicsHeading")} />

          <div className="mt-11 grid gap-x-14 gap-y-12 lg:grid-cols-[1.15fr_1fr]">
            {/* The headlines are teasers, not links.
             *
             * This site holds the *titles* of CIBIL's articles (lib/blogCards.ts) but not one word of
             * their bodies — there is no route for an individual post, which is why V1 hangs every
             * one of these cards off `href="#"`. V4 cannot do that (no dead links), and pointing a
             * specific headline at the generic blog index is a quieter version of the same lie: the
             * reader clicks "Can You Bounce Back From A Low CIBIL Score?" and lands on a list.
             *
             * So a teaser is an <article>, and the *section* carries the link to the library (the
             * button above). Same rule on the four knowledge pages — one behaviour for one content
             * type, across the whole version. */}
            {lead ? (
              <Reveal variant="focus">
                <article className="v4-plane flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/9] w-full bg-[var(--v4-surface-2)]">
                    {lead.image ? (
                      <Image
                        src={lead.image}
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : null}
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="v4-label">{t("blogTag")}</p>
                    <h3 className="v4-h2 mt-4">{lead.title[language]}</h3>
                  </div>
                </article>
              </Reveal>
            ) : null}

            <ul className="border-t border-[var(--v4-edge-2)]">
              {rest.map((card, i) => (
                <Reveal as="li" key={card.title.en} index={Math.min(i, 6)}>
                  <article className="flex items-start gap-5 border-b border-[var(--v4-edge)] py-4">
                    {/* The index numbers the collection: the lead is 01, so this one starts at 02. */}
                    <span
                      aria-hidden="true"
                      className="v4-num pt-1 text-[0.6875rem] text-[var(--v4-fg-3)]"
                    >
                      {String(i + 2).padStart(2, "0")}
                    </span>

                    <h3 className="min-w-0 flex-1 text-[0.9375rem] font-bold leading-snug text-[var(--v4-fg)]">
                      {card.title[language]}
                    </h3>

                    {card.image ? (
                      <span
                        aria-hidden="true"
                        className="relative hidden h-14 w-20 shrink-0 overflow-hidden rounded-[var(--v4-r-xs)] border border-[var(--v4-edge)] sm:block"
                      >
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                          unoptimized
                        />
                      </span>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── The one line the collection is here to earn. ────────────────────────────────────── */}
      <Section tone="night" space="md" aria-labelledby="v4-cc-subscribe">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <h2 id="v4-cc-subscribe" className="v4-h2 max-w-[30ch]">
              {t("blogSubscribeBanner")}
            </h2>
            <ButtonLink href={toV4("/choose-subscription")} size="lg" arrow>
              {t("sidebarSubscribeNowBtn")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ── The disclaimer, in the small print it belongs in — but never hidden. ────────────── */}
      <Section tone="day" space="sm">
        <Container width="wide">
          <p className="v4-caption max-w-[90ch] leading-relaxed">{t("blogDisclaimer")}</p>
        </Container>
      </Section>
    </>
  );
}
