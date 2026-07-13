"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/v2/motion";
import { ArrowRightIcon } from "@/components/icons";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  /** Renders a `next/link` when present, a `<button>` otherwise. */
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Trailing arrow that slides on hover. */
  arrow?: boolean;
  /** Cursor-tracking pull. Skip it on anything in a dense row — it gets noisy. */
  magnetic?: boolean;
  full?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  /** Only for icon-only or otherwise ambiguous labels — must come from `t()`. */
  "aria-label"?: string;
  className?: string;
}

// No `whitespace-nowrap`: labels here are translated, and the longest of them
// ("GET YOUR FREE CIBIL SCORE & REPORT", longer still in Hindi/Tamil) sets a min-content
// floor wider than a 390px phone. An unwrappable button silently drags the whole page into
// horizontal scroll. Sizes below use min-h + py so a wrapped label grows the pill instead.
const BASE =
  "group/btn relative inline-flex max-w-full items-center justify-center gap-2.5 overflow-hidden rounded-full text-center font-bold transition-[background-color,color,border-color,box-shadow,opacity] duration-200 ease-[var(--v2-ease)] v2-focus disabled:pointer-events-none disabled:opacity-45";

const VARIANTS: Record<Variant, string> = {
  // The gold pill is V1's conversion button, kept as the one true primary — brand
  // recognition beats novelty on the thing people actually click.
  primary:
    "v2-sheen bg-[var(--v2-gold)] text-[#0a0a0a] shadow-[var(--v2-glow-gold)] hover:bg-[#ffd634] hover:shadow-[0_14px_50px_-10px_rgba(245,197,24,0.75)]",
  secondary:
    "v2-glass text-[var(--v2-text)] hover:border-[rgba(0,176,240,0.5)] hover:bg-[rgba(0,176,240,0.10)] hover:shadow-[var(--v2-glow-cyan)]",
  ghost:
    "border border-[var(--v2-line-2)] bg-transparent text-[var(--v2-text)] hover:border-[var(--v2-cyan)] hover:text-[var(--v2-cyan)]",
  link: "!rounded-none !px-0 !py-0 text-[var(--v2-cyan)] hover:text-[var(--v2-cyan-soft)] v2-underline",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-9 px-4 py-2 text-[11px] tracking-[0.08em]",
  md: "min-h-12 px-6 py-3 text-xs tracking-[0.1em] uppercase",
  lg: "min-h-14 px-8 py-4 text-[13px] tracking-[0.1em] uppercase",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  magnetic = false,
  full = false,
  type = "button",
  disabled,
  onClick,
  className = "",
  ...rest
}: ButtonProps) {
  const magnet = useMagnetic<HTMLElement>(magnetic ? 0.3 : 0);

  const classes = [
    BASE,
    VARIANTS[variant],
    variant === "link" ? "" : SIZES[size],
    full ? "w-full" : "",
    className,
  ].join(" ");

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRightIcon className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--v2-ease)] group-hover/btn:translate-x-1" />
      )}
    </>
  );

  const motionProps = magnetic
    ? {
        ref: magnet.ref as never,
        onPointerMove: magnet.onPointerMove as never,
        onPointerLeave: magnet.onPointerLeave,
        onBlur: magnet.onBlur,
      }
    : {};

  if (href) {
    // Absolute URLs and mail/tel leave the app, so they get a plain anchor: <Link> would
    // try to client-navigate them.
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          onClick={onClick}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={classes}
          {...motionProps}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      // onClick still fires for links — callers use it to close the drawer/menu the button
      // lives in as the navigation starts.
      <Link href={href} onClick={onClick} className={classes} {...motionProps} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...rest}
    >
      {content}
    </button>
  );
}
