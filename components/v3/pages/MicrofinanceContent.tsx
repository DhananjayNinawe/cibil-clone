"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { MFI_HERO } from "@/lib/v3/productArt";
import { Container, Folio, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Steps, { type Step } from "@/components/v3/ui/Steps";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import SetType from "@/components/v3/motion/SetType";

/**
 * CIBIL Microfinance Score & Report.
 *
 * The reader of this page is the least likely on the site to already know what the product is —
 * an MFI borrower, often new to credit entirely. So the definition of a microfinance loan, which
 * V1 tucks into a yellow strip above the fold, is given the page's one ink band and set at
 * heading scale. That is the strongest claim here, and it is a *definition*: the page earns the
 * right to explain before it sells.
 *
 * What the report contains becomes a numbered ledger of four entries; why you would want one
 * becomes three ruled clauses; and the email/courier route — the only true procedure among these
 * six pages — becomes the numbered rail it always was, hung off a single hairline.
 */
const INCLUDES: TranslationKey[] = ["mfpInc1", "mfpInc2", "mfpInc3", "mfpInc4"];

const WHY: { boldKey: TranslationKey; restKey: TranslationKey }[] = [
  { boldKey: "mfpWhy1Bold", restKey: "mfpWhy1" },
  { boldKey: "mfpWhy2Bold", restKey: "mfpWhy2" },
  { boldKey: "mfpWhy3Bold", restKey: "mfpWhy3" },
];

export default function MicrofinanceContent() {
  const { t, t3 } = useV3();

  /**
   * The offline route, as a procedure.
   *
   * Step 1 is two keys in V1 — a "Download" link hung on `href="#"`, then the rest of the
   * sentence. The link goes nowhere, so the two halves are simply set as the one sentence they
   * always were. The support address in step 3 stays printed in full, exactly as the catalog
   * writes it.
   */
  const steps: Step[] = [
    { title: `${t("downloadWord")} ${t("mfpStep1Suffix")}` },
    { title: t("mfpStep2") },
    { title: t("mfpStep3") },
    { title: t("mfpStep4") },
  ];

  /* The headline carries no italic: no catalog key's phrase appears verbatim inside `mfpHeroTitle`
     in all four locales, and slicing a translated sentence by word position is precisely what
     <Emphasise> exists to avoid. A missing italic is invisible; a mangled sentence is not. */
  return (
    <>
      <PageHeader
        size="full"
        folio={t("productMfiTag")}
        breadcrumbs={[
          { label: t("navProducts"), href: toV3("/choose-subscription") },
          { label: t("megaMfiScoreReport") },
        ]}
        title={[t("mfpHeroTitle")]}
        actions={
          <Button href={toV3("/register")} size="lg" arrow>
            {t("mfpHeroBtn")}
          </Button>
        }
        media={<Plate src={MFI_HERO} alt={t("mfpHeroTitle")} priority fit="cover" ratio="4 / 3" drift />}
      />

      {/* The definition. The page's one ink band — and the only thing on this site that has to be
          understood before anything else on the page means anything. */}
      <Section space="lg" tone="ink">
        <Container>
          <Folio index="01">{t3("v3AtAGlance")}</Folio>
          <p className="v3-h3 mt-10 max-w-[70ch] text-pretty text-[var(--v3-fg)]">
            <SetType lines={[t("mfpBanner")]} />
          </p>
        </Container>
      </Section>

      {/* 02 — what it is, and what is in it. */}
      <Section space="lg">
        <Container>
          <SectionHead index="02" folio={t3("v3DetailsLabel")} title={t("mfpWhatHeading")} />

          <div className="mt-14 grid gap-x-16 gap-y-8 lg:grid-cols-2">
            <Reveal variant="rise">
              <p className="text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                {t("mfpWhatPara1")}{" "}
                <em className="v3-em font-medium text-[var(--v3-fg)]">{t("mfpWhatPara1Italic")}</em>
              </p>
            </Reveal>

            <Reveal variant="rise" delay={80}>
              <p className="text-pretty leading-relaxed text-[var(--v3-fg-2)]">{t("mfpWhatPara2")}</p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h3 className="v3-h3 max-w-[20ch] text-balance">{t("mfpIncludesHeading")}</h3>
              <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                {t("mfpIncludesIntro")}
              </p>
            </div>

            <ol className="border-t border-[var(--v3-line-2)]">
              {INCLUDES.map((item, i) => (
                <Reveal
                  key={item}
                  as="li"
                  variant="rise"
                  delay={i * 60}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-5 sm:grid-cols-[4rem_1fr] sm:gap-x-8"
                >
                  <span aria-hidden className="v3-num pt-1 text-xs text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-[58ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                    {t(item)}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* 03 — why. Three clauses, each a bold lead-in and its consequence. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="03" folio={t3("v3KeyPoints")} title={t("mfpWhyHeading")} />

          <ul className="mt-12 border-t border-[var(--v3-line-2)]">
            {WHY.map((reason, i) => (
              <Reveal
                key={reason.boldKey}
                as="li"
                variant="rise"
                delay={i * 70}
                className="grid gap-x-10 gap-y-2 border-b border-[var(--v3-line)] py-7 lg:grid-cols-[16rem_1fr]"
              >
                <h3 className="text-lg leading-snug font-medium text-[var(--v3-fg)]">
                  {t(reason.boldKey)}
                </h3>
                <p className="max-w-[62ch] text-pretty leading-relaxed text-[var(--v3-fg-2)]">
                  {t(reason.restKey)}
                </p>
              </Reveal>
            ))}
          </ul>

          <Callout tone="regulatory" className="mt-10">
            <p className="italic">{t("mfpDisclaimer")}</p>
          </Callout>
        </Container>
      </Section>

      {/* 04 — how to get one. Online in a line; or, failing that, the four-step postal route. */}
      <Section space="lg">
        <Container>
          <Folio index="04">{t3("v3ProcessLabel")}</Folio>

          <p className="v3-lede mt-8 max-w-[70ch] text-pretty text-[var(--v3-fg)]">
            {t("mfpAvailBanner")}{" "}
            <Link
              href={toV3("/register")}
              className="v3-focus v3-link font-medium text-[var(--v3-fg)] first-letter:uppercase"
            >
              {t("disputeClickHere")}
            </Link>{" "}
            {t("mfpGetStartedNow")}
          </p>

          <Rule className="mt-12" />

          <h2 className="v3-h3 mt-12 max-w-[34ch] text-balance">{t("mfpStepsHeading")}</h2>
          <Steps className="mt-8" steps={steps} layout="rail" />

          <p className="mt-12 text-sm leading-relaxed text-[var(--v3-fg-2)]">
            <Link
              href={toV3("/microfinance-dispute-resolution")}
              className="v3-focus v3-link font-medium text-[var(--v3-fg)] first-letter:uppercase"
            >
              {t("disputeClickHere")}
            </Link>{" "}
            {t("mfpDisputeSuffix")}
          </p>
        </Container>
      </Section>
    </>
  );
}
