"use client";

import { useInView } from "@/lib/v3/motion";

interface RuleProps {
  /** The heavier weight, for a rule that closes a section rather than divides one. */
  strong?: boolean;
  /** Skip the draw-in — for rules inside an overlay or a table, where scroll reveal is wrong. */
  still?: boolean;
  className?: string;
}

/**
 * The hairline — the most-used object in V3, and the one that carries its signature gesture:
 * a rule is *drawn* from its left edge as it comes into view.
 *
 * It has to be a client component to hold the observer. A bare `<hr>` with the reveal classes on
 * it would sit at `scaleX(0)` forever, because nothing would ever add `is-set` — an invisible
 * divider is worse than no animation at all, so the ref lives here.
 */
export default function Rule({ strong = false, still = false, className = "" }: RuleProps) {
  const { ref } = useInView<HTMLHRElement>();

  if (still) {
    return <hr className={`v3-rule ${strong ? "v3-rule-strong" : ""} ${className}`} />;
  }

  return (
    <hr
      ref={ref}
      className={`v3-rule ${strong ? "v3-rule-strong" : ""} v3-reveal v3-reveal-rule ${className}`}
    />
  );
}
