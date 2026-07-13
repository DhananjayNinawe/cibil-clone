"use client";

import Link from "next/link";
import { useId, useState } from "react";
import PageHero from "@/components/v4/ui/PageHero";
import Notice from "@/components/v4/ui/Notice";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import {
  AlertIcon,
  ClockIcon,
  DocumentIcon,
  MailIcon,
  UserIcon,
} from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Commercial enquiry — a lender has pulled your company's CIBIL Rank and CCR.
 *
 * The consumer twin of this page (`EnquiryContent`) answers a worried individual. This one answers
 * a business, and businesses buy: the three subscriptions are the substance of the page, not an
 * afterthought at the bottom, so they are set as a *comparison* — three plans side by side, priced,
 * with the term each one buys — rather than the stacked list the consumer page uses. Same component
 * vocabulary, different object, because the reader's question is different: not "which one is free"
 * (none is) but "how long do I need it for".
 *
 * The rank-exposure caveat and the free-dispute promise are both `Notice`s, because both are things
 * the reader must not miss and neither is a headline.
 */

interface Plan {
  id: string;
  name: TranslationKey;
  desc: TranslationKey;
  price: TranslationKey;
  period: TranslationKey;
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "ccrPlanBasicName",
    desc: "ccrPlanBasicDesc",
    price: "ccrPlanBasicPrice",
    period: "ccrPlanBasicPeriod",
    recommended: true,
  },
  {
    id: "standard",
    name: "ccrPlanStandardName",
    desc: "ccrPlanStandardDesc",
    price: "ccrPlanStandardPrice",
    period: "ccrPlanStandardPeriod",
  },
  {
    id: "premium",
    name: "ccrPlanPremiumName",
    desc: "ccrPlanPremiumDesc",
    price: "ccrPlanPremiumPrice",
    period: "ccrPlanPremiumPeriod",
  },
];

export default function EnquiryCcrContent() {
  const { t } = useV4();
  const [plan, setPlan] = useState("basic");
  const groupId = useId();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navGrievance"), href: toV4("/company-dispute-resolution") }}
        label={t("megaCommercialEnquiry")}
        title={t("ccrHeroTitle")}
        lede={
          <>
            {t("ccrHeroPara1")} {t("ccrHeroPara2")}
          </>
        }
        actions={
          <ButtonLink href="#plans" size="lg" arrow>
            {t("ccrHeroBtn")}
          </ButtonLink>
        }
        aside={
          <div className="grid gap-3">
            {/* V1 puts this at the very top of the page as a dismissible strip, which means the
                reader most likely to need it — the one who does *not* recognise the enquiry — can
                close it before reading it. It is the page's premise, so it stays. */}
            <Notice tone="warning">{t("ccrNotificationBanner")}</Notice>
            <Notice tone="success">{t("disputeFreeServiceBanner")}</Notice>
          </div>
        }
      />

      {/* ── The subscriptions ───────────────────────────────────────────────────────────────── */}
      <Section id="plans" tone="tint" className="scroll-mt-28" aria-labelledby="v4-ccr-plans-heading">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 id="v4-ccr-plans-heading" className="v4-h2">
                {t("ccrHowCheckHeading")}
              </h2>
              <p className="v4-lede mt-4">{t("ccrHowCheckDesc")}</p>

              <ButtonLink href={toV4("/register")} size="lg" arrow className="mt-8">
                {t("getStartedBtn")}
              </ButtonLink>

              <p className="v4-caption mt-5">
                {t("alreadyHaveAccount")}{" "}
                <Link href={toV4("/login")} className="v4-link">
                  {t("logInLink")}
                </Link>
              </p>
            </div>

            {/* Three plans, three columns, one term each. A native radiogroup: a fieldset with a
                legend, a real label wrapping every option, and a native radio input — so the arrow
                keys move between the plans and each one is announced as "2 of 3, selected". */}
            <fieldset>
              <legend className="v4-label">{t("sitemapSubscriptionPlans")}</legend>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {PLANS.map((option, i) => {
                  const selected = plan === option.id;
                  return (
                    <Reveal key={option.id} index={i}>
                      <label
                        className={`v4-plane flex h-full cursor-pointer flex-col p-5 transition-[border-color,box-shadow] ${
                          selected
                            ? "border-[var(--v4-accent)] shadow-[0_0_0_1px_var(--v4-accent)]"
                            : ""
                        }`}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <input
                            type="radio"
                            name={`${groupId}-ccr-plan`}
                            value={option.id}
                            checked={selected}
                            onChange={() => setPlan(option.id)}
                            className="mt-1 h-4 w-4 shrink-0 accent-[var(--v4-deep)]"
                          />
                          {option.recommended ? (
                            <span className="v4-chip">{t("recommendedBadge")}</span>
                          ) : null}
                        </span>

                        <span className="mt-4 block font-bold text-[var(--v4-fg)]">
                          {t(option.name)}
                        </span>
                        <span className="v4-caption mt-1 block flex-1">{t(option.desc)}</span>

                        <span className="v4-num mt-5 block border-t border-[var(--v4-edge)] pt-4 text-[1.375rem] font-bold text-[var(--v4-fg)]">
                          {t(option.price)}
                        </span>
                        <span className="v4-caption block">{t(option.period)}</span>
                      </label>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal index={3} className="mt-5">
                <Notice tone="info">{t("ccrRankExposureBanner")}</Notice>
              </Reveal>
            </fieldset>
          </div>
        </Container>
      </Section>

      {/* ── The words in the alert ──────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-ccr-terms-heading">
        <Container>
          <h2 id="v4-ccr-terms-heading" className="v4-h3">
            {t("learnKeyTermsHeading")}
          </h2>

          <dl className="mt-8 grid gap-3 md:grid-cols-3">
            <Term
              index={0}
              glyph={<DocumentIcon size={20} />}
              term={t("wonTitle")}
              def={t("wonDesc")}
            />
            <Term
              index={1}
              glyph={<UserIcon size={20} />}
              term={t("enquiryPurposeTitle")}
              def={t("ccrEnquiryPurposeDesc")}
            />
            <Term
              index={2}
              glyph={<ClockIcon size={20} />}
              term={t("enquiryDateTimeTitle")}
              def={t("ccrEnquiryDateTimeDesc")}
            />
          </dl>
        </Container>
      </Section>

      {/* ── If it was not you ───────────────────────────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-ccr-recognise-heading">
        <Container>
          <SectionHead id="v4-ccr-recognise-heading" title={t("dontRecogniseHeading")} />

          <ol className="mt-10 grid gap-3 md:grid-cols-3">
            <Action index={0} n={1} glyph={<UserIcon size={22} />} title={t("pnoTitle")}>
              {t("pnoDesc")}{" "}
              <Link href={toV4("/nodal-officer-list")} className="v4-link">
                {t("hereLowercase")}
              </Link>
            </Action>

            <Action index={1} n={2} glyph={<AlertIcon size={22} />} title={t("initiateDisputeTitle")}>
              {t("raiseDisputeCibilDesc")}{" "}
              <Link href={toV4("/company-dispute-resolution")} className="v4-link">
                {t("clickHereBold")}
              </Link>
            </Action>

            <Action index={2} n={3} glyph={<MailIcon size={22} />} title={t("needHelpTitle")}>
              {t("needHelpDescPrefix")}{" "}
              <Link href={toV4("/contact-us")} className="v4-link">
                {t("disputeClickHere")}
              </Link>{" "}
              {t("needHelpDescSuffix")}
            </Action>
          </ol>
        </Container>
      </Section>
    </>
  );
}

/** A term from the enquiry alert, as a real `<dt>`/`<dd>` pair — this is a glossary. */
function Term({
  glyph,
  term,
  def,
  index,
}: {
  glyph: React.ReactNode;
  term: string;
  def: string;
  index: number;
}) {
  return (
    // A `<div>` is the only wrapper a `<dl>` allows, and it may contain nothing but the pair — so
    // the glyph sits inside the term rather than as a sibling of it.
    <Reveal as="div" index={index} className="v4-plane p-6">
      <dt className="flex items-center gap-3 font-bold text-[var(--v4-fg)]">
        <span aria-hidden="true" className="text-[var(--v4-accent)]">
          {glyph}
        </span>
        {term}
      </dt>
      <dd className="v4-caption mt-2">{def}</dd>
    </Reveal>
  );
}

/** One of the three routes out of an enquiry the company does not recognise. */
function Action({
  n,
  glyph,
  title,
  children,
  index,
}: {
  n: number;
  glyph: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <li>
      <Reveal index={index} className="v4-plane flex h-full flex-col p-6">
        <span className="flex items-center justify-between">
          <span className="text-[var(--v4-accent)]">{glyph}</span>
          <span aria-hidden="true" className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]">
            {String(n).padStart(2, "0")}
          </span>
        </span>
        <h3 className="v4-h3 mt-4">{title}</h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
          {children}
        </p>
      </Reveal>
    </li>
  );
}
