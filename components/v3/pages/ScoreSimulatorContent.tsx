"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { SIMULATOR_VIDEO } from "@/lib/v3/productArt";
import { Container, Folio, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Accordion, { type AccordionItem } from "@/components/v3/ui/Accordion";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Emphasise from "@/components/v3/ui/Emphasise";
import Ledger from "@/components/v3/ui/Ledger";
import Reveal from "@/components/v3/motion/Reveal";
import { Check, Cross } from "@/components/v3/ui/Icons";

/**
 * Score Simulator.
 *
 * The page has one job: show what the tool does, then show which plan carries it. So it is set as
 * a document — an article beside the product film, a plan strip, and then the feature matrix as a
 * *ruled ledger*, which is the honest shape for "five features against three plans" and the shape
 * V1 was reaching for when it drew a grid of boxed cells with vertical borders.
 *
 * The ticks and crosses get real text alternatives (`v3Included` / `v3NotIncluded`). V1's table
 * marks a cell with a bare glyph, so a screen reader hears the feature name and then silence — it
 * cannot tell an included row from an excluded one. That is a bug, and porting is the moment to
 * fix it, not to reproduce it.
 */
const FEATURE_ROWS: { boldKey: TranslationKey; descKey: TranslationKey; basic: boolean }[] = [
  { boldKey: "csrFeatUnlimitedBold", descKey: "csrFeatUnlimited", basic: true },
  { boldKey: "csrFeatSimulatorBold", descKey: "csrFeatSimulator", basic: true },
  { boldKey: "csrFeatAlertsBold", descKey: "csrFeatAlerts", basic: false },
  { boldKey: "csrFeatTrendedBold", descKey: "csrFeatTrended", basic: true },
  { boldKey: "csrFeatWhereBold", descKey: "csrFeatWhere", basic: true },
];

const PLANS: { nameKey: TranslationKey; priceKey: TranslationKey; periodKey: TranslationKey }[] = [
  { nameKey: "sspPlanBasic", priceKey: "planBasicPrice", periodKey: "planBasicPeriod" },
  { nameKey: "sspPlanStandard", priceKey: "planStandardPrice", periodKey: "planStandardPeriod" },
  { nameKey: "sspPlanPremium", priceKey: "planPremiumPrice", periodKey: "planPremiumPeriod" },
];

const SIMULATIONS: TranslationKey[] = [
  "ssA2Bullet1",
  "ssA2Bullet2",
  "ssA2Bullet3",
  "ssA2Bullet4",
  "ssA2Bullet5",
];

export default function ScoreSimulatorContent() {
  const { t, t3 } = useV3();

  /** A matrix cell: the glyph is decorative, the word beside it is what is actually announced. */
  const Mark = ({ on }: { on: boolean }) => (
    <span className="flex justify-center">
      {on ? (
        <Check className="text-lg text-[var(--v3-pine)]" />
      ) : (
        <Cross className="text-lg text-[var(--v3-clay)]" />
      )}
      <span className="sr-only">{on ? t3("v3Included") : t3("v3NotIncluded")}</span>
    </span>
  );

  const matrix = FEATURE_ROWS.map((row) => [
    <span key="f" className="block">
      <span className="block font-medium text-[var(--v3-fg)]">{t(row.boldKey)}</span>
      <span className="mt-1 block max-w-[42ch] text-[var(--v3-fg-2)]">{t(row.descKey)}</span>
    </span>,
    <Mark key="b" on={row.basic} />,
    <Mark key="s" on />,
    <Mark key="p" on />,
  ]);

  const faqItems: AccordionItem[] = [
    { question: t("ssQ1"), answer: <p>{t("ssA1")}</p> },
    {
      question: t("ssQ2"),
      answer: (
        <>
          <p>{t("ssA2Intro")}</p>
          <ul className="mt-4 space-y-2">
            {SIMULATIONS.map((key) => (
              <li key={key} className="flex items-baseline gap-3">
                <span aria-hidden className="text-[var(--v3-fg-3)]">
                  —
                </span>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">{t("ssA2Outro")}</p>
        </>
      ),
    },
    {
      question: t("ssQ3"),
      answer: (
        <>
          <p>
            {t("ssA3Para1Prefix")}{" "}
            <Link href={toV3("/choose-subscription")} className="v3-focus">
              {t("ssA3Para1Link")}
            </Link>
            .
          </p>
          <p className="mt-3">
            {t("ssA3Para2Prefix")}{" "}
            <Link href={toV3("/login")} className="v3-focus">
              {t("ssA3Para2Link")}
            </Link>
          </p>
        </>
      ),
    },
    { question: t("ssQ4"), answer: <p>{t("ssA4")}</p> },
    { question: t("ssQ5"), answer: <p>{t("ssA5")}</p> },
  ];

  return (
    <>
      <PageHeader
        size="full"
        folio={t("productIndividualsTag")}
        breadcrumbs={[
          { label: t("navProducts"), href: toV3("/choose-subscription") },
          { label: t("featScoreSimulator") },
        ]}
        title={[<Emphasise key="t" text={t("sspHeroTitle")} word={t("featScoreSimulator")} />]}
        lede={t("ssHeroDesc")}
        actions={
          <Button href={toV3("/register")} size="lg" arrow>
            {t("simulateNowBtn")}
          </Button>
        }
      />

      {/* 01 — how it works. The article on the left, the film plated on the right. */}
      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="min-w-0">
              <Folio index="01">{t3("v3ProcessLabel")}</Folio>
              <h2 className="v3-h2 mt-8 max-w-[16ch] text-balance">{t("sspHowHeading")}</h2>
              <p className="mt-7 max-w-[52ch] text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                {t("sspHowPara1")}
              </p>
              <p className="mt-4 max-w-[52ch] text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                {t("sspHowPara2")}
              </p>
            </div>

            {/* A film in a plate: a ruled, square-cornered frame — the mount is the chrome, and
                the browser's own controls are the only interface on top of it. */}
            <Reveal variant="plate">
              <figure className="v3-plate v3-plate-mount">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  aria-label={t("sspHowHeading")}
                  className="block aspect-video w-full bg-[var(--v3-ink)]"
                >
                  <source src={SIMULATOR_VIDEO} type="video/mp4" />
                  <track kind="captions" />
                </video>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 02 — what each plan carries. A strip of three plans, then the matrix. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead
            index="02"
            folio={t("sitemapSubscriptionPlans")}
            title={t("sspTableHeading")}
            lede={t("sspTableDesc")}
          />

          <ul className="mt-14 grid gap-px bg-[var(--v3-line-2)] sm:grid-cols-3">
            {PLANS.map((plan, i) => (
              <Reveal
                key={plan.nameKey}
                as="li"
                variant="rise"
                delay={i * 70}
                className="bg-[var(--v3-bg)] px-6 py-7"
              >
                <p className="v3-folio">{t(plan.nameKey)}</p>
                <p className="v3-num mt-4 text-3xl font-medium text-[var(--v3-fg)]">
                  {t(plan.priceKey)}
                </p>
                <p className="mt-2 text-sm text-[var(--v3-fg-2)]">{t(plan.periodKey)}</p>
              </Reveal>
            ))}
          </ul>

          <Ledger
            className="mt-16"
            caption={t("sspTableHeading")}
            columns={[
              t("sspTableHeading"),
              t("sspPlanBasic"),
              t("sspPlanStandard"),
              t("sspPlanPremium"),
            ]}
            rows={matrix}
          />

          <Button href={toV3("/choose-subscription")} size="lg" arrow className="mt-12">
            {t("getStartedBtn")}
          </Button>
        </Container>
      </Section>

      {/* The disclaimer, as a marginal note with a clay rule down its edge. */}
      <Section space="md">
        <Container>
          <Callout tone="regulatory" title={t("ssDisclaimerLabel")}>
            <p>{t("sspDisclaimerShort")}</p>
          </Callout>
        </Container>
      </Section>

      {/* 03 — the questions. */}
      <Section space="lg" ruled>
        <Container>
          <SectionHead index="03" folio={t("faqs")} title={t("fcsFaqHeading")} />
          <Accordion className="mt-12" items={faqItems} numbered />
        </Container>
      </Section>
    </>
  );
}
