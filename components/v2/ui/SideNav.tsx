"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useV2 } from "@/lib/v2/useV2";

export interface SideNavLink {
  /** Pre-translated. */
  label: string;
  href: string;
}

/**
 * Sticky section nav for multi-page clusters (suit-filed cases, FAQ hub, legal).
 * The active item is derived from the pathname, so it cannot drift out of sync.
 */
export default function SideNav({ links, className = "" }: { links: SideNavLink[]; className?: string }) {
  const { tv } = useV2();
  const pathname = usePathname();

  return (
    // `lg:self-start` is load-bearing, not cosmetic: this rail is normally a grid item, and a
    // grid item stretches to the full row height by default. A sticky box that is already as
    // tall as its container has nowhere to travel, so it silently never sticks. Sizing it to
    // its content is what lets it stick.
    <nav aria-label={tv("v2SectionNavLabel")} className={`lg:sticky lg:top-28 lg:self-start ${className}`}>
      <p className="v2-eyebrow mb-5 text-[var(--v2-text-3)]">{tv("v2InThisSection")}</p>
      <ul className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`v2-focus group flex items-center gap-3 rounded-[var(--v2-r-sm)] px-4 py-3 text-sm transition-all duration-300 ${
                  active
                    ? "bg-[rgba(0,176,240,0.10)] font-bold text-[var(--v2-cyan)]"
                    : "text-[var(--v2-text-2)] hover:bg-[var(--v2-surface)] hover:text-[var(--v2-text)]"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-4 w-px shrink-0 transition-all duration-300 ${
                    active
                      ? "bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]"
                      : "bg-[var(--v2-line-2)] group-hover:bg-[var(--v2-text-3)]"
                  }`}
                />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
