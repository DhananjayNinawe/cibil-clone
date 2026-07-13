"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BlogCard } from "@/lib/blogCards";
import { TranslationKey } from "@/lib/i18n";

/**
 * Shared Knowledge Center blog-listing layout: hero band + image, "Topics" grid of blog cards,
 * teal subscribe banner, and the legal disclaimer. Card titles are passed in as plain strings (article names)
 * — see the README note on why these aren't in the i18n system.
 *
 * Hero and card artwork are both optional: without them, the band and tiles fall back to the gradient.
 */
export interface BlogGridProps {
  titleKey: TranslationKey;
  /** Artwork filling the right half of the hero band; falls back to `gradient` when absent. */
  heroImage?: string;
  gradient?: string;
  /** Label used for each card's link (e.g. "BLOG POST" vs "READ MORE"). */
  ctaKey?: TranslationKey;
  cards: BlogCard[];
}

export default function BlogGrid({
  titleKey,
  heroImage,
  gradient = "from-[#8fd0ea] to-[#3a7a9a]",
  ctaKey = "blogPostLink",
  cards,
}: BlogGridProps) {
  const { t } = useLanguage();

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
        <div className="flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-16">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 text-center">{t(titleKey)}</h1>
        </div>
        <div
          className={`relative w-full h-full min-h-60 overflow-hidden ${
            heroImage ? "lg:min-h-0 lg:aspect-1440/460" : `bg-gradient-to-br ${gradient}`
          }`}
        >
          {heroImage && (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-right"
            />
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-10">{t("topicsHeading")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {cards.map((card, i) => {
            const title = typeof card === "string" ? card : card.title;
            const image = typeof card === "string" ? null : card.image;

            return (
              <article key={`${title}-${i}`} className="flex flex-col">
                <div className="relative w-full aspect-[16/7] rounded overflow-hidden bg-gradient-to-br from-[#cdeffb] to-[#8fd0ea] mb-3">
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{t("blogTag")}</p>
                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">{title}</p>
                <Link href="#" className="text-xs font-bold text-[#00b0f0] hover:underline mt-2 inline-flex items-center gap-1">
                  {t(ctaKey)} <span aria-hidden>›</span>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#0e5063] rounded flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
          <p className="text-white font-medium">{t("blogSubscribeBanner")}</p>
          <Link
            href="/choose-subscription"
            className="bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors shrink-0"
          >
            {t("sidebarSubscribeNowBtn")}
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-xs text-gray-500 leading-relaxed">{t("blogDisclaimer")}</p>
      </div>
    </>
  );
}
