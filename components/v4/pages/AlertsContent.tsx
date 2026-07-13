"use client";

import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section } from "@/components/v4/ui/Layout";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Reveal } from "@/components/v4/motion/Reveal";
import { BellIcon, CheckIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * CIBIL Alerts.
 *
 * The product is a *watch*: six things about you that CIBIL will tell you the moment they move. So
 * the hero's aside is the watch-list itself — the six fields, named — rather than the phone
 * mock-up V1 bleeds off the right edge. What the reader wants to know before anything else is
 * "what exactly are you watching?", and V1 answers that in a pale blue strip below the fold.
 *
 * The heading keeps V1's own emphasis: the catalog ships the word to underline
 * (`alrInstantHeadingHighlight`) as its own key, per locale, so the mark lands on the right word in
 * Hindi and Tamil too. V1 draws a yellow bar under it; V4 draws the gold rule, which is the same
 * gesture in this system's own hand.
 */

/* The other things a subscription carries, in V1's order. */
const BENEFITS: TranslationKey[] = [
  "productIndividualsTitle",
  "featScoreHistory",
  "featWhereYouStand",
  "footerCreditEducation",
];

interface Plan {
  name: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  save: TranslationKey;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "alrPlanStandard",
    price: "alrPlanStandardPrice",
    period: "alrPlanStandardPeriod",
    save: "planStandardSave",
  },
  {
    name: "alrPlanPremium",
    price: "alrPlanPremiumPrice",
    period: "alrPlanPremiumPeriod",
    save: "planPremiumSave",
    popular: true,
  },
];

/**
 * The heading, with the catalog's own emphasis word marked.
 *
 * Split on the word rather than stored as three keys, because the word's *position* in the sentence
 * moves between languages — in Hindi it is nowhere near where it sits in English — and a
 * prefix/word/suffix triple would freeze the English word order into every locale.
 */
function InstantHeading({ id }: { id: string }) {
  const { t } = useV4();
  const heading = t("alrInstantHeading");
  const word = t("alrInstantHeadingHighlight");
  const at = heading.indexOf(word);

  if (at < 0) {
    return (
      <h2 id={id} className="v4-h2">
        {heading}
      </h2>
    );
  }

  return (
    <h2 id={id} className="v4-h2">
      {heading.slice(0, at)}
      <span className="v4-mark-word">{word}</span>
      {heading.slice(at + word.length)}
    </h2>
  );
}

export default function AlertsContent() {
  const { t } = useV4();

  /* Every locale ships this as one pipe-delimited string — it is a list, and V1 prints it as a
     sentence. Six fields deserve six objects. */
  const monitored = t("alrMonitorItems")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navProducts"), href: toV4("/choose-subscription") }}
        label={t("featCibilAlerts")}
        title={t("alrHeroTitle")}
        lede={t("alrHeroDesc")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("getAlertsBtn")}
          </ButtonLink>
        }
        aside={
          <div className="v4-plane p-6 sm:p-8">
            <p className="v4-label flex items-center gap-2">
              <BellIcon size={16} />
              {t("alrMonitorLabel")}
            </p>

            <ul className="mt-6 grid gap-2.5">
              {monitored.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-[var(--v4-edge)] pb-2.5 last:border-b-0 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="v4-num text-[0.6875rem] text-[var(--v4-fg-3)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] font-bold text-[var(--v4-fg)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* ── What the alert is worth, and what it costs. ─────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-alr-instant">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <InstantHeading id="v4-alr-instant" />
              <p className="v4-lede mt-5">{t("alrInstantDesc")}</p>

              <p className="mt-10 font-bold text-[var(--v4-fg)]">{t("alrOtherBenefits")}</p>
              <ul className="mt-4 grid gap-3">
                {BENEFITS.map((benefit, i) => (
                  <Reveal
                    as="li"
                    key={benefit}
                    index={i}
                    className="flex items-center gap-3 text-[0.9375rem] text-[var(--v4-fg-2)]"
                  >
                    <CheckIcon size={18} className="shrink-0 text-[var(--v4-success)]" />
                    <span>{t(benefit)}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <div className="grid gap-5 sm:grid-cols-2">
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

                    <p className="v4-num mt-6 text-[2.25rem] font-medium leading-none text-[var(--v4-fg)]">
                      {t(plan.price)}
                    </p>

                    <p className="v4-caption mt-3 flex flex-wrap items-center gap-2">
                      <span>{t(plan.period)}</span>
                      <span className="v4-chip">{t(plan.save)}</span>
                    </p>

                    <ButtonLink
                      href={toV4("/choose-subscription")}
                      variant={plan.popular ? "primary" : "secondary"}
                      size="sm"
                      className="mt-7 w-full"
                    >
                      {t("sidebarSubscribeNowBtn")}
                    </ButtonLink>
                  </Reveal>
                ))}
              </div>

              <p className="v4-caption mt-4">{t("alrOnlyStandardPremium")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The closing line: one sentence, one door. ───────────────────────────────────────── */}
      <Section tone="tint" space="sm">
        <Container width="wide">
          <p className="v4-lede mx-auto text-center">
            <Link href={toV4("/cibil-score-report")} className="v4-link">
              {t("alrSafeguardClickHere")}
            </Link>{" "}
            {t("safeguardProfileBanner")}
          </p>
        </Container>
      </Section>
    </>
  );
}
