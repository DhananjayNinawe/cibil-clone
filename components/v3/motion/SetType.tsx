"use client";

import { Fragment, type ReactNode } from "react";
import { useInView } from "@/lib/v3/motion";

interface SetTypeProps {
  /** Pre-translated lines. Pass `t("key")` — never a literal. */
  lines: ReactNode[];
  /** Milliseconds before the first line rises. */
  delay?: number;
  /** Milliseconds between lines. */
  stagger?: number;
  className?: string;
}

/**
 * A headline set line by line: each line sits in an overflow-hidden box and rises into it,
 * one after the next, like type being composed into a forme.
 *
 * Line-by-line, not word-by-word (which is what V2 does): at V3's display sizes a headline is
 * only two or three lines, and animating 30 individual words turns a calm masthead into
 * confetti. Whole lines keep the rhythm of reading intact.
 *
 * Accessibility: the caller passes real text, and the wrapper spans carry no ARIA — a screen
 * reader reads the heading exactly as written, in order. Under reduced motion the lines are
 * already in place (v3.css), so nothing rises at all.
 */
export default function SetType({ lines, delay = 0, stagger = 90, className = "" }: SetTypeProps) {
  const { ref } = useInView<HTMLSpanElement>();

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span
            className="v3-line"
            style={{ "--v3-line-delay": `${delay + i * stagger}ms` } as React.CSSProperties}
          >
            <span>{line}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
