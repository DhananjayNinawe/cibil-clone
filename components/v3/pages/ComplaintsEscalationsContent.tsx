"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Callout from "@/components/v3/ui/Callout";
import MarginRail from "@/components/v3/ui/MarginRail";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/credit-advice.jpg";

/**
 * Complaints and escalations.
 *
 * The heart of this page is a ladder: Level 2 → Level 3 → Level 4, ending at the RBI. V1 draws it
 * as three stacks of icon-and-line; V3 sets it as a numbered ledger of levels, each a ruled entry
 * whose officer, email, phone and address hang in a definition column beside the level number —
 * and the whole ladder gets a margin rail, so a reader who has already been through Level 2 can
 * jump straight to Level 3 instead of scrolling past it.
 *
 * The level numbers here are *not* an ordinal counter: they are the levels themselves, 02, 03, 04,
 * which is why they are written out rather than derived from the array index. Level 1 is the
 * support channels above them — that is the point of the ladder, and renumbering it from 01 would
 * quietly rewrite a regulatory escalation path.
 */

function InfoLine({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mt-3 grid gap-x-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
      {label && <p className="v3-folio pt-1">{label}</p>}
      <div
        className={`text-sm leading-relaxed text-[var(--v3-fg-2)] ${label ? "" : "sm:col-start-2"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default function ComplaintsEscalationsContent() {
  const { t, t3 } = useV3();

  const inline = "v3-focus v3-link font-medium text-[var(--v3-fg)]";

  const rail = [
    { id: "level-2", label: t("level2Heading") },
    { id: "level-3", label: t("level3Heading") },
    { id: "level-4", label: t("level4Heading") },
  ];

  const channels: { title: string; body: ReactNode }[] = [
    {
      title: t("callUsTitle"),
      body: (
        <>
          <p>{t("concernsCallTimings")}</p>
          <p className="mt-1">{t("mfiCallTimings")}</p>
        </>
      ),
    },
    {
      title: t("writeToUsTitle"),
      body: (
        <p>
          <Link href={toV3("/contact-us")} className={inline}>
            {t("submitRequestLink")}
          </Link>
        </p>
      ),
    },
    {
      title: t("emailTitle"),
      body: (
        <>
          <p>{t("concernsEmailLabel")}</p>
          <p className="mt-1">
            <a href={`mailto:${t("concernsEmail")}`} className={inline}>
              {t("concernsEmail")}
            </a>
          </p>
          <p className="mt-4 font-semibold text-[var(--v3-fg)]">{t("mandatoryInfoHeading")}</p>
          <p className="mt-1">{t("mandatoryInfoDesc")}</p>
        </>
      ),
    },
    {
      title: t("walkInSupportTitle"),
      body: (
        <>
          <p>{t("walkInTimings")}</p>
          <p className="mt-4 font-semibold text-[var(--v3-fg)]">{t("addressLabel")}</p>
          <address className="mt-1 not-italic">{t("concernsOfficeAddress")}</address>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        folio={t("navGrievance")}
        title={t("concernsHeroTitle")}
        lede={t("concernsHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV3("/consumer-dispute-resolution") },
          { label: t("megaComplaintsEscalations") },
        ]}
        media={
          <Plate src={HERO_IMAGE} alt={t("concernsHeroTitle")} ratio="16 / 10" fit="cover" priority />
        }
      />

      <Section space="md">
        <Container>
          <SectionHead index="01" folio={t3("v3AtAGlance")} title={t("concernsMatterHeading")} />

          <div className="mt-12 grid gap-x-16 gap-y-6 lg:grid-cols-2">
            <Reveal variant="rise">
              <p className="v3-lede text-pretty">
                {t("concernsMatterPara1Prefix")}{" "}
                <strong className="font-semibold text-[var(--v3-fg)]">{t("concernsMatterBrand")}</strong>
                {t("concernsMatterPara1Suffix")}
              </p>
            </Reveal>

            <Reveal variant="rise" delay={80}>
              <p className="v3-lede text-pretty">{t("concernsMatterPara2")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section space="lg" ruled>
        <Container>
          <SectionHead index="02" folio={t3("v3Explore")} title={t("waysToReachUsHeading")} />

          <ol className="mt-4 border-t border-[var(--v3-line)]">
            {channels.map((channel, i) => (
              <Reveal
                key={channel.title}
                as="li"
                variant="rise"
                delay={i * 60}
                className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--v3-line)] py-8 sm:grid-cols-[4rem_16rem_minmax(0,1fr)] sm:gap-x-10"
              >
                <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg leading-snug font-medium text-[var(--v3-fg)]">{channel.title}</h3>

                <div className="col-start-2 mt-3 max-w-[52ch] text-sm leading-relaxed text-[var(--v3-fg-2)] sm:col-start-3 sm:mt-0">
                  {channel.body}
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal variant="rise" className="mt-12">
            <Callout tone="note" title={t("sendLetterHeading")}>
              <p>{t("sendLetterDesc")}</p>
              <address className="mt-2 max-w-[38ch] not-italic font-medium text-[var(--v3-fg)]">
                {t("sendLetterAddress")}
              </address>
            </Callout>
          </Reveal>
        </Container>
      </Section>

      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="03" folio={t3("v3KeyPoints")} title={t("timelineHeading")} />

          <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal variant="rise" className="min-w-0">
              <p className="v3-lede text-pretty">
                {t("timelinePara1Prefix")}{" "}
                <strong className="font-semibold text-[var(--v3-fg)]">{t("timelineUpTo30Days")}</strong>
                {t("timelinePara1Suffix")}
              </p>

              <ul className="mt-8 border-t border-[var(--v3-line)]">
                {[t("timelineBanksCi"), t("timelineCibilCic")].map((split) => (
                  <li
                    key={split}
                    className="border-b border-[var(--v3-line)] py-4 text-sm text-[var(--v3-fg-2)]"
                  >
                    {split}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="rise" delay={80} className="min-w-0">
              <Callout tone="regulatory">
                <p>{t("timelinePara2Prefix")}</p>
                <p className="mt-3">
                  <strong className="font-semibold text-[var(--v3-fg)]">{t("learnMoreBold")}</strong>{" "}
                  <Link href={toV3("/framework-for-compensation")} className={inline}>
                    {t("frameworkCompensationLinkText")}
                  </Link>
                </p>
              </Callout>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section space="lg" ruled>
        <Container>
          <SectionHead index="04" folio={t3("v3InThisSection")} title={t("escalationFrameworkHeading")} />

          <div className="mt-14 grid gap-x-16 gap-y-16 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <MarginRail links={rail} />

            <div className="min-w-0">
              {/* Level 2 — Nodal Officer */}
              <article id="level-2" className="scroll-mt-32 border-t border-[var(--v3-line-3)] pt-8">
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 sm:grid-cols-[4rem_1fr] sm:gap-x-8">
                  <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-accent)]">
                    {"02"}
                  </span>

                  <div className="min-w-0">
                    <h3 className="v3-h3">{t("level2Heading")}</h3>
                    <p className="mt-3 text-base font-medium text-[var(--v3-fg)]">{t("level2Name")}</p>

                    <InfoLine label={t("emailTitle")}>
                      <a href={`mailto:${t("level2Email")}`} className={inline}>
                        {t("level2Email")}
                      </a>
                    </InfoLine>

                    <InfoLine label={t("submitRequestLabel")}>
                      <Link href={toV3("/contact-us")} className={inline}>
                        {t("submitRequestLinkText")}
                      </Link>
                    </InfoLine>

                    <InfoLine label={t("addressLabel")}>{t("sameOfficeAddressAbove")}</InfoLine>

                    <InfoLine>
                      <strong className="font-semibold text-[var(--v3-fg)]">
                        {t("includeServiceRequestNumber")}
                      </strong>{" "}
                      {t("inAllCommunication")}
                    </InfoLine>
                  </div>
                </div>
              </article>

              {/* Level 3 — Principal Nodal Officer */}
              <article
                id="level-3"
                className="mt-16 scroll-mt-32 border-t border-[var(--v3-line-3)] pt-8"
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 sm:grid-cols-[4rem_1fr] sm:gap-x-8">
                  <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-accent)]">
                    {"03"}
                  </span>

                  <div className="min-w-0">
                    <h3 className="v3-h3">{t("level3Heading")}</h3>
                    <p className="mt-3 text-base font-medium text-[var(--v3-fg)]">{t("level3Name")}</p>

                    <InfoLine label={t("emailTitle")}>
                      <a href={`mailto:${t("level3Email")}`} className={inline}>
                        {t("level3Email")}
                      </a>
                    </InfoLine>

                    <InfoLine label={t("callUsTitle")}>
                      <span className="v3-num">{t("level3Phone")}</span>
                    </InfoLine>

                    <InfoLine label={t("submitRequestLabel")}>
                      <Link href={toV3("/contact-us")} className={inline}>
                        {t("submitRequestLinkText")}
                      </Link>
                    </InfoLine>

                    <InfoLine label={t("addressLabel")}>{t("sameOfficeAddress")}</InfoLine>

                    <InfoLine>
                      <strong className="font-semibold text-[var(--v3-fg)]">
                        {t("includeServiceRequestNumber")}
                      </strong>
                    </InfoLine>

                    <InfoLine>
                      {t("viewGrievancePolicyPrefix")}{" "}
                      <Link href="#" className={inline}>
                        {t("grievancePolicyLink")}
                      </Link>
                    </InfoLine>
                  </div>
                </div>
              </article>

              {/* Level 4 — the RBI. The end of the ladder. */}
              <article
                id="level-4"
                className="mt-16 scroll-mt-32 border-t border-[var(--v3-line-3)] pt-8"
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 sm:grid-cols-[4rem_1fr] sm:gap-x-8">
                  <span aria-hidden className="v3-num pt-1 text-sm text-[var(--v3-accent)]">
                    {"04"}
                  </span>

                  <div className="min-w-0">
                    <h3 className="v3-h3">{t("level4Heading")}</h3>
                    <p className="v3-em mt-4 max-w-[58ch] text-base leading-relaxed text-[var(--v3-fg-2)]">
                      {t("level4Desc")}
                    </p>

                    <InfoLine label={t("fileComplaintLabel")}>
                      <Link href="#" className={inline}>
                        {t("rbiComplaintPortalLink")}
                      </Link>
                    </InfoLine>

                    <InfoLine label={t("emailTitle")}>
                      <a href={`mailto:${t("rbiEmail")}`} className={inline}>
                        {t("rbiEmail")}
                      </a>
                    </InfoLine>

                    <InfoLine label={t("addressLabel")}>
                      <address className="not-italic">
                        <span className="block font-semibold text-[var(--v3-fg)]">
                          {t("rbiOfficeName")}
                        </span>
                        <span className="block">{t("rbiOfficeAddress1")}</span>
                        <span className="block">{t("rbiOfficeAddress2")}</span>
                      </address>
                    </InfoLine>

                    <InfoLine label={t("bankingOmbudsmanLabel")}>
                      <Link href="#" className={inline}>
                        {t("bankingOmbudsmanLinkText")}
                      </Link>
                    </InfoLine>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </Section>

      {/* The one moment this page raises its voice. */}
      <Section space="lg" tone="ink" ruled>
        <Container>
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h2 className="v3-h2 max-w-[16ch] text-balance">{t("everyStepHeading")}</h2>
            <p className="v3-lede max-w-[48ch] text-pretty">{t("everyStepDesc")}</p>
          </div>

          <Rule className="mt-16" strong />
        </Container>
      </Section>
    </>
  );
}
