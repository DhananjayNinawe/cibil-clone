"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { useReducedMotion } from "@/lib/v2/motion";
import { COMPANY_HISTORY } from "@/lib/footerPageData";
import Button from "@/components/v2/ui/Button";
import PageHero from "@/components/v2/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";

/** V1's own header photograph (components/company-history/CompanyHistoryContent.tsx). */
const HERO_IMAGE_URL =
  "https://www.transunioncibil.com/content/dam/transunion-cibil/business/images/header/post/INT-IN-24-2815101-India-About-us-Web-Image-Desktop-Header.jpg";

/**
 * Twenty-five years of CIBIL, as a scroll-driven timeline.
 *
 * V1 stacks the milestones in a two-column table with a horizontal rule between them. Here they
 * hang off a spine that lights up as the reader descends: the fill tracks the viewport, each
 * marker ignites as its entry arrives, and the entries alternate across the spine so the eye is
 * pulled down the page rather than through a list. The copy is V1's own data file, in all four
 * languages — nothing is retyped.
 */
export default function CompanyHistoryContent() {
  const { t, tv, language } = useV2();
  const entries = COMPANY_HISTORY[language];

  return (
    <>
      <PageHero
        size="md"
        tone="deep"
        eyebrow={t("aboutUsEyebrow")}
        title={t("companyHistoryTitle")}
        lede={t("aboutUsHeroDesc")}
        breadcrumbs={[
          { label: t("aboutUsHeroTitle"), href: toV2("/about-us") },
          { label: t("companyHistoryTitle") },
        ]}
        actions={
          <Button href={toV2("/about-us")} size="lg" arrow magnetic>
            {t("knowMoreBtn")}
          </Button>
        }
        media={
          <div className="v2-rim relative aspect-4/3 overflow-hidden rounded-[var(--v2-r-lg)] shadow-[var(--v2-shadow-3)]">
            <Image
              src={HERO_IMAGE_URL}
              alt={t("companyHistoryTitle")}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-[rgba(5,7,13,0.75)] via-transparent to-transparent"
            />
          </div>
        }
      />

      <Section space="lg" tone="canvas">
        <Container>
          <Reveal variant="fade">
            <Eyebrow index="01">{tv("v2AtAGlance")}</Eyebrow>
          </Reveal>

          <Timeline entries={entries} />
        </Container>
      </Section>
    </>
  );
}

function Timeline({ entries }: { entries: (typeof COMPANY_HISTORY)["en"] }) {
  const railRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  /*
   * The spine's lit portion is the reader's own position, mapped onto the rail: the fill ends a
   * little above the viewport's middle, so the light always arrives just before the entry it
   * belongs to. The height is written straight to the element — a scroll-linked value has no
   * business in React state, where it would re-render the whole timeline on every frame. It is
   * rAF-throttled and passive, and under reduced motion the spine is simply drawn in full.
   */
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    if (reduced) {
      fill.style.height = "calc(100% - 1rem)";
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail || !fillRef.current) return;
      const { top, height } = rail.getBoundingClientRect();
      if (height === 0) return;
      const anchor = window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (anchor - top) / height));
      fillRef.current.style.height = `calc((100% - 1rem) * ${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <ol ref={railRef} className="relative mx-auto mt-16 max-w-5xl">
      {/* Unlit spine. */}
      <span
        aria-hidden
        className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-[var(--v2-line-2)] lg:left-1/2"
      />
      {/* Lit spine — height is the reader's progress through the rail, written by the effect. */}
      <span
        ref={fillRef}
        aria-hidden
        className="absolute left-4 top-2 h-0 w-px -translate-x-1/2 bg-linear-to-b from-[rgba(0,176,240,0.35)] via-[var(--v2-cyan)] to-[var(--v2-cyan)] shadow-[0_0_18px_rgba(0,176,240,0.85)] lg:left-1/2"
      />

      {entries.map((entry, index) => {
        const left = index % 2 === 0;

        return (
          <Reveal
            as="li"
            key={entry.year}
            variant={left ? "left" : "right"}
            className="relative pb-14 pl-12 last:pb-0 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-10 lg:pb-20 lg:pl-0"
          >
            {/* Marker: absolute against the mobile spine, a grid cell on the desktop one. */}
            <span
              aria-hidden
              className="absolute left-4 top-2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(0,176,240,0.45)] bg-[var(--v2-bg)] lg:static lg:col-start-2 lg:mt-2 lg:translate-x-0"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_14px_rgba(0,176,240,1)]" />
            </span>

            <div
              className={
                left
                  ? "lg:col-start-1 lg:row-start-1 lg:justify-self-end lg:text-right"
                  : "lg:col-start-3 lg:row-start-1"
              }
            >
              <p className="text-[clamp(2.75rem,5vw,4rem)] font-light leading-none tracking-tight tabular-nums text-[var(--v2-cyan)]">
                {entry.year}
              </p>

              <div
                className={`v2-glass v2-rim mt-6 max-w-xl space-y-3.5 rounded-[var(--v2-r-lg)] p-6 text-left text-sm leading-relaxed text-[var(--v2-text-2)] sm:p-7 ${
                  left ? "lg:ml-auto" : ""
                }`}
              >
                {entry.paras.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}

                {entry.bullets && (
                  <ul className="space-y-2.5 pt-1">
                    {entry.bullets.map((bullet, i) => (
                      <li key={i} className="relative pl-6">
                        <span
                          aria-hidden
                          className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
