"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "@/components/v3/ui/Icons";

type Variant = "solid" | "outline" | "quiet" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Append the house arrow, which travels a few pixels right on hover. */
  arrow?: boolean;
  full?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

/**
 * V3's button.
 *
 * Square corners, a hairline border, no shadow and no gradient — it is a stamped block, not a
 * floating pill. `solid` fills with ink (or with paper, on an ink band: the tokens flip, so the
 * primary action is always maximum contrast against whatever it sits on, and no caller has to
 * think about it).
 *
 * The only motion is the arrow travelling ~3px and the fill inverting. There is no magnetic
 * pull here on purpose: a control that dodges the pointer is a usability bug wearing a costume,
 * and this design's confidence comes from being still.
 */
const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-[var(--v3-fg)] text-[var(--v3-bg)] border border-[var(--v3-fg)] hover:bg-transparent hover:text-[var(--v3-fg)]",
  outline:
    "bg-transparent text-[var(--v3-fg)] border border-[var(--v3-line-3)] hover:bg-[var(--v3-fg)] hover:text-[var(--v3-bg)] hover:border-[var(--v3-fg)]",
  quiet:
    "bg-transparent text-[var(--v3-fg-2)] border border-transparent hover:text-[var(--v3-fg)] hover:border-[var(--v3-line-2)]",
  link: "bg-transparent border-0 p-0 text-[var(--v3-accent)] hover:text-[var(--v3-accent-hover)]",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
};

export default function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  arrow = false,
  full = false,
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  const isLink = variant === "link";

  const classes = [
    "v3-focus group inline-flex items-center justify-center gap-2.5 transition-colors duration-200",
    // Labels are set in the mono voice: a button is a machine instruction, not prose. V1's CTA
    // copy is already upper-case, so no `uppercase` here — that would shout twice.
    isLink ? "" : "v3-num font-medium tracking-[0.08em]",
    VARIANTS[variant],
    isLink ? "" : SIZES[size],
    full ? "w-full" : "",
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="text-base transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]" />
      )}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
