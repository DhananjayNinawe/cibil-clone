import Link from "next/link";

/**
 * Minimal inline markup for translation strings, so a sentence stays one key per
 * locale instead of being split into prefix/link/suffix triples:
 *   `**bold**`            → <strong>
 *   `[label](/href)`      → next/link (or <a target="_blank"> for http(s) URLs)
 *   lines starting `- `   → grouped into a <ul>
 */
const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE)) {
    const start = match.index;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    const [raw, bold, label, href] = match;
    if (bold) {
      nodes.push(
        <strong key={`${keyPrefix}-b${start}`} className="font-bold text-gray-900">
          {bold}
        </strong>,
      );
    } else if (/^https?:/.test(href)) {
      nodes.push(
        <a
          key={`${keyPrefix}-a${start}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 underline hover:text-[#0e5c80]"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={`${keyPrefix}-a${start}`} href={href} className="text-gray-700 underline hover:text-[#0e5c80]">
          {label}
        </Link>,
      );
    }
    cursor = start + raw.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function renderRichText(text: string): React.ReactNode {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-1 pl-5">
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

  return <>{blocks}</>;
}
