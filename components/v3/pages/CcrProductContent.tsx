"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { CCR_HERO, CCR_OFFER_DEADLINE, CCR_RANK_VIDEO } from "@/lib/v3/productArt";
import { Container, Folio, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Accordion, { type AccordionItem } from "@/components/v3/ui/Accordion";
import Button from "@/components/v3/ui/Button";
import Emphasise from "@/components/v3/ui/Emphasise";
import Ledger from "@/components/v3/ui/Ledger";
import MarginRail, { type RailLink } from "@/components/v3/ui/MarginRail";
import Rule from "@/components/v3/ui/Rule";
import Tabs from "@/components/v3/ui/Tabs";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * CIBIL Rank & Company Credit Report.
 *
 * The longest of the product pages, and the one that most wants to be a document: it defines two
 * things, argues three benefits, prices three plans, lists three caveats and answers four
 * questions. So it *is* a document — a two-column spread with a sticky margin rail, and every
 * part of it ruled rather than boxed.
 *
 * The one place it raises its voice is the offer, which is the only genuinely time-bound thing on
 * the page: it takes the ink band, and the countdown is set in mono, digit by digit, as a printed
 * counter rather than a row of glowing tiles. Everything under it is paper.
 *
 * V1 hangs the DD instructions and the three "things you need to understand" off `href="#"`. V3
 * does not ship dead links, so the words stay and the anchors do not — the same call V2 made.
 */
const BENEFITS: { titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { titleKey: "ccpBenefit1Title", descKey: "ccpBenefit1Desc" },
  { titleKey: "ccpBenefit2Title", descKey: "ccpBenefit2Desc" },
  { titleKey: "ccpBenefit3Title", descKey: "ccpBenefit3Desc" },
];

const THINGS: TranslationKey[] = ["ccpThing1", "ccpThing2", "ccpThing3"];

/**
 * The offer clock. V1 recomputes once a minute, which is the right cadence for a countdown that
 * only ever shows days, hours and minutes.
 *
 * It returns `null` until the first effect runs, so the server and the first client render agree
 * on zeroes rather than on two different clock readings — a countdown is the classic hydration
 * mismatch, and this is what stops it being one.
 */
function useCountdown(deadline: number) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [deadline]);

  if (remaining === null) return null;
  const totalMinutes = Math.floor(remaining / 60_000);
  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor((totalMinutes % (60 * 24)) / 60),
    minutes: totalMinutes % 60,
  };
}

export default function CcrProductContent() {
  const { t, t3 } = useV3();
  const time = useCountdown(CCR_OFFER_DEADLINE);

  const clock: { value: number; label: string }[] = [
    { value: time?.days ?? 0, label: t("ccrfCountdownDay") },
    { value: time?.hours ?? 0, label: t("ccrfCountdownHr") },
    { value: time?.minutes ?? 0, label: t("ccrfCountdownMin") },
  ];

  const rail: RailLink[] = [
    { id: "ccr-overview", label: t3("v3AtAGlance") },
    { id: "ccr-benefits", label: t3("v3KeyPoints") },
    { id: "ccr-plans", label: t("sitemapSubscriptionPlans") },
    { id: "ccr-understand", label: t3("v3DetailsLabel") },
    { id: "ccr-faqs", label: t("faqs") },
  ];

  const plans = [
    [
      t("sspPlanBasic"),
      <span key="p" className="v3-num text-lg font-medium text-[var(--v3-fg)]">
        {t("ccpBasicPrice")}
      </span>,
      t("ccpBasicPeriod"),
      <span key="i" className="block">
        <span className="block">{t("ccpBasicRefresh")}</span>
        <span className="mt-1 block">{t("ccpAccessDashboard")}</span>
      </span>,
    ],
    [
      t("sspPlanStandard"),
      <span key="p" className="v3-num text-lg font-medium text-[var(--v3-fg)]">
        {t("ccpStandardPrice")}
      </span>,
      t("ccpStandardPeriod"),
      <span key="i" className="block">
        <span className="block">{t("ccpStandardRefresh")}</span>
        <span className="mt-1 block">{t("ccpAccessDashboard")}</span>
        <span className="mt-1 block text-[var(--v3-fg)]">{t("featCibilSaksham")}</span>
      </span>,
    ],
    [
      t("sspPlanPremium"),
      <span key="p" className="v3-num text-lg font-medium text-[var(--v3-fg)]">
        {t("ccpPremiumPrice")}
      </span>,
      t("ccpPremiumPeriod"),
      <span key="i" className="block">
        <span className="block">{t("ccpPremiumRefresh")}</span>
        <span className="mt-1 block">{t("ccpAccessDashboard")}</span>
        <span className="mt-1 block text-[var(--v3-fg)]">{t("featCibilSaksham")}</span>
      </span>,
    ],
  ];

  const subscriptionFaqs: AccordionItem[] = [
    { question: t("ccpFaq1"), answer: <p>{t("ccpFaqA1")}</p> },
    { question: t("ccpFaq2"), answer: <p>{t("ccpFaqA2")}</p> },
  ];

  const postPurchaseFaqs: AccordionItem[] = [
    { question: t("ccpFaq3"), answer: <p>{t("ccpFaqA3")}</p> },
    { question: t("ccpFaq4"), answer: <p>{t("ccpFaqA4")}</p> },
  ];

  return (
    <>
      <PageHeader
        size="full"
        folio={t("productBusinessTag")}
        breadcrumbs={[
          { label: t("navProducts"), href: toV3("/choose-subscription") },
          { label: t("megaCompanyCreditReport") },
        ]}
        title={[<Emphasise key="t" text={t("ccpHeroTitle")} word={t("ccrfDiffRankHeader")} />]}
        lede={t("ccpHeroDesc")}
        actions={
          <>
            <Button href={toV3("/choose-subscription")} size="lg" arrow>
              {t("sidebarSubscribeNowBtn")}
            </Button>
            <p className="text-sm text-[var(--v3-fg-2)]">
              {t("ccpAlready")}{" "}
              <Link href={toV3("/login")} className="v3-focus v3-link font-medium text-[var(--v3-fg)]">
                {t("loginNow")}
              </Link>
            </p>
          </>
        }
        media={
          <Plate src={CCR_HERO} alt={t("ccpHeroTitle")} priority fit="cover" ratio="4 / 3" drift />
        }
      />

      {/* The offer. The page's only ink band, and the only thing on it that expires. */}
      <Section space="md" tone="ink">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div className="min-w-0">
              <p className="v3-folio text-[var(--v3-gold)]">{t("ccrfLimitedOffer")}</p>

              <p className="v3-h2 mt-5 text-balance">
                {t("ccrfOfferPrefix")}{" "}
                <span className="v3-em text-[var(--v3-gold)]">{t("ccrfOfferPercent")}</span>{" "}
                {t("ccrfOfferSuffix")}
              </p>

              <p className="mt-7 flex flex-wrap items-center gap-4">
                <span className="v3-folio text-[var(--v3-fg)]">{t("ccrfUseCode")}</span>
                <span className="v3-num border border-[var(--v3-line-2)] px-4 py-2 text-sm font-medium tracking-[0.12em] text-[var(--v3-fg)]">
                  {t("ccrfCode")}
                </span>
              </p>

              <p className="v3-caption mt-5">{t("ccrfOfferValid")}</p>
            </div>

            {/* The counter. Struck in mono, on a rule — a printed clock, not a row of tiles. */}
            <ul className="flex gap-10 border-t border-[var(--v3-line-2)] pt-6 lg:justify-end">
              {clock.map((unit) => (
                <li key={unit.label}>
                  <p className="v3-num text-4xl leading-none font-medium text-[var(--v3-fg)] sm:text-5xl">
                    {String(unit.value).padStart(2, "0")}
                  </p>
                  <p className="v3-folio mt-3">{unit.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* The document. Everything below reads in one column, with the rail tracking it. */}
      <Section space="lg" ruled>
        <Container>
          <div className="grid gap-x-16 lg:grid-cols-[14rem_1fr]">
            <MarginRail links={rail} />

            <div className="min-w-0">
              {/* ─────────────────────────────────────────────────────────── 01 — the definitions */}
              <section id="ccr-overview" className="scroll-mt-32">
                <Folio index="01">{t3("v3AtAGlance")}</Folio>
                <h2 className="v3-h2 mt-8 max-w-[20ch] text-balance">{t("productBusinessTitle")}</h2>

                <dl className="mt-12 border-t border-[var(--v3-line-2)]">
                  <div className="border-b border-[var(--v3-line)] py-7">
                    <dt className="v3-h3">{t("ccpQ1")}</dt>
                    <dd className="mt-4 max-w-[62ch] text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                      {t("ccpA1")}
                    </dd>
                  </div>

                  <div className="border-b border-[var(--v3-line)] py-7">
                    <dt className="v3-h3">{t("ccpQ2")}</dt>
                    <dd className="mt-4 max-w-[62ch] space-y-3 text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                      <p>{t("ccpQ2Bullet1")}</p>
                      <p>{t("ccpQ2Bullet2")}</p>
                    </dd>
                  </div>
                </dl>

                <Reveal variant="plate" className="mt-12">
                  <figure className="v3-plate v3-plate-mount">
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      aria-label={t("ccpPlayVideo")}
                      className="block aspect-video w-full bg-[var(--v3-ink)]"
                    >
                      <source src={CCR_RANK_VIDEO} type="video/mp4" />
                      <track kind="captions" />
                    </video>
                  </figure>
                </Reveal>

                <div className="mt-12 border-t border-[var(--v3-line-2)] pt-8">
                  <Button href={toV3("/register")} size="lg" arrow>
                    {t("ccpCheckNow")}
                  </Button>

                  {/* The Demand Draft route. V1 links "DOWNLOAD" to nowhere; the word is the fact,
                      so the word stays and the dead anchor does not. */}
                  <p className="mt-7 max-w-[68ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                    {t("ccpDownloadPrefix")}{" "}
                    <strong className="font-semibold text-[var(--v3-fg)]">
                      {t("ccpDownloadLink")}
                    </strong>{" "}
                    {t("ccpDownloadSuffix")}
                  </p>
                </div>
              </section>

              {/* ───────────────────────────────────────────────────────────── 02 — the benefits */}
              <section id="ccr-benefits" className="mt-24 scroll-mt-32 sm:mt-32">
                <Folio index="02">{t3("v3KeyPoints")}</Folio>
                <h2 className="v3-h2 mt-8 max-w-[22ch] text-balance">{t("ccpBenefitsHeading")}</h2>
                <p className="v3-lede mt-6">{t("ccpBenefitsSub")}</p>

                <ol className="mt-12 border-t border-[var(--v3-line-2)]">
                  {BENEFITS.map((benefit, i) => (
                    <Reveal
                      key={benefit.titleKey}
                      as="li"
                      variant="rise"
                      delay={i * 70}
                      className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8"
                    >
                      <span aria-hidden className="v3-num pt-1.5 text-xs text-[var(--v3-fg-3)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-lg leading-snug font-medium text-[var(--v3-fg)]">
                          {t(benefit.titleKey)}
                        </h3>
                        <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                          {t(benefit.descKey)}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ol>

                <p className="v3-caption mt-6 italic">{t("ccpBenefitsDisclaimer")}</p>

                <Button href={toV3("/register")} variant="outline" size="lg" arrow className="mt-10">
                  {t("ccpGetCcrNow")}
                </Button>
              </section>

              {/* ─────────────────────────────────────────────────────────────── 03 — the plans */}
              <section id="ccr-plans" className="mt-24 scroll-mt-32 sm:mt-32">
                <Folio index="03">{t("sitemapSubscriptionPlans")}</Folio>
                <h2 className="v3-h2 mt-8 max-w-[24ch] text-balance">{t("ccpMonitorHeading")}</h2>
                <p className="v3-lede mt-6 max-w-[58ch] text-pretty">{t("ccpMonitorDesc")}</p>

                <Ledger
                  className="mt-12 sm:mx-0 sm:px-0"
                  caption={t("sitemapSubscriptionPlans")}
                  columns={[t3("v3Plan"), t3("v3Price"), t3("v3Term"), t3("v3Included")]}
                  rows={plans}
                />

                <Button href={toV3("/choose-subscription")} size="lg" arrow className="mt-10">
                  {t("sidebarSubscribeNowBtn")}
                </Button>
              </section>

              {/* ────────────────────────────────────────────────────────── 04 — the three caveats */}
              <section id="ccr-understand" className="mt-24 scroll-mt-32 sm:mt-32">
                <Folio index="04">{t3("v3DetailsLabel")}</Folio>
                <h2 className="v3-h2 mt-8 max-w-[20ch] text-balance">{t("ccpThingsHeading")}</h2>

                <ul className="mt-10 border-t border-[var(--v3-line-2)]">
                  {THINGS.map((thing, i) => (
                    <li
                      key={thing}
                      className="flex items-baseline gap-5 border-b border-[var(--v3-line)] py-5"
                    >
                      <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base text-[var(--v3-fg)]">{t(thing)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ───────────────────────────────────────────────────────────────── 05 — the FAQs */}
              <section id="ccr-faqs" className="mt-24 scroll-mt-32 sm:mt-32">
                <Folio index="05">{t("faqs")}</Folio>
                <h2 className="v3-h2 mt-8 text-balance">{t("ccpFaqHeading")}</h2>

                <Tabs
                  className="mt-12"
                  label={t("ccpFaqHeading")}
                  items={[
                    {
                      label: t("ccpFaqTab1"),
                      content: <Accordion items={subscriptionFaqs} numbered />,
                    },
                    {
                      label: t("ccpFaqTab2"),
                      content: <Accordion items={postPurchaseFaqs} numbered />,
                    },
                  ]}
                />
              </section>

              <Rule className="mt-20" strong />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
