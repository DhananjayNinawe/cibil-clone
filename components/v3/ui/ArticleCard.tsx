"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "@/components/v3/ui/Icons";

interface ArticleCardProps {
  /** Pre-translated. */
  title: string;
  /** Pre-translated category label. */
  category?: string;
  image?: string;
  href?: string;
  video?: boolean;
  /** The lead item of a collection — set at editorial scale, image above a large headline. */
  lead?: boolean;
  className?: string;
}

/**
 * An entry in the library.
 *
 * Not a card: there is no box, no border and no fill. What holds it together is a rule above the
 * headline and a plate beneath — exactly how a newspaper sets a story. On hover the headline
 * takes its underline and the plate's image scales a whisper (1.03) inside its fixed frame; the
 * frame itself never moves, which is what keeps a grid of these from feeling like a lava lamp.
 *
 * Falls back to a ruled paper block when an entry has no artwork, so a missing thumbnail is a
 * quiet gap rather than a broken image.
 */
export default function ArticleCard({
  title,
  category,
  image,
  href,
  video = false,
  lead = false,
  className = "",
}: ArticleCardProps) {
  const body = (
    <>
      <div
        className={`v3-plate v3-plate-mount relative w-full overflow-hidden ${
          lead ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            unoptimized
            sizes={lead ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--v3-paper-3)]" />
        )}

        {video && (
          <span className="absolute bottom-0 left-0 flex items-center gap-2 bg-[var(--v3-ink)] px-3 py-2 text-[var(--v3-paper)]">
            <Play className="text-sm" />
          </span>
        )}
      </div>

      <div className="mt-5 border-t border-[var(--v3-line-2)] pt-4">
        {category && <p className="v3-folio mb-3">{category}</p>}

        <h3
          className={`text-pretty ${
            lead ? "v3-h3" : "text-base leading-snug font-medium"
          } text-[var(--v3-fg)]`}
        >
          <span className="v3-link-draw">{title}</span>
          {href && (
            <ArrowUpRight
              aria-hidden
              className="ml-1.5 inline-block align-baseline text-xs text-[var(--v3-fg-3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
        </h3>
      </div>
    </>
  );

  if (!href) {
    return <article className={`group ${className}`}>{body}</article>;
  }

  return (
    <article className={`group ${className}`}>
      <Link href={href} className="v3-focus block">
        {body}
      </Link>
    </article>
  );
}
