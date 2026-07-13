"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Steps from "@/components/v3/ui/Steps";
import Callout from "@/components/v3/ui/Callout";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import ProcessSequence from "@/components/v3/dispute/ProcessSequence";
import ImportantPoints from "@/components/v3/dispute/ImportantPoints";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/dispute-new.png";

/**
 * Microfinance dispute resolution.
 *
 * Structurally the sibling of the consumer page, and it shares its two spines — the numbered
 * "what we do" sequence and the statutory provisos — because V1 shares them too. What is specific
 * to microfinance is how you *get* the report in the first place (a posted form), and the three
 * offline channels a microfinance borrower is far more likely to use than a dashboard: a letter,
 * a phone call, a walk-in. Those close the page as a ruled register of three entries, each with
 * its address, its number and its hours — every one of them a fact that must survive the port.
 */
export default function MfiDisputeContent() {
  const { t, t3 } = useV3();

  const formSteps: { label: TranslationKey; body: ReactNode }[] = [
    {
      label: "step1Label",
      body: (
        <>
          {t("mfiRequestFormStep1")}{" "}
          <Link href="#" className="v3-focus v3-link font-medium text-[var(--v3-fg)]">
            {t("mfiRequestFormLink")}
          </Link>
          .
        </>
      ),
    },
    { label: "step2Label", body: t("mfiRequestFormStep2") },
    { label: "step3Label", body: t("mfiRequestFormStep3") },
    { label: "step4Label", body: t("mfiRequestFormStep4") },
  ];

  const channels: { title: string; lines: ReactNode[]; note: string }[] = [
    {
      title: t("writeToUsTitle"),
      lines: [
        <a
          key="email"
          href={`mailto:${t("registeredOfficeEmail")}`}
          className="v3-focus v3-link font-medium text-[var(--v3-fg)]"
        >
          {t("mfiWriteToUsEmail")}
        </a>,
      ],
      note: t("mfiWriteToUsNote"),
    },
    { title: t("callUsTitle"), lines: [t("mfiHelplineNumber")], note: t("mfiCallTimings") },
    { title: t("visitUsTitle"), lines: [t("mfiVisitAddress")], note: t("mfiVisitTimings") },
  ];

  return (
    <>
      <PageHeader
        folio={t("navGrievance")}
        title={t("mfiDisputeHeroTitle")}
        lede={t("mfiDisputeHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV3("/consumer-dispute-resolution") },
          { label: t("megaMfiDisputeResolution") },
        ]}
        actions={
          <Button href="#how-to-fix" size="lg" arrow>
            {t("disputeHeroBtn")}
          </Button>
        }
        media={<Plate src={HERO_IMAGE} alt="" ratio="16 / 10" fit="cover" priority />}
      />

      <Section space="sm">
        <Container>
          <Reveal variant="rise">
            <Callout tone="success">
              <p className="text-base leading-relaxed text-[var(--v3-fg)] sm:text-lg">
                {t("mfiFreeServiceBanner")}
              </p>
            </Callout>
          </Reveal>
        </Container>
      </Section>

      <Section id="how-to-fix" space="lg" ruled>
        <Container>
          <SectionHead
            index="01"
            folio={t3("v3ProcessLabel")}
            title={t("mfiHowToFixHeading")}
            lede={t("mfiFollowStepsHeading")}
          />

          <Reveal variant="rise" className="mt-4">
            <Steps
              steps={[
                { title: t("mfiStep1Title") },
                { title: t("mfiStep2Title") },
                { title: t("mfiStep3Title") },
                { title: t("mfiStep4Title") },
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      <Section space="lg" ruled>
        <Container>
          <SectionHead index="02" folio={t3("v3DetailsLabel")} title={t("mfiGetReportHeading")} />

          <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-[1.15fr_0.85fr]">
            <ol className="min-w-0 border-t border-[var(--v3-line-2)]">
              {formSteps.map((step, i) => (
                <Reveal
                  key={step.label}
                  as="li"
                  variant="rise"
                  delay={i * 60}
                  className="grid grid-cols-[5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-6 sm:gap-x-8"
                >
                  <span className="v3-folio pt-1 text-[var(--v3-fg)]">{t(step.label)}</span>
                  <p className="min-w-0 text-sm leading-relaxed text-[var(--v3-fg-2)]">{step.body}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal variant="rise" delay={120} className="min-w-0">
              <div className="border-t border-[var(--v3-line-3)] pt-6">
                <h3 className="v3-h3">{t("writeToUsTitle")}</h3>
                <p className="mt-5 text-sm text-[var(--v3-fg-2)]">{t("mfiWriteToUsEmail")}</p>
                <p className="mt-2 text-sm text-[var(--v3-fg-2)]">{t("mfiContactUsFaqLabel")}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ProcessSequence index="03" ledeKey="disputeHappensHeading" />

      <ImportantPoints index="04" />

      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="05" folio={t3("v3Explore")} title={t("waysToRaiseDisputeHeading")} />

          <ol className="mt-4 border-t border-[var(--v3-line)]">
            {channels.map((channel, i) => (
              <Reveal
                key={channel.title}
                as="li"
                variant="rise"
                delay={i * 70}
                className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-8 sm:grid-cols-[4rem_1fr_1fr] sm:gap-x-10"
              >
                <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="text-lg leading-snug font-medium text-[var(--v3-fg)]">{channel.title}</h3>
                  {channel.lines.map((line, l) => (
                    <p key={l} className="mt-2 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                      {line}
                    </p>
                  ))}
                </div>

                <p className="v3-caption col-start-2 mt-3 max-w-[42ch] sm:col-start-3 sm:mt-1">
                  {channel.note}
                </p>
              </Reveal>
            ))}
          </ol>

          <Rule className="mt-20" strong />
        </Container>
      </Section>
    </>
  );
}
