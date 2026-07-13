"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";

/**
 * The sibling rail for the suit-filed / RBI cluster — V1's `SuitFiledSideNav`, re-set as a printed
 * index rather than a stack of grey pills.
 *
 * Five documents that are read against each other (the overview explains the scheme, the scheme
 * explains the two terms pages, the circulars are the authority behind all of them), so every one
 * of them keeps the whole set in the outer margin. Numbered, ruled, and the current entry marked in
 * ink rather than by a filled background.
 *
 * Unlike `MarginRail` this stays visible on small screens: it is the only route between these five
 * pages, and hiding it would strand a phone reader inside a single document.
 */
const ITEMS: { key: TranslationKey; href: string }[] = [
  { key: "suitFiledSideOverview", href: toV3("/suit-filed-cases/overview") },
  { key: "suitFiledSideGist", href: toV3("/suit-filed-cases/gist-rbi-scheme") },
  { key: "suitFiledSideSuit", href: toV3("/suit-filed-cases/suit-filed-cases") },
  { key: "suitFiledSideNonSuit", href: toV3("/suit-filed-cases/non-suit-filed-cases") },
  { key: "suitFiledSideRbi", href: toV3("/external-links/rbi-notifications") },
];

export default function SectionRail({
  active,
  className = "",
}: {
  active: TranslationKey;
  className?: string;
}) {
  const { t, t3 } = useV3();

  return (
    <nav aria-label={t3("v3InThisSection")} className={className}>
      <p className="v3-folio mb-5">{t3("v3InThisSection")}</p>

      <ul className="border-t border-[var(--v3-line-2)]">
        {ITEMS.map((item, i) => {
          const current = item.key === active;

          return (
            <li key={item.key} className="border-b border-[var(--v3-line)]">
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="v3-focus group flex items-baseline gap-3 py-3"
              >
                <span
                  aria-hidden
                  className={`v3-num text-[0.625rem] transition-colors ${
                    current ? "text-[var(--v3-accent)]" : "text-[var(--v3-fg-3)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={`text-sm leading-snug transition-colors ${
                    current
                      ? "text-[var(--v3-fg)]"
                      : "text-[var(--v3-fg-3)] group-hover:text-[var(--v3-fg-2)]"
                  }`}
                >
                  {t(item.key)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
