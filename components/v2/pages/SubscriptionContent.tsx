"use client";

import Image from "next/image";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import type { TranslationKey } from "@/lib/i18n";
import PageHero from "@/components/v2/ui/PageHero";
import Backdrop from "@/components/v2/ui/Backdrop";
import Badge from "@/components/v2/ui/Badge";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Accordion, { type AccordionItem } from "@/components/v2/ui/Accordion";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { CheckCircleIcon, CrossCircleIcon } from "@/components/icons";

const CTA_BANNER = "https://www.cibil.com/content/dam/cibil/consumer/select-plan/cta-banner-mob.png";

/** The six feature rows, in V1's display order. A plan carries the first `count` of them. */
const FEATURE_ROWS: TranslationKey[] = [
  "featCibilAlerts",
  "featCibilScoreReport",
  "featScoreSimulator",
  "featScoreHistory",
  "featWhereYouStand",
  "featCibilSaksham",
];

type Plan = {
  id: string;
  name: TranslationKey;
  price: TranslationKey;
  wasPrice?: TranslationKey;
  duration: TranslationKey;
  save?: TranslationKey;
  /** Rows carried, from the top of FEATURE_ROWS. */
  rows: number;
  /** Basic shows the Alerts row struck out rather than hiding it. */
  excludesAlerts?: boolean;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "planBasicName",
    price: "planBasicPrice",
    duration: "planBasicDuration",
    rows: 5,
    excludesAlerts: true,
  },
  {
    id: "standard",
    name: "planStandardName",
    price: "planStandardPrice",
    wasPrice: "planStandardWasPrice",
    duration: "planStandardDuration",
    save: "planStandardSave",
    rows: 6,
  },
  {
    id: "premium",
    name: "planPremiumName",
    price: "planPremiumPrice",
    wasPrice: "planPremiumWasPrice",
    duration: "planPremiumDuration",
    save: "planPremiumSave",
    rows: 6,
    featured: true,
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

/**
 * The subscription page — the conversion spine of the site.
 *
 * V1 sets three equal white boxes on a white page and lets Premium's dark header carry the
 * emphasis alone. Here the recommended plan is physically lifted out of the row, lit with the
 * brand's gold, and its list prices are struck through against the savings badge, so the offer
 * is legible in a glance rather than after a read. Every plan, feature row, note and FAQ from
 * V1 survives — including Starter, which V1 hides in a grey strip below the fold.
 */
export default function SubscriptionContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("navProducts") }, { label: t("sitemapSubscriptionPlans") }]}
        eyebrow={t("sitemapCreditReportProducts")}
        title={`${t("homeHeroMonitor")} ${t("homeHeroBrand")}`}
        titleAccent={t("homeHeroSuffix")}
        align="center"
        tone="gold"
        size="md"
      />

      {/* Plans. */}
      <Section space="none" tone="canvas" className="pb-24 sm:pb-32">
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-7">
            {PLANS.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>

          <StarterStrip />
          <PlanNotes />
        </Container>
      </Section>

      <AppPromo />

      {/* FAQs. */}
      <Section space="xl" tone="canvas">
        <Container width="narrow">
          <SectionHeading
            align="center"
            eyebrow={t("navSupport")}
            title={t("subFaqHeading")}
            lede={t("subFaqSubheading")}
          />
          <Reveal variant="up" delay={80} className="mt-14">
            <Accordion
              multiple
              items={FAQS.map<AccordionItem>(({ q, a }) => ({
                id: q,
                question: t(q),
                answer: <p>{t(a)}</p>,
              }))}
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const { t, tv } = useV2();
  const featured = plan.featured ?? false;

  return (
    <Reveal
      variant="up"
      delay={index * 110}
      className={featured ? "lg:-mt-8 lg:mb-8" : ""}
    >
      <div
        className={`v2-rim relative flex h-full flex-col overflow-hidden rounded-[var(--v2-r-lg)] transition-[transform,box-shadow] duration-500 ease-[var(--v2-ease)] hover:-translate-y-1 ${
          featured
            ? "bg-linear-to-b from-[#0f5773] to-[#0a3a52] shadow-[0_28px_90px_-30px_rgba(245,197,24,0.55),var(--v2-shadow-3)]"
            : "v2-glass shadow-[var(--v2-shadow-2)]"
        }`}
      >
        {/* The lit plan gets a gold hairline along its top edge — the only one in the row. */}
        {featured && (
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[var(--v2-gold)] to-transparent"
          />
        )}

        <div className="p-8">
          <p className="text-lg text-[var(--v2-text-2)]">{t(plan.name)}</p>

          {/* Held in the flow even when absent, so the three price blocks line up. */}
          <p
            aria-hidden={!plan.wasPrice}
            className={`mt-5 text-sm text-[var(--v2-text-3)] line-through ${plan.wasPrice ? "" : "invisible"}`}
          >
            {plan.wasPrice ? t(plan.wasPrice) : "—"}
          </p>

          <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="text-[2.75rem] font-light leading-none tracking-tight tabular-nums text-[var(--v2-text)]">
              {t(plan.price)}
            </span>
            <span className="text-sm text-[var(--v2-text-2)]">/ {t(plan.duration)}</span>
          </p>

          {plan.save && (
            <p className="mt-4">
              <Badge tone={featured ? "gold" : "success"} pulse={featured}>
                {t(plan.save)}
              </Badge>
            </p>
          )}

          <div className="mt-8">
            <Button
              href={toV2("/register")}
              variant={featured ? "primary" : "ghost"}
              full
              className={featured ? "" : "border-[rgba(245,197,24,0.55)] hover:border-[var(--v2-gold)] hover:text-[var(--v2-gold)]"}
            >
              {t("subscribeNow")}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col border-t border-[var(--v2-line)] p-8">
          <p className="v2-eyebrow text-[var(--v2-text-3)]">{t("featuresInclude")}</p>
          <ul className="mt-5 space-y-4">
            {FEATURE_ROWS.slice(0, plan.rows).map((row, rowIndex) => {
              const included = !(plan.excludesAlerts && rowIndex === 0);
              return (
                <li
                  key={row}
                  className={`flex items-center gap-3 text-sm ${
                    included ? "text-[var(--v2-text-2)]" : "text-[var(--v2-text-3)] line-through"
                  }`}
                >
                  {included ? (
                    <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-[var(--v2-cyan)]" />
                  ) : (
                    <CrossCircleIcon className="h-4.5 w-4.5 shrink-0 text-[var(--v2-error)]" />
                  )}
                  <span>{t(row)}</span>
                  {/* The strike-through and the cross are both visual-only; without this the
                      excluded row is announced exactly like an included one. */}
                  <span className="sr-only">{tv(included ? "v2Included" : "v2NotIncluded")}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/** Starter — a single purchase, not a subscription, so it sits outside the row on its own rail. */
function StarterStrip() {
  const { t } = useV2();

  return (
    <Reveal variant="up" className="mt-8">
      <div className="v2-glass v2-rim flex flex-col gap-8 rounded-[var(--v2-r-lg)] p-8 sm:flex-row sm:items-start sm:justify-between sm:p-10">
        <div>
          <h2 className="v2-h3 text-[var(--v2-text)]">{t("starterStripHeading")}</h2>
          <p className="mt-5 v2-eyebrow text-[var(--v2-text-3)]">{t("starterStripPlanLabel")}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2.5">
            <span className="text-3xl font-light tracking-tight tabular-nums text-[var(--v2-text)]">
              {t("planStarterPrice")}
            </span>
            <span className="text-sm text-[var(--v2-text-2)]">{t("planStarterPeriod")}</span>
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <Button href={toV2("/register")} variant="secondary">
            {t("subscribeNow")}
          </Button>
          <p className="mt-6 max-w-xs text-sm italic text-[var(--v2-text-3)]">{t("starterStripNote")}</p>
        </div>
      </div>
    </Reveal>
  );
}

function PlanNotes() {
  const { t } = useV2();

  return (
    <Reveal variant="up" delay={80} className="mt-6">
      <Callout tone="note" title={t("planNoteLabel")}>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--v2-cyan)]" />
            <span>
              {t("planNoteAnnualReport")}{" "}
              <Link
                href={toV2("/freecibilscore")}
                className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]"
              >
                {t("planNoteClickHere")}
              </Link>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--v2-cyan)]" />
            <span>{t("planNoteRewards")}</span>
          </li>
        </ul>
      </Callout>
    </Reveal>
  );
}

/** The app band — full-bleed, with the phone art running off the right edge of the viewport. */
function AppPromo() {
  const { t } = useV2();

  return (
    <Section space="none" tone="raised" className="isolate overflow-hidden">
      <Backdrop tone="duo" />

      <Container className="relative">
        <div className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-8">
          <div>
            <Reveal variant="up">
              <h2 className="v2-h2 text-balance text-[var(--v2-text)]">
                {t("appPromoTitle")}{" "}
                <span className="text-[var(--v2-cyan)]">{t("appPromoSubtitle")}</span>
              </h2>
              <p className="v2-lede mt-6">{t("appPromoTagline")}</p>
            </Reveal>

            <Reveal variant="up" delay={100} className="mt-9">
              <Button href={toV2("/register")} size="lg" arrow magnetic>
                {t("downloadAppBtn")}
              </Button>
            </Reveal>

            <Reveal variant="fade" delay={180} className="mt-10">
              <p className="v2-eyebrow text-[var(--v2-text-3)]">{t("downloadFrom")}</p>
              {/* V1 wraps these badges in href="#" links. A store badge that goes nowhere is
                  worse than an image, so they stay images — the labels survive as alt text. */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Image
                  src="/google-play-badge.svg"
                  alt={t("getItOnGooglePlay")}
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
                <Image
                  src="/app-store-badge.svg"
                  alt={t("downloadOnAppStore")}
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </Reveal>
          </div>

          <Reveal variant="blur" delay={140} className="relative">
            {/* A full-bleed off the right edge sounded good and looked wrong: the artwork started
                at x=1173 on a 1440 canvas, so two-thirds of the phone hung outside the viewport
                and all that survived was a yellow crescent. The art is the point — keep it inside
                the column, right-aligned. */}
            <Image
              src={CTA_BANNER}
              alt=""
              aria-hidden
              width={900}
              height={700}
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="mx-auto h-auto w-full max-w-lg select-none lg:ml-auto lg:mr-0"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
