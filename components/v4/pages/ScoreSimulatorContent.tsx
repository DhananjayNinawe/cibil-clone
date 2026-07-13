"use client";

import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import {
  BellIcon,
  ChartIcon,
  DocumentIcon,
  ScoreIcon,
  UsersIcon,
  type IconProps,
} from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The Score Simulator.
 *
 * The product answers one question — *what happens to my score if I do this?* — and the only thing
 * a visitor needs to see is the list of "this"es. V1 has that list, in five bullets, buried in the
 * second answer of the FAQ at the bottom of the page. So V4 lifts it into the hero: the aside is
 * the five simulations you can actually run, which is the product, stated.
 *
 * The legal disclaimer is a `Notice`, not a line of six-point grey type: a tool that models futures
 * has to say out loud that it is not predicting one, and V1's own copy says so plainly. Burying
 * that sentence is how a modelling tool turns into a promise.
 */

const SIMULATOR_VIDEO = "https://www.cibil.com/content/dam/cibil/consumer/scr-sim%20video.mp4";

/** The simulations the tool actually offers. V1's `ssA2` bullets, in V1's order. */
const SIMULATIONS: TranslationKey[] = [
  "ssA2Bullet1",
  "ssA2Bullet2",
  "ssA2Bullet3",
  "ssA2Bullet4",
  "ssA2Bullet5",
];

interface Plan {
  name: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  popular?: boolean;
}

const PLANS: Plan[] = [
  { name: "sspPlanBasic", price: "planBasicPrice", period: "planBasicPeriod" },
  { name: "sspPlanStandard", price: "planStandardPrice", period: "planStandardPeriod" },
  { name: "sspPlanPremium", price: "planPremiumPrice", period: "planPremiumPeriod", popular: true },
];

/** The five things a subscription carries, as V1 lists them on this page. */
const FEATURES: {
  icon: (props: IconProps) => React.ReactElement;
  bold: TranslationKey;
  rest: TranslationKey;
}[] = [
  { icon: DocumentIcon, bold: "csrFeatUnlimitedBold", rest: "csrFeatUnlimited" },
  { icon: ScoreIcon, bold: "csrFeatSimulatorBold", rest: "csrFeatSimulator" },
  { icon: BellIcon, bold: "csrFeatAlertsBold", rest: "csrFeatAlerts" },
  { icon: ChartIcon, bold: "csrFeatTrendedBold", rest: "csrFeatTrended" },
  { icon: UsersIcon, bold: "csrFeatWhereBold", rest: "csrFeatWhere" },
];

export default function ScoreSimulatorContent() {
  const { t, t4 } = useV4();

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navProducts"), href: toV4("/choose-subscription") }}
        label={t("featScoreSimulator")}
        title={t("sspHeroTitle")}
        lede={t("ssHeroDesc")}
        actions={
          <>
            <ButtonLink href={toV4("/register")} size="lg" arrow>
              {t("simulateNowBtn")}
            </ButtonLink>
            <ButtonLink href={toV4("/choose-subscription")} size="lg" variant="secondary">
              {t("sitemapSubscriptionPlans")}
            </ButtonLink>
          </>
        }
        aside={
          <div className="v4-plane p-6 sm:p-8">
            <p className="v4-body !text-[0.9375rem]">{t("ssA2Intro")}</p>

            <ol className="mt-6 grid gap-0">
              {SIMULATIONS.map((sim, i) => (
                <li
                  key={sim}
                  className="flex items-start gap-4 border-t border-[var(--v4-edge)] py-3.5 last:border-b"
                >
                  <span
                    aria-hidden="true"
                    className="v4-num pt-0.5 text-[0.6875rem] text-[var(--v4-fg-3)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] font-bold leading-snug text-[var(--v4-fg)]">
                    {t(sim)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      {/* ── How it works, with CIBIL's own walk-through beside it. ──────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-sim-how">
        <Container width="wide">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <SectionHead id="v4-sim-how" title={t("sspHowHeading")} />
              <p className="v4-body mt-6">{t("sspHowPara1")}</p>
              <p className="v4-body mt-4">{t("sspHowPara2")}</p>
              <p className="v4-caption mt-8">{t("watchThisVideoLine")}</p>
            </div>

            {/* A real <video controls>, named — an unlabelled player announces itself as "video"
                and nothing else, which tells a screen-reader user nothing about what is in it. */}
            <Reveal
              variant="focus"
              className="v4-plane overflow-hidden bg-[var(--v4-ink)] p-0"
            >
              <video
                controls
                preload="metadata"
                playsInline
                aria-label={t("sspHowHeading")}
                className="aspect-video w-full"
              >
                <source src={SIMULATOR_VIDEO} type="video/mp4" />
                <track kind="captions" />
              </video>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── What the simulator comes with. ─────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-sim-plans">
        <Container width="wide">
          <SectionHead
            id="v4-sim-plans"
            label={t4("v4SectionProducts")}
            title={t("sspTableHeading")}
            lede={t("sspTableDesc")}
          />

          <div className="mt-11 grid gap-5 sm:grid-cols-3">
            {PLANS.map((plan, i) => (
              <Reveal
                key={plan.name}
                index={i}
                className={`v4-plane flex h-full flex-col p-6 ${
                  plan.popular
                    ? "border-[color-mix(in_srgb,var(--v4-gold)_55%,transparent)]"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="v4-h3">{t(plan.name)}</h3>
                  {plan.popular ? (
                    <span className="v4-chip v4-chip-you">{t("alrMostPopular")}</span>
                  ) : null}
                </div>

                <p className="v4-num mt-5 text-[2rem] font-medium leading-none text-[var(--v4-fg)]">
                  {t(plan.price)}
                </p>
                <p className="v4-caption mt-2.5">{t(plan.period)}</p>

                <ButtonLink
                  href={toV4("/choose-subscription")}
                  variant={plan.popular ? "primary" : "secondary"}
                  size="sm"
                  className="mt-7 w-full"
                >
                  {t("getStartedBtn")}
                </ButtonLink>
              </Reveal>
            ))}
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <Reveal
                as="li"
                key={feature.bold}
                index={i}
                className="v4-plane-flat flex items-start gap-4 p-5"
              >
                <feature.icon size={22} className="mt-0.5 shrink-0 text-[var(--v4-accent)]" />
                <p className="text-[0.875rem] leading-relaxed text-[var(--v4-fg-2)]">
                  <strong className="block font-bold text-[var(--v4-fg)]">{t(feature.bold)}</strong>
                  {t(feature.rest)}
                </p>
              </Reveal>
            ))}
          </ul>

          <p className="v4-caption mt-5">{t("alrOnlyStandardPremium")}</p>
        </Container>
      </Section>

      {/* ── The disclaimer, then the questions. ────────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-sim-faq">
        <Container>
          <Notice tone="warning" title={t("ssDisclaimerLabel")}>
            {t("sspDisclaimerShort")}
          </Notice>

          <SectionHead
            id="v4-sim-faq"
            label={t("faqs")}
            title={t("fcsFaqHeading")}
            className="mt-16"
          />

          <div className="mt-10">
            <DisclosureList>
              <Disclosure question={t("ssQ1")} defaultOpen>
                <p>{t("ssA1")}</p>
              </Disclosure>

              <Disclosure question={t("ssQ2")}>
                <p>{t("ssA2Intro")}</p>
                <ul>
                  {SIMULATIONS.map((sim) => (
                    <li key={sim}>{t(sim)}</li>
                  ))}
                </ul>
                <p>{t("ssA2Outro")}</p>
              </Disclosure>

              <Disclosure question={t("ssQ3")}>
                <p>
                  {t("ssA3Para1Prefix")}{" "}
                  <Link href={toV4("/choose-subscription")}>{t("ssA3Para1Link")}</Link>
                </p>
                <p>
                  {t("ssA3Para2Prefix")}{" "}
                  <Link href={toV4("/login")}>{t("ssA3Para2Link")}</Link>
                </p>
              </Disclosure>

              <Disclosure question={t("ssQ4")}>
                <p>{t("ssA4")}</p>
              </Disclosure>

              <Disclosure question={t("ssQ5")}>
                <p>{t("ssA5")}</p>
              </Disclosure>
            </DisclosureList>
          </div>
        </Container>
      </Section>
    </>
  );
}
