import type { ReactNode } from "react";

/**
 * V4's layout primitives: the container, the section, and the tone that a section carries.
 *
 * The `tone` prop is the load-bearing one. V4's page is bi-tonal — day bands where you read, night
 * bands where you look — and a tone does not merely set a background colour: it re-points the whole
 * adaptive token layer in v4.css (`--v4-bg`, `--v4-fg`, `--v4-edge`, `--v4-accent`, the chart ramp,
 * the marker). So every child inside a `tone="night"` section inverts correctly without knowing it
 * was inverted, and no component ever has to carry a `dark` variant of itself.
 */

type Width = "default" | "wide" | "text" | "bleed";

const WIDTHS: Record<Width, string> = {
  default: "max-w-[var(--v4-max)]",
  wide: "max-w-[var(--v4-max-wide)]",
  text: "max-w-[46rem]",
  bleed: "max-w-none",
};

export function Container({
  children,
  width = "default",
  className = "",
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-[var(--v4-gutter)] ${WIDTHS[width]} ${className}`}
    >
      {children}
    </div>
  );
}

type Tone = "day" | "tint" | "plane" | "night";
type Space = "none" | "sm" | "md" | "lg" | "xl";

const TONES: Record<Tone, string> = {
  day: "",
  tint: "v4-tone-tint",
  plane: "v4-tone-plane",
  night: "v4-tone-night",
};

const SPACES: Record<Space, string> = {
  none: "",
  sm: "py-12 sm:py-14",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
  xl: "py-24 sm:py-36",
};

export function Section({
  children,
  tone = "day",
  space = "lg",
  id,
  className = "",
  as: As = "section",
  "aria-labelledby": labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  space?: Space;
  id?: string;
  className?: string;
  as?: "section" | "div" | "footer" | "header";
  "aria-labelledby"?: string;
}) {
  return (
    <As
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${TONES[tone]} ${SPACES[space]} ${className}`}
    >
      {children}
    </As>
  );
}

/**
 * The section's opening: a mono label, a headline, and an optional lede.
 *
 * It exists as a component rather than a copied block because the *relationship* between those
 * three things — the 12px gap under the label, the measure the lede is set to — is the design, and
 * a page that re-types it six times is a page where it drifts six ways.
 */
export function SectionHead({
  label,
  title,
  lede,
  align = "start",
  id,
  className = "",
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  id?: string;
  className?: string;
}) {
  const centred = align === "center";
  return (
    <header
      className={`${centred ? "text-center" : ""} ${className}`}
    >
      {label ? (
        <p className={`v4-label ${centred ? "" : ""}`}>
          <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
          <span className="ml-2.5">{label}</span>
        </p>
      ) : null}
      <h2 id={id} className={`v4-h2 ${label ? "mt-3.5" : ""}`}>
        {title}
      </h2>
      {lede ? (
        <p className={`v4-lede mt-4 ${centred ? "mx-auto" : ""}`}>{lede}</p>
      ) : null}
    </header>
  );
}

/**
 * The hairline that separates one row of content from the next. V4 uses it sparingly — depth here
 * comes from planes, not from rules (that is V3's language) — but a long list still needs one.
 */
export function Hairline({ className = "" }: { className?: string }) {
  return <hr className={`v4-hairline ${className}`} />;
}
