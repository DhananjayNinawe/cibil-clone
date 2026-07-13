"use client";

import Image from "next/image";
import { Reveal } from "@/components/v4/motion/Reveal";
import { TextLink } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import Notice from "@/components/v4/ui/Notice";
import PageHero from "@/components/v4/ui/PageHero";
import { LibraryDisclaimer, SubscribeBand } from "./KnowledgeFurniture";
import { CREDIT_MYTHS_CARDS } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Credit Myths — two articles, and V1 lays them out in a grid built for sixty.
 *
 * Two is not a grid; two is a *spread*. So the page is one: a pair of full-height plates, each with
 * its artwork, its ordinal, and its headline set large enough to actually be read. A three-column
 * card grid holding two cards is a page that looks broken, and it wastes the one advantage a short
 * shelf has — that each item can be given room.
 *
 * The standfirst is the site's own myth-buster. `jaagranDontWorry` — "checking your own credit score
 * won't lower it" — is CIBIL's copy, and it is *the* credit myth; on a page about credit myths it
 * belongs above the fold, not buried three pages away on the Jaagran campaign. Nothing here is new
 * text: it is V1's sentence, moved to the page it is about.
 *
 * As on every shelf, the headlines are `card.title[language]` (locale-keyed data, per AGENTS.md) and
 * the cards are not links: V1's "BLOG POST ›" points at `href="#"`, the article bodies are not part
 * of this site, and V4 does not draw an affordance that resolves nowhere.
 */

/** Where a reader who has finished two articles goes next. Real routes, all of them. */
const NEXT: { key: TranslationKey; href: string }[] = [
  { key: "filterCreditAdvice", href: toV4("/credit-advice") },
  { key: "megaNewToCredit", href: toV4("/new-to-credit") },
  { key: "megaWatchAndLearn", href: toV4("/watch-and-learn") },
  { key: "footerBlog", href: toV4("/blog/main") },
];

export default function CreditMythsContent() {
  const { t, language } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navKnowledge"), href: toV4("/credit-advice") }}
        label={t("footerCreditEducation")}
        title={t("creditMythsTitle")}
        lede={t("learnSubtitle")}
      />

      <Section space="md" aria-labelledby="v4-myths-heading">
        <Container width="wide">
          <h2 id="v4-myths-heading" className="v4-sr">
            {t("topicsHeading")}
          </h2>

          <Notice tone="info" className="max-w-3xl">
            {t("jaagranDontWorry")}
          </Notice>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-14">
            {CREDIT_MYTHS_CARDS.map((card, i) => (
              <Reveal key={`${card.title.en}-${i}`} variant="focus" index={i}>
                <article className="flex h-full flex-col">
                  <div className="v4-plane relative aspect-4/3 overflow-hidden">
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        priority={i === 0}
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 46vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-baseline gap-4">
                    {/* The ordinal is the only numeral on the page, so it can be large: it counts
                        the spread, it does not measure anything. */}
                    <span aria-hidden="true" className="v4-num text-[1.75rem] text-[var(--v4-fg-3)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="v4-label">{t("blogTag")}</p>
                      <h3 className="v4-h3 mt-2 text-[1.35rem] leading-snug sm:text-[1.5rem]">
                        {card.title[language]}
                      </h3>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Keep reading. A short shelf owes the reader a way onward more than a long one does. */}
      <Section tone="tint" space="sm" aria-labelledby="v4-myths-next">
        <Container width="wide">
          <h2 id="v4-myths-next" className="v4-label">
            {t("navKnowledge")}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
            {NEXT.map((item) => (
              <li key={item.key}>
                <TextLink href={item.href}>{t(item.key)}</TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <SubscribeBand />
      <LibraryDisclaimer />
    </>
  );
}
