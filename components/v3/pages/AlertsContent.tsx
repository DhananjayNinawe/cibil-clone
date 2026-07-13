"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { ALERTS_HERO } from "@/lib/v3/productArt";
import { Container, Folio, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Emphasise from "@/components/v3/ui/Emphasise";
import Ledger from "@/components/v3/ui/Ledger";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import SetType from "@/components/v3/motion/SetType";

/**
 * CIBIL Alerts.
 *
 * The product is *watching* — so the page is built around the watch list. The six things CIBIL
 * Alerts monitors arrive immediately under the masthead as a ruled strip (V1 packs them into one
 * pipe-delimited string, which is a list wearing a sentence's clothes; it is set out as the list
 * it is, and the pipes survive as the delimiter in every locale).
 *
 * Then the page raises its voice once: the promise of instant alerts is a full-bleed ink band,
 * with the four subscription benefits numbered beneath it. Pricing lands back on paper, as a
 * ruled ledger — two plans, three columns, no cards, no "most popular" rosette pinned at 45°.
 */
const BENEFITS: TranslationKey[] = [
  "productIndividualsTitle",
  "featScoreHistory",
  "featWhereYouStand",
  "footerCreditEducation",
];

export default function AlertsContent() {
  const { t, t3 } = useV3();

  /** V1 ships the watch list as "CIBIL Score | Accounts | …" — one key, six entries. */
  const monitored = t("alrMonitorItems")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  const plans = [
    [
      t("alrPlanStandard"),
      <span key="p" className="v3-num text-lg font-medium text-[var(--v3-fg)]">
        {t("alrPlanStandardPrice")}
      </span>,
      <span key="t" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span>{t("alrPlanStandardPeriod")}</span>
        <span className="v3-folio text-[var(--v3-gold)]">{t("planStandardSave")}</span>
      </span>,
    ],
    [
      <span key="n" className="flex flex-col gap-1.5">
        <span>{t("alrPlanPremium")}</span>
        {/* V1 pins a rotated "Most Popular" rosette to the corner of the card. There is no card
            here, so the recommendation is simply printed under the name — in the mono voice, the
            way a table footnotes a row. */}
        <span className="v3-folio text-[var(--v3-accent)]">{t("alrMostPopular")}</span>
      </span>,
      <span key="p" className="v3-num text-lg font-medium text-[var(--v3-fg)]">
        {t("alrPlanPremiumPrice")}
      </span>,
      <span key="t" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span>{t("alrPlanPremiumPeriod")}</span>
        <span className="v3-folio text-[var(--v3-gold)]">{t("planPremiumSave")}</span>
      </span>,
    ],
  ];

  return (
    <>
      <PageHeader
        size="full"
        folio={t("productIndividualsTag")}
        breadcrumbs={[
          { label: t("navProducts"), href: toV3("/choose-subscription") },
          { label: t("featCibilAlerts") },
        ]}
        title={[<Emphasise key="t" text={t("alrHeroTitle")} word={t("featCibilAlerts")} />]}
        lede={t("alrHeroDesc")}
        actions={
          <Button href={toV3("/register")} size="lg" arrow>
            {t("getAlertsBtn")}
          </Button>
        }
        media={<Plate src={ALERTS_HERO} alt="" mount priority ratio="16 / 11" />}
      />

      {/* The watch list. */}
      <Section space="none" className="py-10 sm:py-12">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-12">
            <p className="v3-folio text-[var(--v3-fg)]">{t("alrMonitorLabel")}</p>

            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {monitored.map((item, i) => (
                <li key={item} className="flex items-baseline gap-3">
                  {i > 0 && (
                    <span aria-hidden className="text-[var(--v3-line-3)]">
                      /
                    </span>
                  )}
                  <span className="text-sm font-medium text-[var(--v3-fg)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 01 — the promise, and the four benefits that come with it. The page's one raised voice. */}
      <Section space="xl" tone="ink">
        <Container>
          <Folio index="01">{t3("v3KeyPoints")}</Folio>

          <div className="mt-12 grid gap-x-16 gap-y-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <h2 className="v3-h1 text-balance">
              <SetType
                lines={[
                  <Emphasise
                    key="h"
                    text={t("alrInstantHeading")}
                    word={t("alrInstantHeadingHighlight")}
                  />,
                ]}
              />
            </h2>

            <Reveal variant="rise" delay={220}>
              <p className="v3-lede max-w-[30ch] text-pretty lg:pb-2">{t("alrInstantDesc")}</p>
            </Reveal>
          </div>

          <div className="mt-20">
            <p className="v3-folio mb-6">{t("alrOtherBenefits")}</p>

            <ul className="grid border-t border-[var(--v3-line-2)] sm:grid-cols-2 sm:gap-x-16">
              {BENEFITS.map((benefit, i) => (
                <Reveal
                  key={benefit}
                  as="li"
                  variant="rise"
                  delay={i * 60}
                  className="flex items-baseline gap-5 border-b border-[var(--v3-line)] py-5"
                >
                  <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-[var(--v3-fg)]">{t(benefit)}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 02 — pricing, as a ledger. */}
      <Section space="lg">
        <Container>
          <Folio index="02">{t("sitemapSubscriptionPlans")}</Folio>

          <Ledger
            className="mt-10 sm:mx-0 sm:px-0"
            caption={t("sitemapSubscriptionPlans")}
            columns={[t3("v3Plan"), t3("v3Price"), t3("v3Term")]}
            rows={plans}
          />

          <p className="v3-caption mt-5">{t("alrOnlyStandardPremium")}</p>

          <Button href={toV3("/choose-subscription")} size="lg" arrow className="mt-10">
            {t("sidebarSubscribeNowBtn")}
          </Button>
        </Container>
      </Section>

      {/* The cross-reference out to the Score & Report — a printed "see also". */}
      <Section space="md" tone="sunken" ruled>
        <Container>
          <Rule className="mb-8" />
          <p className="max-w-[64ch] text-pretty text-base leading-relaxed text-[var(--v3-fg-2)]">
            <Link
              href={toV3("/cibil-score-report")}
              className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
            >
              {t("alrSafeguardClickHere")}
            </Link>{" "}
            {t("safeguardProfileBanner")}
          </p>
        </Container>
      </Section>
    </>
  );
}
