"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

function ArticleCard({ title, excerpt, image }: { title: string; excerpt: string; image: string }) {
  const { t } = useLanguage();

  return (
    <div>
      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 mb-4">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <p className="font-bold text-gray-900 leading-snug">{title}</p>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{excerpt}</p>
      <a href="#" className="text-sm text-blue-700 hover:underline font-medium mt-2 inline-block">
        {t("readMoreLink")}
      </a>
    </div>
  );
}

const BLOG_1 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-1.png";
const BLOG_2 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blog-2.png";
const BLOG_3 = "https://www.cibil.com/content/dam/cibil/consumer/enq26/blob%203.png";

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
          image={BLOG_1}
        />
        <ArticleCard
          title={t("enquiryArticle2Title")}
          excerpt={t("enquiryArticle2Excerpt")}
          image={BLOG_2}
        />
        <ArticleCard
          title={t("disputeArticle1Title")}
          excerpt={t("disputeArticle1Excerpt")}
          image={BLOG_3}
        />
      </div>
    </section>
  );
}
