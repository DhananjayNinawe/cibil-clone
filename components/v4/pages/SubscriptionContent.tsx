"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Ledger, type Column } from "@/components/v4/ui/Ledger";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Choose a subscription.
 *
 * V1 sets the three plans as three cards, and a card cannot be compared: to answer "does Basic
 * include Alerts?" you must read one card's list, hold it in your head, and read the next. So the
 * prices stay as planes — a price is a thing you look at, not a thing you cross-reference — and the
 * *features* move into a ledger, one ruled row each, naming the plans that carry them.
 *
 * ── Why the ledger names plans instead of drawing ticks ──────────────────────────────────────
 * The obvious matrix is features × plans with a tick or a cross in every cell. It reads beautifully
 * and it is unusable with a screen reader: the glyphs are decorative, so an included row and an
 * excluded one announce identically ("CIBIL Alerts, Basic, blank"), and the only fix is a hidden
 * "Included" / "Not included" — two words this site's catalog does not contain in any of its four
 * languages, and V4 is not permitted to invent copy. Naming the plans solves it outright: every
 * cell is real text, in the reader's own language, announced in full. A plan that is absent from a
 * row does not carry that feature, and the two rows where that happens are the two rows a buyer
 * actually cares about.
 *
 * Gold appears once, on Premium — the plan CIBIL itself calls the popular one. That is the closest
 * this page comes to "this is you", and gold in V4 is never spent on anything else.
 */

const CTA_BANNER = "https://www.cibil.com/content/dam/cibil/consumer/select-plan/cta-banner-mob.png";

interface Plan {
  name: TranslationKey;
  price: TranslationKey;
  /** The struck-through list price, on the two discounted plans. */
  wasPrice?: TranslationKey;
  duration: TranslationKey;
  save?: TranslationKey;
  popular?: boolean;
}

const PLANS: Plan[] = [
  { name: "planBasicName", price: "planBasicPrice", duration: "planBasicDuration" },
  {
    name: "planStandardName",
    price: "planStandardPrice",
    wasPrice: "planStandardWasPrice",
    duration: "planStandardDuration",
    save: "planStandardSave",
  },
  {
    name: "planPremiumName",
    price: "planPremiumPrice",
    wasPrice: "planPremiumWasPrice",
    duration: "planPremiumDuration",
    save: "planPremiumSave",
    popular: true,
  },
];

/**
 * Which plans carry which feature, in V1's own display order.
 *
 * V1's cards give Basic the first five rows with Alerts struck out (`featuresFor(5, true)`), which
 * also leaves CIBIL Saksham off that card entirely — i.e. Basic carries neither. Standard and
 * Premium carry all six.
 */
const FEATURES: { label: TranslationKey; plans: TranslationKey[] }[] = [
  { label: "featCibilAlerts", plans: ["planStandardName", "planPremiumName"] },
  {
    label: "featCibilScoreReport",
    plans: ["planBasicName", "planStandardName", "planPremiumName"],
  },
  {
    label: "featScoreSimulator",
    plans: ["planBasicName", "planStandardName", "planPremiumName"],
  },
  { label: "featScoreHistory", plans: ["planBasicName", "planStandardName", "planPremiumName"] },
  { label: "featWhereYouStand", plans: ["planBasicName", "planStandardName", "planPremiumName"] },
  { label: "featCibilSaksham", plans: ["planStandardName", "planPremiumName"] },
];

const FAQS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "subFaqQ1", a: "subFaqA1" },
  { q: "subFaqQ2", a: "subFaqA2" },
  { q: "subFaqQ3", a: "subFaqA3" },
  { q: "subFaqQ4", a: "subFaqA4" },
  { q: "subFaqQ5", a: "subFaqA5" },
  { q: "subFaqQ6", a: "subFaqA6" },
];

/** One plan, as a plane. The price is the object; everything else is caption to it. */
function PlanPlane({ plan, index }: { plan: Plan; index: number }) {
  const { t } = useV4();

  return (
    <Reveal
      index={index}
      className={`v4-plane flex h-full flex-col p-6 sm:p-7 ${
        plan.popular ? "border-[color-mix(in_srgb,var(--v4-gold)_55%,transparent)]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="v4-h3">{t(plan.name)}</h3>
        {plan.popular ? <span className="v4-chip v4-chip-you">{t("alrMostPopular")}</span> : null}
      </div>

      {/* Held in the flow even when a plan has no list price, so the three prices sit on one line. */}
      <p
        aria-hidden={!plan.wasPrice}
        className={`v4-num mt-6 text-[0.875rem] text-[var(--v4-fg-3)] line-through ${
          plan.wasPrice ? "" : "invisible"
        }`}
      >
        {plan.wasPrice ? t(plan.wasPrice) : t(plan.price)}
      </p>

      <p className="v4-num mt-1 text-[2.5rem] font-medium leading-none text-[var(--v4-fg)]">
        {t(plan.price)}
      </p>

      <p className="v4-caption mt-3 flex flex-wrap items-center gap-2">
        <span>{t(plan.duration)}</span>
        {plan.save ? <span className="v4-chip">{t(plan.save)}</span> : null}
      </p>

      <ButtonLink
        href={toV4("/register")}
        variant={plan.popular ? "primary" : "secondary"}
        className="mt-7 w-full"
      >
        {t("subscribeNow")}
      </ButtonLink>
    </Reveal>
  );
}

export default function SubscriptionContent() {
  const { t, t4 } = useV4();

  const columns: Column<(typeof FEATURES)[number]>[] = [
    {
      key: "feature",
      header: t("featuresInclude"),
      render: (row) => (
        <span className="font-bold text-[var(--v4-fg)]">{t(row.label)}</span>
      ),
    },
    {
      key: "plans",
      header: t("sitemapSubscriptionPlans"),
      render: (row) => (
        <span className="flex flex-wrap gap-1.5">
          {row.plans.map((plan) => (
            <span
              key={plan}
              className={plan === "planPremiumName" ? "v4-chip v4-chip-you" : "v4-chip"}
            >
              {t(plan)}
            </span>
          ))}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHero
        label={t("navProducts")}
        title={
          <>
            {t("homeHeroMonitor")} <span className="v4-mark-word">{t("homeHeroBrand")}</span>{" "}
            {t("homeHeroSuffix")}
          </>
        }
        lede={t("productIndividualsDesc")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("subscribeNow")}
          </ButtonLink>
        }
        aside={
          /* The free report, stated before a single price is. A bureau that hides the thing it
             gives away behind the things it sells is a bureau you should not trust. */
          <div className="v4-plane p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 className="v4-h3">{t("planFreeAnnualName")}</h2>
              <span className="v4-chip v4-chip-you">{t("planFreeAnnualPrice")}</span>
            </div>
            <p className="v4-body mt-4 !text-[0.9375rem]">{t("planFreeAnnualDesc")}</p>
            <div className="mt-7 border-t border-[var(--v4-edge)] pt-6">
              <ButtonLink href={toV4("/freecibilscore")} variant="secondary">
                {t("getFreeScoreBtn")}
              </ButtonLink>
            </div>
          </div>
        }
      />

      {/* ── The prices, then the ledger. ────────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-sub-plans">
        <Container width="wide">
          <SectionHead
            id="v4-sub-plans"
            label={t4("v4SectionProducts")}
            title={t("sitemapSubscriptionPlans")}
          />

          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan, i) => (
              <PlanPlane key={plan.name} plan={plan} index={i} />
            ))}
          </div>

          <div className="mt-12">
            <Ledger
              caption={t("featuresInclude")}
              columns={columns}
              rows={FEATURES}
              rowKey={(row) => row.label}
            />
            <p className="v4-caption mt-4">{t("alrOnlyStandardPremium")}</p>
          </div>

          {/* The fourth plan: the report without the score, bought once. Not a fourth column —
              it is a different kind of thing, and a column would claim otherwise. */}
          <Reveal className="v4-plane mt-8 grid gap-6 p-6 sm:grid-cols-[1.5fr_1fr] sm:items-end sm:p-8">
            <div>
              <p className="v4-label">{t("starterStripPlanLabel")}</p>
              <h3 className="v4-h3 mt-3">{t("starterStripHeading")}</h3>
              <p className="mt-5 flex items-baseline gap-2.5">
                <span className="v4-num text-[1.75rem] font-medium leading-none text-[var(--v4-fg)]">
                  {t("planStarterPrice")}
                </span>
                <span className="v4-caption">{t("planStarterPeriod")}</span>
              </p>
            </div>

            <div className="sm:text-right">
              <ButtonLink href={toV4("/register")} variant="secondary">
                {t("subscribeNow")}
              </ButtonLink>
              <p className="v4-caption mt-4 italic">{t("starterStripNote")}</p>
            </div>
          </Reveal>

          <Notice tone="info" title={t("planNoteLabel")} className="mt-8">
            <ul className="grid gap-2">
              <li>
                {t("planNoteAnnualReport")}{" "}
                <Link href={toV4("/freecibilscore")} className="v4-link">
                  {t("planNoteClickHere")}
                </Link>
              </li>
              <li>{t("planNoteRewards")}</li>
            </ul>
          </Notice>
        </Container>
      </Section>

      {/* ── The app. ───────────────────────────────────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-sub-app">
        <Container width="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <p className="v4-label">{t("appPromoTagline")}</p>
              <h2 id="v4-sub-app" className="v4-h2 mt-4">
                {t("appPromoTitle")}{" "}
                <span className="v4-mark-word">{t("appPromoSubtitle")}</span>
              </h2>

              <div className="mt-8">
                <ButtonLink href={toV4("/register")} size="lg" arrow>
                  {t("downloadAppBtn")}
                </ButtonLink>
              </div>

              <p className="v4-label mt-10">{t("downloadFrom")}</p>
              {/* The store badges are trademarked artwork, not links: V1 hangs them off `href="#"`,
                  and a badge that goes nowhere is worse than a badge that simply names the store. */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
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

            <Reveal variant="focus" className="relative aspect-[4/3] w-full">
              <Image
                src={CTA_BANNER}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-contain"
                unoptimized
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The questions. ─────────────────────────────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-sub-faq">
        <Container>
          <SectionHead
            id="v4-sub-faq"
            label={t("faqs")}
            title={t("subFaqHeading")}
            lede={t("subFaqSubheading")}
          />

          <div className="mt-10">
            <DisclosureList>
              {FAQS.map(({ q, a }) => (
                <Disclosure key={q} question={t(q)}>
                  <p>{t(a)}</p>
                </Disclosure>
              ))}
            </DisclosureList>
          </div>
        </Container>
      </Section>
    </>
  );
}
