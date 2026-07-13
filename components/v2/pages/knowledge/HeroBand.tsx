"use client";

import Image from "next/image";
import Parallax from "@/components/v2/motion/Parallax";

/**
 * Full-bleed cinemascope band for the listing pages whose V1 hero shipped a photograph.
 *
 * The picture is decorative — the headline above it already says what the page is — so it takes an
 * empty `alt` rather than a restated one, which is what a screen reader wants. It drifts against
 * the scroll and both edges dissolve into the canvas, so it reads as a horizon rather than a
 * pasted-in banner. `unoptimized` because next.config.ts (V1's) does not whitelist these paths.
 */
export default function HeroBand({ src }: { src: string }) {
  return (
    <div className="relative -mt-10 h-[38vh] min-h-64 overflow-hidden sm:h-[46vh]">
      <Parallax speed={-0.12} className="absolute inset-x-0 -top-16 bottom-[-4rem]">
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
        </div>
      </Parallax>

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-[var(--v2-bg)] via-transparent to-[var(--v2-bg)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-[var(--v2-bg)] via-transparent to-[var(--v2-bg)]"
      />
    </div>
  );
}
