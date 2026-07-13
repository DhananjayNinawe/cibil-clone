"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Button from "@/components/v2/ui/Button";
import Card from "@/components/v2/ui/Card";
import PageHero from "@/components/v2/ui/PageHero";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { useSpotlight } from "@/lib/v2/motion";
import { ArrowRightIcon, ChatBubbleIcon, MailIcon, MapPinIcon, XMarkIcon } from "@/components/icons";

/** V1's own support photograph (components/contact/HeroBanner.tsx). */
const HERO_IMAGE_URL =
  "https://www.cibil.com/contact-us/_jcr_content/root/contentcontainer/pagesection/image.coreimg.75.1440.jpeg/1683913902553/contact1.jpeg";

/** The anchor the "know the details" row jumps to. */
const OFFICE_ID = "registered-office";

interface QuickLink {
  title: TranslationKey;
  desc?: TranslationKey;
  /** V1 parks every one of these on "#". V2 resolves each to the page that actually does the job. */
  href: string;
}

interface QuickLinkColumn {
  heading: TranslationKey;
  items: QuickLink[];
}

const COLUMNS: QuickLinkColumn[] = [
  {
    heading: "colConsumer",
    items: [
      {
        title: "qlPurchaseScoreReport",
        desc: "qlPurchaseScoreReportDesc",
        href: "/cibil-score-report",
      },
      {
        title: "qlDisputeResolution",
        desc: "qlDisputeResolutionDesc",
        href: "/consumer-dispute-resolution",
      },
      { title: "qlMyCibilUserName", desc: "qlMyCibilUserNameDesc", href: "/login" },
      { title: "qlMyCibilPasswordReset", desc: "qlMyCibilPasswordResetDesc", href: "/login" },
      {
        title: "qlUnderstandScoreReport",
        href: "/faq/understand-your-credit-score-and-report",
      },
    ],
  },
  {
    heading: "colCommercial",
    items: [
      {
        title: "qlPurchaseRankReport",
        desc: "qlPurchaseRankReportDesc",
        href: "/company-credit-report",
      },
      {
        title: "qlCommercialDispute",
        desc: "qlCommercialDisputeDesc",
        href: "/company-dispute-resolution",
      },
      {
        title: "qlCompanyDocUpload",
        desc: "qlCompanyDocUploadDesc",
        href: "/company-dispute-resolution",
      },
      { title: "qlRankPortalLogin", desc: "qlRankPortalLoginDesc", href: "/login" },
      { title: "qlRankCompanyFaqsShort", href: "/faq/company-credit-report" },
    ],
  },
  {
    heading: "colMicrofinance",
    items: [
      {
        title: "qlCheckMfiScoreReport",
        desc: "qlCheckMfiScoreReportDesc",
        href: "/microfinance",
      },
      {
        title: "qlMfiDispute",
        desc: "qlMfiDisputeDesc",
        href: "/microfinance-dispute-resolution",
      },
      { title: "qlMfiUserName", desc: "qlMfiUserNameDesc", href: "/login" },
      { title: "qlMfiPasswordReset", desc: "qlMfiPasswordResetDesc", href: "/login" },
      { title: "qlUnderstandMfiScoreReport", href: "/microfinance" },
    ],
  },
];

/**
 * The support hub.
 *
 * V1's quick links are three columns of blue underlined text, all pointing at "#". Here the same
 * fifteen jobs become a command surface — one hoverable, keyboard-reachable row each, grouped by
 * audience, each landing on the page that actually does the job — with the registered office and
 * the chat affordance as glass panels beside them.
 */
export default function ContactUsContent() {
  const { t, tv } = useV2();

  return (
    <>
      <PageHero
        size="md"
        tone="cyan"
        eyebrow={t("sitemapSupportAbout")}
        title={t("sitemapContactUsLink")}
        lede={t("contactSidebarQuestion")}
        breadcrumbs={[{ label: t("sitemapContactUsLink") }]}
        media={
          <div className="v2-rim relative aspect-16/10 overflow-hidden rounded-[var(--v2-r-lg)] shadow-[var(--v2-shadow-3)]">
            <Image
              src={HERO_IMAGE_URL}
              alt={t("contactHeroAlt")}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-[rgba(5,7,13,0.7)] via-transparent to-transparent"
            />
          </div>
        }
      />

      {/* ----------------------------------------------------------- Quick links */}
      <Section space="lg" tone="canvas">
        <Container>
          <SectionHeading index="01" eyebrow={tv("v2Explore")} title={t("quickLinksHeading")} />

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {COLUMNS.map((column, columnIndex) => (
                <div key={column.heading}>
                  <h3 className="v2-eyebrow flex items-center gap-3 text-[var(--v2-cyan)]">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]"
                    />
                    {t(column.heading)}
                  </h3>

                  <ul className="mt-6 border-t border-[var(--v2-line)]">
                    {column.items.map((item, index) => (
                      <Reveal
                        as="li"
                        key={item.title}
                        variant="up"
                        delay={columnIndex * 60 + index * 50}
                      >
                        <QuickLinkRow item={item} />
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* The conversion panel V1 keeps in its sidebar, as glass. */}
            <Reveal variant="blur" delay={160}>
              <Card padding="none" spotlight className="h-fit lg:sticky lg:top-32">
                <div className="h-0.5 w-full bg-[var(--v2-cyan)] shadow-[0_0_18px_rgba(0,176,240,0.9)]" />
                <div className="p-7">
                  <p className="text-lg font-light leading-snug text-[var(--v2-text)]">
                    {t("contactSidebarQuestion")}
                  </p>
                  <div className="v2-hairline my-7" />
                  <p className="text-base font-bold leading-snug text-[var(--v2-cyan)]">
                    {t("contactSidebarCta")}
                  </p>
                  <Button href={toV2("/register")} size="md" arrow full className="mt-7">
                    {t("contactSidebarBtn")}
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------- Actions + the office */}
      <Section space="lg" tone="raised">
        <Container>
          <Reveal variant="fade">
            <Eyebrow index="02">{tv("v2DetailsLabel")}</Eyebrow>
          </Reveal>

          <div className="mt-12">
            <ActionRow
              label={t("watchVideosLabel")}
              cta={t("clickHereBtn")}
              href={toV2("/watch-and-learn")}
            />
            <ActionRow
              label={t("contactUsLabel")}
              cta={t("contactUsDetailsBtn")}
              href={`#${OFFICE_ID}`}
            />
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <Reveal variant="up" id={OFFICE_ID} className="scroll-mt-32">
              <Card padding="lg" spotlight className="h-full">
                <p className="v2-eyebrow flex items-center gap-3 text-[var(--v2-cyan)]">
                  <MapPinIcon className="h-4 w-4" />
                  {t("registeredOfficeLabel")}
                </p>

                <p className="mt-7 text-2xl font-bold leading-snug text-[var(--v2-text)]">
                  {t("registeredOfficeName")}
                </p>
                <p className="mt-1.5 text-sm text-[var(--v2-text-3)]">
                  {t("registeredOfficeFormerly")}
                </p>

                <address className="mt-6 space-y-1 text-[15px] not-italic leading-relaxed text-[var(--v2-text-2)]">
                  <p>{t("registeredOfficeAddress1")}</p>
                  <p>{t("registeredOfficeAddress2")}</p>
                  <p>{t("registeredOfficeAddress3")}</p>
                </address>

                <p className="mt-6 flex flex-wrap items-center gap-2 text-[15px] text-[var(--v2-text-2)]">
                  <MailIcon className="h-4 w-4 text-[var(--v2-cyan)]" />
                  {t("registeredOfficeEmailLabel")}{" "}
                  <a
                    href={`mailto:${t("registeredOfficeEmail")}`}
                    className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]"
                  >
                    {t("registeredOfficeEmail")}
                  </a>
                </p>
              </Card>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <div className="v2-glass v2-rim flex h-full flex-col justify-center rounded-[var(--v2-r-lg)] p-8">
                <p className="text-sm italic leading-relaxed text-[var(--v2-text-2)]">
                  {t("registeredOfficeNote")}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ChatWidget />
    </>
  );
}

function QuickLinkRow({ item }: { item: QuickLink }) {
  const { t } = useV2();
  const { ref, onPointerMove } = useSpotlight<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      onPointerMove={onPointerMove}
      href={toV2(item.href)}
      className="v2-focus v2-spotlight group relative block border-b border-[var(--v2-line)] py-5 transition-colors duration-500 hover:border-[rgba(0,176,240,0.45)]"
    >
      <span className="relative z-10 flex items-start justify-between gap-4">
        <span className="text-sm font-bold leading-snug text-[var(--v2-text)] transition-colors duration-300 group-hover:text-[var(--v2-cyan)]">
          {t(item.title)}
        </span>
        <ArrowRightIcon
          className="mt-0.5 h-4 w-4 shrink-0 -translate-x-1 text-[var(--v2-text-3)] opacity-0 transition-all duration-500 ease-[var(--v2-ease)] group-hover:translate-x-0 group-hover:text-[var(--v2-cyan)] group-hover:opacity-100"
        />
      </span>
      {item.desc && (
        <span className="relative z-10 mt-2 block text-xs leading-relaxed text-[var(--v2-text-3)]">
          {t(item.desc)}
        </span>
      )}
    </Link>
  );
}

function ActionRow({ label, cta, href }: { label: string; cta: string; href: string }) {
  return (
    <Reveal variant="up">
      <div className="flex flex-col gap-5 border-t border-[var(--v2-line)] py-7 last:border-b sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-light text-[var(--v2-text)] sm:text-lg">{label}</p>
        <Button href={href} variant="secondary" size="md" arrow>
          {cta}
        </Button>
      </div>
    </Reveal>
  );
}

/**
 * The floating chat affordance.
 *
 * V1's button raises a browser `alert()` saying chat is unavailable in this demo. V2 keeps the
 * affordance and the disclosure but drops the alert: the pill expands into a glass panel that
 * says the same thing in the catalog's own words (`sectionContentComingSoon`, V1's standard
 * not-yet-wired notice) and offers the registered office mailbox as the way through. It sits to
 * the left of the shell's back-to-top button so the two never collide.
 */
function ChatWidget() {
  const { t } = useV2();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label={t("chatWithCibil")}
          className="v2-panel-in v2-panel v2-rim w-[min(20rem,calc(100vw-4rem))] rounded-[var(--v2-r-lg)] p-6 shadow-[var(--v2-shadow-3)]"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-bold text-[var(--v2-text)]">{t("chatWithCibil")}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("a11yDismiss")}
              className="v2-focus -mr-1 -mt-1 rounded-full p-1 text-[var(--v2-text-3)] transition-colors hover:text-[var(--v2-cyan)]"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">
            {t("sectionContentComingSoon")}
          </p>

          <a
            href={`mailto:${t("registeredOfficeEmail")}`}
            className="v2-focus v2-underline mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--v2-cyan)]"
          >
            <MailIcon className="h-4 w-4" />
            {t("registeredOfficeEmail")}
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="v2-focus v2-sheen relative mr-16 inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-[var(--v2-gold)] pl-5 pr-4 text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a] shadow-[var(--v2-glow-gold)] transition-[background-color,box-shadow] duration-200 hover:bg-[#ffd634]"
      >
        <span className="relative z-10">{t("chatWithCibil")}</span>
        <ChatBubbleIcon className="relative z-10 h-4 w-4" />
      </button>
    </div>
  );
}
