"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

function QaBlock({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-3">{q}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PpContent() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
      <div>
        <QaBlock q={t("ppQ1")}>
          <p>
            {t("ppA1Prefix")}{" "}
            <a href="#" className="text-blue-700 hover:underline">
              {t("ppA1Link")}
            </a>{" "}
            {t("ppA1Suffix")}
          </p>
        </QaBlock>

        <QaBlock q={t("ppQ2")}>
          <p>{t("ppA2")}</p>
          <div className="mt-4">
            <Image
              src="https://www.cibil.com/faq/purchase-post-purchase-help/_jcr_content/root/contentcontainer/pagesection/columnrow/contentcontainer_1786931170/image.coreimg.jpeg/1680548740381/purchase-post-01.jpeg"
              alt={t("ppRefreshCenter")}
              width={520}
              height={360}
              unoptimized
              className="h-auto w-full max-w-130"
            />
          </div>
          <p className="mt-4">
            <a href="/login" className="text-blue-700 hover:underline">
              {t("ppLoginMyCibil")}
            </a>
          </p>
        </QaBlock>

        <QaBlock q={t("ppQ3")}>
          <p>{t("ppA3Para1")}</p>
          <p>{t("ppA3Para2")}</p>
        </QaBlock>

        <QaBlock q={t("ppQ4")}>
          <p>
            {t("ppA4Prefix")}{" "}
            <a href="#" className="text-blue-700 hover:underline">
              {t("ppA4Link")}
            </a>{" "}
            {t("ppA4Suffix")}
          </p>
        </QaBlock>
      </div>

      <div className="flex justify-center lg:justify-end">
        <CreditSidebarCard variant="subscribe" />
      </div>
    </section>
  );
}
