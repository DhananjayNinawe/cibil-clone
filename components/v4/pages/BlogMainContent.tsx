"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/v4/motion/Reveal";
import { TextLink } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { LibraryDisclaimer } from "./KnowledgeFurniture";
import { CREDIT_ADVICE_CARDS, NEW_TO_CREDIT_CARDS, type BlogCard } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The blog's front page — the magazine cover for the whole library.
 *
 * It is the one page here with no shelf of its own: its job is a masthead, four picks, and the way
 * in to the six sections. So it is the one page built as a *masthead* — the headline set at display
 * size, the featured stack riding in the hero as a numbered column, and the sections underneath as a
 * plain directory of six plates. No card grid at all, because this page has no cards to grid.
 *
 * ── Two fixes carried over from V1 ──────────────────────────────────────────────────────────────
 *
 * 1. V1's featured column is four English string literals hardcoded in the component, so it renders
 *    in English to a Hindi, Marathi or Tamil reader. Those four headlines already exist, translated,
 *    in `lib/blogCards.ts` — they are the same articles — so they are read from there and switch
 *    language with the page. (AGENTS.md: page copy in `lib/` is locale-keyed data, rendered as
 *    `card.title[language]`, never through `t()`.)
 *
 * 2. V1 gives "Life Events" `href="#"`, and a second dead "View All" at the foot. There is no
 *    life-events route, and V4 does not ship a link that goes nowhere (DESIGN_SYSTEM §5.3) — the
 *    life-events writing (weddings, festivals, travel, education loans) is filed in the Credit
 *    Advice shelf, so that is where the tile points. The foot's "View All" gets the destination it
 *    was always asking for: the sitemap, which is the list of everything.
 */

/**
 * V1's four picks, by name:
 *   1. Building a Strong Financial Foundation — CREDIT_ADVICE_CARDS[0]
 *   2. New-to-credit? Here's how to maintain a healthy CIBIL score — NEW_TO_CREDIT_CARDS[1]
 *   3. First-time users guide to establishing credit — NEW_TO_CREDIT_CARDS[3]
 *   4. Safeguarding your Credit Profile — CREDIT_ADVICE_CARDS[7]
 */
const FEATURED: BlogCard[] = [
  CREDIT_ADVICE_CARDS[0],
  NEW_TO_CREDIT_CARDS[1],
  NEW_TO_CREDIT_CARDS[3],
  CREDIT_ADVICE_CARDS[7],
];

const SECTIONS: { key: TranslationKey; href: string }[] = [
  { key: "creditAdviceTitle", href: toV4("/credit-advice") },
  { key: "creditMythsTitle", href: toV4("/credit-myths") },
  { key: "watchLearnTitle", href: toV4("/watch-and-learn") },
  // See the note above: V1's dead "#", re-pointed at the shelf the life-events writing sits on.
  { key: "blogCatLifeEvents", href: toV4("/credit-advice") },
  { key: "commercialCreditTitle", href: toV4("/commercial-credit") },
  { key: "newToCreditTitle", href: toV4("/new-to-credit") },
];

export default function BlogMainContent() {
  const { t, language } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navKnowledge"), href: toV4("/credit-advice") }}
        label={t("footerBlog")}
        title={t("blogHeroTitle")}
        lede={t("blogHeroSubtitle")}
        aside={
          // The masthead's right-hand column: this issue's picks, numbered, hairline-separated.
          <div className="v4-plane p-6 sm:p-8">
            <h2 className="v4-label">{t("filterFeatured")}</h2>

            <ol className="mt-6 grid gap-0">
              {FEATURED.map((card, i) => (
                <li
                  key={`${card.title.en}-${i}`}
                  className="flex items-center gap-4 border-t border-[var(--v4-edge)] py-4 first:border-t-0 first:pt-0"
                >
                  <span
                    aria-hidden="true"
                    className="v4-num w-6 shrink-0 text-[0.8125rem] text-[var(--v4-fg-3)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="min-w-0 flex-1 text-[0.9375rem] font-bold leading-snug">
                    {card.title[language]}
                  </h3>
                  {card.image ? (
                    <div className="relative hidden h-14 w-20 shrink-0 overflow-hidden rounded-[var(--v4-r-xs)] border border-[var(--v4-edge)] sm:block">
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
            </ol>
          </div>
        }
      />

      {/* ── The directory. Six plates, one per shelf. ───────────────────────────────────────── */}
      <Section tone="tint" space="md" aria-labelledby="v4-blog-sections">
        <Container width="wide">
          <SectionHead
            id="v4-blog-sections"
            label={t("blogCategoryLabel")}
            title={
              <>
                {t("learnHeadingPrefix")}{" "}
                <span className="v4-mark-word">{t("learnHeadingBrand")}</span>
              </>
            }
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((section, i) => (
              <Reveal as="li" key={`${section.key}-${section.href}`} index={i}>
                <Link
                  href={section.href}
                  className="v4-plane v4-plane-lift flex h-full flex-col justify-between gap-8 p-7"
                >
                  <h3 className="v4-h3 text-[1.35rem]">{t(section.key)}</h3>
                  {/* A span, not a nested link: the whole plate is already the anchor. */}
                  <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold tracking-[0.04em] text-[var(--v4-accent)]">
                    {t("blogViewAll")}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10">
            <TextLink href={toV4("/sitemap")}>{t("blogViewAllPlain")}</TextLink>
          </div>
        </Container>
      </Section>

      <LibraryDisclaimer />
    </>
  );
}
