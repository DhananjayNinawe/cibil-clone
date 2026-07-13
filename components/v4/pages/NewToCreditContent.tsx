"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/v4/motion/Reveal";
import { ButtonLink } from "@/components/v4/ui/Button";
import { ArrowRightIcon } from "@/components/v4/ui/Icons";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { LibraryDisclaimer, SubscribeBand } from "./KnowledgeFurniture";
import { NEW_TO_CREDIT_CARDS } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * New To Credit — four articles, for the reader who has never borrowed anything.
 *
 * These four are not four equivalent tiles; they are a *reading order* — what a score is, how to
 * keep one healthy, what to resolve to do, how to start from nothing. So the page is a run of
 * full-width plates that alternate side to side, numbered in the mono face. A reader who has never
 * held a credit card should be able to fall down this page without making a single choice, which is
 * exactly what a three-column grid forces them to do six times.
 *
 * Headlines are `card.title[language]` — locale-keyed data (AGENTS.md), not catalog keys. The cards
 * carry no "READ MORE" link because V1's points at `href="#"` and the article bodies are not part of
 * this site; the links on this page all resolve.
 */

/** Where a first-time reader goes after the four. Each is a real route. */
const ONWARD: { key: TranslationKey; href: string }[] = [
  { key: "megaWatchAndLearn", href: toV4("/watch-and-learn") },
  { key: "filterCreditAdvice", href: toV4("/credit-advice") },
  { key: "featCibilSaksham", href: toV4("/cibil-saksham") },
];

export default function NewToCreditContent() {
  const { t, language } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navKnowledge"), href: toV4("/credit-advice") }}
        label={t("footerCreditEducation")}
        title={t("newToCreditTitle")}
        lede={t("learnSubtitle")}
        actions={
          <ButtonLink href={toV4("/freecibilscore")} size="lg" arrow>
            {t("heroCta")}
          </ButtonLink>
        }
      />

      {/* ── The reading order ───────────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-ntc-topics">
        <Container>
          <SectionHead id="v4-ntc-topics" label={t("blogTag")} title={t("topicsHeading")} />

          <ol className="mt-12 grid gap-14 sm:gap-20">
            {NEW_TO_CREDIT_CARDS.map((card, i) => (
              <li key={`${card.title.en}-${i}`}>
                <Reveal>
                  {/* The alternation is the rhythm. `sm:` and up only — on a phone every plate
                      stacks image-over-headline anyway, and flipping the order there would just
                      move the artwork below the words on every second item. */}
                  <article
                    className={`grid items-center gap-8 sm:grid-cols-2 sm:gap-12 ${
                      i % 2 === 1 ? "sm:[&>figure]:order-2" : ""
                    }`}
                  >
                    <figure className="v4-plane relative m-0 aspect-16/10 overflow-hidden">
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          priority={i === 0}
                          unoptimized
                          sizes="(max-width: 640px) 100vw, 46vw"
                          className="object-cover"
                        />
                      ) : null}
                    </figure>

                    <div>
                      <p className="v4-label">
                        <span aria-hidden="true" className="v4-num">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="ml-3">{t("blogTag")}</span>
                      </p>
                      <h3 className="v4-h2 mt-4 text-[1.5rem] sm:text-[1.85rem]">
                        {card.title[language]}
                      </h3>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Onward. A night band: the reader has finished the primer and is being handed on. ── */}
      <Section tone="night" space="md" aria-labelledby="v4-ntc-onward">
        <Container width="wide">
          <SectionHead
            id="v4-ntc-onward"
            label={t("megaResourcesHeading")}
            title={
              <>
                {t("learnHeadingPrefix")}{" "}
                <span className="v4-mark-word">{t("learnHeadingBrand")}</span>
              </>
            }
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {ONWARD.map((item, i) => (
              <li key={item.key}>
                <Reveal index={i}>
                  <Link
                    href={item.href}
                    className="v4-plane v4-plane-lift group flex items-center justify-between gap-4 p-6"
                  >
                    <span className="v4-h3">{t(item.key)}</span>
                    <ArrowRightIcon
                      size={18}
                      className="shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </Link>
                </Reveal>
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
