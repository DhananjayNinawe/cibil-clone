import type { ReactNode } from "react";

/**
 * Long-form copy — terms, policies, RBI schemes, regulatory disclosures.
 *
 * All the styling lives in `.v3-prose` (v3.css), where the document is set to a measure, ruled
 * between sections, and given decimal-leading-zero ordered lists. `full` drops the measure for
 * the rare block that has to hold a wide table.
 */
export default function Prose({
  children,
  full = false,
  className = "",
}: {
  children: ReactNode;
  full?: boolean;
  className?: string;
}) {
  return (
    <div className={`v3-prose ${full ? "max-w-none" : ""} ${className}`}>{children}</div>
  );
}
