"use client";

import Link from "next/link";
import ScoreScale from "@/components/v4/viz/ScoreScale";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container } from "@/components/v4/ui/Layout";
import { ShieldIcon } from "@/components/v4/ui/Icons";
import { useInView } from "@/lib/v4/motion";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The front page's opening.
 *
 * The claim it makes is not "we are a credit bureau" — it is *here is the scale your life is
 * measured on, and here is where you go on it.* So the hero is not a photograph of a smiling
 * couple next to a paragraph; the hero **is** the instrument. The score scale is the largest object
 * on the page, the headline sits beside it, and the gold marker — hollow, waiting — says the one
 * thing a first-time visitor actually wants to know: your number goes here.
 *
 * Every word is V1's own copy, resolved through `t()`. The layout, the type and the graphic are the
 * redesign; the sentences are the business's.
 */
export default function Hero() {
  const { t, t4 } = useV4();
  /**
   * One observer for the whole hero, rather than a <Reveal> wrapper around each of its six parts.
   *
   * `.v4-reveal` rests at opacity 0 and is released by `.is-focused` on itself *or on any ancestor*
   * (see the selector list in v4.css) — so a single `is-focused` on the section releases every child
   * at once, and each child's own `--i` staggers it. Without an observer *somewhere* on the branch,
   * an element carrying `.v4-reveal` would sit at opacity 0 permanently: the class is a promise that
   * something will come along and light it up.
   */
  const { ref } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20"
    >
      {/* The optical field: two very wide, very faint washes. It does not move and it is not
          blurred — V2 owns drifting light, and a bureau that shimmers is a bureau that is hiding
          something. This is light falling on a wall. */}
      <div className="v4-field" aria-hidden="true" />

      <Container width="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
          {/* ── The words ─────────────────────────────────────────────────────────────────── */}
          <div>
            <p className="v4-label v4-reveal">
              <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
              <span className="ml-2.5">{t("infoForGood")}</span>
            </p>

            <h1 className="v4-display v4-reveal mt-5" style={{ "--i": 1 } as React.CSSProperties}>
              {t("heroTitlePrefix")}{" "}
              {/* The emphasis. V2 colours the word cyan; V3 sets it in italic; V4 draws the gold
                  marker under it — the same object that marks the reader's place on every chart,
                  doing the same job in a sentence. */}
              <span className="v4-mark-word">{t("heroTitleBrand")}</span>
              {t("heroTitleSuffix")}
            </h1>

            <p className="v4-lede v4-reveal mt-6" style={{ "--i": 2 } as React.CSSProperties}>
              {t("heroText")} <strong className="font-bold text-[var(--v4-fg)]">CIBIL</strong>
            </p>

            <div
              className="v4-reveal mt-9 flex flex-wrap items-center gap-3"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <ButtonLink href={toV4("/freecibilscore")} size="lg" arrow>
                {t("heroCta")}
              </ButtonLink>
              <span className="v4-caption">
                {t("heroAlreadyAccount")}{" "}
                <Link href={toV4("/login")} className="v4-link">
                  {t("heroLogIn")}
                </Link>
              </span>
            </div>

            {/* The single most reassuring fact CIBIL can tell a nervous first-time visitor, and V1
                buries it in grey text. Here it is a plane of its own, with the shield glyph. */}
            <p
              className="v4-plane v4-reveal mt-9 inline-flex max-w-[30rem] items-start gap-3 px-4 py-3.5"
              style={{ "--i": 4 } as React.CSSProperties}
            >
              <ShieldIcon size={19} className="mt-0.5 shrink-0 text-[var(--v4-success)]" />
              <span className="text-[0.9375rem] leading-snug text-[var(--v4-fg-2)]">
                {t("heroSafeNote")}{" "}
                <strong className="font-bold text-[var(--v4-fg)]">{t("heroSafeNoteBold")}</strong>
              </span>
            </p>
          </div>

          {/* ── The instrument ────────────────────────────────────────────────────────────── */}
          <div className="v4-plane v4-reveal v4-reveal-focus p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="v4-h3">{t4("v4ScaleTitle")}</h2>
              <span className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]">
                {t4("v4ScaleRange")}
              </span>
            </div>

            <ScoreScale className="mt-8" />

            <p className="v4-caption mt-6 border-t border-[var(--v4-edge)] pt-5">
              {t4("v4ScaleGoodZone")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
