"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { PlayIcon, BellIcon, PersonSilhouetteIcon, ChevronDownIcon } from "@/components/icons";
import ScoreGauge from "@/components/home/ScoreGauge";

const FILTERS: TranslationKey[] = [
  "filterFeatured",
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

function ArticleCard({
  thumbnail,
  category,
  title,
}: {
  thumbnail: React.ReactNode;
  category: string;
  title: string;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-gray-100">{thumbnail}</div>
      <p className="text-xs font-semibold text-[#00b0f0] mt-3">{category}</p>
      <p className="text-sm font-semibold text-gray-800 mt-1 leading-snug">{title}</p>
    </div>
  );
}

export default function LearnAboutCredit() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<TranslationKey>("filterFeatured");

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t("learnHeadingPrefix")} <span className="text-[#00b0f0]">{t("learnHeadingBrand")}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl">{t("learnSubtitle")}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                  activeFilter === filter
                    ? "border-[#00b0f0] text-[#00b0f0] bg-[#e6f7fd]"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {t(filter)}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800">
            {t("allFormats")}
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <ArticleCard
              category={t("catVideoCreditAdvice")}
              title={t("articleCrashCourse")}
              thumbnail={
                <div className="relative w-full h-full bg-gradient-to-br from-[#5aa9c9] to-[#1c5d78] flex items-center justify-center">
                  <p className="absolute top-4 left-4 right-4 text-white font-bold text-lg leading-tight">
                    {t("scoreCardTitle")}
                  </p>
                  <button
                    aria-label="Play video"
                    className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                  >
                    <PlayIcon className="w-7 h-7 text-[#00b0f0] ml-0.5" />
                  </button>
                  <PersonSilhouetteIcon className="absolute -bottom-4 right-4 w-24 h-24 text-white/10" />
                </div>
              }
            />
          </div>

          <ArticleCard
            category={t("catBlogCreditAdvice")}
            title={t("articleAlertsTitle")}
            thumbnail={
              <div className="w-full h-full bg-gradient-to-br from-[#f5c518] to-[#e8b800] p-4 flex flex-col justify-between">
                <p className="text-xs font-bold text-gray-900 leading-snug">
                  {t("alertsCardTag")}
                  <br />
                  {t("alertsCardBrand")}
                </p>
                <BellIcon className="w-8 h-8 text-white self-end" />
              </div>
            }
          />

          <ArticleCard
            category={t("catBlogCreditAdvice")}
            title={t("articleBounceBackTitle")}
            thumbnail={
              <div className="w-full h-full bg-[#e6f7fd] flex items-center justify-center">
                <ScoreGauge score={480} size={120} />
              </div>
            }
          />

          <ArticleCard
            category={t("catBlogCreditAdvice")}
            title={t("articleBusinessAccessTitle")}
            thumbnail={
              <div className="w-full h-full bg-gradient-to-br from-[#f0a35e] to-[#c97a3a] flex items-center justify-center">
                <PersonSilhouetteIcon className="w-14 h-14 text-white/40" />
              </div>
            }
          />

          <ArticleCard
            category={t("catBlogNewToCredit")}
            title={t("articleFirstTimeTitle")}
            thumbnail={
              <div className="w-full h-full bg-gradient-to-br from-[#7fb88f] to-[#3f7a5a] flex items-center justify-center">
                <PersonSilhouetteIcon className="w-14 h-14 text-white/40" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
