"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";
import { useSpotlight } from "@/lib/v2/motion";

export type KnowledgeCardSize = "lead" | "wide" | "default";

interface KnowledgeCardProps {
  /** Pre-translated headline. Doubles as the artwork's alt text — the art has no other label. */
  title: string;
  /** Pre-translated kicker: "BLOG", "Video", "Chapter 1". */
  eyebrow: string;
  /** Pre-translated call to action: "BLOG POST", "READ MORE", "Read Now". */
  cta?: string;
  /** Teaser artwork. Cards without one fall back to a typographic tile — V1 falls back to a gradient. */
  image?: string;
  href?: string;
  /** Absolute URL (a cibil.com article, a YouTube watch page): opens in a new tab. */
  external?: boolean;
  /** Play affordance over the art. */
  video?: boolean;
  /** Pre-translated label for the play affordance; without it the glyph is decorative. */
  videoLabel?: string;
  size?: KnowledgeCardSize;
  /** Editorial index printed on the typographic fallback tile. A numeral, so it is not translated. */
  index?: number;
  className?: string;
}

const ART: Record<KnowledgeCardSize, string> = {
  lead: "aspect-16/10 lg:aspect-auto lg:h-full",
  wide: "aspect-21/9",
  default: "aspect-16/10",
};

const TITLE: Record<KnowledgeCardSize, string> = {
  lead: "text-2xl sm:text-3xl lg:text-[2.1rem] lg:leading-[1.15]",
  wide: "text-lg sm:text-xl",
  default: "text-[15px] sm:text-base",
};

/**
 * The Knowledge Center card.
 *
 * Two things V1's tile could not do, and the reason this is not `ui/ArticleCard`: roughly half
 * of `lib/blogCards.ts` ships no teaser image (V1 drops those on a flat gradient), and every
 * card carries a worded CTA rather than a bare arrow. So the art is optional — a missing image
 * becomes a typographic plate with the story's index, which reads as a designed choice instead
 * of a hole — and the CTA is a real, translated line.
 *
 * Remote art is `unoptimized`: next.config.ts (V1's file) whitelists only some cibil.com paths
 * and the optimizer rejects the rest.
 */
export default function KnowledgeCard({
  title,
  eyebrow,
  cta,
  image,
  href,
  external = false,
  video = false,
  videoLabel,
  size = "default",
  index,
  className = "",
}: KnowledgeCardProps) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();
  const lead = size === "lead";

  const body = (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className={`v2-spotlight v2-rim group relative flex h-full overflow-hidden rounded-[var(--v2-r-lg)] bg-[var(--v2-surface)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--v2-ease)] ${
        href ? "hover:-translate-y-1.5 hover:shadow-[var(--v2-shadow-3)]" : ""
      } ${lead ? "flex-col lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "flex-col"} ${className}`}
    >
      {/* The art sits behind a mask: the frame is fixed, the picture scales inside it. */}
      <div className={`relative overflow-hidden bg-[var(--v2-elev-1)] ${ART[size]}`}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            sizes={
              lead
                ? "(max-width: 1024px) 100vw, 58vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-[1.06]"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0a3a52] via-[#0b1220] to-[#05070d]"
          >
            <span className="v2-grid-lines" />
            <span className="font-light leading-none tracking-tight text-white/10 tabular-nums text-[clamp(3.5rem,9vw,7rem)] transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-110">
              {String((index ?? 0) + 1).padStart(2, "0")}
            </span>
          </span>
        )}

        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-[rgba(5,7,13,0.8)] via-[rgba(5,7,13,0.08)] to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
        />

        {video && (
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 backdrop-blur-md transition-all duration-500 ease-[var(--v2-ease)] group-hover:scale-110 group-hover:border-[var(--v2-cyan)] group-hover:bg-[rgba(0,176,240,0.25)]"
          >
            <PlayIcon className="ml-0.5 h-6 w-6 text-white" />
          </span>
        )}
        {video && videoLabel && <span className="sr-only">{videoLabel}</span>}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${lead ? "justify-center sm:p-9" : ""}`}>
        <p className="v2-eyebrow text-[var(--v2-cyan)]">{eyebrow}</p>

        <h3
          className={`mt-3 font-bold leading-snug text-[var(--v2-text)] transition-colors duration-300 group-hover:text-[var(--v2-cyan-soft)] ${TITLE[size]} ${
            lead ? "font-light tracking-tight" : ""
          }`}
        >
          {title}
        </h3>

        {cta && (
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v2-cyan)]">
            <span className="v2-underline">{cta}</span>
            <ArrowRightIcon
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--v2-ease)] group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </article>
  );

  if (!href) return body;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="v2-focus block h-full rounded-[var(--v2-r-lg)]"
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className="v2-focus block h-full rounded-[var(--v2-r-lg)]">
      {body}
    </Link>
  );
}
