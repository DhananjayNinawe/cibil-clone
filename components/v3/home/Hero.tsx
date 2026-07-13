"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container } from "@/components/v3/ui/Layout";
import Button from "@/components/v3/ui/Button";
import Rule from "@/components/v3/ui/Rule";
import Reveal from "@/components/v3/motion/Reveal";
import SetType from "@/components/v3/motion/SetType";
import ScoreScale from "@/components/v3/home/ScoreScale";
import { ArrowDown } from "@/components/v3/ui/Icons";

/**
 * The front page.
 *
 * Same promise V1 makes, in V1's words — the headline, the reassurance, the CTA and the login
 * line are all existing keys. What changes is the staging: it is set as the front page of a
 * broadsheet. The ruled column grid shows through behind the type, the headline runs at masthead
 * scale and is composed line by line, the reassurance sits in the margin as a printed note, and
 * the score appears as an engraved instrument rather than a lit dial.
 *
 * The headline's emphasis is carried by an italic — "in your hands" — not by a coloured word.
 * That is the whole difference between this and every other fintech hero: nothing here glows.
 */
export default function Hero() {
  const { t, t3 } = useV3();

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* The skeleton of the layout, made faintly visible. */}
      <div aria-hidden className="v3-columns" />

      <Container className="relative">
        <Reveal variant="fade">
          <p className="v3-folio flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-[var(--v3-rule-2)]" />
            {t3("v3HeroKicker")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-16 gap-y-14 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* min-w-0: a grid item's automatic minimum is its min-content width, so without this
              the display headline pushes the column past the viewport instead of wrapping. */}
          <div className="min-w-0">
            <h1 className="v3-display">
              <SetType
                lines={[
                  <>
                    {t("heroTitlePrefix")} {t("heroTitleBrand")}
                    {t("heroTitleSuffix").startsWith(",") ? "," : ""}
                  </>,
                  <span key="2" className="v3-em">
                    {/* The suffix carries its own leading comma in the catalog (", in your
                        hands."); the line above prints it, so it is stripped here rather than
                        printed twice. */}
                    {t("heroTitleSuffix").replace(/^,\s*/, "")}
                  </span>,
                  <span key="3" className="text-[var(--v3-ink-2)]">
                    {t("heroTitleLine2")}
                  </span>,
                ]}
              />
            </h1>

            <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <Reveal variant="rise" delay={380}>
                  <p className="v3-lede max-w-[34ch] text-pretty">{t("heroBecomeReady")}</p>
                </Reveal>

                <Reveal variant="rise" delay={460} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Button href={toV3("/register")} size="lg" arrow>
                    {t("heroCta")}
                  </Button>

                  <p className="text-sm text-[var(--v3-ink-2)]">
                    {t("heroAlreadyAccount")}{" "}
                    <Link href={toV3("/login")} className="v3-focus v3-link font-medium text-[var(--v3-ink)]">
                      {t("heroLogIn")}
                    </Link>
                  </p>
                </Reveal>
              </div>
            </div>

            {/* The reassurance, set as a marginal note — the single most common anxiety about
                checking a score, answered in the margin where a printed page would answer it. */}
            <Reveal variant="rise" delay={560}>
              <aside className="mt-14 max-w-[42ch] border-l-2 border-[var(--v3-accent)] pl-5">
                <p className="text-sm leading-relaxed text-[var(--v3-ink-2)]">
                  {t("heroSafeNote")}{" "}
                  <strong className="font-semibold text-[var(--v3-ink)]">{t("heroSafeNoteBold")}</strong>
                </p>
              </aside>
            </Reveal>
          </div>

          <Reveal variant="rise" delay={220} className="min-w-0">
            <ScoreScale />
          </Reveal>
        </div>

        <div className="mt-20 flex items-center gap-4 sm:mt-28">
          <Rule className="flex-1" />
          <p className="v3-folio flex shrink-0 items-center gap-2">
            <ArrowDown aria-hidden className="text-sm" />
            {t3("v3ScrollHint")}
          </p>
        </div>
      </Container>
    </section>
  );
}
