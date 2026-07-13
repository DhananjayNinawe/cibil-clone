"use client";

import type { ElementType } from "react";
import { useInView } from "@/lib/v2/motion";

interface SplitTextProps {
  /** Already translated — pass `t("someKey")`, never a literal. */
  text: string;
  as?: ElementType;
  className?: string;
  /** Milliseconds before the first word lifts. */
  delay?: number;
  /** Milliseconds between consecutive words. */
  stagger?: number;
}

/**
 * Headline that lifts word by word from behind a mask.
 *
 * Splits on whitespace only — never on characters. Devanagari and Tamil are rendered with
 * combining marks and ligatures; slicing a word into per-character spans would break the
 * shaping and produce visibly wrong text in three of the four languages this site ships.
 *
 * The words stay in one text node per word, so screen readers still announce the sentence
 * normally; only the transform is per-word.
 */
export default function SplitText({
  text,
  as,
  className = "",
  delay = 0,
  stagger = 55,
}: SplitTextProps) {
  const Tag: ElementType = as ?? "span";
  const { ref } = useInView<HTMLElement>();
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="v2-word"
          style={{ "--v2-word-delay": `${delay + index * stagger}ms` } as React.CSSProperties}
        >
          <span>{word}</span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
