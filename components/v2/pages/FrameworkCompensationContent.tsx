"use client";

import type { ReactNode } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Badge from "@/components/v2/ui/Badge";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import Tabs from "@/components/v2/ui/Tabs";
import Accordion from "@/components/v2/ui/Accordion";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { InlineLink } from "@/components/v2/pages/shared";
import { DocumentIcon, PersonContactIcon, BankIcon, ArrowRightIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/compensation/compensation_banner.jpg";

const PDFS: TranslationKey[] = ["frameworkPdfCardTitle", "regDisclosure2123Title", "regDisclosure2324Title"];

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
 * Framework for compensation.
 *
 * The compensation diagram is the reason this page exists, and V1 draws it as nine flat teal
 * boxes in a pale blue tray. V2 draws it as the branching rule it is: one lit trunk — the RBI
 * 30-day guideline, the gate that opens when it is missed, the ₹100-a-day entitlement — which
 * then forks into the two parties the rule binds, you and the lender. Every box, number, link
 * and footnote V1 prints is still here; only the geometry has been made to mean something.
 */
export default function FrameworkCompensationContent() {
  const { t, tv } = useV2();

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("frameworkHeroTitle")}
        lede={t("frameworkHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV2("/consumer-dispute-resolution") },
          { label: t("megaFrameworkCompensation") },
        ]}
        tone="gold"
        actions={
          <Button href="#what-is-framework" size="lg" arrow magnetic>
            {t("readMoreBtn")}
          </Button>
        }
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt={t("frameworkHeroTitle")} width={720} height={520} surface="dark" priority />
          </Parallax>
        }
      />

      {/* What the framework is --------------------------------------------------- */}
      <Section id="what-is-framework" space="xl" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
            <div>
              <SectionHeading index="01" eyebrow={tv("v2AtAGlance")} title={t("whatIsFrameworkHeading")} />

              <Reveal variant="up" delay={100}>
                <div className="v2-prose mt-8 max-w-2xl text-[17px]">
                  <p>{t("frameworkPara1")}</p>
                  <p>{t("frameworkPara2")}</p>
                </div>
              </Reveal>
            </div>

            <div className="space-y-4 lg:pt-4">
              {PDFS.map((pdf, index) => (
                <Reveal key={pdf} variant="right" delay={index * 100}>
                  <a
                    href="#"
                    className="v2-focus v2-glass v2-rim group flex items-start justify-between gap-4 rounded-[var(--v2-r-md)] p-5 transition-[transform,box-shadow] duration-500 ease-[var(--v2-ease)] hover:-translate-y-1 hover:shadow-[var(--v2-shadow-2)]"
                  >
                    <span>
                      <span className="block text-sm font-bold leading-snug text-[var(--v2-text)]">{t(pdf)}</span>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--v2-cyan)]">
                        {t("downloadPdfLink")}
                        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--v2-ease)] group-hover:translate-x-1" />
                      </span>
                    </span>
                    <DocumentIcon className="h-6 w-6 shrink-0 text-[var(--v2-cyan)]" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="up" delay={140} className="mt-12">
            <Callout tone="note">{t("frameworkEffectiveNote")}</Callout>
          </Reveal>
        </Container>
      </Section>

      <CompensationFlow />

      {/* FAQs -------------------------------------------------------------------- */}
      <Section space="xl" tone="raised">
        <Container width="narrow">
          <SectionHeading index="03" eyebrow={t("questionSectionsLabel")} title={t("frameworkFaqsHeading")} />

          <Reveal variant="up" className="mt-12">
            <Tabs
              label={t("questionSectionsLabel")}
              items={FAQ_TABS.map((tab) => ({
                id: tab,
                label: t(tab),
                panel:
                  tab === "tabCompensationGuidelines" ? (
                    <Accordion
                      multiple
                      defaultOpen={0}
                      items={FAQ_TITLES.map((title, index) => ({
                        id: title,
                        question: t(title),
                        answer: <p>{index === 0 ? t("frameworkPara1") : t("sectionContentComingSoon")}</p>,
                      }))}
                    />
                  ) : (
                    <p className="py-12 text-center text-sm text-[var(--v2-text-3)]">
                      {t("sectionContentComingSoon")}
                    </p>
                  ),
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Safeguard banner --------------------------------------------------------- */}
      <Section space="sm" tone="canvas">
        <Container width="narrow">
          <Reveal variant="fade">
            <Callout tone="warning">
              <InlineLink href={toV2("/")}>{t("disputeClickHere")}</InlineLink> {t("safeguardProfileBanner")}
            </Callout>
          </Reveal>
        </Container>
      </Section>
    </>
  );

  /* ------------------------------------------------------- The signature flow */

  function CompensationFlow() {
    return (
      <Section space="xl" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="duo" grid />

        <Container className="relative">
          {/*
            V1 gives this tray no heading of its own — the boxes are the content. Rather than
            invent a title (V2 adds no copy), the section opens on the editorial index alone.
          */}
          <Reveal variant="fade" className="flex justify-center">
            <Eyebrow index="02">{tv("v2ProcessLabel")}</Eyebrow>
          </Reveal>

          <div className="mt-16">
            {/* The trunk: the rule, the gate that trips it, the entitlement it creates. */}
            <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              <Reveal variant="left">
                <FlowNode title={t("rbiGuidelinesBoxTitle")} body={t("rbiGuidelinesBoxDesc")} />
              </Reveal>

              <Reveal variant="scale" delay={140} className="flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
                  <Line />
                  <span className="rounded-full border border-dashed border-[rgba(0,176,240,0.55)] bg-[rgba(0,176,240,0.06)] px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--v2-cyan-soft)]">
                    {t("ifExceeds30Days")}
                  </span>
                  <Line arrow />
                </div>
              </Reveal>

              <Reveal variant="right" delay={280}>
                <FlowNode title={t("hundredPerDay")} body={t("hundredPerDayDesc")} accent />
              </Reveal>
            </div>

            {/* The fork: the entitlement lands on two parties at once. */}
            <Reveal variant="fade" delay={380} aria-hidden className="mx-auto -mb-2 mt-2 max-w-3xl">
              <svg viewBox="0 0 800 90" className="h-16 w-full" fill="none" role="presentation">
                <defs>
                  <linearGradient id="v2-fork" x1="400" y1="0" x2="400" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f5c518" />
                    <stop offset="1" stopColor="#00b0f0" stopOpacity="0.35" />
                  </linearGradient>
                </defs>
                <path
                  d="M400 0 V28 M400 28 C400 62 200 48 200 90 M400 28 C400 62 600 48 600 90"
                  stroke="url(#v2-fork)"
                  strokeWidth="1.5"
                />
                <circle cx="400" cy="28" r="4" fill="#f5c518" />
              </svg>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* You — the consumer. */}
              <Reveal variant="up" delay={140}>
                <Card padding="lg" spotlight className="h-full">
                  <span
                    aria-hidden
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#0a3a52] to-[#0f5773] text-white shadow-[var(--v2-glow-cyan)]"
                  >
                    <PersonContactIcon className="h-6 w-6 text-white" />
                  </span>

                  <ol className="mt-8 space-y-4">
                    <Outcome n={1}>{t("compensationCreditedDesc")}</Outcome>
                    <Outcome n={2}>
                      {t("noAccountInfoDesc")}{" "}
                      <InlineLink href={toV2("/contact-us")}>{t("contactUsPageLink")}</InlineLink>
                    </Outcome>
                  </ol>

                  <p className="mt-6 text-xs leading-relaxed text-[var(--v2-text-3)]">{t("offlineChannelsNote")}</p>
                </Card>
              </Reveal>

              {/* The lender — and CIBIL. */}
              <Reveal variant="up" delay={260}>
                <Card padding="lg" spotlight className="h-full">
                  <span
                    aria-hidden
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#0a3a52] to-[#0f5773] text-white shadow-[var(--v2-glow-cyan)]"
                  >
                    <BankIcon className="h-6 w-6 text-white" />
                  </span>

                  <ol className="mt-8 space-y-4">
                    <Outcome n={1}>
                      {t("delayedCompensationDesc")} <InlineLink href="#">{t("learnMoreLink")}</InlineLink>
                    </Outcome>
                    <Outcome n={2}>
                      {t("compensationTableDesc")}{" "}
                      <InlineLink href={toV2("/login")}>{t("logInLink")}</InlineLink>{" "}
                      {t("loginIfHaveAccount")}{" "}
                      <InlineLink href={toV2("/register")}>{t("signUpLink")}</InlineLink>{" "}
                      {t("signUpToAccessReport")}
                    </Outcome>
                  </ol>
                </Card>
              </Reveal>
            </div>

            <Reveal variant="up" delay={200} className="mt-8">
              <Callout tone="warning">{t("pointRbiGuidelines")}</Callout>
            </Reveal>
          </div>
        </Container>
      </Section>
    );
  }

  function FlowNode({ title, body, accent = false }: { title: string; body: string; accent?: boolean }) {
    return (
      <div
        className={`v2-rim relative flex h-full flex-col justify-center overflow-hidden rounded-[var(--v2-r-lg)] p-7 text-center shadow-[var(--v2-shadow-2)] ${
          accent
            ? "bg-linear-to-br from-[#1c2a1f] to-[#0b1220] ring-1 ring-[rgba(245,197,24,0.35)]"
            : "bg-linear-to-br from-[#0a3a52] to-[#0f5773]"
        }`}
      >
        <p
          className={`text-lg font-bold leading-snug ${accent ? "text-[var(--v2-gold)]" : "text-white"}`}
        >
          {title}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
      </div>
    );
  }

  function Outcome({ n, children }: { n: number; children: ReactNode }) {
    return (
      <li className="flex gap-4">
        <Badge tone="cyan" className="h-7 w-7 shrink-0 justify-center !px-0 tabular-nums">
          {n}
        </Badge>
        <p className="min-w-0 text-sm leading-relaxed text-[var(--v2-text-2)]">{children}</p>
      </li>
    );
  }

  function Line({ arrow = false }: { arrow?: boolean }) {
    return (
      <span aria-hidden className="flex items-center">
        <span className="h-8 w-px bg-linear-to-b from-transparent to-[var(--v2-cyan)] lg:h-px lg:w-10 lg:bg-linear-to-r" />
        {arrow && <ArrowRightIcon className="hidden h-4 w-4 text-[var(--v2-cyan)] lg:block" />}
      </span>
    );
  }
}
