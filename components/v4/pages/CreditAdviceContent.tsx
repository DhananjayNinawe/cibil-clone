"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { Reveal } from "@/components/v4/motion/Reveal";
import { Button } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { LibraryDisclaimer, SubscribeBand } from "./KnowledgeFurniture";
import { CREDIT_ADVICE_CARDS } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Credit Advice — the biggest shelf in the library: sixty-odd articles.
 *
 * V1 renders all sixty as one uniform three-column card grid, which is the layout that says "we did
 * not read any of these". A library has a front table and a shelf and an index, and they do not look
 * the same, so this page has all three: one lead story at full width, six more with their artwork,
 * and then the long tail as a *catalogue* — numbered hairline rows, thumbnail where one exists,
 * collapsed to the first eighteen until the reader asks for the rest.
 *
 * ── The dead link ───────────────────────────────────────────────────────────────────────────────
 * V1 puts a "BLOG POST ›" link under every card and points it at `href="#"`. The article bodies are
 * not part of this site — only their headlines are, in `lib/blogCards.ts` — so there is nowhere for
 * that link to go, and V4's rule is that every link resolves (DESIGN_SYSTEM §5.3). A card is
 * therefore drawn as what it *is*: a headline and its artwork, with no affordance promising a page
 * that does not exist. The real destinations on this page — the sibling shelves, the subscription —
 * are links, and they all work.
 *
 * Headlines come from `card.title[language]`, not from `t()`: they are locale-keyed *data*, and
 * AGENTS.md is explicit that data in `lib/` is user-visible text and is translated exactly like the
 * catalog. Reading them through `t()` would be a type error, and printing `card.title.en` would ship
 * an English page to a Tamil reader.
 */

/** The other shelves. Every one is a real route; this is the reader's map out of a long page. */
const SHELVES: { key: TranslationKey; href: string }[] = [
  { key: "megaNewToCredit", href: toV4("/new-to-credit") },
  { key: "filterCreditMyths", href: toV4("/credit-myths") },
  { key: "megaWatchAndLearn", href: toV4("/watch-and-learn") },
  { key: "filterCommercialCredit", href: toV4("/commercial-credit") },
  { key: "megaCibilJaagran", href: toV4("/jaagran") },
  { key: "featCibilSaksham", href: toV4("/cibil-saksham") },
  { key: "footerBlog", href: toV4("/blog/main") },
];

const SHELF_COUNT = 6; // the front table, after the lead story
const INDEX_PREVIEW = 18; // how much of the catalogue is open before the reader asks for more

export default function CreditAdviceContent() {
  const { t, t4, language } = useV4();
  const [expanded, setExpanded] = useState(false);
  const catalogueId = useId();

  const [lead, ...rest] = CREDIT_ADVICE_CARDS;
  const shelf = rest.slice(0, SHELF_COUNT);
  const catalogue = rest.slice(SHELF_COUNT);
  const visible = expanded ? catalogue : catalogue.slice(0, INDEX_PREVIEW);

  return (
    <>
      <PageHero
        label={t("footerCreditEducation")}
        title={t("creditAdviceTitle")}
        lede={t("learnSubtitle")}
        aside={
          // Not a photograph — the shelf list. On a page this long, the most useful thing the hero
          // can hold is the way out of it.
          <nav aria-label={t("navKnowledge")} className="v4-plane p-6 sm:p-7">
            <h2 className="v4-label">{t("navKnowledge")}</h2>
            <ul className="mt-5 grid gap-0">
              {SHELVES.map((shelfLink) => (
                <li key={shelfLink.key}>
                  <Link
                    href={shelfLink.href}
                    className="flex items-center justify-between gap-4 border-t border-[var(--v4-edge)] py-3 text-[0.9375rem] font-bold text-[var(--v4-fg-2)] transition-colors first:border-t-0 first:pt-0 hover:text-[var(--v4-accent)]"
                  >
                    {t(shelfLink.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* ── The front table ─────────────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-ca-topics">
        <Container width="wide">
          <SectionHead id="v4-ca-topics" label={t("blogTag")} title={t("filterFeatured")} />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <Reveal variant="focus">
              <article>
                <div className="v4-plane relative aspect-16/10 overflow-hidden">
                  {lead.image ? (
                    <Image
                      src={lead.image}
                      alt=""
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <p className="v4-label mt-5">{t("blogTag")}</p>
                <h3 className="v4-h2 mt-3">{lead.title[language]}</h3>
              </article>
            </Reveal>

            <ul className="grid content-start gap-0">
              {shelf.map((card, i) => (
                <li key={`${card.title.en}-${i}`}>
                  <Reveal index={i}>
                    <article className="flex items-center gap-5 border-t border-[var(--v4-edge)] py-5 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-5">
                      <div className="min-w-0 flex-1">
                        <p className="v4-label">{t("blogTag")}</p>
                        <h3 className="mt-2 text-[1.0625rem] font-bold leading-snug tracking-[-0.012em]">
                          {card.title[language]}
                        </h3>
                      </div>
                      {card.image ? (
                        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--v4-r-sm)] border border-[var(--v4-edge)]">
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            unoptimized
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── The catalogue ───────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" space="md" aria-labelledby="v4-ca-catalogue">
        <Container width="wide">
          <SectionHead
            id="v4-ca-catalogue"
            label={t("filterCreditAdvice")}
            title={t("blogViewAllPlain")}
          />

          {/* Two columns of hairline rows. The index is set in the mono face and continues the
              lead's numbering, so the catalogue reads as one run rather than restarting at 1. */}
          <ul
            id={catalogueId}
            className="mt-8 grid gap-x-12 border-t border-[var(--v4-edge)] lg:grid-cols-2"
          >
            {visible.map((card, i) => (
              <li
                key={`${card.title.en}-${i}`}
                className="flex items-center gap-5 border-b border-[var(--v4-edge)] py-4"
              >
                <span
                  aria-hidden="true"
                  className="v4-num w-8 shrink-0 text-[0.8125rem] text-[var(--v4-fg-3)]"
                >
                  {String(i + SHELF_COUNT + 2).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 flex-1 text-[0.9375rem] font-bold leading-snug">
                  {card.title[language]}
                </h3>
                {card.image ? (
                  <div className="relative hidden h-12 w-20 shrink-0 overflow-hidden rounded-[var(--v4-r-xs)] border border-[var(--v4-edge)] sm:block">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          {catalogue.length > INDEX_PREVIEW ? (
            <div className="mt-8">
              <Button
                variant="secondary"
                size="sm"
                aria-expanded={expanded}
                aria-controls={catalogueId}
                onClick={() => setExpanded((open) => !open)}
              >
                {expanded ? t4("v4ShowLess") : t4("v4ShowMore")}
              </Button>
            </div>
          ) : null}
        </Container>
      </Section>

      <SubscribeBand />
      <LibraryDisclaimer />
    </>
  );
}
