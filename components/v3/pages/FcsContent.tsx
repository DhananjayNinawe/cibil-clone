"use client";

import Image from "next/image";
import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead, Folio } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Accordion, { type AccordionItem } from "@/components/v3/ui/Accordion";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import RichText from "@/components/v3/ui/RichText";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The free annual score and report.
 *
 * This page is a document, so V3 sets it as one: a masthead with the offer and the plate, a
 * numbered ledger of what the report actually contains, the ten questions as a ruled index, one
 * ink band where the page raises its voice about the videos, and the three terms set as clauses
 * at the foot — which is where a printed document puts its terms.
 *
 * Every string is V1's, including the ones that carry their own markup: the five "what you get"
 * lines are bolded mid-sentence and several FAQ answers contain links and bullet lists. Those go
 * through <RichText>, which parses the same grammar as `lib/richText.tsx` but routes internal
 * hrefs through `toV3()` — a reader must not fall out of V3 by following a footnote.
 */

const DAM = "https://www.cibil.com/content/dam/cibil/consumer/facr";

const WHAT_YOU_GET: { icon: string; text: TranslationKey }[] = [
  { icon: "cibil_score", text: "fcsGet1" },
  { icon: "cibil_payment", text: "fcsGet2" },
  { icon: "personal_info", text: "fcsGet3" },
  { icon: "all_enquiry", text: "fcsGet4" },
  { icon: "loan_credit", text: "fcsGet5" },
];

const FAQS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "fcsFaq1", a: "fcsA1" },
  { q: "fcsFaq2", a: "fcsA2" },
  { q: "fcsFaq3", a: "fcsA3" },
  { q: "fcsFaq4", a: "fcsA4" },
  { q: "fcsFaq5", a: "fcsA5" },
  { q: "fcsFaq6", a: "fcsA6" },
  { q: "fcsFaq7", a: "fcsA7" },
  { q: "fcsFaq8", a: "fcsA8" },
  { q: "fcsFaq9", a: "fcsA9" },
  { q: "fcsFaq10", a: "fcsA10" },
];

const TERMS: TranslationKey[] = ["fcsTerm1", "fcsTerm2", "fcsTerm3"];

export default function FcsContent() {
  const { t, t3 } = useV3();

  const faqItems: AccordionItem[] = FAQS.map(({ q, a }) => ({
    question: t(q),
    answer: <RichText text={t(a)} />,
  }));

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("megaFreeCibilScore") },
        ]}
        folio={t("planFreeAnnualName")}
        size="full"
        title={t("fcsHeroTitle")}
        lede={t("fcsFreeBanner")}
        media={
          <Plate
            src={`${DAM}/banner-image.png`}
            alt={t("fcsBannerAlt")}
            mount
            priority
            ratio="1 / 1"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
        }
        actions={
          <>
            <Button href={toV3("/register")} size="lg" arrow>
              {t("getFreeScoreBtn")}
            </Button>

            <p className="text-sm text-[var(--v3-fg-2)]">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href={toV3("/login")}
                className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
              >
                {t("logInLink")}
              </Link>
            </p>
          </>
        }
      />

      {/* ── 01. What the report actually holds. A ledger of five entries. */}
      <Section space="lg">
        <Container>
          <SectionHead
            index="01"
            folio={t3("v3AtAGlance")}
            title={t("fcsWhatYouGetHeading")}
          />

          <div className="mt-14 grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
              <Button href={toV3("/register")} size="lg" arrow>
                {t("getStartedNowBtn")}
              </Button>

              <Callout tone="regulatory" className="mt-10">
                {t("fcsHeroEligibility")}
              </Callout>
            </div>

            <ol className="min-w-0 border-t border-[var(--v3-line-2)]">
              {WHAT_YOU_GET.map((item, i) => (
                <Reveal key={item.text} variant="rise" delay={i * 70} as="li">
                  <div className="grid grid-cols-[2.5rem_1fr] items-start gap-x-5 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[3rem_3.5rem_1fr] sm:gap-x-6 sm:py-8">
                    <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-fg-3)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <Image
                      src={`${DAM}/${item.icon}.svg`}
                      alt=""
                      width={54}
                      height={54}
                      unoptimized
                      className="hidden h-11 w-11 shrink-0 sm:block"
                    />

                    <RichText text={t(item.text)} className="max-w-[52ch]" />
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ── 02. Ten questions, as a ruled index. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="02" folio={t("faqs")} title={t("fcsFaqHeading")} />
          <Accordion items={faqItems} numbered multiple className="mt-12" />
        </Container>
      </Section>

      {/* ── 03. The one moment the page raises its voice. */}
      <Section space="lg" tone="ink">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div className="min-w-0">
              <Folio index="03">{t3("v3Explore")}</Folio>

              <h2 className="v3-h2 mt-8 max-w-[22ch] text-balance">{t("fcsVideoBannerTitle")}</h2>

              <div className="mt-10">
                <Button href={toV3("/watch-and-learn")} size="lg" arrow>
                  {t("watchNowBtn")}
                </Button>
              </div>
            </div>

            <Plate
              src={`${DAM}/Watch_and_learn.svg`}
              alt={t("fcsWatchLearnAlt")}
              mount
              ratio="4 / 3"
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="min-w-0"
            />
          </div>
        </Container>
      </Section>

      {/* ── 04. The terms, set as clauses at the foot of the document. */}
      <Section space="lg">
        <Container>
          <SectionHead index="04" folio={t("termsConditions")} title={t("fcsTermsHeading")} />

          <ol className="mt-12 border-t border-[var(--v3-line-2)]">
            {TERMS.map((term, i) => (
              <Reveal key={term} variant="rise" delay={i * 70} as="li">
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-8">
                  <span aria-hidden className="v3-num pt-0.5 text-sm text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[68ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                    {t(term)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Rule className="mt-16" strong />
        </Container>
      </Section>
    </>
  );
}
