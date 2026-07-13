"use client";

import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import Notice from "@/components/v4/ui/Notice";
import Tabs from "@/components/v4/ui/Tabs";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { ArrowRightIcon, BuildingIcon, DocumentIcon, UserIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The RBI framework for compensation.
 *
 * The most under-sold page on the site. Its content is: *if we are late fixing your report, we owe
 * you ₹100 a day.* V1 buries that inside a nine-box teal flowchart made of nested `<div>`s, where
 * the figure itself is one 14px line among twelve.
 *
 * Here the figure is the page. It sits in the hero, in the mono face, at display size — the one
 * number this page exists to tell you — and the flowchart becomes what it always was: a condition
 * (30 days), a consequence (₹100 a day), and two columns saying who pays and how it reaches you.
 *
 * The three PDFs V1 offers on `href="#"` are regulatory disclosures, and this site has a page for
 * regulatory disclosures; they point at it.
 */

const DOCUMENTS: TranslationKey[] = [
  "frameworkPdfCardTitle",
  "regDisclosure2123Title",
  "regDisclosure2324Title",
];

const FAQ_TABS: TranslationKey[] = [
  "tabCompensationGuidelines",
  "tabCompensationEligibility",
  "tabCompensationPayout",
  "tabCompensationCalculation",
  "tabGeneralQuestions",
  "tabCustomerSupportFaqs",
];

const FAQ_TITLES: TranslationKey[] = [
  "frameworkFaq1Title",
  "frameworkFaq2Title",
  "frameworkFaq3Title",
  "frameworkFaq4Title",
  "frameworkFaq5Title",
];

export default function FrameworkContent() {
  const { t } = useV4();

  const comingSoon = <p className="v4-caption">{t("sectionContentComingSoon")}</p>;

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navGrievance"), href: toV4("/consumer-dispute-resolution") }}
        label={t("megaFrameworkCompensation")}
        title={t("frameworkHeroTitle")}
        lede={t("frameworkHeroDesc")}
        actions={
          <ButtonLink href="#what-is-framework" size="lg" arrow>
            {t("readMoreBtn")}
          </ButtonLink>
        }
        aside={
          // The whole page, in one plane: the rule, the trigger, the amount.
          <div className="v4-plane p-7 sm:p-9">
            <p className="v4-label">{t("rbiGuidelinesBoxTitle")}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
              {t("rbiGuidelinesBoxDesc")}
            </p>

            <p className="v4-caption mt-6 border-t border-dashed border-[var(--v4-edge-2)] pt-6">
              {t("ifExceeds30Days")}
            </p>

            <p className="v4-num mt-2 text-[clamp(2.25rem,4vw,3rem)] font-bold leading-none text-[var(--v4-fg)]">
              {t("hundredPerDay")}
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
              {t("hundredPerDayDesc")}
            </p>
          </div>
        }
      />

      {/* ── What it is ──────────────────────────────────────────────────────────────────────── */}
      <Section
        id="what-is-framework"
        tone="plane"
        className="scroll-mt-28"
        aria-labelledby="v4-framework-heading"
      >
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <h2 id="v4-framework-heading" className="v4-h2">
                {t("whatIsFrameworkHeading")}
              </h2>
              <div className="v4-prose mt-6">
                <p>{t("frameworkPara1")}</p>
                <p>{t("frameworkPara2")}</p>
              </div>

              <Reveal className="mt-8">
                <Notice tone="warning">{t("frameworkEffectiveNote")}</Notice>
              </Reveal>
            </div>

            {/* The documents. V1 offers three "Download PDF" links that go to `#`; the two
                regulatory disclosures are exactly what /regulatory publishes, so that is where all
                three resolve — a named destination that exists, rather than a download that does
                not. */}
            <aside>
              <h2 className="v4-label">{t("megaResourcesHeading")}</h2>

              <ul className="mt-5 grid gap-3">
                {DOCUMENTS.map((doc, i) => (
                  <li key={doc}>
                    <Reveal index={i}>
                      <Link
                        href={toV4("/regulatory")}
                        className="v4-plane v4-plane-lift group flex items-center gap-4 p-5"
                      >
                        <DocumentIcon
                          size={20}
                          className="shrink-0 text-[var(--v4-accent)]"
                        />
                        <span className="flex-1 text-[0.9375rem] font-bold leading-snug text-[var(--v4-fg)] group-hover:text-[var(--v4-accent)]">
                          {t(doc)}
                        </span>
                        <ArrowRightIcon
                          size={17}
                          className="shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        />
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── Who pays, and how it reaches you ────────────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-compensation-heading">
        <Container>
          <SectionHead
            id="v4-compensation-heading"
            title={t("hundredPerDay")}
            lede={t("hundredPerDayDesc")}
          />

          <div className="mt-12 grid gap-3 lg:grid-cols-2">
            <Reveal className="v4-plane p-6 sm:p-8">
              <p className="flex items-center gap-3">
                <UserIcon size={22} className="text-[var(--v4-accent)]" />
                <span className="v4-h3">{t("compensationCreditedDesc")}</span>
              </p>

              <div className="v4-prose mt-6 border-t border-[var(--v4-edge)] pt-6">
                <p>
                  {t("noAccountInfoDesc")}{" "}
                  <Link href={toV4("/contact-us")} className="v4-link">
                    {t("contactUsPageLink")}
                  </Link>
                </p>
                <p className="v4-caption">{t("offlineChannelsNote")}</p>
              </div>
            </Reveal>

            <Reveal index={1} className="v4-plane p-6 sm:p-8">
              <p className="flex items-center gap-3">
                <BuildingIcon size={22} className="text-[var(--v4-accent)]" />
                <span className="v4-h3">{t("delayedCompensationDesc")}</span>
              </p>

              <div className="v4-prose mt-6 border-t border-[var(--v4-edge)] pt-6">
                <p>{t("compensationTableDesc")}</p>
                <p>
                  <Link href={toV4("/login")} className="v4-link">
                    {t("logInLink")}
                  </Link>{" "}
                  {t("loginIfHaveAccount")}{" "}
                  <Link href={toV4("/register")} className="v4-link">
                    {t("signUpLink")}
                  </Link>{" "}
                  {t("signUpToAccessReport")}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal index={2} className="mt-6">
            <Notice tone="warning">{t("pointRbiGuidelines")}</Notice>
          </Reveal>
        </Container>
      </Section>

      {/* ── The questions ───────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-framework-faq-heading">
        <Container width="text">
          <SectionHead
            id="v4-framework-faq-heading"
            label={t("questionSectionsLabel")}
            title={t("frameworkFaqsHeading")}
          />

          <div className="mt-10">
            <Tabs
              label={t("questionSectionsLabel")}
              items={FAQ_TABS.map((tab) => ({
                id: tab,
                label: t(tab),
                panel:
                  tab === "tabCompensationGuidelines" ? (
                    <DisclosureList>
                      {FAQ_TITLES.map((title, i) => (
                        <Disclosure key={title} question={t(title)} defaultOpen={i === 0}>
                          {i === 0 ? <p>{t("frameworkPara1")}</p> : comingSoon}
                        </Disclosure>
                      ))}
                    </DisclosureList>
                  ) : (
                    comingSoon
                  ),
              }))}
            />
          </div>
        </Container>
      </Section>

      {/* ── The way out ─────────────────────────────────────────────────────────────────────── */}
      <Section space="sm">
        <Container width="text">
          <p className="v4-body text-center">
            <Link href={toV4("/")} className="v4-link">
              {t("disputeClickHere")}
            </Link>{" "}
            {t("safeguardProfileBanner")}
          </p>
        </Container>
      </Section>
    </>
  );
}
