"use client";

import type { ReactNode } from "react";
import Backdrop from "@/components/v2/ui/Backdrop";
import Breadcrumbs, { type Crumb } from "@/components/v2/ui/Breadcrumbs";
import { Container, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import SplitText from "@/components/v2/motion/SplitText";

interface PageHeroProps {
  /** Pre-translated. Split into words and lifted from a mask. */
  title: string;
  /** Trailing words of the headline, set in cyan. Also pre-translated. */
  titleAccent?: string;
  eyebrow?: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Right-hand column: an image, a stat, a card. */
  media?: ReactNode;
  /** Extra content below the actions. */
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "cyan" | "gold" | "duo" | "deep";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES: Record<NonNullable<PageHeroProps["size"]>, string> = {
  sm: "pt-32 pb-16 sm:pt-40 sm:pb-20",
  md: "pt-36 pb-20 sm:pt-44 sm:pb-28",
  lg: "pt-40 pb-24 sm:pt-52 sm:pb-36",
};

/**
 * The hero every inner page opens on.
 *
 * One component rather than fifty bespoke headers — but the tone, size, alignment and media
 * slot give each page its own register, so the section still reads as designed rather than
 * templated. The top padding clears the fixed header.
 */
export default function PageHero({
  title,
  titleAccent,
  eyebrow,
  lede,
  actions,
  breadcrumbs,
  media,
  children,
  align = "left",
  tone = "duo",
  size = "md",
  className = "",
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className={`relative isolate overflow-hidden ${SIZES[size]} ${className}`}>
      <Backdrop tone={tone} grid />

      {/* Fades the atmosphere into the canvas so the hero has no visible bottom seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-[var(--v2-bg)]"
      />

      <Container className="relative">
        <div
          className={
            media
              ? "grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
              : centered
                ? "mx-auto max-w-4xl text-center"
                : "max-w-4xl"
          }
        >
          <div>
            {breadcrumbs && (
              <Reveal variant="fade">
                <Breadcrumbs items={breadcrumbs} className={`mb-8 ${centered ? "flex justify-center" : ""}`} />
              </Reveal>
            )}

            {eyebrow && (
              <Reveal variant="fade" delay={60}>
                <Eyebrow className={centered ? "justify-center" : ""}>{eyebrow}</Eyebrow>
              </Reveal>
            )}

            <h1 className="v2-display mt-6 text-[var(--v2-text)] text-balance">
              <SplitText text={title} />
              {titleAccent && (
                <>
                  {" "}
                  <SplitText
                    text={titleAccent}
                    className="text-[var(--v2-cyan)]"
                    delay={title.split(/\s+/).length * 55}
                  />
                </>
              )}
            </h1>

            {lede && (
              <Reveal variant="up" delay={220}>
                <p className={`v2-lede mt-8 text-pretty ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
                  {lede}
                </p>
              </Reveal>
            )}

            {actions && (
              <Reveal
                variant="up"
                delay={320}
                className={`mt-10 flex flex-wrap items-center gap-4 ${centered ? "justify-center" : ""}`}
              >
                {actions}
              </Reveal>
            )}

            {children && (
              <Reveal variant="up" delay={400} className="mt-10">
                {children}
              </Reveal>
            )}
          </div>

          {media && (
            <Reveal variant="blur" delay={260} className="relative">
              {media}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
