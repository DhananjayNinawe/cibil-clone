"use client";

import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import Tabs, { type TabItem } from "@/components/v4/ui/Tabs";
import { Reveal } from "@/components/v4/motion/Reveal";
import {
  CheckIcon,
  DocumentIcon,
  ScaleIcon,
  ShieldIcon,
  type IconProps,
} from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * CIBIL Rank & the Company Credit Report.
 *
 * A business arrives here with a live offer in front of it and two words it does not know — *Rank*
 * and *CCR*. V1 answers the second with a collapsed accordion that opens onto a bulleted list, and
 * puts the offer in a dark strip halfway down. V4 inverts both: the offer is the hero's aside
 * (it is the reason to act *today*, and it expires), and the two definitions are simply written
 * out, side by side, in the open — a definition that has to be clicked open is a definition the
 * page is embarrassed by.
 *
 * Two of V1's links here go nowhere (`href="#"`): the "DOWNLOAD" of the Demand Draft form, and the
 * three "things you need to understand". The words are the facts, so the words stay and the dead
 * anchors do not.
 */

const RANK_VIDEO = "https://www.cibil.com/content/dam/cibil/consumer/media/video/cibil-rank.mp4";

const BENEFITS: {
  icon: (props: IconProps) => React.ReactElement;
  title: TranslationKey;
  desc: TranslationKey;
}[] = [
  { icon: ScaleIcon, title: "ccpBenefit1Title", desc: "ccpBenefit1Desc" },
  { icon: DocumentIcon, title: "ccpBenefit2Title", desc: "ccpBenefit2Desc" },
  { icon: ShieldIcon, title: "ccpBenefit3Title", desc: "ccpBenefit3Desc" },
];

interface Plan {
  name: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  refresh: TranslationKey;
  /** Standard and Premium carry CIBIL Saksham; Basic does not. */
  saksham: boolean;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "planBasicName",
    price: "ccpBasicPrice",
    period: "ccpBasicPeriod",
    refresh: "ccpBasicRefresh",
    saksham: false,
  },
  {
    name: "planStandardName",
    price: "ccpStandardPrice",
    period: "ccpStandardPeriod",
    refresh: "ccpStandardRefresh",
    saksham: true,
  },
  {
    name: "planPremiumName",
    price: "ccpPremiumPrice",
    period: "ccpPremiumPeriod",
    refresh: "ccpPremiumRefresh",
    saksham: true,
    popular: true,
  },
];

const THINGS: TranslationKey[] = ["ccpThing1", "ccpThing2", "ccpThing3"];

const FAQ_TABS: { label: TranslationKey; items: { q: TranslationKey; a: TranslationKey }[] }[] = [
  {
    label: "ccpFaqTab1",
    items: [
      { q: "ccpFaq1", a: "ccpFaqA1" },
      { q: "ccpFaq2", a: "ccpFaqA2" },
    ],
  },
  {
    label: "ccpFaqTab2",
    items: [
      { q: "ccpFaq3", a: "ccpFaqA3" },
      { q: "ccpFaq4", a: "ccpFaqA4" },
    ],
  },
];

export default function CcrProductContent() {
  const { t, t4 } = useV4();

  const tabs: TabItem[] = FAQ_TABS.map((tab) => ({
    id: tab.label,
    label: t(tab.label),
    panel: (
      <DisclosureList>
        {tab.items.map(({ q, a }, i) => (
          <Disclosure key={q} question={t(q)} defaultOpen={i === 0}>
            <p>{t(a)}</p>
          </Disclosure>
        ))}
      </DisclosureList>
    ),
  }));

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navProducts"), href: toV4("/choose-subscription") }}
        label={t("productBusinessTag")}
        title={t("ccpHeroTitle")}
        lede={t("ccpHeroDesc")}
        actions={
          <>
            <ButtonLink href={toV4("/choose-subscription")} size="lg" arrow>
              {t("sidebarSubscribeNowBtn")}
            </ButtonLink>
            <span className="v4-caption self-center">
              {t("ccpAlready")}{" "}
              <Link href={toV4("/login")} className="v4-link">
                {t("loginNow")}
              </Link>
            </span>
          </>
        }
        aside={
          /* The live offer. It is the one thing on this page with a deadline, so it is the one
             thing that gets the hero's right-hand plane. The discount is marked, not decorated —
             the same gold rule the rest of V4 uses to point at what is yours. */
          <div className="v4-plane p-6 sm:p-8">
            <p className="v4-label">{t("ccrfLimitedOffer")}</p>

            <p className="v4-h2 mt-4">
              {t("ccrfOfferPrefix")}{" "}
              <span className="v4-mark-word">{t("ccrfOfferPercent")}</span>{" "}
              {t("ccrfOfferSuffix")}
            </p>

            <p className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="v4-label">{t("ccrfUseCode")}</span>
              <span className="v4-chip v4-num text-[0.8125rem]">{t("ccrfCode")}</span>
            </p>

            <p className="v4-caption mt-6 border-t border-[var(--v4-edge)] pt-5">
              {t("ccrfOfferValid")}
            </p>
          </div>
        }
      />

      {/* ── The two words. ──────────────────────────────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-ccr-what">
        <Container width="wide">
          <SectionHead id="v4-ccr-what" label={t4("v4SectionProducts")} title={t("ccpQ1")} />

          <div className="mt-11 grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="v4-body">{t("ccpA1")}</p>

              <h3 className="v4-h3 mt-10">{t("ccpQ2")}</h3>
              <ul className="v4-prose mt-4">
                <li>{t("ccpQ2Bullet1")}</li>
                <li>{t("ccpQ2Bullet2")}</li>
              </ul>
            </div>

            <Reveal variant="focus" className="v4-plane overflow-hidden bg-[var(--v4-ink)] p-0">
              <video
                controls
                preload="metadata"
                playsInline
                aria-label={t("ccpPlayVideo")}
                className="aspect-video w-full"
              >
                <source src={RANK_VIDEO} type="video/mp4" />
                <track kind="captions" />
              </video>
            </Reveal>
          </div>

          <div className="mt-12 border-t border-[var(--v4-edge-2)] pt-10">
            <ButtonLink href={toV4("/register")} size="lg" arrow>
              {t("ccpCheckNow")}
            </ButtonLink>

            {/* The Demand Draft route. V1 links the word "DOWNLOAD" to nothing at all; the word is
                the fact, so the word stays and the anchor goes. */}
            <p className="v4-body mt-7">
              {t("ccpDownloadPrefix")}{" "}
              <strong className="font-bold text-[var(--v4-fg)]">{t("ccpDownloadLink")}</strong>{" "}
              {t("ccpDownloadSuffix")}
            </p>
          </div>
        </Container>
      </Section>

      {/* ── What it is worth. ──────────────────────────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-ccr-benefits">
        <Container width="wide">
          <SectionHead
            id="v4-ccr-benefits"
            label={t4("v4SectionFigures")}
            title={t("ccpBenefitsHeading")}
            lede={t("ccpBenefitsSub")}
          />

          <ul className="mt-11 grid gap-5 sm:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <Reveal
                as="li"
                key={benefit.title}
                index={i}
                className="v4-plane h-full p-6 sm:p-7"
              >
                <benefit.icon size={28} className="text-[var(--v4-accent)]" />
                <h3 className="v4-h3 mt-5">{t(benefit.title)}</h3>
                <p className="v4-body mt-3 !text-[0.9375rem]">{t(benefit.desc)}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={toV4("/register")} size="lg" arrow>
              {t("ccpGetCcrNow")}
            </ButtonLink>
            <p className="v4-caption max-w-[38rem]">{t("ccpBenefitsDisclaimer")}</p>
          </div>
        </Container>
      </Section>

      {/* ── What it costs. ─────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-ccr-plans">
        <Container width="wide">
          <SectionHead
            id="v4-ccr-plans"
            label={t("sitemapSubscriptionPlans")}
            title={t("ccpMonitorHeading")}
            lede={t("ccpMonitorDesc")}
          />

          <div className="mt-11 grid gap-5 sm:grid-cols-3">
            {PLANS.map((plan, i) => (
              <Reveal
                key={plan.name}
                index={i}
                className={`v4-plane flex h-full flex-col p-6 sm:p-7 ${
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

                <p className="v4-num mt-5 text-[1.875rem] font-medium leading-none text-[var(--v4-fg)]">
                  {t(plan.price)}
                </p>
                <p className="v4-caption mt-2.5">{t(plan.period)}</p>

                <ul className="mt-6 grid gap-2.5 border-t border-[var(--v4-edge)] pt-5">
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-[var(--v4-fg-2)]">
                    <CheckIcon size={17} className="mt-0.5 shrink-0 text-[var(--v4-success)]" />
                    <span>{t(plan.refresh)}</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-[var(--v4-fg-2)]">
                    <CheckIcon size={17} className="mt-0.5 shrink-0 text-[var(--v4-success)]" />
                    <span>{t("ccpAccessDashboard")}</span>
                  </li>
                  {plan.saksham ? (
                    <li className="flex items-start gap-2.5 text-[0.875rem] text-[var(--v4-fg-2)]">
                      <CheckIcon size={17} className="mt-0.5 shrink-0 text-[var(--v4-success)]" />
                      <span>{t("featCibilSaksham")}</span>
                    </li>
                  ) : null}
                </ul>

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
        </Container>
      </Section>

      {/* ── The three caveats, and the questions. ──────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-ccr-understand">
        <Container>
          <h2 id="v4-ccr-understand" className="v4-h3">
            {t("ccpThingsHeading")}
          </h2>

          {/* Statements, not links: V1 points all three at `#`. */}
          <ul className="mt-6 border-t border-[var(--v4-edge)]">
            {THINGS.map((thing, i) => (
              <li
                key={thing}
                className="flex items-baseline gap-5 border-b border-[var(--v4-edge)] py-4"
              >
                <span aria-hidden="true" className="v4-num text-[0.6875rem] text-[var(--v4-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] text-[var(--v4-fg)]">{t(thing)}</span>
              </li>
            ))}
          </ul>

          <h2 className="v4-h2 mt-16">{t("ccpFaqHeading")}</h2>
          <div className="mt-8">
            <Tabs items={tabs} label={t("ccpFaqHeading")} />
          </div>
        </Container>
      </Section>
    </>
  );
}
