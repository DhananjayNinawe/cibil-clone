"use client";

import { useState } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Tabs from "@/components/v3/ui/Tabs";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { Close } from "@/components/v3/ui/Icons";

const HERO_IMAGE =
  "https://www.cibil.com/contact-us/_jcr_content/root/contentcontainer/pagesection/image.coreimg.75.1440.jpeg/1683913902553/contact1.jpeg";

interface DirectoryEntry {
  title: TranslationKey;
  desc?: TranslationKey;
}

interface DirectoryGroup {
  heading: TranslationKey;
  entries: DirectoryEntry[];
}

/* V1's three quick-link columns, unchanged — every entry and every gloss. */
const DIRECTORY: DirectoryGroup[] = [
  {
    heading: "colConsumer",
    entries: [
      { title: "qlPurchaseScoreReport", desc: "qlPurchaseScoreReportDesc" },
      { title: "qlDisputeResolution", desc: "qlDisputeResolutionDesc" },
      { title: "qlMyCibilUserName", desc: "qlMyCibilUserNameDesc" },
      { title: "qlMyCibilPasswordReset", desc: "qlMyCibilPasswordResetDesc" },
      { title: "qlUnderstandScoreReport" },
    ],
  },
  {
    heading: "colCommercial",
    entries: [
      { title: "qlPurchaseRankReport", desc: "qlPurchaseRankReportDesc" },
      { title: "qlCommercialDispute", desc: "qlCommercialDisputeDesc" },
      { title: "qlCompanyDocUpload", desc: "qlCompanyDocUploadDesc" },
      { title: "qlRankPortalLogin", desc: "qlRankPortalLoginDesc" },
      { title: "qlRankCompanyFaqsShort" },
    ],
  },
  {
    heading: "colMicrofinance",
    entries: [
      { title: "qlCheckMfiScoreReport", desc: "qlCheckMfiScoreReportDesc" },
      { title: "qlMfiDispute", desc: "qlMfiDisputeDesc" },
      { title: "qlMfiUserName", desc: "qlMfiUserNameDesc" },
      { title: "qlMfiPasswordReset", desc: "qlMfiPasswordResetDesc" },
      { title: "qlUnderstandMfiScoreReport" },
    ],
  },
];

/** One quick-link section, as a ruled directory: number in the margin, subject, gloss. */
function Directory({ entries }: { entries: DirectoryEntry[] }) {
  const { t } = useV3();

  return (
    <ul className="border-t border-[var(--v3-line-3)]">
      {entries.map((entry, i) => (
        <li
          key={entry.title}
          className="v3-row grid gap-x-8 gap-y-2 border-b border-[var(--v3-line)] py-6 sm:grid-cols-[3rem_minmax(0,22rem)_1fr] sm:py-7"
        >
          <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
            {String(i + 1).padStart(2, "0")}
          </span>

          <p className="text-base leading-snug font-medium text-[var(--v3-fg)]">{t(entry.title)}</p>

          {entry.desc && (
            <p className="max-w-[52ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
              {t(entry.desc)}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * The chat affordance V1 puts in the corner of this page.
 *
 * Same behaviour — it announces that chat is not available in this demo — but it says so in a
 * ruled note rather than a browser `alert()`, so the message is translated, dismissible and
 * readable by a screen reader. Stacked above the shell's back-to-top mark, never over it.
 */
function ChatWidget() {
  const { t, t3 } = useV3();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-5 bottom-20 z-30 flex flex-col items-end gap-3">
      {open && (
        <div
          role="status"
          className="v3-tone-ink v3-fade-up flex w-[17rem] items-start justify-between gap-4 border border-[var(--v3-line-2)] p-5"
        >
          <p className="text-sm leading-relaxed text-[var(--v3-fg-2)]">{t3("v3ChatUnavailable")}</p>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t3("v3CloseLabel")}
            className="v3-focus mt-0.5 shrink-0 text-[var(--v3-fg-3)] transition-colors hover:text-[var(--v3-fg)]"
          >
            <Close className="text-base" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="v3-focus v3-num flex h-11 items-center border border-[var(--v3-ink)] bg-[var(--v3-ink)] px-5 text-xs font-medium tracking-[0.08em] text-[var(--v3-paper)] transition-colors hover:bg-transparent hover:text-[var(--v3-ink)]"
      >
        {t("chatWithCibil")}
      </button>
    </div>
  );
}

/**
 * Contact Us.
 *
 * V1 sets this page as three columns of blue links and a boxed card. V3 sets it as the back page
 * of a printed report: a ruled directory of who to ask about what, filed under the three
 * audiences; the two standing referrals as ruled rows; and the registered office as an imprint —
 * mono caption, address block, one line of instructions, exactly as a colophon is set.
 */
export default function ContactContent() {
  const { t, t3 } = useV3();

  return (
    <>
      <PageHeader
        size="full"
        folio={t("navSupport")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("sitemapContactUsLink") },
        ]}
        title={[t("sitemapContactUsLink")]}
        media={<Plate src={HERO_IMAGE} alt={t("contactHeroAlt")} ratio="16 / 9" fit="cover" priority />}
      />

      {/* 01 — the directory. */}
      <Section space="lg">
        <Container>
          <SectionHead index="01" folio={t3("v3Explore")} title={t("quickLinksHeading")} />

          <div className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_16rem] lg:items-start">
            <Reveal variant="rise" className="min-w-0">
              <Tabs
                label={t("quickLinksHeading")}
                items={DIRECTORY.map((group) => ({
                  label: t(group.heading),
                  content: <Directory entries={group.entries} />,
                }))}
              />
            </Reveal>

            {/* The standing offer, set as a printed slip in the margin. */}
            <Reveal variant="rise" delay={120}>
              <aside className="border-t-2 border-[var(--v3-fg)] pt-6 lg:sticky lg:top-32">
                <p className="v3-folio">{t3("v3CtaKicker")}</p>

                <p className="mt-4 text-base leading-relaxed text-[var(--v3-fg-2)]">
                  {t("contactSidebarQuestion")}
                </p>

                <div className="v3-tone-ink mt-6 p-6">
                  <p className="v3-h3 text-pretty">{t("contactSidebarCta")}</p>

                  <Button href={toV3("/register")} full arrow className="mt-6">
                    {t("contactSidebarBtn")}
                  </Button>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 02 — the two standing referrals, as ruled rows. */}
      <Section space="md" tone="sunken" ruled>
        <Container>
          <div className="border-t border-[var(--v3-line-3)]">
            <div className="flex flex-col gap-5 border-b border-[var(--v3-line)] py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <p className="text-base font-medium text-[var(--v3-fg)]">{t("watchVideosLabel")}</p>
              <Button href={toV3("/watch-and-learn")} variant="outline" arrow className="shrink-0">
                {t("clickHereBtn")}
              </Button>
            </div>

            <div className="flex flex-col gap-5 border-b border-[var(--v3-line)] py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <p className="text-base font-medium text-[var(--v3-fg)]">{t("contactUsLabel")}</p>
              <Button href="#office" variant="outline" arrow className="shrink-0">
                {t("contactUsDetailsBtn")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 03 — the imprint. */}
      <Section id="office" space="lg" ruled>
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[18rem_1fr]">
            <Reveal variant="fade">
              <p className="v3-folio">{t("registeredOfficeLabel")}</p>
            </Reveal>

            <Reveal variant="rise" delay={80} className="min-w-0">
              <address className="not-italic">
                <p className="v3-h3">{t("registeredOfficeName")}</p>

                <p className="mt-3 text-sm text-[var(--v3-fg-3)]">{t("registeredOfficeFormerly")}</p>

                <p className="mt-5 text-base leading-relaxed text-[var(--v3-fg-2)]">
                  <span className="block">{t("registeredOfficeAddress1")}</span>
                  <span className="block">{t("registeredOfficeAddress2")}</span>
                  <span className="block">{t("registeredOfficeAddress3")}</span>
                </p>

                <p className="mt-5 flex flex-wrap items-baseline gap-x-2 text-sm text-[var(--v3-fg-2)]">
                  <span className="v3-folio">{t("registeredOfficeEmailLabel")}</span>
                  <a
                    href={`mailto:${t("registeredOfficeEmail")}`}
                    className="v3-focus v3-link v3-num text-[var(--v3-fg)]"
                  >
                    {t("registeredOfficeEmail")}
                  </a>
                </p>
              </address>

              <p className="mt-8 max-w-[62ch] border-l-2 border-[var(--v3-line-3)] pl-5 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                {t("registeredOfficeNote")}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ChatWidget />
    </>
  );
}
