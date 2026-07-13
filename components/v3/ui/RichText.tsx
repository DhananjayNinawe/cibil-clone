import Link from "next/link";
import type { ReactNode } from "react";
import { toV3 } from "@/lib/v3/routes";

/**
 * V3's renderer for the catalog's inline markup.
 *
 * Several strings in V1's catalog carry their own markup so a sentence stays one key per locale
 * instead of being split into prefix/link/suffix triples:
 *
 *   `**bold**`        → <strong>
 *   `[label](/href)`  → a link
 *   lines from `- `   → a list
 *
 * `lib/richText.tsx` already renders exactly this grammar, and V3 would happily import it but for
 * one thing: it emits V1's own hrefs (`/register`, `/nodal-officer-list`) and V1's grey palette.
 * A reader who followed a link out of a V3 FAQ answer would land in V1 mid-journey. So the parsing
 * rules are the same and the routing is not — every internal href goes through `toV3()`, and no
 * colour is set here at all: `.v3-prose` (v3.css) styles the strong, the link and the list, which
 * is what lets the same copy sit on paper or on an ink band without knowing which.
 */
const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE)) {
    const start = match.index;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    const [raw, bold, label, href] = match;
    if (bold) {
      nodes.push(<strong key={`${keyPrefix}-b${start}`}>{bold}</strong>);
    } else if (/^https?:/.test(href)) {
      nodes.push(
        <a
          key={`${keyPrefix}-a${start}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="v3-focus"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={`${keyPrefix}-a${start}`} href={toV3(href)} className="v3-focus">
          {label}
        </Link>,
      );
    }
    cursor = start + raw.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/** Pre-translated copy. Pass `t("key")` — never a literal. */
export default function RichText({ text, className = "" }: { text: string; className?: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {items.map((item, i) => (
          <li key={i}>{renderInline(item, `ul${blocks.length}-${i}`)}</li>
        ))}
      </ul>,
    );
  };

  for (const [i, line] of text.split("\n").entries()) {
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
      continue;
    }
    flushBullets();
    if (line.trim()) blocks.push(<p key={`p-${i}`}>{renderInline(line, `p${i}`)}</p>);
  }
  flushBullets();

  return <div className={`v3-prose ${className}`}>{blocks}</div>;
}
