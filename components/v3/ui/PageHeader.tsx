"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/v3/ui/Layout";
import Breadcrumbs, { type Crumb } from "@/components/v3/ui/Breadcrumbs";
import Rule from "@/components/v3/ui/Rule";
import Reveal from "@/components/v3/motion/Reveal";
import SetType from "@/components/v3/motion/SetType";

interface PageHeaderProps {
  /** Pre-translated headline. Split into an array to have it set line by line. */
  title: ReactNode | ReactNode[];
  /** Pre-translated. */
  folio?: string;
  lede?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Artwork, a score plate, a figure — sits in the right column of the masthead spread. */
  media?: ReactNode;
  /** `full` for the landing page of a section; `compact` for a leaf document. */
  size?: "compact" | "full";
  className?: string;
}

/**
 * The masthead of a page.
 *
 * Every V3 page opens on one, and it is always the same spread: the trail, then a folio in the
 * left margin, then the headline running across the measure, then a rule. What changes is only
 * how far the headline is allowed to run and whether a plate hangs beside it.
 *
 * The headline is set line by line (SetType) when the caller passes an array — which is why the
 * title prop takes `ReactNode[]`: the *page* decides where its headline breaks, because only the
 * page knows which words belong together.
 */
export default function PageHeader({
  title,
  folio,
  lede,
  actions,
  breadcrumbs,
  media,
  size = "compact",
  className = "",
}: PageHeaderProps) {
  const lines = Array.isArray(title) ? title : null;

  return (
    <header
      className={`relative pt-28 sm:pt-32 ${size === "full" ? "pb-16 sm:pb-24" : "pb-12 sm:pb-16"} ${className}`}
    >
      <Container>
        {breadcrumbs && (
          <Reveal variant="fade">
            <Breadcrumbs items={breadcrumbs} className="mb-10 sm:mb-14" />
          </Reveal>
        )}

        <div
          className={
            media
              ? "grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              : "grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end"
          }
        >
          {/* min-w-0: a grid item's automatic minimum is its min-content width, so without this
              a long unbroken headline pushes the column past the viewport instead of wrapping. */}
          <div className="min-w-0">
            {folio && (
              <Reveal variant="fade">
                <p className="v3-folio mb-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--v3-line-2)]" />
                  {folio}
                </p>
              </Reveal>
            )}

            <h1 className={size === "full" ? "v3-display" : "v3-h1"}>
              {lines ? <SetType lines={lines} /> : title}
            </h1>

            {lede && (
              <Reveal variant="rise" delay={260}>
                <p className="v3-lede mt-8 max-w-[52ch] text-pretty">{lede}</p>
              </Reveal>
            )}

            {actions && (
              <Reveal variant="rise" delay={360} className="mt-10 flex flex-wrap items-center gap-4">
                {actions}
              </Reveal>
            )}
          </div>

          {media && <div className="min-w-0">{media}</div>}
        </div>

        <Rule className="mt-14 sm:mt-20" strong />
      </Container>
    </header>
  );
}
