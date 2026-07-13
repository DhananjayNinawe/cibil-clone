"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/v4/ui/Icons";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { FAQ_TOPICS } from "./topics";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The end of every leaf: the other six topics, and the thing the reader probably wants to *do*.
 *
 * A help page that ends is a dead end. V1's FAQ leaves have no exit at all except the browser's back
 * button — a reader who has just finished reading how a dispute is resolved is left staring at a
 * footer, one search away from the form they came for. So each leaf closes on its siblings plus an
 * `actions` slot the page fills with its own next step: dispute resolution for the disputes page,
 * the plans for the purchase page, the simulator for the simulator page.
 *
 * It sits on a night band, which is what makes it read as the *end* of the document rather than one
 * more section of it — the bi-tonal page's punctuation, doing structural work.
 */
export default function RelatedTopics({
  current,
  actions,
}: {
  /** The current leaf's V4 href — filtered out, so no page links to itself. */
  current: string;
  actions?: ReactNode;
}) {
  const { t } = useV4();
  const others = FAQ_TOPICS.filter((topic) => topic.href !== current);

  return (
    <Section tone="night" space="md" aria-labelledby="v4-faq-related">
      <Container width="wide">
        <SectionHead id="v4-faq-related" label={t("faqs")} title={t("topicsHeading")} />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((topic, i) => (
            <Reveal key={topic.href} as="li" index={i}>
              <Link
                href={topic.href}
                className="v4-plane-flat v4-plane-lift group flex h-full items-start justify-between gap-4 p-5"
              >
                <span className="text-[0.9375rem] font-bold leading-snug text-[var(--v4-fg)]">
                  {t(topic.key)}
                  <span className="v4-caption mt-1.5 block font-normal">
                    <span className="v4-num">{topic.count}</span> {t(topic.unit)}
                  </span>
                </span>
                <ArrowRightIcon
                  size={17}
                  className="mt-0.5 shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </Link>
            </Reveal>
          ))}
        </ul>

        {actions ? <div className="mt-10 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </Section>
  );
}
