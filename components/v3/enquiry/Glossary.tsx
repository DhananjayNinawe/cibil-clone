import type { ReactNode } from "react";

export interface GlossaryEntry {
  /** Pre-translated term. */
  term: string;
  /** Pre-translated definition. */
  definition: ReactNode;
}

/**
 * A ruled glossary — a definition list, numbered in the margin.
 *
 * The key terms on the enquiry pages (ECN, Enquiry Purpose, Enquiry Date & Time) are literally
 * definitions, and a definition belongs in a `<dl>`, not in three circles with pastel icon chips.
 * Set as ruled rows the reader can run a finger down, they read as the glossary of a printed
 * statement — which is what they are.
 */
export default function Glossary({
  entries,
  className = "",
}: {
  entries: GlossaryEntry[];
  className?: string;
}) {
  return (
    <dl className={`border-t border-[var(--v3-line-3)] ${className}`}>
      {entries.map((entry, i) => (
        <div
          key={entry.term}
          className="grid gap-x-8 gap-y-2 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[3rem_minmax(0,18rem)_1fr] sm:py-8"
        >
          <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
            {String(i + 1).padStart(2, "0")}
          </span>

          <dt className="text-base leading-snug font-medium text-[var(--v3-fg)]">{entry.term}</dt>

          <dd className="max-w-[56ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
            {entry.definition}
          </dd>
        </div>
      ))}
    </dl>
  );
}
