"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "@/components/icons";
import { useV2 } from "@/lib/v2/useV2";

interface VideoCardProps {
  videoId: string;
  /** Pre-translated — used as the thumbnail's alt, the play label and the iframe title. */
  title: string;
  /** V1's chosen thumbnail; falls back to YouTube's max-res still. */
  thumb?: string;
  className?: string;
}

/**
 * Click-to-play YouTube.
 *
 * Nothing from youtube.com is requested until the reader asks for it — no embed on load, no
 * cookies, no 800kB iframe per video on a page that carries five of them. The still is served
 * `unoptimized` for the same reason every other remote image in V2 is: next.config.ts is V1's
 * file and does not whitelist these hosts.
 */
export default function VideoCard({ videoId, title, thumb, className = "" }: VideoCardProps) {
  const { t } = useV2();
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`v2-rim relative aspect-video overflow-hidden rounded-[var(--v2-r-lg)] bg-[var(--v2-elev-1)] shadow-[var(--v2-shadow-2)] ${className}`}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${t("a11yPlayVideo")}: ${title}`}
          className="v2-focus group absolute inset-0 h-full w-full"
        >
          <Image
            src={thumb ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-transform duration-[900ms] ease-[var(--v2-ease)] group-hover:scale-[1.05]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[rgba(5,7,13,0.75)] via-transparent to-transparent"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md transition-all duration-500 ease-[var(--v2-ease)] group-hover:scale-110 group-hover:border-[var(--v2-cyan)] group-hover:bg-[rgba(0,176,240,0.28)] group-hover:shadow-[var(--v2-glow-cyan)]"
          >
            <PlayIcon className="ml-1 h-7 w-7 text-white" />
          </span>
        </button>
      )}
    </div>
  );
}
