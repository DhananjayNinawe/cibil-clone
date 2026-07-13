"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead, Folio } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Tabs from "@/components/v3/ui/Tabs";
import Accordion from "@/components/v3/ui/Accordion";
import Callout from "@/components/v3/ui/Callout";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { Document } from "@/components/v3/ui/Icons";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/compensation/compensation_banner.jpg";

const DOCUMENTS: TranslationKey[] = [
  "frameworkPdfCardTitle",
  "regDisclosure2123Title",
  "regDisclosure2324Title",
];

const FAQ_TITLES: TranslationKey[] = [
  "frameworkFaq1Title",
  "frameworkFaq2Title",
  "frameworkFaq3Title",
  "frameworkFaq4Title",
  "frameworkFaq5Title",
];

const FAQ_TABS: TranslationKey[] = [
  "tabCompensationGuidelines",
  "tabCompensationEligibility",
  "tabCompensationPayout",
  "tabCompensationCalculation",
  "tabGeneralQuestions",
  "tabCustomerSupportFaqs",
];

/**
 * The RBI compensation framework.
 *
 * V1 renders the mechanism as a diagram of teal boxes: a rule, a condition, a rate, and then two
 * columns of consequences. The rate — ₹100 a day — is the entire point of the page and it is
 * buried in a box the same size as everything else.
 *
 * So V3 sets it as a proposition: the rule, then the condition in the margin, then the figure at
 * display scale in the mono voice, which is what V3 does with every number that matters. The two
 * columns of consequences survive underneath as two numbered ledgers — what happens on your side,
 * what happens on the bank's — with every link, footnote and caveat intact.
 */
export default function FrameworkCompensationContent() {
  const { t, t3 } = useV3();

  const inline = "v3-focus v3-link font-medium text-[var(--v3-fg)]";

  const consumerClauses: ReactNode[] = [
    <p key="1">{t("compensationCreditedDesc")}</p>,
    <p key="2">
      {t("noAccountInfoDesc")}{" "}
      <Link href={toV3("/contact-us")} className={inline}>
        {t("contactUsPageLink")}
      </Link>
    </p>,
  ];

  const institutionClauses: ReactNode[] = [
    <p key="1">
      {t("delayedCompensationDesc")}{" "}
      <Link href="#what-is-framework" className={inline}>
        {t("learnMoreLink")}
      </Link>
    </p>,
    <p key="2">
      {t("compensationTableDesc")}{" "}
      <Link href={toV3("/login")} className={inline}>
        {t("logInLink")}
      </Link>{" "}
      {t("loginIfHaveAccount")}{" "}
      <Link href={toV3("/register")} className={inline}>
        {t("signUpLink")}
      </Link>{" "}
      {t("signUpToAccessReport")}
    </p>,
  ];

  const clauseList = (clauses: ReactNode[]) => (
    <ol className="border-t border-[var(--v3-line-2)]">
      {clauses.map((clause, i) => (
        <li
          key={i}
          className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-b border-[var(--v3-line)] py-5"
        >
          <span aria-hidden className="v3-num pt-0.5 text-xs text-[var(--v3-fg-3)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="text-sm leading-relaxed text-[var(--v3-fg-2)]">{clause}</div>
        </li>
      ))}
    </ol>
  );

  const comingSoon = <p className="v3-lede">{t("sectionContentComingSoon")}</p>;

  const guidelineFaqs = (
    <Accordion
      numbered
      items={FAQ_TITLES.map((title, i) => ({
        question: t(title),
        answer: <p>{i === 0 ? t("frameworkPara1") : t("sectionContentComingSoon")}</p>,
      }))}
    />
  );

  return (
    <>
      <PageHeader
        folio={t("navGrievance")}
        title={t("frameworkHeroTitle")}
        lede={t("frameworkHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV3("/consumer-dispute-resolution") },
          { label: t("megaFrameworkCompensation") },
        ]}
        actions={
          <Button href="#what-is-framework" size="lg" arrow>
            {t("readMoreBtn")}
          </Button>
        }
        media={
          <Plate src={HERO_IMAGE} alt={t("frameworkHeroTitle")} ratio="16 / 10" fit="cover" priority />
        }
      />

      <Section id="what-is-framework" space="lg" className="scroll-mt-24">
        <Container>
          <SectionHead index="01" folio={t3("v3AtAGlance")} title={t("whatIsFrameworkHeading")} />

          <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="min-w-0 space-y-6">
              <Reveal variant="rise">
                <p className="text-base leading-relaxed text-[var(--v3-fg-2)] sm:text-lg">
                  {t("frameworkPara1")}
                </p>
              </Reveal>
              <Reveal variant="rise" delay={70}>
                <p className="text-base leading-relaxed text-[var(--v3-fg-2)] sm:text-lg">
                  {t("frameworkPara2")}
                </p>
              </Reveal>
            </div>

            <Reveal variant="rise" delay={140} className="min-w-0">
              <p className="v3-folio border-b border-[var(--v3-line-3)] pb-3">{t3("v3DetailsLabel")}</p>

              <ul>
                {DOCUMENTS.map((doc) => (
                  <li key={doc} className="v3-row border-b border-[var(--v3-line)]">
                    <a href="#" className="v3-focus group flex items-start justify-between gap-4 py-5">
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-[var(--v3-fg)]">{t(doc)}</span>
                        <span className="v3-caption mt-1 block text-[var(--v3-accent)]">
                          {t("downloadPdfLink")}
                        </span>
                      </span>
                      <Document className="mt-0.5 shrink-0 text-base text-[var(--v3-fg-3)]" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="rise" className="mt-14">
            <Callout tone="note">
              <p>{t("frameworkEffectiveNote")}</p>
            </Callout>
          </Reveal>
        </Container>
      </Section>

      {/* The proposition: the rule, the condition, the figure. */}
      <Section space="lg" tone="ink" ruled>
        <Container>
          <Folio index="02">{t3("v3KeyPoints")}</Folio>

          <div className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal variant="rise" className="min-w-0">
              <h2 className="v3-h3">{t("rbiGuidelinesBoxTitle")}</h2>
              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-[var(--v3-fg-2)]">
                {t("rbiGuidelinesBoxDesc")}
              </p>

              <p className="v3-folio mt-10 flex items-center gap-3 text-[var(--v3-fg)]">
                <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--v3-line-2)]" />
                {t("ifExceeds30Days")}
              </p>

              <p className="v3-num v3-h1 mt-6 text-[var(--v3-fg)]">{t("hundredPerDay")}</p>
              <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-[var(--v3-fg-2)]">
                {t("hundredPerDayDesc")}
              </p>
            </Reveal>

            <Reveal variant="rise" delay={100} className="min-w-0">
              <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                <div className="min-w-0">
                  {clauseList(consumerClauses)}
                  <p className="v3-caption mt-4">{t("offlineChannelsNote")}</p>
                </div>

                <div className="min-w-0">{clauseList(institutionClauses)}</div>
              </div>

              <Callout tone="warning" className="mt-12">
                <p>{t("pointRbiGuidelines")}</p>
              </Callout>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section space="lg" ruled>
        <Container>
          <SectionHead index="03" folio={t("questionSectionsLabel")} title={t("frameworkFaqsHeading")} />

          <Tabs
            className="mt-12"
            label={t("questionSectionsLabel")}
            items={FAQ_TABS.map((tab, i) => ({
              label: t(tab),
              content: i === 0 ? guidelineFaqs : comingSoon,
            }))}
          />
        </Container>
      </Section>

      <Section space="md" tone="sunken" ruled>
        <Container>
          <Reveal variant="rise">
            <Callout tone="success">
              <p className="text-base leading-relaxed text-[var(--v3-fg)] sm:text-lg">
                <Link href={toV3("/")} className={inline}>
                  {t("disputeClickHere")}
                </Link>{" "}
                {t("safeguardProfileBanner")}
              </p>
            </Callout>
          </Reveal>

          <Rule className="mt-16" strong />
        </Container>
      </Section>
    </>
  );
}
