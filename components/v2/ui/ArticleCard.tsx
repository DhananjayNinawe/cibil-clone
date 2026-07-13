"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";
import { useSpotlight } from "@/lib/v2/motion";

interface ArticleCardProps {
  /** Pre-translated. Also used as the image's alt text — these cards are the image's only label. */
  title: string;
  /** Pre-translated "Video / Credit Advice"-style kicker. */
  category?: string;
  image: string;
  href?: string;
  /** Overlays a play affordance. Pre-translated label for assistive tech. */
  video?: boolean;
  videoLabel?: string;
  /** `hero` fills its column and sets the title at display size. */
  variant?: "default" | "hero" | "wide";
  className?: string;
}

/**
 * Editorial card for articles and videos.
 *
 * Remote art is served straight from cibil.com with `unoptimized`: only some of its paths
 * are whitelisted in next.config.ts `remotePatterns`, and the optimizer rejects the rest —
 * V1 hits the same wall and does the same thing. next.config.ts belongs to V1, so V2 cannot
 * widen the allowlist.
 */
export default function ArticleCard({
  title,
  category,
  image,
  href,
  video = false,
  videoLabel,
  variant = "default",
  className = "",
}: ArticleCardProps) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();
  const hero = variant === "hero";

  const body = (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`v2-spotlight group relative flex h-full flex-col overflow-hidden rounded-[var(--v2-r-lg)] border border-[var(--v2-line)] bg-[var(--v2-surface)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--v2-ease)] ${
        href ? "hover:-translate-y-1.5 hover:border-[rgba(0,176,240,0.4)] hover:shadow-[var(--v2-shadow-3)]" : ""
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden bg-[var(--v2-elev-1)] ${
          hero ? "aspect-4/3 lg:aspect-auto lg:flex-1" : variant === "wide" ? "aspect-21/9" : "aspect-video"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          sizes={hero ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className="object-cover transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-[1.06]"
        />
        {/* Scrim: the titles below sit on the art at hero size, and remote thumbnails are
            unpredictably bright. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-[rgba(5,7,13,0.85)] via-[rgba(5,7,13,0.1)] to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
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

      <div className={`flex flex-1 flex-col p-6 ${hero ? "sm:p-7" : ""}`}>
        {category && (
          <p className="v2-eyebrow text-[var(--v2-cyan)]">{category}</p>
        )}
        <h3
          className={`mt-3 font-bold leading-snug text-[var(--v2-text)] transition-colors duration-300 group-hover:text-[var(--v2-cyan-soft)] ${
            hero ? "text-xl sm:text-2xl" : "text-[15px]"
          }`}
        >
          {title}
        </h3>

        {href && (
          <span
            aria-hidden
            className="mt-auto flex items-center gap-2 pt-5 text-[var(--v2-cyan)] opacity-0 transition-all duration-500 ease-[var(--v2-ease)] group-hover:opacity-100"
          >
            <ArrowRightIcon className="h-4 w-4 -translate-x-2 transition-transform duration-500 group-hover:translate-x-0" />
          </span>
        )}
      </div>
    </div>
  );

  if (!href) return body;

  return (
    <Link href={href} className="v2-focus block h-full rounded-[var(--v2-r-lg)]">
      {body}
    </Link>
  );
}
