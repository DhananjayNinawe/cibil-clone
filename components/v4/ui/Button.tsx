import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon, ExternalIcon } from "./Icons";

/**
 * V4's button.
 *
 * It is a soft rectangle, not a pill. That one decision is the fastest way to tell a V4 page from a
 * V1 or V2 one at a glance — both of those signal every call to action with the same gold `rounded-
 * full` capsule — and it follows from the colour system rather than from taste: in V4 gold *means*
 * "you" (it marks the reader's own score, their own plan, their position on a scale). A page whose
 * every button is gold has spent the marker on furniture and has nothing left to point with. So the
 * primary action is the brand's deep blue, and gold stays a pointer.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "v4-btn-primary",
  secondary: "v4-btn-secondary",
  ghost: "v4-btn-ghost",
};

const SIZES: Record<Size, string> = {
  sm: "v4-btn-sm",
  md: "",
  lg: "v4-btn-lg",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Adds the arrow that means "this goes somewhere". Decorative — the label carries the meaning. */
  arrow?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`v4-btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...props}>
      {children}
      {arrow ? <ArrowRightIcon size={17} /> : null}
    </button>
  );
}

/**
 * The same object, as a link.
 *
 * A control that *navigates* is an anchor, and a control that *acts* is a button — regardless of
 * how it is painted. Getting this wrong is the single most common accessibility bug in a marketing
 * site: a `<div onClick>` styled as a CTA cannot be reached by Tab, cannot be opened in a new tab,
 * and is announced as nothing at all.
 *
 * `external` renders a plain `<a>` with the security attributes and the glyph that warns a reader
 * they are leaving; internal links go through `next/link` so they prefetch.
 */
export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  external = false,
  className = "",
  "aria-label": ariaLabel,
  newTabLabel,
}: CommonProps & {
  href: string;
  external?: boolean;
  "aria-label"?: string;
  /** The translated "opens in a new tab" string. Required when `external` — see below. */
  newTabLabel?: string;
}) {
  const classes = `v4-btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        // `noreferrer` as well as `noopener`: without it the destination still learns where its
        // traffic came from, and older engines treat `noopener` alone as advisory.
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
        <ExternalIcon size={15} />
        {/* A sighted reader sees the arrow glyph and knows. A screen-reader user is told, because
            an unannounced new tab is a WCAG 3.2.5 failure — the context changed without warning. */}
        {newTabLabel ? <span className="v4-sr">{newTabLabel}</span> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
      {arrow ? <ArrowRightIcon size={17} /> : null}
    </Link>
  );
}

/**
 * The quiet link: an arrow that slides on hover. V4's "read more" affordance, used where a full
 * button would be too loud — at the end of a card, under a paragraph.
 */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-[var(--v4-accent)] transition-colors hover:text-[var(--v4-accent-hover)] ${className}`}
    >
      {children}
      <ArrowRightIcon
        size={16}
        className="transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      />
    </Link>
  );
}
