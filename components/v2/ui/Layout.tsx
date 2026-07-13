import type { ElementType, HTMLAttributes, ReactNode } from "react";

/* Container, Section, Eyebrow, SectionHeading — the spacing and rhythm primitives.
   Server components: none of them need state, so they cost nothing on the client. */

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** `wide` for immersive full-bleed content, `narrow` for long-form reading measure. */
  width?: "default" | "wide" | "narrow";
  children: ReactNode;
}

const WIDTHS: Record<NonNullable<ContainerProps["width"]>, string> = {
  default: "max-w-[1280px]",
  wide: "max-w-[1440px]",
  // ~72ch: the measure long-form copy stays readable at.
  narrow: "max-w-[820px]",
};

export function Container({ as, width = "default", className = "", children, ...rest }: ContainerProps) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={`mx-auto w-full ${WIDTHS[width]} px-[var(--v2-gutter)] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Vertical rhythm. Sections are the only place that owns vertical space. */
  space?: "none" | "sm" | "md" | "lg" | "xl";
  /** `raised` lifts the surface a step out of the canvas; `deep` sinks it. */
  tone?: "canvas" | "raised" | "deep";
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
  canvas: "bg-[var(--v2-bg)]",
  raised: "bg-[var(--v2-bg-2)]",
  deep: "bg-[#03050a]",
};

export function Section({
  as,
  space = "lg",
  tone = "canvas",
  className = "",
  children,
  ...rest
}: SectionProps) {
  const Tag: ElementType = as ?? "section";
  return (
    <Tag className={`relative ${SPACING[space]} ${TONES[tone]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

interface EyebrowProps {
  children: ReactNode;
  /** Editorial index — "01", "02". A number, not language, so it is not translated. */
  index?: string;
  className?: string;
}

/** Small caps label with a glowing tick — the recurring "you are here" mark of the design. */
export function Eyebrow({ children, index, className = "" }: EyebrowProps) {
  return (
    <p className={`v2-eyebrow flex items-center gap-3 text-[var(--v2-cyan)] ${className}`}>
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_10px_rgba(0,176,240,0.9)]"
      />
      {index && <span className="text-[var(--v2-text-3)] tabular-nums">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  index?: string;
  /** Pre-translated. Pass `t("key")` — never a literal. */
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <Eyebrow index={index} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="v2-h2 mt-5 text-[var(--v2-text)] text-balance">{title}</h2>
      {lede && <p className="v2-lede mt-6 text-pretty">{lede}</p>}
    </div>
  );
}

/** Fades out at both ends — a hard 1px rule looks cheap against a dark canvas. */
export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`v2-hairline ${className}`} />;
}
