"use client";

import { useV2 } from "@/lib/v2/useV2";
import { useInView } from "@/lib/v2/motion";

const MIN = 300;
const MAX = 900;

/* Semicircle geometry: the arc sweeps 180° from due-west to due-east. */
const R = 132;
const CX = 160;
const CY = 160;
const ARC_LENGTH = Math.PI * R;

/** Where the needle settles — a point in the healthy band. */
const NEEDLE_FRACTION = 0.78;

/**
 * The hero's centrepiece: the CIBIL score *scale*, not a score.
 *
 * Deliberately shows no numeric readout. A marketing dial pointing at "780" is a number the
 * reader does not have — inventing one for a credit bureau's own homepage would be fabricating
 * exactly the kind of data this company exists to report accurately. So the dial presents the
 * real, public range (300–900) and its bands, and the needle sweeps into the healthy zone to
 * illustrate the scale rather than assert anything about the reader.
 *
 * All copy comes from V1's catalog via `t()`; 300 and 900 are numerals, not language, so they
 * are not translated (same rule AGENTS.md applies to prices and input masks).
 */
export default function ScoreDial() {
  const { t } = useV2();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(0,176,240,0.35),transparent_65%)] blur-3xl"
      />

      <div className="v2-glass v2-rim v2-noise relative overflow-hidden rounded-[var(--v2-r-xl)] p-8 shadow-[var(--v2-shadow-3)] sm:p-10">
        <p className="v2-eyebrow text-center text-[var(--v2-cyan)]">{t("scoreCardTitle")}</p>

        <svg viewBox="0 0 320 190" className="mx-auto mt-8 w-full" role="img" aria-label={t("scoreCardTitle")}>
          <defs>
            <linearGradient id="v2-dial-band" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="42%" stopColor="#f5c518" />
              <stop offset="100%" stopColor="#3ddc97" />
            </linearGradient>
            <filter id="v2-dial-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={20}
            strokeLinecap="round"
          />

          {/* The coloured band draws itself on with a dash sweep once the dial is in view. */}
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="url(#v2-dial-band)"
            strokeWidth={20}
            strokeLinecap="round"
            filter="url(#v2-dial-glow)"
            strokeDasharray={ARC_LENGTH}
            strokeDashoffset={inView ? 0 : ARC_LENGTH}
            style={{ transition: "stroke-dashoffset 1800ms var(--v2-ease)" }}
          />

          <g
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              transform: `rotate(${inView ? -90 + NEEDLE_FRACTION * 180 : -90}deg)`,
              transition: "transform 2000ms var(--v2-ease)",
            }}
          >
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - R + 26}
              stroke="var(--v2-text)"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </g>
          <circle cx={CX} cy={CY} r={9} fill="var(--v2-bg-2)" stroke="var(--v2-cyan)" strokeWidth={2} />

          <text x={CX - R} y={CY + 26} textAnchor="middle" className="fill-[var(--v2-text-3)] text-[13px]">
            {MIN}
          </text>
          <text x={CX + R} y={CY + 26} textAnchor="middle" className="fill-[var(--v2-text-3)] text-[13px]">
            {MAX}
          </text>
        </svg>

        <p className="mt-6 text-center text-xs leading-relaxed text-[var(--v2-text-2)]">{t("scoreCardNote")}</p>
      </div>

      {/* Floating reassurance chip — the single most common anxiety about checking a score. */}
      {/* v2-panel: this chip floats over the dial card's own caption, so it has to be opaque. */}
      <div className="v2-float v2-panel absolute -bottom-6 -left-4 hidden max-w-[15rem] rounded-[var(--v2-r-md)] p-4 shadow-[var(--v2-shadow-2)] sm:block">
        <p className="text-xs leading-relaxed text-[var(--v2-text-2)]">
          {t("heroSafeNote")} <span className="font-bold text-[var(--v2-cyan)]">{t("heroSafeNoteBold")}</span>
        </p>
      </div>
    </div>
  );
}
