"use client";

import { useInView } from "@/lib/v3/motion";
import { useV3 } from "@/lib/v3/useV3";

const MIN = 300;
const MAX = 900;
const TICKS = [300, 400, 500, 600, 700, 800, 900];

/**
 * The bands of the CIBIL scale, drawn in the archival palette. These are the real, public bands
 * of the 300–900 range — the widths are the data, and the colours only rank them.
 */
const BANDS = [
  { from: 300, to: 550, colour: "var(--v3-clay)" },
  { from: 550, to: 650, colour: "var(--v3-ochre)" },
  { from: 650, to: 750, colour: "var(--v3-olive)" },
  { from: 750, to: 900, colour: "var(--v3-pine)" },
];

/** Where the marker settles — a point in the healthy band, illustrating the scale. */
const MARKER = 780;

const pct = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

/**
 * The figure: the CIBIL score *scale*, not a score.
 *
 * It shows no personal readout, and that is a deliberate, load-bearing decision rather than an
 * omission. A marketing dial pointing at "your score: 780" is a number the reader does not have,
 * and inventing one on a credit bureau's own homepage would be fabricating precisely the kind of
 * data this company exists to report accurately. So the figure presents the real, public range
 * and its bands, and the marker travels to a point in the healthy zone to *illustrate the scale*
 * — it asserts nothing about the reader. (V2 reached the same conclusion with a needle gauge;
 * the ethics are the same, the drawing is not.)
 *
 * Drawn as a printed measurement rule: an axis, ticks every hundred, the bands as a thin ruled
 * strip beneath, and the marker as a hairline dropping onto the value. No arc, no gradient sweep,
 * no glow — this is an instrument, and instruments are engraved, not lit.
 *
 * 300 and 900 are numerals, not language, so they are not translated (the same rule AGENTS.md
 * applies to prices and input masks).
 */
export default function ScoreScale() {
  const { t } = useV3();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <figure ref={ref} className="w-full">
      <div className="border border-[var(--v3-rule-2)] bg-[var(--v3-paper-2)] p-6 sm:p-8">
        <figcaption className="v3-folio flex items-center justify-between gap-4 border-b border-[var(--v3-rule)] pb-4">
          <span>{t("scoreCardTitle")}</span>
          <span aria-hidden className="text-[var(--v3-ink-3)]">
            {MIN}–{MAX}
          </span>
        </figcaption>

        {/* The marker's numeral, hung above the scale and set at display size. It is the only
            large figure on the page, so it has to be the serif. */}
        <div className="relative mt-10 mb-3 h-14">
          <div
            className="absolute bottom-0 -translate-x-1/2 transition-[left] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ left: `${inView ? pct(MARKER) : 0}%` }}
          >
            <span className="v3-num block text-center text-4xl leading-none font-medium text-[var(--v3-accent)] sm:text-5xl">
              {MARKER}
            </span>
          </div>
        </div>

        {/* The instrument. */}
        <div className="relative">
          {/* The marker's hairline, dropping from the numeral onto the axis. */}
          <div
            aria-hidden
            className="absolute -top-3 z-10 h-[calc(100%+0.75rem)] w-px bg-[var(--v3-ink)] transition-[left] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ left: `${inView ? pct(MARKER) : 0}%` }}
          />

          {/* The bands: a ruled strip, each segment as wide as the range it covers. */}
          <div
            role="img"
            aria-label={t("scoreCardTitle")}
            className="relative flex h-2.5 w-full overflow-hidden"
          >
            {BANDS.map((band) => (
              <span
                key={band.from}
                className="h-full origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{
                  width: `${pct(band.to) - pct(band.from)}%`,
                  backgroundColor: band.colour,
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  // Each band draws after the one before it, left to right, so the scale is
                  // built rather than revealed.
                  transitionDelay: `${(pct(band.from) / 100) * 500}ms`,
                }}
              />
            ))}
          </div>

          {/* The axis and its ticks. */}
          <div className="relative mt-0 h-px w-full bg-[var(--v3-rule-3)]" />

          <div className="relative h-6">
            {TICKS.map((tick) => (
              <span
                key={tick}
                aria-hidden
                className="absolute top-0 h-1.5 w-px bg-[var(--v3-rule-2)]"
                style={{ left: `${pct(tick)}%` }}
              />
            ))}
          </div>

          {/* Only the ends are labelled — an instrument does not need to shout every gradation,
              and labelling all seven would crowd the rule at phone widths. */}
          <div className="v3-num flex justify-between text-[0.6875rem] text-[var(--v3-ink-3)]">
            <span>{MIN}</span>
            <span>{MAX}</span>
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--v3-rule)] pt-4 text-xs leading-relaxed text-[var(--v3-ink-2)]">
          {t("scoreCardNote")}
        </p>
      </div>
    </figure>
  );
}
