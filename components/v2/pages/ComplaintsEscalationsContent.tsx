"use client";

import type { ReactNode } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section, SectionHeading, Divider } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { InlineLink, ContactTile } from "@/components/v2/pages/shared";
import { HeadsetIcon, MailIcon, BankIcon, MapPinIcon, PhoneIcon, DocumentIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/credit-advice.jpg";

/**
 * Complaints and escalations.
 *
 * Two moments carry this page. The review timeline stops being a bullet list and becomes the
 * 30 days it describes — a single proportional bar, 21 days of bank time beside 9 days of
 * CIBIL time. And the escalation framework stops being three stacked paragraphs and becomes
 * what it actually is: a ladder. Each level steps further right against a lit spine, so the
 * ascent from Nodal Officer to the RBI Ombudsman is visible before a word is read.
 */
export default function ComplaintsEscalationsContent() {
  const { t, tv } = useV2();

  return (
    <>
      <PageHero
        eyebrow={t("navGrievance")}
        title={t("concernsHeroTitle")}
        lede={t("concernsHeroDesc")}
        breadcrumbs={[
          { label: t("navGrievance"), href: toV2("/consumer-dispute-resolution") },
          { label: t("megaComplaintsEscalations") },
        ]}
        tone="duo"
        size="lg"
        media={
          <Parallax speed={0.05}>
            <Plate src={HERO_IMAGE} alt={t("concernsHeroTitle")} width={720} height={520} surface="dark" priority />
          </Parallax>
        }
      />

      {/* Your concerns matter --------------------------------------------------- */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <SectionHeading index="01" eyebrow={tv("v2AtAGlance")} title={t("concernsMatterHeading")} />

            <Reveal variant="up" delay={100}>
              <div className="v2-prose max-w-2xl text-[17px]">
                <p>
                  {t("concernsMatterPara1Prefix")}{" "}
                  <strong>{t("concernsMatterBrand")}</strong>
                  {t("concernsMatterPara1Suffix")}
                </p>
                <p>{t("concernsMatterPara2")}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Ways to reach us -------------------------------------------------------- */}
      <Section space="lg" tone="raised">
        <Container>
          <SectionHeading index="02" eyebrow={tv("v2Explore")} title={t("waysToReachUsHeading")} />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal variant="up">
              <ContactTile icon={<HeadsetIcon className="h-6 w-6" />} title={t("callUsTitle")}>
                <p>{t("concernsCallTimings")}</p>
                <p>{t("mfiCallTimings")}</p>
              </ContactTile>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <ContactTile icon={<MailIcon className="h-6 w-6" />} title={t("writeToUsTitle")}>
                <p>
                  <InlineLink href="#">{t("submitRequestLink")}</InlineLink>
                </p>
              </ContactTile>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <ContactTile icon={<MailIcon className="h-6 w-6" />} title={t("emailTitle")}>
                <p>{t("concernsEmailLabel")}</p>
                <p>
                  <InlineLink href={`mailto:${t("concernsEmail")}`}>{t("concernsEmail")}</InlineLink>
                </p>
                <p className="pt-2 font-bold text-[var(--v2-text)]">{t("mandatoryInfoHeading")}</p>
                <p>{t("mandatoryInfoDesc")}</p>
              </ContactTile>
            </Reveal>

            <Reveal variant="up" delay={300}>
              <ContactTile icon={<BankIcon className="h-6 w-6 text-white" />} title={t("walkInSupportTitle")}>
                <p>{t("walkInTimings")}</p>
                <p className="pt-2 font-bold text-[var(--v2-text)]">{t("addressLabel")}</p>
                <address className="not-italic">{t("concernsOfficeAddress")}</address>
              </ContactTile>
            </Reveal>
          </div>

          <Reveal variant="up" delay={120} className="mt-8">
            <Card padding="lg" spotlight className="max-w-xl">
              <div className="flex gap-5">
                <span aria-hidden className="mt-0.5 shrink-0 text-[var(--v2-cyan)]">
                  <MailIcon className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[var(--v2-text)]">{t("sendLetterHeading")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--v2-text-2)]">{t("sendLetterDesc")}</p>
                  <address className="mt-1 not-italic text-sm leading-relaxed text-[var(--v2-text-2)]">
                    {t("sendLetterAddress")}
                  </address>
                </div>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <ReviewTimeline />
      <EscalationLadder />

      {/* Closing ---------------------------------------------------------------- */}
      <Section space="lg" tone="raised">
        <Container width="narrow">
          <Reveal variant="up" className="text-center">
            <h2 className="v2-h2 text-balance text-[var(--v2-text)]">{t("everyStepHeading")}</h2>
            <p className="v2-lede mx-auto mt-6 max-w-2xl text-pretty">{t("everyStepDesc")}</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );

  /* ---------------------------------------------------------------- Timeline */

  function ReviewTimeline() {
    return (
      <Section space="lg" tone="deep" className="isolate overflow-hidden">
        <Backdrop tone="cyan" />

        <Container className="relative">
          <SectionHeading index="03" eyebrow={tv("v2ProcessLabel")} title={t("timelineHeading")} />

          <Reveal variant="up" delay={80}>
            <p className="v2-lede mt-8 max-w-3xl text-pretty">
              {t("timelinePara1Prefix")}{" "}
              <span className="font-bold text-[var(--v2-text)]">{t("timelineUpTo30Days")}</span>
              {t("timelinePara1Suffix")}
            </p>
          </Reveal>

          {/*
            The two bullets V1 lists are a split of one budget — 21 days plus 9 days makes the
            30 the paragraph above promises. Drawn to scale, the split explains itself.
          */}
          <Reveal variant="up" delay={160} className="mt-12">
            <ul className="flex flex-col gap-4 sm:flex-row">
              <li className="sm:flex-[21]">
                <div
                  aria-hidden
                  className="h-1.5 rounded-full bg-linear-to-r from-[var(--v2-cyan)] to-[var(--v2-cyan-soft)] shadow-[0_0_18px_rgba(0,176,240,0.7)]"
                />
                <p className="mt-4 text-sm font-bold text-[var(--v2-text)]">{t("timelineBanksCi")}</p>
              </li>
              <li className="sm:flex-[9]">
                <div
                  aria-hidden
                  className="h-1.5 rounded-full bg-linear-to-r from-[var(--v2-gold)] to-[rgba(245,197,24,0.35)] shadow-[0_0_18px_rgba(245,197,24,0.5)]"
                />
                <p className="mt-4 text-sm font-bold text-[var(--v2-text)]">{t("timelineCibilCic")}</p>
              </li>
            </ul>
          </Reveal>

          <Reveal variant="up" delay={240} className="mt-12">
            <Divider />
            <p className="mt-8 text-[15px] leading-relaxed text-[var(--v2-text-2)]">
              {t("timelinePara2Prefix")}{" "}
              <span className="font-bold text-[var(--v2-text)]">{t("learnMoreBold")}</span>{" "}
              <InlineLink href={toV2("/framework-for-compensation")}>
                {t("frameworkCompensationLinkText")}
              </InlineLink>
            </p>
          </Reveal>
        </Container>
      </Section>
    );
  }

  /* ----------------------------------------------------------------- Ladder */

  function EscalationLadder() {
    return (
      <Section space="xl" tone="canvas">
        <Container>
          <SectionHeading index="04" eyebrow={tv("v2KeyPoints")} title={t("escalationFrameworkHeading")} />

          <div className="relative mt-16">
            {/* The spine the ladder climbs. */}
            <span
              aria-hidden
              className="absolute left-[19px] top-4 bottom-4 hidden w-px bg-linear-to-t from-transparent via-[rgba(0,176,240,0.35)] to-[var(--v2-gold)] sm:block"
            />

            <ol className="space-y-8">
              <Rung index="02" step={0}>
                <h3 className="v2-h3 text-[var(--v2-text)]">{t("level2Heading")}</h3>
                <p className="mt-4 text-base font-bold text-[var(--v2-cyan)]">{t("level2Name")}</p>

                <div className="mt-5 space-y-3">
                  <InfoLine icon={<MailIcon className="h-4 w-4" />}>
                    <InlineLink href={`mailto:${t("level2Email")}`}>{t("level2Email")}</InlineLink>
                  </InfoLine>
                  <InfoLine icon={<DocumentIcon className="h-4 w-4" />}>
                    {t("submitRequestLabel")}{" "}
                    <InlineLink href="#">{t("submitRequestLinkText")}</InlineLink>
                  </InfoLine>
                  <InfoLine icon={<MapPinIcon className="h-4 w-4" />}>{t("sameOfficeAddressAbove")}</InfoLine>
                </div>

                <p className="mt-5 text-sm text-[var(--v2-text-2)]">
                  <span className="font-bold text-[var(--v2-text)]">{t("includeServiceRequestNumber")}</span>{" "}
                  {t("inAllCommunication")}
                </p>
              </Rung>

              <Rung index="03" step={1}>
                <h3 className="v2-h3 text-[var(--v2-text)]">{t("level3Heading")}</h3>
                <p className="mt-4 text-base font-bold text-[var(--v2-cyan)]">{t("level3Name")}</p>

                <div className="mt-5 space-y-3">
                  <InfoLine icon={<MailIcon className="h-4 w-4" />}>
                    <InlineLink href={`mailto:${t("level3Email")}`}>{t("level3Email")}</InlineLink>
                  </InfoLine>
                  <InfoLine icon={<PhoneIcon className="h-4 w-4" />}>{t("level3Phone")}</InfoLine>
                  <InfoLine icon={<DocumentIcon className="h-4 w-4" />}>
                    {t("submitRequestLabel")}{" "}
                    <InlineLink href="#">{t("submitRequestLinkText")}</InlineLink>
                  </InfoLine>
                  <InfoLine icon={<MapPinIcon className="h-4 w-4" />}>{t("sameOfficeAddress")}</InfoLine>
                </div>

                <p className="mt-5 text-sm font-bold text-[var(--v2-text)]">{t("includeServiceRequestNumber")}</p>
                <p className="mt-4 text-sm text-[var(--v2-text-2)]">
                  {t("viewGrievancePolicyPrefix")} <InlineLink href="#">{t("grievancePolicyLink")}</InlineLink>
                </p>
              </Rung>

              <Rung index="04" step={2} accent>
                <h3 className="v2-h3 text-[var(--v2-text)]">{t("level4Heading")}</h3>
                <p className="mt-4 text-sm italic leading-relaxed text-[var(--v2-text-2)]">{t("level4Desc")}</p>

                <div className="mt-5 space-y-3">
                  <InfoLine icon={<DocumentIcon className="h-4 w-4" />}>
                    {t("fileComplaintLabel")}{" "}
                    <InlineLink href="#">{t("rbiComplaintPortalLink")}</InlineLink>
                  </InfoLine>
                  <InfoLine icon={<MailIcon className="h-4 w-4" />}>
                    <InlineLink href={`mailto:${t("rbiEmail")}`}>{t("rbiEmail")}</InlineLink>
                  </InfoLine>
                  <InfoLine icon={<MapPinIcon className="h-4 w-4" />}>
                    <span className="font-bold text-[var(--v2-text)]">{t("addressLabel")}</span>
                    <address className="not-italic">
                      <span className="font-bold text-[var(--v2-text)]">{t("rbiOfficeName")}</span>
                      <br />
                      {t("rbiOfficeAddress1")}
                      <br />
                      {t("rbiOfficeAddress2")}
                    </address>
                  </InfoLine>
                  <InfoLine icon={<MapPinIcon className="h-4 w-4" />}>
                    {t("bankingOmbudsmanLabel")}{" "}
                    <InlineLink href="#">{t("bankingOmbudsmanLinkText")}</InlineLink>
                  </InfoLine>
                </div>
              </Rung>
            </ol>
          </div>
        </Container>
      </Section>
    );
  }

  /**
   * One rung of the ladder. `step` indents the card a little further at each level, so the
   * eye climbs; `accent` marks the last rung (the RBI Ombudsman) in gold — it is the end of
   * the road, not another CIBIL desk.
   */
  function Rung({
    index,
    step,
    accent = false,
    children,
  }: {
    index: string;
    step: number;
    accent?: boolean;
    children: ReactNode;
  }) {
    return (
      <Reveal as="li" variant="left" delay={step * 120} className="relative flex gap-6">
        <span
          className={`relative z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-[var(--v2-bg-2)] text-xs font-bold tabular-nums sm:flex ${
            accent
              ? "border-[rgba(245,197,24,0.5)] text-[var(--v2-gold)] shadow-[var(--v2-glow-gold)]"
              : "border-[rgba(0,176,240,0.45)] text-[var(--v2-cyan)] shadow-[0_0_30px_-6px_rgba(0,176,240,0.6)]"
          }`}
        >
          {index}
        </span>

        <Card padding="lg" spotlight className="min-w-0 flex-1">
          <div style={{ paddingLeft: `${step * 0.5}rem` }}>{children}</div>
        </Card>
      </Reveal>
    );
  }

  function InfoLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
    return (
      <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--v2-text-2)]">
        <span aria-hidden className="mt-0.5 shrink-0 text-[var(--v2-cyan)]">
          {icon}
        </span>
        <div className="min-w-0">{children}</div>
      </div>
    );
  }
}
