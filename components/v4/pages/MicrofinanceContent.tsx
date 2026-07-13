"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { ButtonLink } from "@/components/v4/ui/Button";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import { InfoIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The CIBIL Microfinance Score & Report.
 *
 * The reader of this page is, by the product's own definition, borrowing small and uncollateralised
 * — often for the first time. So the page cannot open the way the consumer pages open, on a product
 * name they are assumed to know. It opens on the definition: *what an MFI loan is*, in the aside,
 * before a single feature is claimed. That sentence is V1's; V1 prints it in black on a gold strip
 * below the fold.
 *
 * It is also free, and free is the fact that matters most here — so it is the one gold mark on the
 * page, because gold in V4 means "this is yours" and nothing else.
 *
 * The offline route (email or courier) is a real process with real consequences if a step is missed,
 * so it is set as an ordered list with the step's index in the margin, and the support address is a
 * live `mailto:` rather than a string of text a first-time borrower has to copy by hand.
 */

const INCLUDES: TranslationKey[] = ["mfpInc1", "mfpInc2", "mfpInc3", "mfpInc4"];

const WHY: { bold: TranslationKey; rest: TranslationKey }[] = [
  { bold: "mfpWhy1Bold", rest: "mfpWhy1" },
  { bold: "mfpWhy2Bold", rest: "mfpWhy2" },
  { bold: "mfpWhy3Bold", rest: "mfpWhy3" },
];

/**
 * Step three names CIBIL's support address inside the sentence, and every locale embeds it inline
 * rather than splitting the sentence around it. Find it and make it a real mailto — the reader who
 * needs this route is the least likely to retype an address correctly.
 */
function CourierStep() {
  const { t } = useV4();
  const text = t("mfpStep3");
  const email = t("registeredOfficeEmail");
  const at = text.toLowerCase().indexOf(email.toLowerCase());

  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <a href={`mailto:${email}`} className="v4-link">
        {text.slice(at, at + email.length)}
      </a>
      {text.slice(at + email.length)}
    </>
  );
}

/** One numbered step. The numeral sits in the margin, so the sentences still form a clean column. */
function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-5 border-t border-[var(--v4-edge)] py-6 last:border-b sm:gap-7">
      <span
        aria-hidden="true"
        className="v4-num flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--v4-r-sm)] border border-[var(--v4-edge-2)] bg-[var(--v4-surface)] text-[0.875rem] font-medium text-[var(--v4-fg)]"
      >
        {String(n).padStart(2, "0")}
      </span>
      <p className="v4-body !max-w-[62ch] !text-[0.9375rem]">{children}</p>
    </li>
  );
}

export default function MicrofinanceContent() {
  const { t, t4 } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navProducts"), href: toV4("/choose-subscription") }}
        label={t("productMfiTag")}
        title={t("mfpHeroTitle")}
        lede={t("productMfiDesc")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("mfpHeroBtn")}
          </ButtonLink>
        }
        aside={
          <div className="v4-plane p-6 sm:p-8">
            <span className="v4-chip v4-chip-you">{t("planFreeAnnualPrice")}</span>

            <p className="mt-5 flex items-start gap-3.5">
              <InfoIcon size={19} className="mt-1 shrink-0 text-[var(--v4-accent)]" />
              <span className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                {t("mfpBanner")}
              </span>
            </p>
          </div>
        }
      />

      {/* ── The definition. ────────────────────────────────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-mfi-what">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHead id="v4-mfi-what" title={t("mfpWhatHeading")} />

            <div>
              <p className="v4-body">
                {t("mfpWhatPara1")}{" "}
                <em className="text-[var(--v4-fg)]">{t("mfpWhatPara1Italic")}</em>
              </p>
              <p className="v4-body mt-5">{t("mfpWhatPara2")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── What is actually in the report. ────────────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-mfi-includes">
        <Container width="wide">
          <SectionHead
            id="v4-mfi-includes"
            label={t4("v4SectionService")}
            title={t("mfpIncludesHeading")}
            lede={t("mfpIncludesIntro")}
          />

          <ul className="mt-11 grid gap-5 sm:grid-cols-2">
            {INCLUDES.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                index={i}
                className="v4-plane flex h-full items-start gap-4 p-6"
              >
                <span aria-hidden="true" className="v4-num text-[0.75rem] text-[var(--v4-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">{t(item)}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Why it is worth checking. ──────────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-mfi-why">
        <Container width="wide">
          <SectionHead id="v4-mfi-why" title={t("mfpWhyHeading")} />

          <ul className="mt-11 grid gap-5 sm:grid-cols-3">
            {WHY.map((reason, i) => (
              <Reveal as="li" key={reason.bold} index={i} className="v4-plane h-full p-6 sm:p-7">
                <h3 className="v4-h3">{t(reason.bold)}</h3>
                <p className="v4-body mt-3 !text-[0.9375rem]">{t(reason.rest)}</p>
              </Reveal>
            ))}
          </ul>

          <p className="v4-caption mt-8 italic">{t("mfpDisclaimer")}</p>
        </Container>
      </Section>

      {/* ── How to get it: online in a click, or by post if that is what you have. ──────────── */}
      <Section tone="day" aria-labelledby="v4-mfi-steps">
        <Container>
          <Notice tone="success" title={t("mfpAvailBanner")}>
            <Link href={toV4("/register")} className="v4-link first-letter:uppercase">
              {t("disputeClickHere")}
            </Link>{" "}
            {t("mfpGetStartedNow")}
          </Notice>

          <h2 id="v4-mfi-steps" className="v4-h3 mt-16">
            {t("mfpStepsHeading")}
          </h2>

          <ol className="mt-8">
            <Step n={1}>
              {t("downloadWord")} {t("mfpStep1Suffix")}
            </Step>
            <Step n={2}>{t("mfpStep2")}</Step>
            <Step n={3}>
              <CourierStep />
            </Step>
            <Step n={4}>{t("mfpStep4")}</Step>
          </ol>

          <p className="v4-body mt-10 !text-[0.9375rem]">
            <Link
              href={toV4("/microfinance-dispute-resolution")}
              className="v4-link first-letter:uppercase"
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
