"use client";

import Image from "next/image";
import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import Logo from "@/components/v3/ui/Logo";
import { V3_FOOTER_COLUMNS, V3_FOOTER_LEGAL, V3_SOCIALS } from "@/lib/v3/nav";
import { toV3 } from "@/lib/v3/routes";
import { Container } from "@/components/v3/ui/Layout";
import Button from "@/components/v3/ui/Button";
import Reveal from "@/components/v3/motion/Reveal";
import { Shield } from "@/components/v3/ui/Icons";

/**
 * The colophon.
 *
 * The end of a printed document, not a link farm: the company's own line — "Information for
 * Good." — set at display scale across the foot of the page, the directories ruled beneath it,
 * and the certifications and copyright in the mono voice at the very bottom, where a printer's
 * imprint goes.
 *
 * It is the one place in V3 that is unambiguously ink-on-black, which is what makes the paper
 * above it read as paper.
 */
export default function Footer() {
  const { t } = useV3();

  return (
    <footer className="v3-tone-ink relative z-[1] mt-auto">
      <Container>
        {/* The statement — and it is the brand's own lockup, not a line I set in the site's serif.
            "Information for Good®" is TransUnion's registered mark, and the SVG V1 already ships
            is its official drawing; retypesetting it in Instrument Serif would have invented a
            second, unauthorised logotype. The lockup is yellow-on-grey, which is why it belongs
            on this ink band and nowhere else. */}
        <div className="grid gap-10 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:py-28">
          <Reveal variant="wipe">
            <Image
              src="/ifg-lockup-yellow-grey.svg"
              alt={t("infoForGood")}
              width={150}
              height={86}
              className="h-auto w-52 select-none sm:w-64"
            />
          </Reveal>

          <Reveal variant="rise" delay={120} className="lg:pb-4">
            <p className="v3-folio mb-5">{t("haveQuestions")}</p>
            <Button href={toV3("/contact-us")} variant="outline" size="lg" arrow>
              {t("contactUs")}
            </Button>
          </Reveal>
        </div>

        <hr className="v3-rule v3-rule-strong" />

        {/* The directories. */}
        <div className="grid gap-x-10 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {V3_FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={t(column.heading)}>
              <p className="v3-folio mb-5 border-b border-[var(--v3-line)] pb-3">
                {t(column.heading)}
              </p>

              <ul className="space-y-2.5">
                {column.entries.map((entry) => (
                  <li key={`${column.heading}-${entry.key}`}>
                    <Link
                      href={entry.href}
                      className="v3-focus text-sm text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-fg)]"
                    >
                      <span className="v3-link-draw">{t(entry.key)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* The fourth column is the brand's own: the lockup, socials, and the trust mark. The
              logo is a light-background asset, so on this ink band it is seated on a paper plate
              rather than recoloured — the trademark ships exactly as CIBIL drew it. */}
          <div>
            <Logo tone="ink" className="inline-flex" />

            <ul className="mt-6 space-y-2.5">
              {V3_SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v3-focus text-sm text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-fg)]"
                  >
                    {/* Platform names are proper nouns — they are the same word in every locale. */}
                    <span className="v3-link-draw">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="v3-caption mt-8 flex items-start gap-2.5 leading-relaxed">
              <Shield className="mt-0.5 shrink-0 text-sm text-[var(--v3-gold)]" />
              <span>{t("footerCertifications")}</span>
            </p>
          </div>
        </div>

        <hr className="v3-rule" />

        {/* The imprint. */}
        <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="v3-caption max-w-[62ch] leading-relaxed">{t("copyright")}</p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {V3_FOOTER_LEGAL.map((entry) => (
              <li key={entry.key}>
                <Link
                  href={entry.href}
                  className="v3-focus v3-caption transition-colors hover:text-[var(--v3-fg)]"
                >
                  <span className="v3-link-draw">{t(entry.key)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
