"use client";

import { useActiveSection } from "@/lib/v4/motion";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The sticky "on this page" rail — the Terms, the Privacy Policy, the RBI scheme, the long FAQs.
 *
 * These documents are thousands of words long, and a reader who lands on clause 14 from a search
 * result has no idea what they are inside of. The rail answers that continuously: it lists the
 * sections, it marks the one being read, and it never moves.
 *
 * The current section is marked with `aria-current="location"` as well as with colour and a gold
 * marker — the same rule as everywhere else in V4: gold is *you*, and colour is never the only
 * signal.
 *
 * Hidden below `lg` rather than collapsed into an accordion: on a phone the document's own headings
 * are two thumb-scrolls apart, and a table of contents that occupies the first screenful of a legal
 * document is a table of contents in the way.
 */
export default function Rail({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const { t4 } = useV4();
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label={t4("v4OnThisPage")}
      className="sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto lg:block"
    >
      <h2 className="v4-label">{t4("v4OnThisPage")}</h2>

      <ul className="mt-4 grid gap-0.5 border-l border-[var(--v4-edge)]">
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.875rem] leading-snug transition-colors ${
                  current
                    ? "border-[var(--v4-marker-line)] font-bold text-[var(--v4-fg)]"
                    : "border-transparent text-[var(--v4-fg-3)] hover:text-[var(--v4-fg-2)]"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
