"use client";

import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import type { TranslationKey } from "@/lib/i18n";
import PageHero from "@/components/v2/ui/PageHero";
import Backdrop from "@/components/v2/ui/Backdrop";
import Badge from "@/components/v2/ui/Badge";
import Button from "@/components/v2/ui/Button";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import Marquee from "@/components/v2/motion/Marquee";
import { BellIcon, CheckCircleIcon } from "@/components/icons";

const HERO_BANNER = "https://www.cibil.com/content/dam/cibil/consumer/alerts/alert-banner-web.png";

/** The other things a subscription buys — V1's list, in V1's order. */
const BENEFITS: TranslationKey[] = [
  "productIndividualsTitle",
  "featScoreHistory",
  "featWhereYouStand",
  "footerCreditEducation",
];

type AlertPlan = {
  id: string;
  name: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  save: TranslationKey;
  popular?: boolean;
};

const PLANS: AlertPlan[] = [
  {
    id: "standard",
    name: "alrPlanStandard",
    price: "alrPlanStandardPrice",
    period: "alrPlanStandardPeriod",
    save: "planStandardSave",
  },
  {
    id: "premium",
    name: "alrPlanPremium",
    price: "alrPlanPremiumPrice",
    period: "alrPlanPremiumPeriod",
    save: "planPremiumSave",
    popular: true,
  },
];

/**
 * CIBIL Alerts.
 *
 * The product is *vigilance*, so the page is built around motion: the six things Alerts watches
 * run past as a live ticker instead of sitting in a static pale-blue bar, and the plan that most
 * people take is marked with a pulsing badge rather than a rotated corner ribbon.
 */
export default function AlertsContent() {
  const { t } = useV2();

  /* V1 authors this as one pipe-delimited string so a locale can reorder or drop items freely.
     Splitting it here keeps that contract — the catalog stays the single source of truth. */
  const monitored = t("alrMonitorItems")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("navProducts") }, { label: t("featCibilAlerts") }]}
        eyebrow={t("sitemapCreditReportProducts")}
        title={t("alrHeroTitle")}
        lede={t("alrHeroDesc")}
        tone="cyan"
        size="md"
        actions={
          <Button href={toV2("/register")} size="lg" arrow magnetic>
            {t("getAlertsBtn")}
          </Button>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_BANNER} alt="" width={576} height={350} priority />
          </Parallax>
        }
      />

      {/* What Alerts watches — a live ticker, because the product never stops looking. */}
      <div className="relative border-y border-[var(--v2-line)] bg-[var(--v2-elev-1)] py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <p className="v2-eyebrow flex shrink-0 items-center gap-3 px-[var(--v2-gutter)] text-[var(--v2-text-3)]">
            <BellIcon className="h-4 w-4 text-[var(--v2-cyan)]" />
            {t("alrMonitorLabel")}
          </p>

          <Marquee duration={38} className="min-w-0 flex-1">
            {monitored.map((item) => (
              <span
                key={item}
                className="mx-2 flex items-center gap-3 whitespace-nowrap rounded-full border border-[var(--v2-line)] bg-[var(--v2-surface)] px-5 py-2 text-sm font-bold text-[var(--v2-text)]"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]"
                />
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* The pitch, and the two plans that carry Alerts. */}
      <Section space="xl" tone="canvas">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal variant="fade">
                <Eyebrow index="01">{t("featCibilAlerts")}</Eyebrow>
              </Reveal>

              <Reveal variant="up" delay={80}>
                <InstantHeading />
                <p className="v2-lede mt-7 text-[var(--v2-text)]">{t("alrInstantDesc")}</p>

                <p className="mt-10 text-base font-bold text-[var(--v2-text)]">{t("alrOtherBenefits")}</p>
                <ul className="mt-5 space-y-3.5">
                  {BENEFITS.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-3 text-[15px] text-[var(--v2-text-2)]"
                    >
                      <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-[var(--v2-cyan)]" />
                      {t(benefit)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                {PLANS.map((plan, index) => (
                  <PlanCard key={plan.id} plan={plan} index={index} />
                ))}
              </div>

              <Reveal variant="fade" delay={220}>
                <p className="mt-6 text-xs text-[var(--v2-text-3)]">{t("alrOnlyStandardPremium")}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Safeguard band — the hand-off to the full Score & Report product. */}
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="cyan" />
        <Container width="narrow" className="relative">
          <Reveal variant="up">
            <p className="text-center text-lg leading-relaxed text-[var(--v2-text-2)]">
              <Link
                href={toV2("/cibil-score-report")}
                className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]"
              >
                {t("alrSafeguardClickHere")}
              </Link>{" "}
              {t("safeguardProfileBanner")}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/**
 * V1 underlines one word of the heading in brand gold, and authors that word as its own key so
 * each locale can pick the word that carries the sentence. Same contract here — if the locale's
 * word is not present in its heading, the heading simply renders plain.
 */
function InstantHeading() {
  const { t } = useV2();
  const heading = t("alrInstantHeading");
  const word = t("alrInstantHeadingHighlight");
  const at = heading.indexOf(word);

  return (
    <h2 className="v2-h2 mt-5 text-balance text-[var(--v2-text)]">
      {at < 0 ? (
        heading
      ) : (
        <>
          {heading.slice(0, at)}
          <span className="relative inline-block text-[var(--v2-cyan)]">
            {word}
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-[var(--v2-gold)] shadow-[var(--v2-glow-gold)]"
            />
          </span>
          {heading.slice(at + word.length)}
        </>
      )}
    </h2>
  );
}

function PlanCard({ plan, index }: { plan: AlertPlan; index: number }) {
  const { t } = useV2();
  const popular = plan.popular ?? false;

  return (
    <Reveal variant="up" delay={index * 110}>
      <div
        className={`v2-rim relative flex h-full flex-col overflow-hidden rounded-[var(--v2-r-lg)] p-6 transition-[transform,box-shadow] duration-500 ease-[var(--v2-ease)] hover:-translate-y-1.5 ${
          popular
            ? "bg-linear-to-b from-[rgba(245,197,24,0.14)] to-[rgba(245,197,24,0.03)] shadow-[0_24px_70px_-28px_rgba(245,197,24,0.6)]"
            : "v2-glass shadow-[var(--v2-shadow-1)]"
        }`}
      >
        {popular && (
          <p className="mb-4">
            <Badge tone="gold" pulse>
              {t("alrMostPopular")}
            </Badge>
          </p>
        )}

        <p className="text-sm text-[var(--v2-text-3)]">{t(plan.name)}</p>
        <p className="mt-2 text-4xl font-light tracking-tight tabular-nums text-[var(--v2-text)]">
          {t(plan.price)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-[var(--v2-text-2)]">{t(plan.period)}</span>
          <Badge tone={popular ? "gold" : "success"}>{t(plan.save)}</Badge>
        </div>

        <div className="mt-auto pt-7">
          <Button
            href={toV2("/choose-subscription")}
            variant={popular ? "primary" : "ghost"}
            size="sm"
            full
            className={popular ? "" : "border-[rgba(245,197,24,0.55)] hover:border-[var(--v2-gold)] hover:text-[var(--v2-gold)]"}
          >
            {t("sidebarSubscribeNowBtn")}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
