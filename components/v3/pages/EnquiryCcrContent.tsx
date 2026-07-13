"use client";

import { useState } from "react";
import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Folio, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { Close } from "@/components/v3/ui/Icons";
import PlanLedger, { type PlanRow } from "@/components/v3/enquiry/PlanLedger";
import Glossary from "@/components/v3/enquiry/Glossary";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/enq26/rankenq/images/commercial-banner.jpg";

const PLANS: PlanRow[] = [
  {
    key: "basic",
    name: "ccrPlanBasicName",
    desc: "ccrPlanBasicDesc",
    price: "ccrPlanBasicPrice",
    priceNote: "ccrPlanBasicPeriod",
    recommended: true,
  },
  {
    key: "standard",
    name: "ccrPlanStandardName",
    desc: "ccrPlanStandardDesc",
    price: "ccrPlanStandardPrice",
    priceNote: "ccrPlanStandardPeriod",
  },
  {
    key: "premium",
    name: "ccrPlanPremiumName",
    desc: "ccrPlanPremiumDesc",
    price: "ccrPlanPremiumPrice",
    priceNote: "ccrPlanPremiumPeriod",
  },
];

/**
 * The dismissible advisory that opens the commercial enquiry page.
 *
 * It sits *below* the masthead spread rather than above it, because V3's masthead is fixed: a
 * strip in front of it would be covered. Set as an ink band with a hairline close mark — the same
 * grammar as every other band on the page, not a coloured toast.
 */
function Advisory() {
  const { t } = useV3();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="v3-tone-ink">
      <Container className="flex items-start justify-between gap-6 py-4">
        <p className="max-w-[90ch] text-xs leading-relaxed text-[var(--v3-fg-2)] sm:text-sm">
          {t("ccrNotificationBanner")}
        </p>

        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label={t("a11yDismiss")}
          className="v3-focus mt-0.5 shrink-0 text-[var(--v3-fg-3)] transition-colors hover:text-[var(--v3-fg)]"
        >
          <Close className="text-base" />
        </button>
      </Container>
    </div>
  );
}

/**
 * Commercial Enquiry — the CCR twin of /v3/enquiry.
 *
 * Same argument, a business reader, and deliberately a different rhythm: the plan ledger is
 * mirrored (the call sits in the left margin, the figures run down the right), the three ways to
 * act are ruled columns rather than a numbered rail, and the CIBIL Rank eligibility limit gets the
 * ink band. Nothing from V1's page is dropped — every plan, price, period, term and route is here.
 */
export default function EnquiryCcrContent() {
  const { t, t3 } = useV3();

  const actions = [
    {
      title: t("pnoTitle"),
      body: (
        <>
          {t("pnoDesc")}{" "}
          <Link href={toV3("/nodal-officer-list")} className="v3-focus">
            {t("hereLowercase")}
          </Link>
        </>
      ),
    },
    {
      title: t("initiateDisputeTitle"),
      body: (
        <>
          {t("raiseDisputeCibilDesc")}{" "}
          <Link href={toV3("/company-dispute-resolution")} className="v3-focus font-semibold">
            {t("clickHereBold")}
          </Link>
        </>
      ),
    },
    {
      title: t("needHelpTitle"),
      body: (
        <>
          {t("needHelpDescPrefix")}{" "}
          <Link href={toV3("/contact-us")} className="v3-focus">
            {t("disputeClickHere")}
          </Link>{" "}
          {t("needHelpDescSuffix")}
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        size="full"
        folio={t("megaCommercialEnquiry")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("navGrievance"), href: toV3("/company-dispute-resolution") },
          { label: t("megaCommercialEnquiry") },
        ]}
        title={[t("ccrHeroTitle")]}
        lede={
          <>
            <span className="block">{t("ccrHeroPara1")}</span>
            <span className="mt-4 block">{t("ccrHeroPara2")}</span>
          </>
        }
        actions={
          <Button href="#plans" size="lg" arrow>
            {t("ccrHeroBtn")}
          </Button>
        }
        media={<Plate src={HERO_IMAGE} alt="" ratio="4 / 3" fit="cover" priority />}
      />

      <Advisory />

      {/* The free-service disclosure. A marginal note, in the margin. */}
      <Section space="sm">
        <Container>
          <Reveal variant="rise">
            <Callout tone="success" title={t3("v3KeyPoints")}>
              <p>{t("disputeFreeServiceBanner")}</p>
            </Callout>
          </Reveal>
        </Container>
      </Section>

      {/* 01 — the subscriptions, as a ruled comparison. The call sits in the left margin here,
          the opposite of the consumer page, so the two never read as the same spread twice. */}
      <Section id="plans" space="lg" ruled>
        <Container>
          <SectionHead
            index="01"
            folio={t3("v3AtAGlance")}
            title={t("ccrHowCheckHeading")}
            lede={t("ccrHowCheckDesc")}
          />

          <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.55fr] lg:items-start">
            <Reveal variant="rise">
              <div className="border-t-2 border-[var(--v3-fg)] pt-6">
                <p className="v3-folio">{t3("v3CtaKicker")}</p>

                <Button href={toV3("/register")} size="lg" arrow className="mt-7">
                  {t("getStartedBtn")}
                </Button>

                <p className="mt-6 text-sm text-[var(--v3-fg-2)]">
                  {t("alreadyHaveAccount")}{" "}
                  <Link
                    href={toV3("/login")}
                    className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
                  >
                    {t("logInLink")}
                  </Link>
                </p>
              </div>
            </Reveal>

            <Reveal variant="rise" delay={120}>
              <PlanLedger plans={PLANS} group="v3-ccr-plan" legend={t("ccrHowCheckHeading")} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 02 — who CIBIL Rank is for. */}
      <Section space="sm" tone="ink">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-14">
            <Folio index="02">{t3("v3KeyPoints")}</Folio>

            <Reveal variant="rise">
              <p className="v3-h3 max-w-[46ch] text-balance">{t("ccrRankExposureBanner")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 03 — the terms in the alert. */}
      <Section space="lg">
        <Container>
          <SectionHead index="03" folio={t3("v3DetailsLabel")} title={t("learnKeyTermsHeading")} />

          <Glossary
            className="mt-12"
            entries={[
              { term: t("wonTitle"), definition: t("wonDesc") },
              { term: t("enquiryPurposeTitle"), definition: t("ccrEnquiryPurposeDesc") },
              { term: t("enquiryDateTimeTitle"), definition: t("ccrEnquiryDateTimeDesc") },
            ]}
          />
        </Container>
      </Section>

      {/* 04 — the three ways to act, as ruled columns. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="04" folio={t3("v3ProcessLabel")} title={t("dontRecogniseHeading")} />

          <div className="mt-12 grid gap-px bg-[var(--v3-line)] sm:grid-cols-3">
            {actions.map((action, i) => (
              <Reveal key={action.title} variant="rise" delay={i * 80} className="bg-[var(--v3-bg)]">
                <div className="h-full px-0 py-8 sm:px-7">
                  <span aria-hidden className="v3-num block text-xs text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-5 text-base leading-snug font-medium text-[var(--v3-fg)]">
                    {action.title}
                  </h3>

                  <div className="mt-3 text-sm leading-relaxed text-[var(--v3-fg-2)] [&_a]:text-[var(--v3-accent)] [&_a]:underline [&_a]:underline-offset-2">
                    {action.body}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
