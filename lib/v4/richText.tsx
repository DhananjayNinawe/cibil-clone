import Link from "next/link";
import { ExternalIcon } from "@/components/v4/ui/Icons";
import { toV4 } from "@/lib/v4/routes";

/**
 * V4's renderer for the inline markup used by the locale-keyed document modules
 * (`lib/legalPageData`, `lib/privacyPolicyData`, `lib/gistRbiSchemeData`, `lib/footerPageData`):
 *
 *   `**bold**`          → <strong>
 *   `[label](href)`     → a link
 *   lines starting `- ` → grouped into a <ul>
 *
 * V1 has its own (`lib/richText.tsx`) and V4 cannot use it, for two reasons that are not cosmetic:
 *
 *   1. It hard-codes V1's palette on every node it emits (`text-gray-900`, `text-gray-700`). Inside
 *      a V4 night band that is grey ink on a dark canvas — a legal document rendered illegible.
 *      Everything here is emitted *unclassed*, so `.v4-prose` styles it: the prose block owns the
 *      measure, the leading, the bullet, the link colour and the mono list marker, and it re-points
 *      itself with the tone like every other V4 surface.
 *   2. Its internal links leave V4 (`/contact-us`, not `/v4/contact-us`). Every internal href here
 *      goes through `toV4()`, so a reader following a cross-reference out of the Terms stays inside
 *      the version they are reading.
 *
 * The document text itself is never touched: this parses markup and prints what it finds. Not one
 * clause is reworded, reordered or summarised on the way through.
 */
const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

interface Options {
  /**
   * The translated "opens in a new tab" string (`t4("v4OpensInNewTab")`).
   *
   * A caller passes it rather than the renderer resolving it, because this is a plain function and
   * cannot hold a hook — and it is announced, not merely drawn, because an unannounced new tab is a
   * change of context without warning (WCAG 3.2.5).
   */
  newTabLabel?: string;
}

function renderInline(text: string, keyPrefix: string, opts: Options): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE)) {
    const start = match.index;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    const [raw, bold, label, href] = match;
    if (bold) {
      nodes.push(<strong key={`${keyPrefix}-b${start}`}>{bold}</strong>);
    } else if (/^(https?:|mailto:|tel:)/.test(href)) {
      nodes.push(
        <a
          key={`${keyPrefix}-a${start}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-1"
        >
          {label}
          <ExternalIcon size={13} className="translate-y-[1px]" aria-hidden="true" />
          {opts.newTabLabel ? <span className="v4-sr">{opts.newTabLabel}</span> : null}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={`${keyPrefix}-a${start}`} href={toV4(href)}>
          {label}
        </Link>,
      );
    }
    cursor = start + raw.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/**
 * Returns a fragment of block elements — `<p>` and `<ul>` — and nothing else. The fragment is
 * transparent to the DOM, so those blocks land as *direct* children of the `.v4-prose` wrapper the
 * caller puts around them, which is what makes `.v4-prose > * + *` (the paragraph rhythm) apply.
 */
export function renderV4RichText(text: string, opts: Options = {}): React.ReactNode {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {items.map((item, i) => (
          <li key={i}>{renderInline(item, `ul${blocks.length}-${i}`, opts)}</li>
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
    if (line.trim()) blocks.push(<p key={`p-${i}`}>{renderInline(line, `p${i}`, opts)}</p>);
  }
  flushBullets();

  return <>{blocks}</>;
}
