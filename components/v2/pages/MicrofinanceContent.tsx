"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import Card from "@/components/v2/ui/Card";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Steps, { type Step } from "@/components/v2/ui/Steps";
import Reveal from "@/components/v2/motion/Reveal";
import { CheckIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/mfi.jpg";

const INCLUDES: TranslationKey[] = ["mfpInc1", "mfpInc2", "mfpInc3", "mfpInc4"];

const WHY: [TranslationKey, TranslationKey][] = [
  ["mfpWhy1Bold", "mfpWhy1"],
  ["mfpWhy2Bold", "mfpWhy2"],
  ["mfpWhy3Bold", "mfpWhy3"],
];

const LINK_CLASS =
  "v2-focus v2-underline font-bold text-[var(--v2-cyan)] transition-colors hover:text-[var(--v2-cyan-soft)]";

/**
 * CIBIL Microfinance Score & Report.
 *
 * The email/courier route is the part people actually get lost in, so it stops being a numbered
 * list of sentences and becomes the page's spine: a lit rail with the support address wired in
 * where the sentence names it. Everything else — the MFI explainer, what the report contains, why
 * to pull it, the disclaimer — is V1's copy, re-set.
 */
export default function MicrofinanceContent() {
  const { t } = useV2();

  /** Step 3 embeds the support address mid-sentence in every locale; find it and make it mail. */
  const courierStep = () => {
    const text = t("mfpStep3");
    const email = t("registeredOfficeEmail");
    const at = text.toLowerCase().indexOf(email.toLowerCase());
    if (at === -1) return <>{text}</>;

    return (
      <>
        {text.slice(0, at)}
        <a href={`mailto:${email}`} className={LINK_CLASS}>
          {text.slice(at, at + email.length)}
        </a>
        {text.slice(at + email.length)}
      </>
    );
  };

  const steps: Step[] = [
    {
      id: "download",
      title: (
        <>
          {/* V1 hangs "Download" on href="#": the form is not in this tree, so the word stays a
              word rather than a link that goes nowhere. */}
          <strong className="text-[var(--v2-cyan)]">{t("downloadWord")}</strong> {t("mfpStep1Suffix")}
        </>
      ),
    },
    { id: "complete", title: t("mfpStep2") },
    { id: "courier", title: courierStep() },
    { id: "await", title: t("mfpStep4") },
  ];

  return (
    <>
      <PageHero
        size="md"
        tone="gold"
        eyebrow={t("navProducts")}
        title={t("mfpHeroTitle")}
        breadcrumbs={[{ label: t("navProducts") }, { label: t("mfpHeroTitle") }]}
        actions={
          <Button href={toV2("/register")} arrow magnetic>
            {t("mfpHeroBtn")}
          </Button>
        }
        media={<Plate src={HERO_IMAGE} alt="" surface="dark" width={760} height={560} priority />}
      >
        <Callout tone="warning" className="max-w-2xl">
          {t("mfpBanner")}
        </Callout>
      </PageHero>

      {/* What it is, and what is inside it. */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
            <div>
              <SectionHeading index="01" eyebrow={t("navProducts")} title={t("mfpWhatHeading")} />
              <Reveal variant="up" delay={80}>
                <p className="mt-8 leading-relaxed text-[var(--v2-text-2)]">
                  {t("mfpWhatPara1")}{" "}
                  <em className="text-[var(--v2-text)]">{t("mfpWhatPara1Italic")}</em>
                </p>
                <p className="mt-5 leading-relaxed text-[var(--v2-text-2)]">{t("mfpWhatPara2")}</p>
              </Reveal>
            </div>

            <Reveal variant="right" delay={140}>
              <Card spotlight padding="lg">
                <h3 className="text-lg font-bold text-[var(--v2-text)]">{t("mfpIncludesHeading")}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--v2-text-2)]">
                  {t("mfpIncludesIntro")}
                </p>
                <ul className="mt-7 space-y-4">
                  {INCLUDES.map((key) => (
                    <li key={key} className="flex gap-3.5">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,176,240,0.14)] text-[var(--v2-cyan)]"
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-[var(--v2-text-2)]">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why pull it. */}
      <Section space="lg" tone="raised">
        <Container>
          <SectionHeading index="02" eyebrow={t("navPersonal")} title={t("mfpWhyHeading")} />

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {WHY.map(([bold, body], index) => (
              <Reveal as="li" key={bold} variant="up" delay={index * 100} className="h-full">
                <Card spotlight padding="lg" className="h-full">
                  <p className="v2-eyebrow text-[var(--v2-text-3)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-lg font-bold text-[var(--v2-text)]">{t(bold)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">{t(body)}</p>
                </Card>
              </Reveal>
            ))}
          </ul>

          <Reveal variant="fade" delay={120} className="mt-12">
            <Callout tone="note">{t("mfpDisclaimer")}</Callout>
          </Reveal>
        </Container>
      </Section>

      {/* Get it — online in a few clicks, or by email/courier. */}
      <Section space="lg" tone="canvas">
        <Container>
          <Reveal variant="scale">
            <Card
              spotlight
              padding="lg"
              className="flex flex-col items-start justify-between gap-7 bg-linear-to-br from-[rgba(245,197,24,0.10)] to-[rgba(11,18,32,0.6)] sm:flex-row sm:items-center"
            >
              <p className="v2-lede max-w-2xl text-[var(--v2-text)]">
                {t("mfpAvailBanner")}{" "}
                <Link href={toV2("/register")} className={`${LINK_CLASS} first-letter:uppercase`}>
                  {t("disputeClickHere")}
                </Link>{" "}
                {t("mfpGetStartedNow")}
              </p>
              <Button href={toV2("/register")} arrow magnetic className="shrink-0">
                {t("mfpHeroBtn")}
              </Button>
            </Card>
          </Reveal>

          <div className="mt-24 grid gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <div>
              <SectionHeading index="03" eyebrow={t("navSupport")} title={t("mfpStepsHeading")} />
              <Reveal variant="fade" delay={140}>
                <p className="mt-10 text-sm leading-relaxed text-[var(--v2-text-2)]">
                  <Link
                    href={toV2("/microfinance-dispute-resolution")}
                    className={`${LINK_CLASS} first-letter:uppercase`}
                  >
                    {t("disputeClickHere")}
                  </Link>{" "}
                  {t("mfpDisputeSuffix")}
                </p>
              </Reveal>
            </div>

            <Steps steps={steps} layout="rail" />
          </div>
        </Container>
      </Section>
    </>
  );
}
