"use client";

import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";

export interface Crumb {
  /** Pre-translated. */
  label: string;
  /** Omit on the current page — the last crumb is never a link. */
  href?: string;
}

/** Trail back to /v2. The home crumb is prepended for you. */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const { t, tv } = useV2();
  const crumbs: Crumb[] = [{ label: t("searchHome"), href: "/v2" }, ...items];

  return (
    <nav aria-label={tv("v2BreadcrumbLabel")} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--v2-text-3)]">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {crumb.href && !last ? (
                <Link
                  href={crumb.href}
                  className="v2-focus v2-underline transition-colors hover:text-[var(--v2-cyan)]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-[var(--v2-text-2)]">
                  {crumb.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="text-[var(--v2-line-2)]">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
