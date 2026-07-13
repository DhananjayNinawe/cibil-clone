"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "@/components/v4/ui/Icons";
import { useV4 } from "@/lib/v4/useV4";

/**
 * A video, as a plane.
 *
 * It renders a thumbnail and loads the YouTube player only on click — a facade, not an embed. Five
 * iframes on the consumer-awareness page would pull roughly a megabyte of player JavaScript and set
 * tracking cookies before the reader has decided to watch anything; the poster frame is one image.
 * `youtube-nocookie` for the same reason once they *have* decided.
 *
 * The control is a real `<button>` whose accessible name is composed from two catalog strings — the
 * verb and the video's own title — so a screen-reader user is told what will play, not "button".
 * The poster carries `alt=""` because it is decorative: the button already has the name, and an
 * image announced *inside* a labelled button just says everything twice.
 */
export default function VideoPlate({
  id,
  thumb,
  title,
  className = "",
}: {
  /** The YouTube id. */
  id: string;
  thumb: string;
  /** Already translated. */
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const { t } = useV4();

  const frame = `relative aspect-video w-full overflow-hidden rounded-[var(--v4-r-md)] border border-[var(--v4-edge-2)] bg-[#000] ${className}`;

  if (playing) {
    return (
      <div className={frame}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${t("watchNowBtn")}: ${title}`}
      className={`group ${frame}`}
    >
      <Image
        src={thumb}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, 460px"
        className="object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        {/* A soft rectangle, not the red pill — V4 does not own YouTube's brand, and it does not
            wear another product's chrome inside its own plane. */}
        <span className="flex h-14 w-14 items-center justify-center rounded-[var(--v4-r-md)] border border-white/25 bg-[var(--v4-deep)]/85 text-white transition-transform duration-300 ease-[var(--v4-ease)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <PlayIcon size={26} />
        </span>
      </span>
    </button>
  );
}
