"use client";

import type { ReactNode } from "react";
import { Container, Section } from "@/components/v4/ui/Layout";
import Rail from "@/components/v4/ui/Rail";

/**
 * The frame every FAQ leaf hangs in: a sticky rail on the left, the answers on the right.
 *
 * The problem this solves is the reason the section exists at all. "Loan Rejections and Disputes"
 * is eighteen questions long; V1 renders it as eighteen `<h2>`s in a single column, so a reader who
 * arrived asking "how do I check my dispute status" has to scroll past seventeen answers they did
 * not want, with no map and no sense of how much further it goes. Grouping the questions under real
 * headings and putting those headings in a rail turns a scroll into a jump.
 *
 * Groups arrive with their labels *already resolved* through `t()` — the caller is the client
 * component that owns the copy, and passing keys down here would only move the lookup, not remove
 * it, while making this file need to know about the catalog.
 *
 * `scroll-mt` on each section clears the sticky header: without it, jumping to a group parks its
 * heading underneath the header and the reader lands mid-answer.
 */

export interface FaqGroup {
  /** The anchor, and the rail's key. Stable across locales — the rail links to it. */
  id: string;
  /** Already translated. */
  label: string;
  lede?: string;
  content: ReactNode;
}

export function FaqBody({ groups }: { groups: FaqGroup[] }) {
  return (
    <Section space="lg">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
          <Rail sections={groups.map(({ id, label }) => ({ id, label }))} />

          <div className="min-w-0">
            {groups.map((group, i) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                className={`scroll-mt-28 ${i > 0 ? "mt-24" : ""}`}
              >
                <h2 id={`${group.id}-heading`} className="v4-h2">
                  {group.label}
                </h2>
                {group.lede ? <p className="v4-lede mt-4">{group.lede}</p> : null}
                <div className="mt-9">{group.content}</div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * A question answered in the open, as an article rather than an accordion.
 *
 * A four-question page behind four collapsed accordions is a page that hides all of its content and
 * makes the reader click four times to find out it was short. Progressive disclosure earns its keep
 * on the eighteen-question page; on the short ones it is just a lid. So the pages with a handful of
 * questions set them open, and the long ones use `<Disclosure>`.
 */
export function Article({ question, children }: { question: string; children: ReactNode }) {
  return (
    <div className="border-t border-[var(--v4-edge)] pt-7 first:border-t-0 first:pt-0">
      <h3 className="v4-h3">{question}</h3>
      <div className="v4-prose mt-3.5">{children}</div>
    </div>
  );
}

export function ArticleList({ children }: { children: ReactNode }) {
  return <div className="grid gap-8">{children}</div>;
}
