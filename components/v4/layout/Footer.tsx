"use client";

import Link from "next/link";
import Logo from "@/components/v4/ui/Logo";
import LanguageSwitch from "./LanguageSwitch";
import { Container } from "@/components/v4/ui/Layout";
import { ExternalIcon, LockIcon } from "@/components/v4/ui/Icons";
import { V4_SECTIONS } from "@/lib/v4/nav";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The footer.
 *
 * A night band — which is not decoration but the closing half of V4's bi-tonal rhythm: the page
 * ends on the dark tone it has been alternating into all the way down. Because tone is a token
 * re-point (`.v4-tone-night`), every child here — the links, the rules, the language switch, the
 * focus ring — inverts without a single dark-mode variant being written.
 *
 * Its columns are the *same* `V4_SECTIONS` the Launcher renders. One IA, two presentations: a
 * footer that lists different pages from the menu above it is a footer that is already out of date.
 */
export default function Footer() {
  const { t, t4 } = useV4();
  const year = 2026; // Stamped, not computed: `new Date()` on the server and on the client can
  // straddle midnight (or a timezone), and React will call that a hydration mismatch.

  return (
    <footer className="v4-tone-night" aria-labelledby="v4-footer-heading">
      <h2 id="v4-footer-heading" className="v4-sr">
        {t4("v4FooterNav")}
      </h2>

      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
          {/* The mark, the promise, and the certifications. */}
          <div>
            <Logo tone="night" />
            <p className="v4-lede mt-6 !text-[1.0625rem]">{t("infoForGood")}</p>

            <p className="v4-label mt-8 flex items-start gap-2.5 !normal-case !tracking-normal">
              <LockIcon size={16} className="mt-0.5 shrink-0" />
              {/* A certification string is a list of standards, not prose — it stays in Latin in
                  every locale, and is allowlisted as such in scripts/check-i18n.mjs. */}
              <span>{t("footerCertifications")}</span>
            </p>

            <div className="mt-8">
              <LanguageSwitch tone="night" />
            </div>
          </div>

          {/* The site, in the same shape the Launcher shows it. */}
          <nav
            aria-label={t4("v4FooterNav")}
            className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {V4_SECTIONS.map((section) => (
              <div key={section.key}>
                <h3 className="v4-label">{t(section.key)}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {/* Flattened: a footer does not need the group headings the Launcher uses, and a
                      three-level tree in a footer column is unreadable at any width. */}
                  {section.groups
                    .flatMap((group) => group.entries)
                    .map((entry) => (
                      <li key={`${section.key}-${entry.key}-${entry.href}`}>
                        <Link
                          href={entry.href}
                          className="text-[0.875rem] leading-snug text-[var(--v4-fg-2)] transition-colors hover:text-[var(--v4-fg)]"
                        >
                          {t(entry.key)}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The legal line. */}
        <div className="mt-16 border-t border-[var(--v4-edge)] pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link href={toV4("/privacy-policy")} className="v4-caption hover:text-[var(--v4-fg)]">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href={toV4("/legal/terms-and-conditions")}
                  className="v4-caption hover:text-[var(--v4-fg)]"
                >
                  {t("footerTermsOfUse")}
                </Link>
              </li>
              <li>
                <Link href={toV4("/sitemap")} className="v4-caption hover:text-[var(--v4-fg)]">
                  {t("footerSitemap")}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.transunion.in/vulnerability-disclosure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v4-caption inline-flex items-center gap-1.5 hover:text-[var(--v4-fg)]"
                >
                  {t("footerReportVulnerability")}
                  <ExternalIcon size={13} />
                  <span className="v4-sr">{t4("v4OpensInNewTab")}</span>
                </a>
              </li>
            </ul>

            <p className="v4-caption">
              {/* The registered name is a proper noun and stays in Latin in every locale. */}
              <span className="v4-num">© {year}</span> {t("registeredOfficeName")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
