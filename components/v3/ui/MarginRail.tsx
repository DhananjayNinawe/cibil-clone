"use client";

import { useMemo } from "react";
import { useActiveSection } from "@/lib/v3/motion";
import { useV3 } from "@/lib/v3/useV3";

export interface RailLink {
  id: string;
  /** Pre-translated. */
  label: string;
}

/**
 * The margin rail — V3's table of contents for a long page.
 *
 * It lives in the outer margin of the spread, sticky, and it tracks what you are actually
 * reading: `useActiveSection` watches a thin band a third of the way down the viewport, so the
 * marked entry is the one under your eye, not merely the topmost one still technically on
 * screen. The mark itself is a rule that fills — the same gesture as everything else here.
 *
 * Hidden below `lg`, where there is no margin to put it in; the page still works without it,
 * because it is navigation, not content.
 */
export default function MarginRail({ links, className = "" }: { links: RailLink[]; className?: string }) {
  const { t3 } = useV3();
  // The ids array is a new reference on every render, and useActiveSection depends on it —
  // without this the observer would be torn down and rebuilt on each pass.
  const ids = useMemo(() => links.map((link) => link.id), [links]);
  const active = useActiveSection(ids);

  return (
    <nav aria-label={t3("v3Contents")} className={`sticky top-32 hidden lg:block ${className}`}>
      <p className="v3-folio mb-5">{t3("v3Contents")}</p>

      <ul className="space-y-0.5">
        {links.map((link, i) => {
          const current = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={current ? "true" : undefined}
                className="v3-focus group flex items-baseline gap-3 py-1.5"
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
                  {link.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
