import type { ElementType, ReactNode } from "react";

/**
 * Long-form reading surface for policy, legal and FAQ copy — the styling lives in `.v2-prose`
 * (v2.css) so nested rich text (from lib/richText.tsx or a data file) is styled without every
 * caller having to thread classes through.
 */
export default function Prose({
  children,
  as,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={`v2-prose ${className}`}>{children}</Tag>;
}
