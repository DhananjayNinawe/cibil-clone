"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Layout";
import { ChevronRightIcon } from "./Icons";
import { useInView } from "@/lib/v4/motion";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The interior page's opening.
 *
 * V1 gives every page the same hero: a two-column split with a grey panel on the left and a stock
 * photograph bleeding off the right. It is the most-repeated object on the whole site, and it is
 * the first thing V4 throws away — 45 pages that open identically are 45 pages that feel like one
 * page you cannot leave.
 *
 * V4's is typographic. A breadcrumb (so you always know where you are), a mono label, a headline,
 * a lede at a real measure, and whatever action the page is actually for. No photograph, because a
 * photograph of a woman holding a phone tells the reader nothing about disputing a credit report.
 *
 * `tone="night"` inverts it for the pages that deserve the weight — the products, the front doors.
 */
export default function PageHero({
  label,
  title,
  lede,
  actions,
  aside,
  tone = "day",
  breadcrumb,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  /** The right-hand column: a chart, a plane of facts, a form. Never a stock photo. */
  aside?: ReactNode;
  tone?: "day" | "night";
  /** The page's parent, if it has one — `{ label, href }` with an already-V4 href. */
  breadcrumb?: { label: string; href: string };
}) {
  const { t4 } = useV4();
  /**
   * One observer for the whole hero.
   *
   * `.v4-reveal` rests at opacity 0 and is released by `.is-focused` on itself *or on any ancestor*
   * (see the selector list in v4.css), so a single `is-focused` here releases the label, the
   * headline, the lede, the actions and the aside together, each staggered by its own `--i`.
   * Without an observer somewhere on the branch, an element carrying `.v4-reveal` would stay at
   * opacity 0 forever — the class is a promise that something will come along and light it up.
   */
  const { ref } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${tone === "night" ? "v4-tone-night" : ""} pb-16 pt-8 sm:pb-20 sm:pt-10`}
    >
      <div className="v4-field" aria-hidden="true" />

      <Container width="wide" className="relative">
        {/* Where am I? WCAG 2.4.8 — and the cheapest orientation cue there is. */}
        <nav aria-label={t4("v4Breadcrumb")} className="v4-caption flex items-center gap-1.5">
          <Link href={toV4("/")} className="hover:text-[var(--v4-fg)]">
            {t4("v4Home")}
          </Link>
          {breadcrumb ? (
            <>
              <ChevronRightIcon size={13} className="opacity-50" aria-hidden="true" />
              <Link href={breadcrumb.href} className="hover:text-[var(--v4-fg)]">
                {breadcrumb.label}
              </Link>
            </>
          ) : null}
        </nav>

        <div
          className={`mt-8 grid gap-12 ${aside ? "lg:grid-cols-[1.05fr_1fr] lg:gap-16" : ""} lg:items-center`}
        >
          <div>
            {label ? (
              <p className="v4-label v4-reveal">
                <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
                <span className="ml-2.5">{label}</span>
              </p>
            ) : null}

            <h1 className={`v4-h1 v4-reveal ${label ? "mt-4" : ""}`}>{title}</h1>

            {lede ? <p className="v4-lede v4-reveal mt-5">{lede}</p> : null}

            {actions ? <div className="v4-reveal mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {aside ? <div className="v4-reveal v4-reveal-focus">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
