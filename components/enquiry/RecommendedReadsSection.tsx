"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PersonSilhouetteIcon } from "@/components/icons";

function ArticleCard({ title, excerpt, gradient }: { title: string; excerpt: string; gradient: string }) {
  const { t } = useLanguage();

  return (
    <div>
      <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
        <PersonSilhouetteIcon className="w-10 h-10 text-white/40" />
      </div>
      <p className="font-bold text-gray-900 leading-snug">{title}</p>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{excerpt}</p>
      <a href="#" className="text-sm text-blue-700 hover:underline font-medium mt-2 inline-block">
        {t("readMoreLink")}
      </a>
    </div>
  );
}

export default function RecommendedReadsSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-2xl font-bold text-gray-900">{t("recommendedReadsHeading")}</h2>
      <p className="text-sm text-gray-500 mt-2 max-w-xl">{t("featuredArticlesDesc")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
        <ArticleCard
          title={t("enquiryArticle1Title")}
          excerpt={t("enquiryArticle1Excerpt")}
          gradient="from-[#e8a35e] to-[#8a5a25]"
        />
        <ArticleCard
          title={t("enquiryArticle2Title")}
          excerpt={t("enquiryArticle2Excerpt")}
          gradient="from-[#5aa9c9] to-[#1c5d78]"
        />
        <ArticleCard
          title={t("disputeArticle1Title")}
          excerpt={t("disputeArticle1Excerpt")}
          gradient="from-[#e07a5f] to-[#0a3a52]"
        />
      </div>
    </section>
  );
}
