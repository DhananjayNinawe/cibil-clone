"use client";

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useInView } from "@/lib/v2/motion";

export type RevealVariant = "up" | "fade" | "blur" | "scale" | "mask" | "left" | "right";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Renders as this element — use it to keep semantics (`section`, `li`, `h2`) intact. */
  as?: ElementType;
  variant?: RevealVariant;
  /** Milliseconds. Stagger a list by passing `index * 80`. */
  delay?: number;
  /** Re-animate whenever the element re-enters the viewport. Off by default. */
  repeat?: boolean;
  children: ReactNode;
}

/**
 * Scroll-triggered entrance. The hidden state lives in CSS behind `.v2-js` (see v2.css),
 * so a reader without JavaScript gets the content immediately rather than a blank page.
 */
export default function Reveal({
  as,
  variant = "up",
  delay = 0,
  repeat = false,
  className = "",
  style,
  children,
  ...rest
}: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const { ref } = useInView<HTMLElement>({ once: !repeat });

  return (
    <Tag
      ref={ref}
      className={`v2-reveal v2-reveal-${variant} ${className}`}
      style={{ ...style, "--v2-reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
