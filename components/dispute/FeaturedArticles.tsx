"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

function ArticleCard({ title, image }: { title: string; image: string }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-5/2 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 text-2xl text-gray-900 leading-snug">{title}</h3>
      <p className="mt-3 text-sm text-gray-800">{t("blogLabel")}</p>
      <a href="#" className="mt-1 text-sm text-gray-900 hover:underline w-fit">
        {t("readMoreLink")}
      </a>
    </div>
  );
}

const ARTICLE1_IMAGE =
  "https://www.cibil.com/blog/a-guide-to-cibil-dispute-resolution-process/_jcr_content/teaserImage.coreimg.75.1440.png/1759906806692/disputeblog.png";
const ARTICLE2_IMAGE =
  "https://www.cibil.com/blog/what-is-cibil-score/_jcr_content/teaserImage.coreimg.75.1440.jpeg/1731994787562/what-is-cibil-scr.jpeg";

export default function FeaturedArticles() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div>
          <h2 className="text-2xl font-bold text-[#0a3a52]">{t("featuredArticlesHeading")}</h2>
          <p className="text-sm text-gray-600 mt-3 max-w-xs">{t("featuredArticlesDesc")}</p>
        </div>
        <ArticleCard title={t("disputeArticle1Title")} image={ARTICLE1_IMAGE} />
        <ArticleCard title={t("disputeArticle2Title")} image={ARTICLE2_IMAGE} />
      </div>
    </section>
  );
}
