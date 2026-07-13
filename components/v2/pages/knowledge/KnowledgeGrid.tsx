"use client";

import type { BlogCard } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import Reveal from "@/components/v2/motion/Reveal";
import KnowledgeCard from "@/components/v2/pages/knowledge/KnowledgeCard";

interface KnowledgeGridProps {
  cards: BlogCard[];
  /** "BLOG POST" or "READ MORE" — V1 picks one per listing page. */
  ctaKey?: TranslationKey;
  /** Kicker above each headline. V1 prints "BLOG" on every tile. */
  eyebrowKey?: TranslationKey;
  /** Promotes the first card to an oversized, full-width lead story. */
  lead?: boolean;
  /** Where a card sends the reader. See the note on the destination below. */
  href: string;
  className?: string;
}

/**
 * The Knowledge Center grid — one component, five listing pages.
 *
 * The rhythm is the point. V1 repeats a 3-up of identical tiles for sixty articles; here the
 * cards ride a twelve-column grid on a seven-card cycle (6·6 / 4·4·4 / 8·4), so every screenful
 * lands a different shape and the page reads as a spread rather than a table. The cycle closes
 * on a multiple of twelve, so no row is ever left ragged.
 *
 * **Destination.** V1's tiles link to `"#"` — the articles themselves live on cibil.com and were
 * never ported. A link to nowhere is not an option here (it is a broken link for anyone on a
 * keyboard or a screen reader), and inventing article routes would be inventing content, so every
 * card carries V1's own CTA wording to the blog hub, which is a real page in this tree.
 */
const SPANS = [6, 6, 4, 4, 4, 8, 4] as const;

const SPAN_CLASS: Record<number, string> = {
  4: "lg:col-span-4",
  6: "lg:col-span-6",
  8: "lg:col-span-8",
};

/**
 * Short lists get their own shape rather than the head of the long cycle: two cards read as a
 * spread, three as a row, four as a quartet. Only a real backlog earns the seven-card rhythm.
 */
function spansFor(count: number): readonly number[] {
  if (count <= 2) return [6, 6];
  if (count === 3) return [4, 4, 4];
  if (count === 4) return [6, 6, 6, 6];
  return SPANS;
}

export default function KnowledgeGrid({
  cards,
  ctaKey = "blogPostLink",
  eyebrowKey = "blogTag",
  lead = false,
  href,
  className = "",
}: KnowledgeGridProps) {
  const { t, language } = useV2();

  if (cards.length === 0) return null;

  const [first, ...others] = cards;
  const rest = lead ? others : cards;
  const offset = lead ? 1 : 0;

  const cta = t(ctaKey);
  const eyebrow = t(eyebrowKey);

  return (
    <div className={className}>
      {lead && (
        <Reveal variant="blur" className="mb-6">
          <KnowledgeCard
            title={first.title[language]}
            eyebrow={eyebrow}
            cta={cta}
            image={first.image}
            href={href}
            size="lead"
            index={0}
          />
        </Reveal>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
        {rest.map((card, index) => {
          const spans = spansFor(rest.length);
          const span = spans[index % spans.length];
          return (
            <Reveal
              key={`${card.title.en}-${index}`}
              variant="up"
              delay={(index % 3) * 90}
              className={`${SPAN_CLASS[span]} h-full`}
            >
              <KnowledgeCard
                title={card.title[language]}
                eyebrow={eyebrow}
                cta={cta}
                image={card.image}
                href={href}
                size={span >= 8 ? "wide" : "default"}
                index={index + offset}
              />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
