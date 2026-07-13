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
import Rule from "@/components/v3/ui/Rule";
import { Check, Cross } from "@/components/v3/ui/Icons";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * Choose a subscription.
 *
 * V1 puts the three paid plans in three rounded cards side by side, and a card cannot be compared:
 * to answer "does Basic include Alerts?" you have to read one card's list, hold it in your head,
 * and read the next. So V3 sets the plans as a **comparison ledger** — plans across the top,
 * features down the side, one ruled row per feature, prices in tabular mono. The eye tracks along
 * a row and the answer is where the row meets the column, which is the entire reason financial
 * tables have been ruled this way for two hundred years.
 *
 * Two things V1 loses that this recovers:
 *   · A feature Basic simply omits (CIBIL Saksham) is invisible in a card list — there is no row
 *     to be absent from. In a matrix it is an explicit "not included".
 *   · V1's ticks and crosses are bare glyphs. A screen reader announces the feature name and then
 *     nothing at all, so an included row and an excluded one sound identical. Every cell here
 *     carries `v3Included` / `v3NotIncluded` as text.
 *
 * The recommended plan is marked by a rule — a heavy accent hairline drawn over its column — not
 * by a dark panel and a glow. Every fact V1 states is stated here: the same prices, the same
 * struck-through list prices, the same savings, the Starter strip, both notes, the app promo and
 * all six FAQs.
 */

const FEATURE_ROWS: TranslationKey[] = [
  "featCibilAlerts",
  "featCibilScoreReport",
  "featScoreSimulator",
  "featScoreHistory",
  "featWhereYouStand",
  "featCibilSaksham",
];

interface Plan {
  name: TranslationKey;
  price: TranslationKey;
  wasPrice?: TranslationKey;
  duration: TranslationKey;
  save?: TranslationKey;
  /** One flag per row of FEATURE_ROWS, in order. */
  included: boolean[];
  recommended?: boolean;
}

/* Basic carries the first five rows with Alerts struck out (V1: `featuresFor(5, true)`), which
   leaves Saksham off the card entirely — i.e. not included. Standard and Premium carry all six. */
const PLANS: Plan[] = [
  {
    name: "planBasicName",
    price: "planBasicPrice",
    duration: "planBasicDuration",
    included: [false, true, true, true, true, false],
  },
  {
    name: "planStandardName",
    price: "planStandardPrice",
    wasPrice: "planStandardWasPrice",
    duration: "planStandardDuration",
    save: "planStandardSave",
    included: [true, true, true, true, true, true],
  },
  {
    name: "planPremiumName",
    price: "planPremiumPrice",
    wasPrice: "planPremiumWasPrice",
    duration: "planPremiumDuration",
    save: "planPremiumSave",
    included: [true, true, true, true, true, true],
    recommended: true,
  },
];

const FAQS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "subFaqQ1", a: "subFaqA1" },
  { q: "subFaqQ2", a: "subFaqA2" },
  { q: "subFaqQ3", a: "subFaqA3" },
  { q: "subFaqQ4", a: "subFaqA4" },
  { q: "subFaqQ5", a: "subFaqA5" },
  { q: "subFaqQ6", a: "subFaqA6" },
];

const CTA_BANNER = "https://www.cibil.com/content/dam/cibil/consumer/select-plan/cta-banner-mob.png";

function PlanLedger() {
  const { t, t3 } = useV3();

  return (
    <div className="-mx-[var(--v3-gutter)] overflow-x-auto px-[var(--v3-gutter)]">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">{t("sitemapSubscriptionPlans")}</caption>

        <thead>
          <tr>
            <th scope="col" className="v3-folio w-[28%] border-b border-[var(--v3-line-3)] pb-6 align-bottom">
              {t("featuresInclude")}
            </th>

            {PLANS.map((plan) => (
              <th
                key={plan.name}
                scope="col"
                className={`w-[24%] border-b border-[var(--v3-line-3)] px-4 pb-6 align-bottom font-normal ${
                  plan.recommended
                    ? "border-t-2 border-t-[var(--v3-accent)] bg-[var(--v3-bg-raised)] pt-5"
                    : "pt-5"
                }`}
              >
                <p
                  className={`v3-h3 ${plan.recommended ? "text-[var(--v3-accent)]" : "text-[var(--v3-fg)]"}`}
                >
                  {t(plan.name)}
                </p>

                <p className="v3-num mt-5 h-4 text-xs text-[var(--v3-fg-3)] line-through">
                  {plan.wasPrice ? t(plan.wasPrice) : null}
                </p>

                <p className="v3-num mt-2 text-3xl leading-none font-medium text-[var(--v3-fg)]">
                  {t(plan.price)}
                </p>

                <p className="v3-caption mt-2">/ {t(plan.duration)}</p>

                <p className="v3-folio mt-3 h-4 text-[var(--v3-gold)]">
                  {plan.save ? t(plan.save) : null}
                </p>

                <Button href={toV3("/register")} variant="outline" size="sm" full className="mt-5">
                  {t("subscribeNow")}
                </Button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {FEATURE_ROWS.map((row, r) => (
            <tr key={row} className="v3-row border-b border-[var(--v3-line)]">
              <th
                scope="row"
                className="py-5 pr-6 text-left text-sm font-medium text-[var(--v3-fg)]"
              >
                {t(row)}
              </th>

              {PLANS.map((plan) => {
                const included = plan.included[r];
                return (
                  <td
                    key={plan.name}
                    className={`px-4 py-5 text-center ${
                      plan.recommended ? "bg-[var(--v3-bg-raised)]" : ""
                    }`}
                  >
                    {included ? (
                      <Check className="mx-auto text-lg text-[var(--v3-accent)]" />
                    ) : (
                      <Cross className="mx-auto text-lg text-[var(--v3-clay)]" />
                    )}
                    <span className="sr-only">
                      {included ? t3("v3Included") : t3("v3NotIncluded")}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The fourth plan: report without score, bought once. A ruled entry, not a fourth column. */
function StarterEntry() {
  const { t } = useV3();

  return (
    <div className="grid gap-8 border-b border-[var(--v3-line)] py-10 sm:grid-cols-[1.4fr_1fr] sm:items-end sm:gap-16">
      <div className="min-w-0">
        <p className="v3-folio mb-4">{t("starterStripPlanLabel")}</p>
        <h2 className="v3-h3 max-w-[24ch] text-pretty">{t("starterStripHeading")}</h2>

        <p className="mt-6 flex items-baseline gap-3">
          <span className="v3-num text-3xl leading-none font-medium text-[var(--v3-fg)]">
            {t("planStarterPrice")}
          </span>
          <span className="v3-caption">{t("planStarterPeriod")}</span>
        </p>
      </div>

      <div className="sm:text-right">
        <Button href={toV3("/register")} variant="outline">
          {t("subscribeNow")}
        </Button>
        <p className="mt-6 text-sm italic text-[var(--v3-fg-2)]">{t("starterStripNote")}</p>
      </div>
    </div>
  );
}

export default function SubscriptionContent() {
  const { t } = useV3();

  const faqItems: AccordionItem[] = FAQS.map(({ q, a }) => ({
    question: t(q),
    answer: <p>{t(a)}</p>,
  }));

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("sitemapSubscriptionPlans") },
        ]}
        folio={t("navProducts")}
        size="full"
        title={[
          t("homeHeroMonitor"),
          <span key="brand">{t("homeHeroBrand")}</span>,
          <span key="suffix" className="v3-em">
            {t("homeHeroSuffix")}
          </span>,
        ]}
      />

      {/* ── 01. The ledger. */}
      <Section space="lg">
        <Container>
          <Folio index="01">{t("featuresInclude")}</Folio>

          <div className="mt-10">
            <PlanLedger />
          </div>

          <StarterEntry />

          <Reveal variant="rise">
            <Callout tone="note" title={t("planNoteLabel")} className="mt-10">
              <ul className="space-y-2">
                <li>
                  {t("planNoteAnnualReport")}{" "}
                  <Link href={toV3("/freecibilscore")} className="v3-focus">
                    {t("planNoteClickHere")}
                  </Link>
                </li>
                <li>{t("planNoteRewards")}</li>
              </ul>
            </Callout>
          </Reveal>
        </Container>
      </Section>

      {/* ── 02. The app. The one moment the page raises its voice. */}
      <Section space="lg" tone="ink">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div className="min-w-0">
              <Folio index="02">{t("appPromoTagline")}</Folio>

              <h2 className="v3-h2 mt-8 text-balance">
                {t("appPromoTitle")}{" "}
                <span className="v3-em">{t("appPromoSubtitle")}</span>
              </h2>

              <div className="mt-10">
                <Button href={toV3("/register")} size="lg" arrow>
                  {t("downloadAppBtn")}
                </Button>
              </div>

              <p className="v3-folio mt-12">{t("downloadFrom")}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Image
                  src="/google-play-badge.svg"
                  alt={t("getItOnGooglePlay")}
                  width={135}
                  height={40}
                />
                <Image
                  src="/app-store-badge.svg"
                  alt={t("downloadOnAppStore")}
                  width={135}
                  height={40}
                />
              </div>
            </div>

            <Plate
              src={CTA_BANNER}
              alt=""
              mount
              ratio="4 / 3"
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="min-w-0"
            />
          </div>
        </Container>
      </Section>

      {/* ── 03. The questions. */}
      <Section space="lg">
        <Container>
          <SectionHead
            index="03"
            folio={t("faqs")}
            title={t("subFaqHeading")}
            lede={t("subFaqSubheading")}
          />

          <Accordion items={faqItems} numbered className="mt-12" />

          <Rule className="mt-16" strong />
        </Container>
      </Section>
    </>
  );
}
