"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { Container, Section } from "@/components/v4/ui/Layout";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The section nav for the suit-filed registry — five sibling pages that only make sense as a set:
 * the overview, the gist of the RBI scheme that created them, the two registries' own terms, and
 * the circulars that govern the reporting.
 *
 * V1 puts this in a left sidebar on every one of the five. V4 cannot: that column is where the
 * <Rail> lives, and the Rail is the more valuable object on a 3,000-word document — it tells you
 * *where in the clause list you are*, which a list of sibling pages never can. So the section nav
 * becomes a strip directly under the hero: present, scannable, and out of the reading column.
 *
 * The current page is marked with `aria-current="page"` and a filled plane, not with colour and not
 * with gold. Gold in V4 means exactly one thing — "this is you" — and on these pages it is spent on
 * the Rail's current-section marker. A nav that also shouts in gold leaves the Rail nothing to say.
 */
const PAGES: { key: TranslationKey; href: string }[] = [
  { key: "suitFiledSideOverview", href: "/suit-filed-cases/overview" },
  { key: "suitFiledSideGist", href: "/suit-filed-cases/gist-rbi-scheme" },
  { key: "suitFiledSideSuit", href: "/suit-filed-cases/suit-filed-cases" },
  { key: "suitFiledSideNonSuit", href: "/suit-filed-cases/non-suit-filed-cases" },
  { key: "suitFiledSideRbi", href: "/external-links/rbi-notifications" },
];

export default function SuitFiledNav({ current }: { current: TranslationKey }) {
  const { t } = useV4();

  return (
    <Section tone="tint" space="none" className="border-y border-[var(--v4-edge)]">
      <Container width="wide">
        {/* Scrolls rather than wrapping on a phone: five items that reflow into three ragged rows
            read as a pile of links, not as one section's table of contents. */}
        <nav aria-label={t("footerCorpSuitFiledHeading")} className="v4-scroll-x">
          <ul className="flex min-w-max items-center gap-1 py-2.5">
            {PAGES.map((page) => {
              const isCurrent = page.key === current;
              return (
                <li key={page.key}>
                  <Link
                    href={toV4(page.href)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-[var(--v4-r-sm)] px-3.5 py-2 text-[0.9375rem] transition-colors ${
                      isCurrent
                        ? "bg-[var(--v4-surface)] font-bold text-[var(--v4-fg)] shadow-[var(--v4-elev-1),var(--v4-lift)]"
                        : "text-[var(--v4-fg-2)] hover:bg-[var(--v4-surface)] hover:text-[var(--v4-fg)]"
                    }`}
                  >
                    {t(page.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
