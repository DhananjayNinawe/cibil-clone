"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PersonSilhouetteIcon } from "@/components/icons";

function ArticleCard({ title, gradient }: { title: string; gradient: string }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className={`w-full sm:w-40 h-28 rounded-lg shrink-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <PersonSilhouetteIcon className="w-10 h-10 text-white/40" />
      </div>
      <div>
        <p className="text-xs font-semibold text-[#00b0f0] mb-1">{t("blogLabel")}</p>
        <p className="font-bold text-gray-900 leading-snug">{title}</p>
        <a href="#" className="text-sm text-blue-700 hover:underline font-medium mt-2 inline-block">
          {t("readMoreLink")}
        </a>
      </div>
    </div>
  );
}

export default function FeaturedArticles() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold text-gray-900">{t("featuredArticlesHeading")}</h2>
      <p className="text-sm text-gray-500 mt-2 max-w-xl">{t("featuredArticlesDesc")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
        <ArticleCard title={t("disputeArticle1Title")} gradient="from-[#5aa9c9] to-[#1c5d78]" />
        <ArticleCard title={t("disputeArticle2Title")} gradient="from-[#e07a5f] to-[#0a3a52]" />
      </div>
    </section>
  );
}
