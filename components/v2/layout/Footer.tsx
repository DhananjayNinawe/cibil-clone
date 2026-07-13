"use client";

import Image from "next/image";
import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { V2_FOOTER_COLUMNS, V2_FOOTER_LEGAL, V2_SOCIALS } from "@/lib/v2/nav";
import { toV2 } from "@/lib/v2/routes";
import Button from "@/components/v2/ui/Button";
import Backdrop from "@/components/v2/ui/Backdrop";
import { Container } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "@/components/icons";

const SOCIAL_ICONS = {
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
} as const;

/**
 * Footer, opening on the site's last conversion moment.
 *
 * The oversized wordmark at the bottom is set in `aria-hidden` — it is a graphic, and a
 * screen reader announcing "CIBIL" a third time after the nav and the logo is noise.
 */
export default function Footer() {
  const { t, tv } = useV2();

  return (
    <footer className="relative isolate overflow-hidden border-t border-[var(--v2-line)] bg-[var(--v2-bg-2)]">
      <Backdrop tone="deep" noise />

      <Container className="relative">
        {/* Closing CTA */}
        <Reveal variant="up" className="grid gap-10 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:py-28">
          <div>
            <p className="v2-eyebrow text-[var(--v2-cyan)]">{tv("v2CtaKicker")}</p>
            <h2 className="v2-h2 mt-6 max-w-2xl text-balance text-[var(--v2-text)]">
              {tv("v2CtaHeadline")}
            </h2>
            <p className="v2-lede mt-6 max-w-xl">{tv("v2CtaBody")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <Button href={toV2("/register")} size="lg" arrow magnetic>
              {t("heroCta")}
            </Button>
            <Button href={toV2("/contact-us")} size="lg" variant="secondary">
              {t("contactUs")}
            </Button>
          </div>
        </Reveal>

        <hr className="v2-hairline" />

        {/* Link columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {V2_FOOTER_COLUMNS.map((column, columnIndex) => (
            <Reveal key={column.heading} variant="up" delay={columnIndex * 80}>
              <p className="v2-eyebrow text-[var(--v2-text-3)]">{t(column.heading)}</p>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.key}`}>
                    <Link
                      href={link.href}
                      className="v2-focus v2-underline text-sm text-[var(--v2-text-2)] transition-colors duration-300 hover:text-[var(--v2-cyan)]"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal variant="up" delay={240}>
            <p className="v2-eyebrow text-[var(--v2-text-3)]">{t("haveQuestions")}</p>

            <Link
              href={toV2("/contact-us")}
              className="v2-focus group mt-6 flex items-center gap-2 text-lg font-bold text-[var(--v2-text)] transition-colors hover:text-[var(--v2-cyan)]"
            >
              {t("contactUs")}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <div className="mt-7 flex items-center gap-2.5">
              {V2_SOCIALS.map(({ label, href }) => {
                const Icon = SOCIAL_ICONS[label];
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-focus flex h-10 w-10 items-center justify-center rounded-full border border-[var(--v2-line)] text-[var(--v2-text-2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(0,176,240,0.5)] hover:text-[var(--v2-cyan)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <Image
              src="/ifg-lockup-yellow-grey.svg"
              alt={t("infoForGood")}
              width={150}
              height={86}
              className="mt-8 h-auto w-32 select-none opacity-70"
            />
          </Reveal>
        </div>

        <hr className="v2-hairline" />

        {/* Legal strip */}
        <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {V2_FOOTER_LEGAL.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="v2-focus text-xs text-[var(--v2-text-3)] transition-colors hover:text-[var(--v2-cyan)]"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              {/* The way back to production. V2 lives alongside V1, it does not replace it. */}
              <Link
                href="/"
                className="v2-focus text-xs text-[var(--v2-text-3)] transition-colors hover:text-[var(--v2-gold)]"
              >
                {tv("v2ViewClassicSite")}
              </Link>
            </li>
          </ul>

          <p className="max-w-2xl text-xs leading-relaxed text-[var(--v2-text-3)]">{t("copyright")}</p>
        </div>

        <p className="pb-6 text-[10px] tracking-[0.2em] text-[var(--v2-text-3)]">{t("footerCertifications")}</p>
      </Container>

      {/* Oversized wordmark, clipped by the viewport edge — the last thing you see. */}
      <p
        aria-hidden
        className="pointer-events-none select-none overflow-hidden text-center text-[clamp(5rem,20vw,17rem)] font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)]"
      >
        {t("brand")}
      </p>
    </footer>
  );
}
