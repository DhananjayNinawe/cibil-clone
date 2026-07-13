"use client";

import Link from "next/link";
import PageHero from "@/components/v4/ui/PageHero";
import { Step, Steps } from "@/components/v4/ui/Steps";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import {
  BuildingIcon,
  ClockIcon,
  DocumentIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ScaleIcon,
  SupportIcon,
} from "@/components/v4/ui/Icons";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Complaints and escalations.
 *
 * This is the page a reader reaches when the previous page did not work. It has to do two things at
 * once: be genuinely useful *now* (here are four ways to reach a human) and be honest about what
 * happens if that fails (here is the ladder, and here is the regulator at the top of it).
 *
 * The ladder is the page's spine, and V1 renders it as three paragraphs of bold text with icons
 * beside them — a structure a reader has to infer from the words "Level 2", "Level 3", "Level 4".
 * Here it is an ordered list that *starts at two*, because levels two, three and four is exactly
 * what it is: level one was the dispute you already raised. Each rung carries its contact details as
 * labelled rows, so a screen reader announces "email", "address", "submit a request" rather than a
 * run of four disconnected strings.
 *
 * The 30-day clock gets its own band, drawn as the proportion it actually is (21 days with the
 * lender, 9 with CIBIL), because "21 + 9" is the single most useful thing on this page and V1 sets
 * it as a bullet list.
 */
export default function EscalationsContent() {
  const { t } = useV4();

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navGrievance"), href: toV4("/consumer-dispute-resolution") }}
        label={t("megaComplaintsEscalations")}
        title={t("concernsHeroTitle")}
        lede={t("concernsHeroDesc")}
      />

      {/* ── Why we are here ─────────────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-concerns-heading">
        <Container width="text">
          <h2 id="v4-concerns-heading" className="v4-h2">
            {t("concernsMatterHeading")}
          </h2>
          <div className="v4-prose mt-6">
            <p>
              {t("concernsMatterPara1Prefix")}{" "}
              <strong>{t("concernsMatterBrand")}</strong>
              {t("concernsMatterPara1Suffix")}
            </p>
            <p>{t("concernsMatterPara2")}</p>
          </div>
        </Container>
      </Section>

      {/* ── Four ways in ────────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-reach-heading">
        <Container width="wide">
          <SectionHead id="v4-reach-heading" title={t("waysToReachUsHeading")} />

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <Channel index={0} glyph={<SupportIcon size={22} />} title={t("callUsTitle")}>
              <p className="v4-num">{t("concernsCallTimings")}</p>
              <p className="v4-num mt-1">{t("mfiCallTimings")}</p>
            </Channel>

            <Channel index={1} glyph={<DocumentIcon size={22} />} title={t("writeToUsTitle")}>
              {/* V1: `href="#"`. A request submitted online is submitted through contact-us. */}
              <Link href={toV4("/contact-us")} className="v4-link">
                {t("submitRequestLink")}
              </Link>
            </Channel>

            <Channel index={2} glyph={<MailIcon size={22} />} title={t("emailTitle")}>
              <p>{t("concernsEmailLabel")}</p>
              <a href={`mailto:${t("concernsEmail")}`} className="v4-link break-words">
                {t("concernsEmail")}
              </a>
              <p className="mt-3 font-bold text-[var(--v4-fg)]">{t("mandatoryInfoHeading")}</p>
              <p>{t("mandatoryInfoDesc")}</p>
            </Channel>

            <Channel index={3} glyph={<BuildingIcon size={22} />} title={t("walkInSupportTitle")}>
              <p className="v4-num">{t("walkInTimings")}</p>
              <p className="mt-3 font-bold text-[var(--v4-fg)]">{t("addressLabel")}</p>
              <p>{t("concernsOfficeAddress")}</p>
            </Channel>
          </div>

          <Reveal index={4} className="v4-plane mt-6 flex max-w-xl items-start gap-4 p-6">
            <PinIcon size={22} className="mt-0.5 shrink-0 text-[var(--v4-accent)]" />
            <div>
              <h3 className="v4-h3">{t("sendLetterHeading")}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                {t("sendLetterDesc")}
              </p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                {t("sendLetterAddress")}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── The clock ───────────────────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-timeline-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 id="v4-timeline-heading" className="v4-h2">
                {t("timelineHeading")}
              </h2>
              <p className="v4-body mt-5">
                {t("timelinePara1Prefix")}{" "}
                <strong className="font-bold text-[var(--v4-fg)]">{t("timelineUpTo30Days")}</strong>
                {t("timelinePara1Suffix")}
              </p>
              <p className="v4-body mt-5">
                {t("timelinePara2Prefix")}{" "}
                <strong className="font-bold text-[var(--v4-fg)]">{t("learnMoreBold")}</strong>{" "}
                <Link href={toV4("/framework-for-compensation")} className="v4-link">
                  {t("frameworkCompensationLinkText")}
                </Link>
              </p>
            </div>

            {/* The split, drawn to scale. Two steps of the sequential ramp — never two hues, and
                never a traffic light: 21 days is not "bad" and 9 days is not "good", they are two
                parts of one number. The bars grow from the left on reveal; the text below them is
                the whole content, so nothing depends on seeing them. */}
            <Reveal variant="focus" className="v4-plane p-6 sm:p-8">
              <p className="flex items-center gap-2.5">
                <ClockIcon size={19} className="text-[var(--v4-accent)]" />
                <span className="v4-num text-[1.75rem] font-bold text-[var(--v4-fg)]">
                  {t("timelineUpTo30Days")}
                </span>
              </p>

              <ul className="mt-8 grid gap-6">
                <li>
                  <p className="text-[0.9375rem] text-[var(--v4-fg-2)]">{t("timelineBanksCi")}</p>
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-2 rounded-[2px] bg-[var(--v4-surface-2)]"
                  >
                    <span
                      className="v4-grow-x block h-full w-[70%] rounded-[2px] bg-[var(--v4-c4)]"
                    />
                  </span>
                </li>
                <li>
                  <p className="text-[0.9375rem] text-[var(--v4-fg-2)]">{t("timelineCibilCic")}</p>
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-2 rounded-[2px] bg-[var(--v4-surface-2)]"
                  >
                    <span
                      className="v4-grow-x block h-full w-[30%] rounded-[2px] bg-[var(--v4-c2)]"
                      style={{ "--i": 1 } as React.CSSProperties}
                    />
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The ladder ──────────────────────────────────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-escalation-heading">
        <Container>
          <SectionHead id="v4-escalation-heading" title={t("escalationFrameworkHeading")} />

          <div className="mt-12">
            <Steps>
              {/* Numbered 2, 3, 4 — V1's own labels. Level one was the dispute itself. */}
              <Step n={2} title={t("level2Heading")} index={0}>
                <div className="grid gap-3">
                  <Detail glyph={<PhoneIcon size={17} />} label={t("level2Heading")}>
                    <span className="font-bold text-[var(--v4-fg)]">{t("level2Name")}</span>
                  </Detail>
                  <Detail glyph={<MailIcon size={17} />} label={t("emailTitle")}>
                    <a href={`mailto:${t("level2Email")}`} className="v4-link break-words">
                      {t("level2Email")}
                    </a>
                  </Detail>
                  <Detail glyph={<DocumentIcon size={17} />} label={t("submitRequestLabel")}>
                    <Link href={toV4("/contact-us")} className="v4-link">
                      {t("submitRequestLinkText")}
                    </Link>
                  </Detail>
                  <Detail glyph={<PinIcon size={17} />} label={t("addressLabel")}>
                    {t("sameOfficeAddressAbove")}
                  </Detail>
                </div>
                <p className="mt-4">
                  <strong>{t("includeServiceRequestNumber")}</strong> {t("inAllCommunication")}
                </p>
              </Step>

              <Step n={3} title={t("level3Heading")} index={1}>
                <div className="grid gap-3">
                  <Detail glyph={<PhoneIcon size={17} />} label={t("level3Heading")}>
                    <span className="font-bold text-[var(--v4-fg)]">{t("level3Name")}</span>
                  </Detail>
                  <Detail glyph={<MailIcon size={17} />} label={t("emailTitle")}>
                    <a href={`mailto:${t("level3Email")}`} className="v4-link break-words">
                      {t("level3Email")}
                    </a>
                  </Detail>
                  <Detail glyph={<PhoneIcon size={17} />} label={t("callUsTitle")}>
                    <span className="v4-num">{t("level3Phone")}</span>
                  </Detail>
                  <Detail glyph={<DocumentIcon size={17} />} label={t("submitRequestLabel")}>
                    <Link href={toV4("/contact-us")} className="v4-link">
                      {t("submitRequestLinkText")}
                    </Link>
                  </Detail>
                  <Detail glyph={<PinIcon size={17} />} label={t("addressLabel")}>
                    {t("sameOfficeAddress")}
                  </Detail>
                </div>
                <p className="mt-4">
                  <strong>{t("includeServiceRequestNumber")}</strong>
                </p>
                {/* The Grievance Redressal Policy is a document this site does not host. V1 links it
                    to `#`. Naming it without a link is the honest version: the reader learns the
                    document exists and is not sent to a page that does not. */}
                <p className="mt-3">
                  {t("viewGrievancePolicyPrefix")}{" "}
                  <strong>{t("grievancePolicyLink")}</strong>
                </p>
              </Step>

              <Step n={4} title={t("level4Heading")} index={2}>
                <p>{t("level4Desc")}</p>

                <div className="mt-4 grid gap-3">
                  {/* Same reasoning as above: the RBI's own portal and its ombudsman office list are
                      not pages on this site, and V4 does not ship a link that goes nowhere. */}
                  <Detail glyph={<ScaleIcon size={17} />} label={t("fileComplaintLabel")}>
                    <span className="font-bold text-[var(--v4-fg)]">
                      {t("rbiComplaintPortalLink")}
                    </span>
                  </Detail>
                  <Detail glyph={<MailIcon size={17} />} label={t("emailTitle")}>
                    <a href={`mailto:${t("rbiEmail")}`} className="v4-link break-words">
                      {t("rbiEmail")}
                    </a>
                  </Detail>
                  <Detail glyph={<PinIcon size={17} />} label={t("addressLabel")}>
                    <span className="font-bold text-[var(--v4-fg)]">{t("rbiOfficeName")}</span>
                    <br />
                    {t("rbiOfficeAddress1")}
                    <br />
                    {t("rbiOfficeAddress2")}
                  </Detail>
                  <Detail glyph={<BuildingIcon size={17} />} label={t("bankingOmbudsmanLabel")}>
                    <span className="font-bold text-[var(--v4-fg)]">
                      {t("bankingOmbudsmanLinkText")}
                    </span>
                  </Detail>
                </div>
              </Step>
            </Steps>
          </div>

          <Reveal className="mt-14 max-w-[var(--v4-measure)]">
            <h2 className="v4-h3">{t("everyStepHeading")}</h2>
            <p className="v4-body mt-3">{t("everyStepDesc")}</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/** A channel plane. The glyph is decorative — the heading beneath it carries the name. */
function Channel({
  glyph,
  title,
  children,
  index,
}: {
  glyph: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <Reveal index={index} className="v4-plane flex h-full flex-col p-6">
      <span className="text-[var(--v4-accent)]">{glyph}</span>
      <h3 className="v4-h3 mt-4">{title}</h3>
      <div className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">{children}</div>
    </Reveal>
  );
}

/**
 * One line of a contact card: a glyph, a hidden label, and the value.
 *
 * The label is hidden, not absent. A sighted reader gets the glyph and the *shape* of the value —
 * an email looks like an email, an address looks like an address — while a screen-reader user, who
 * gets neither, would otherwise hear four unlabelled strings in a row and have to guess which one
 * was the postal address and which the complaint portal.
 */
function Detail({
  glyph,
  label,
  children,
}: {
  glyph: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-start gap-3">
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--v4-accent)]">
        {glyph}
      </span>
      <span className="v4-sr">{label}</span>
      <span className="min-w-0">{children}</span>
    </p>
  );
}
