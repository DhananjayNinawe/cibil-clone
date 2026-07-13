"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";

export interface Crumb {
  /** Pre-translated. */
  label: string;
  href?: string;
}

/**
 * The trail. Set in the mono voice with a slash between steps — a file path, not a chevron
 * chain. The current page is the last item and is not a link.
 */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const { t3 } = useV3();

  return (
    <nav aria-label={t3("v3BreadcrumbLabel")} className={className}>
      <ol className="v3-folio flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-[var(--v3-line-3)]">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="v3-focus v3-link-draw">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[var(--v3-fg)]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
