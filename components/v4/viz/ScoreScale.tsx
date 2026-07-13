"use client";

import { useV4 } from "@/lib/v4/useV4";
import { useInView } from "@/lib/v4/motion";

/**
 * The score scale — V4's signature instrument, and the anchor of its data language.
 *
 * ── What it may and may not say ─────────────────────────────────────────────────────────────────
 * Every number on it is one this site already states in its own copy: the CIBIL Score runs from 300
 * to 900, and "a score above 700 is generally considered good" (`ucsSectionScoreDesc`). Nothing is
 * invented, nothing is implied. In particular the gold marker is *hollow*, and labelled "your score
 * goes here" — it is an invitation, not a prediction. A bureau that draws you a score you have not
 * earned yet is a bureau lying to you on its front page.
 *
 * ── Why it is drawn the way it is ───────────────────────────────────────────────────────────────
 * Not a gauge (V1 has one, V2 lights one), not an engraved ruler (V3's). It is a *scale*, drawn in
 * one hue: the five-step sequential ramp, pale at 300 and deep at 900. Ordered data gets an ordered
 * scale — and a single-hue ramp survives every kind of colour blindness, which the red-amber-green
 * dial that every credit site reaches for does not.
 *
 * Gold appears exactly once, as the marker. That is the rule the whole design system hangs on.
 *
 * ── i18n ────────────────────────────────────────────────────────────────────────────────────────
 * The SVG contains numerals and nothing else. Every *word* — the legend, the caption, the marker's
 * label — is HTML positioned over it. SVG text does not wrap, so a Hindi or Tamil string baked into
 * the drawing would run straight out of its own viewBox; as HTML it simply reflows.
 */

/* The drawing's coordinate system. The bar spans x=40…600 in a 640-wide viewBox. */
const X0 = 40;
const X1 = 600;
const LOW = 300;
const HIGH = 900;
const GOOD = 700; // the threshold this site's own copy names

const x = (score: number) => X0 + ((score - LOW) / (HIGH - LOW)) * (X1 - X0);

/** Where the marker sits, as a percentage of the *element's* width — for the HTML label above it. */
const MARKER_PCT = (x(GOOD) / 640) * 100;

const TICKS = [300, 400, 500, 600, 700, 800, 900];

export default function ScoreScale({ className = "" }: { className?: string }) {
  const { t4 } = useV4();
  const { ref } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* The marker's label, in HTML so it can wrap and be translated. It is anchored to the same
          x the SVG marker is drawn at, as a percentage — so the two stay locked together at every
          width without a resize listener. */}
      <div
        className="v4-marker-in absolute top-0 z-10 -translate-x-1/2 text-center"
        style={{ left: `${MARKER_PCT}%` }}
      >
        <span className="inline-block max-w-[9.5rem] rounded-[var(--v4-r-xs)] border border-[color-mix(in_srgb,var(--v4-gold)_55%,transparent)] bg-[color-mix(in_srgb,var(--v4-gold)_16%,var(--v4-surface))] px-2.5 py-1.5 text-[0.6875rem] font-bold leading-tight text-[var(--v4-gold-text)]">
          {t4("v4ScaleYours")}
        </span>
      </div>

      <svg
        viewBox="0 0 640 168"
        className="h-auto w-full"
        role="img"
        aria-label={t4("v4ScaleA11y")}
      >
        <defs>
          {/* The ramp. It reads left to right exactly as the scale does: pale at 300, deep at 900.
              The stops address the adaptive chart tokens, so on a night band the whole ramp lifts
              (see `.v4-tone-night` in v4.css) without this component knowing it happened.

              `userSpaceOnUse` rather than the default: a gradient in objectBoundingBox units is
              resolved against the *bounding box of the shape it fills*, and the bar below is a
              horizontal line, whose bounding box is zero pixels tall. That is a degenerate box, and
              a browser is entitled to drop the gradient entirely — which is exactly what happens,
              silently, leaving an unpainted bar. Pinning the gradient to the drawing's own
              coordinates sidesteps the whole question. */}
          <linearGradient
            id="v4-scale-ramp"
            gradientUnits="userSpaceOnUse"
            x1={X0}
            y1="0"
            x2={X1}
            y2="0"
          >
            <stop offset="0%" stopColor="var(--v4-c1)" />
            <stop offset="28%" stopColor="var(--v4-c2)" />
            <stop offset="55%" stopColor="var(--v4-c3)" />
            <stop offset="80%" stopColor="var(--v4-c4)" />
            <stop offset="100%" stopColor="var(--v4-c5)" />
          </linearGradient>
        </defs>

        {/* The good zone, marked *behind* the bar as a field rather than a second colour on it —
            colour is already carrying the scale, and a second meaning on the same channel is how a
            chart starts lying. */}
        <g className="v4-reveal v4-reveal-fade">
          <rect
            x={x(GOOD)}
            y="52"
            width={X1 - x(GOOD)}
            height="62"
            rx="4"
            fill="var(--v4-fg)"
            opacity="0.045"
          />
          <line
            x1={x(GOOD)}
            y1="52"
            x2={x(GOOD)}
            y2="114"
            stroke="var(--v4-edge-3)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </g>

        {/* The bar, drawn as a *stroke* rather than a filled rectangle — which is what lets it plot
            itself along its own length using the same `.v4-plot` dash-offset primitive every other
            chart in V4 uses. A filled rect cannot be dashed, and would have needed a second, bespoke
            animation mechanism to do the same thing. A round cap gives it the rounded ends for free. */}
        <line
          x1={X0}
          y1="83"
          x2={X1}
          y2="83"
          stroke="url(#v4-scale-ramp)"
          strokeWidth="14"
          strokeLinecap="round"
          className="v4-plot"
          style={{ "--len": X1 - X0 } as React.CSSProperties}
        />

        {/* Ticks and their numerals. Numerals only — every word on this graphic is HTML. */}
        <g>
          {TICKS.map((score, i) => (
            <g key={score} className="v4-reveal v4-reveal-fade" style={{ "--i": i } as React.CSSProperties}>
              <line
                x1={x(score)}
                y1="96"
                x2={x(score)}
                y2={score === LOW || score === HIGH || score === GOOD ? 106 : 102}
                stroke="var(--v4-edge-3)"
                strokeWidth="1"
              />
              <text
                x={x(score)}
                y="124"
                textAnchor="middle"
                className="v4-num"
                fontSize="12"
                fill={score === GOOD ? "var(--v4-fg)" : "var(--v4-fg-3)"}
                fontWeight={score === GOOD ? 600 : 400}
              >
                {score}
              </text>
            </g>
          ))}
        </g>

        {/* The marker. Hollow — the reader has not given us a number yet.
            Its outline is drawn in ink, not in gold: WCAG asks a meaningful graphic to clear 3:1
            against its background, and brand gold on white is 2.2:1. So the *shape* carries the
            contrast and the *fill* carries the brand. This is the pattern every gold mark in V4
            follows. */}
        <g className="v4-marker-in">
          <line
            x1={x(GOOD)}
            y1="44"
            x2={x(GOOD)}
            y2="70"
            stroke="var(--v4-marker-line)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={`M ${x(GOOD)} 72 l -7 -10 a 8.5 8.5 0 1 1 14 0 z`}
            fill="var(--v4-marker)"
            stroke="var(--v4-fg)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx={x(GOOD)} cy="55" r="2.6" fill="var(--v4-fg)" />
        </g>
      </svg>

      {/* The legend. Three swatches, three words — the only place the graphic names itself. */}
      <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5">
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-9 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--v4-c1), var(--v4-c3) 55%, var(--v4-c5))",
            }}
          />
          <span className="v4-caption">{t4("v4ScaleLegendScale")}</span>
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-[2px] border border-dashed border-[var(--v4-edge-3)] bg-[color-mix(in_srgb,var(--v4-fg)_6%,transparent)]"
          />
          <span className="v4-caption">{t4("v4ScaleLegendGood")}</span>
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full border border-[var(--v4-fg)] bg-[var(--v4-marker)]"
          />
          <span className="v4-caption">{t4("v4ScaleLegendYou")}</span>
        </li>
      </ul>
    </div>
  );
}
