"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { ButtonLink, TextLink } from "@/components/v4/ui/Button";
import {
  ArrowRightIcon,
  MailIcon,
  PinIcon,
  PlayIcon,
  SupportIcon,
} from "@/components/v4/ui/Icons";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/** The anchor V1's "click here to know the details" row promises. It has to land somewhere real. */
const OFFICE_ID = "v4-registered-office";

interface QuickLink {
  title: TranslationKey;
  desc?: TranslationKey;
  /**
   * V1 parks all fifteen of these on `href="#"`. Each is resolved here to the page that actually
   * does the job — a link that looks like a link and goes nowhere is worse than no link at all.
   */
  href: string;
}

const COLUMNS: { heading: TranslationKey; items: QuickLink[] }[] = [
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
      { title: "qlUnderstandScoreReport", href: "/faq/understand-your-credit-score-and-report" },
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
      { title: "qlCheckMfiScoreReport", desc: "qlCheckMfiScoreReportDesc", href: "/microfinance" },
      { title: "qlMfiDispute", desc: "qlMfiDisputeDesc", href: "/microfinance-dispute-resolution" },
      { title: "qlMfiUserName", desc: "qlMfiUserNameDesc", href: "/login" },
      { title: "qlMfiPasswordReset", desc: "qlMfiPasswordResetDesc", href: "/login" },
      { title: "qlUnderstandMfiScoreReport", href: "/microfinance" },
    ],
  },
];

/**
 * Contact Us — a task page, not a brochure.
 *
 * Nobody arrives here to admire the company. They arrive with a job: reach someone, fix something,
 * find the address. So there is no hero, no photograph and no lede — the *channels* are the first
 * thing on the page, four scannable planes, and everything else is beneath them.
 *
 * Then V1's fifteen quick links, which in V1 are three columns of blue underlined text every one of
 * which points at `#`. Here each one lands on the page that does the job, and each is a hairline row
 * with room for the gloss that explains it.
 */
export default function ContactUsContent() {
  const { t } = useV4();
  const email = t("registeredOfficeEmail");

  return (
    <>
      {/* ── The channels ──────────────────────────────────────────────────────────────────────── */}
      <Section space="md">
        <Container width="wide">
          <p className="v4-label">
            <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
            <span className="ml-2.5">{t("sitemapSupportAbout")}</span>
          </p>
          <h1 className="v4-h1 mt-4">{t("sitemapContactUsLink")}</h1>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Channel index={0} icon={<MailIcon size={20} />} label={t("registeredOfficeEmailLabel")}>
              <a href={`mailto:${email}`} className="v4-link break-all text-[0.9375rem]">
                {email}
              </a>
            </Channel>

            <Channel index={1} icon={<PinIcon size={20} />} label={t("contactUsLabel")}>
              {/* Lands on the registered-office block further down this page, which is what V1's
                  "know the details" button promises and never delivers. */}
              <TextLink href={`#${OFFICE_ID}`}>{t("contactUsDetailsBtn")}</TextLink>
            </Channel>

            <Channel index={2} icon={<PlayIcon size={20} />} label={t("watchVideosLabel")}>
              <TextLink href={toV4("/watch-and-learn")}>{t("clickHereBtn")}</TextLink>
            </Channel>

            {/* V1's floating chat pill raises a browser alert saying chat is unavailable in this
                demo. A control that cannot do its job is not a channel, so the plane says so in the
                catalog's own words and hands the reader the mailbox that does work. */}
            <Channel index={3} icon={<SupportIcon size={20} />} label={t("chatWithCibil")}>
              <p className="v4-caption">{t("sectionContentComingSoon")}</p>
            </Channel>
          </div>
        </Container>
      </Section>

      {/* ── The fifteen jobs ──────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" space="lg" aria-labelledby="v4-quick-links">
        <Container width="wide">
          <SectionHead id="v4-quick-links" title={t("quickLinksHeading")} />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {COLUMNS.map((column, columnIndex) => (
                <nav key={column.heading} aria-labelledby={`v4-ql-${column.heading}`}>
                  <h3 id={`v4-ql-${column.heading}`} className="v4-label">
                    {t(column.heading)}
                  </h3>

                  <ul className="mt-5 border-t border-[var(--v4-edge)]">
                    {column.items.map((item, i) => (
                      <Reveal
                        as="li"
                        key={item.title}
                        index={columnIndex + i}
                        className="border-b border-[var(--v4-edge)]"
                      >
                        <Link href={toV4(item.href)} className="group block py-4">
                          <span className="flex items-start justify-between gap-3">
                            <span className="text-[0.9375rem] font-bold leading-snug text-[var(--v4-fg)] transition-colors group-hover:text-[var(--v4-accent)]">
                              {t(item.title)}
                            </span>
                            <ArrowRightIcon
                              size={16}
                              className="mt-0.5 shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                            />
                          </span>
                          {item.desc ? (
                            <span className="v4-caption mt-1.5 block">{t(item.desc)}</span>
                          ) : null}
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/* V1's sidebar, kept: the one thing this page is allowed to sell. */}
            <Reveal as="aside" index={1} className="lg:sticky lg:top-28 lg:self-start">
              <div className="v4-plane p-7">
                <p className="text-[1.125rem] font-bold leading-snug text-[var(--v4-fg)]">
                  {t("contactSidebarQuestion")}
                </p>
                <p className="v4-body mt-3">{t("contactSidebarCta")}</p>
                <ButtonLink href={toV4("/register")} className="mt-6 w-full" arrow>
                  {t("contactSidebarBtn")}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The address ───────────────────────────────────────────────────────────────────────── */}
      <Section
        tone="night"
        space="lg"
        id={OFFICE_ID}
        className="scroll-mt-24"
        aria-labelledby="v4-office-heading"
      >
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <h2 id="v4-office-heading" className="v4-label">
                <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
                <span className="ml-2.5">{t("registeredOfficeLabel")}</span>
              </h2>

              <p className="v4-h2 mt-6">{t("registeredOfficeName")}</p>
              <p className="v4-caption mt-2">{t("registeredOfficeFormerly")}</p>

              <address className="v4-body mt-7 not-italic">
                {t("registeredOfficeAddress1")}
                <br />
                {t("registeredOfficeAddress2")}
                <br />
                {t("registeredOfficeAddress3")}
              </address>

              <p className="mt-6 flex flex-wrap items-center gap-2 text-[0.9375rem] text-[var(--v4-fg-2)]">
                <MailIcon size={17} className="shrink-0 text-[var(--v4-fg-3)]" />
                {t("registeredOfficeEmailLabel")}{" "}
                <a href={`mailto:${email}`} className="v4-link break-all">
                  {email}
                </a>
              </p>
            </Reveal>

            {/* What to put in the letter. On a night band the Notice's own fills are day colours,
                so it is left on a plane of its own rather than floated on the dark canvas. */}
            <Reveal index={1} className="lg:self-center">
              <div className="v4-plane p-7">
                <p className="v4-body">{t("registeredOfficeNote")}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

/** One way to reach the company: a glyph, what it is, and the thing you actually click. */
function Channel({
  icon,
  label,
  children,
  index,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  index: number;
}) {
  return (
    <Reveal index={index} className="v4-plane flex flex-col gap-4 p-6">
      <span aria-hidden="true" className="text-[var(--v4-fg-3)]">
        {icon}
      </span>
      <div>
        <p className="text-[0.9375rem] font-bold leading-snug text-[var(--v4-fg)]">{label}</p>
        <div className="mt-2">{children}</div>
      </div>
    </Reveal>
  );
}
