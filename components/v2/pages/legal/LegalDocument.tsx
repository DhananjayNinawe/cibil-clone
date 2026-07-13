"use client";

import { Fragment, type ReactNode } from "react";
import { Divider } from "@/components/v2/ui/Layout";
import Prose from "@/components/v2/ui/Prose";
import Reveal from "@/components/v2/motion/Reveal";
import type { DocSection } from "@/components/v2/pages/legal/DocRail";

export interface DocBodySection extends DocSection {
  body: ReactNode;
}

/**
 * The body of a long legal document: privacy policy, terms, the RBI scheme.
 *
 * A 6,000-word contract is a typography problem, not a layout problem — so there are no cards,
 * no panels and no boxes here. There is a measure (`72ch`, set on the prose column), a numbered
 * section head, and a rule between sections. What makes it readable is what is *absent*.
 *
 * `id` doubles as the element the rail's progress bar measures, and each section's `id` is the
 * anchor the rail links to; the ids come from the data files, so they survive a language switch.
 */
export default function LegalDocument({
  id,
  sections,
  numbered = true,
  intro,
  footer,
}: {
  id: string;
  sections: DocBodySection[];
  /** Off when the headings already number themselves (“I. Terms and conditions:”). */
  numbered?: boolean;
  /** Lead-in above the first section — the translation notice, the terms preamble. */
  intro?: ReactNode;
  /** Below the last section — a "last updated" line, the accept/decline controls. */
  footer?: ReactNode;
}) {
  return (
    <div id={id} className="min-w-0">
      {intro}

      {sections.map((section, index) => (
        <Fragment key={section.id}>
          {index > 0 && <Divider className="my-14" />}

          <Reveal as="section" variant="fade" id={section.id} className="scroll-mt-32">
            <div className="flex items-baseline gap-4">
              {numbered && (
                <span aria-hidden className="v2-eyebrow shrink-0 tabular-nums text-[var(--v2-cyan)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <h2 className="v2-h3 text-balance text-[var(--v2-text)]">{section.label}</h2>
            </div>

            <Prose className="mt-6 max-w-[72ch]">{section.body}</Prose>
          </Reveal>
        </Fragment>
      ))}

      {footer}
    </div>
  );
}
