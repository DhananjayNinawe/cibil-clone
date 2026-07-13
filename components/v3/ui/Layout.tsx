import type { ElementType, HTMLAttributes, ReactNode } from "react";
import Rule from "@/components/v3/ui/Rule";

/* Container, Section, Folio, SectionHead — the spacing and rhythm primitives.
   Server components: none of them holds state, so they cost nothing on the client.
   (`Rule` is the exception and lives in its own file — it owns an IntersectionObserver.) */

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** `wide` for full spreads, `text` for a reading measure, `bleed` to keep only the gutter. */
  width?: "default" | "wide" | "text" | "bleed";
  children: ReactNode;
}

const WIDTHS: Record<NonNullable<ContainerProps["width"]>, string> = {
  default: "max-w-[1400px]",
  wide: "max-w-[1680px]",
  // ~68ch — the measure long-form copy stays readable at.
  text: "max-w-[46rem]",
  bleed: "max-w-none",
};

export function Container({ as, width = "default", className = "", children, ...rest }: ContainerProps) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag className={`mx-auto w-full ${WIDTHS[width]} px-[var(--v3-gutter)] ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Vertical rhythm. Sections are the only place that owns vertical space. */
  space?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * `paper` is the canvas, `sunken` a pale band for alternating rhythm, and `ink` inverts the
   * whole subtree by re-pointing the surface tokens (see `.v3-tone-ink` in v3.css) — children
   * need to know nothing about it.
   */
  tone?: "paper" | "sunken" | "ink";
  /** Draw the hairline that separates this section from the one above it. */
  ruled?: boolean;
  children: ReactNode;
}

const SPACING: Record<NonNullable<SectionProps["space"]>, string> = {
  none: "",
  sm: "py-14 sm:py-16",
  md: "py-20 sm:py-24",
  lg: "py-24 sm:py-32",
  xl: "py-28 sm:py-40",
};

const TONES: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "",
  sunken: "v3-tone-sunken",
  ink: "v3-tone-ink",
};

export function Section({
  as,
  space = "lg",
  tone = "paper",
  ruled = false,
  className = "",
  children,
  ...rest
}: SectionProps) {
  const Tag: ElementType = as ?? "section";
  return (
    <Tag
      className={`relative ${SPACING[space]} ${TONES[tone]} ${
        ruled ? "border-t border-[var(--v3-line)]" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

interface FolioProps {
  children: ReactNode;
  /** The section's number — "01", "02". A numeral, not language, so it is never translated. */
  index?: string;
  className?: string;
}

/**
 * The folio: V3's recurring "you are here" mark. A mono numeral, a short rule, a label.
 *
 * It replaces V2's glowing dot, and it is doing more work than an eyebrow: read down a page and
 * the folios number the argument, the way a printed document numbers its clauses.
 */
export function Folio({ children, index, className = "" }: FolioProps) {
  return (
    <p className={`v3-folio flex items-center gap-3 ${className}`}>
      {index && <span className="text-[var(--v3-accent)]">{index}</span>}
      <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--v3-line-2)]" />
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadProps {
  folio?: ReactNode;
  index?: string;
  /** Pre-translated. Pass `t("key")` — never a literal. */
  title: ReactNode;
  lede?: ReactNode;
  /** Pinned to the far right of the head — usually a link out to the full collection. */
  aside?: ReactNode;
  className?: string;
}

/**
 * A section head, set as a spread: folio and title on the left, lede in the right column, a
 * full-bleed rule beneath the pair.
 *
 * Deliberately not centred. Centred headings are the single most SaaS thing a page can do, and
 * V3's whole grammar is a left margin you can run your finger down.
 */
export function SectionHead({ folio, index, title, lede, aside, className = "" }: SectionHeadProps) {
  return (
    <div className={className}>
      {folio && (
        <Folio index={index} className="mb-8">
          {folio}
        </Folio>
      )}

      <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[1.15fr_1fr] lg:items-end">
        <h2 className="v3-h2 text-balance">{title}</h2>
        {lede && <p className="v3-lede max-w-[46ch] text-pretty lg:pb-1">{lede}</p>}
      </div>

      <div className="mt-8 flex items-end justify-between gap-6">
        <Rule className="flex-1" />
        {aside && <div className="shrink-0 pb-0.5">{aside}</div>}
      </div>
    </div>
  );
}
