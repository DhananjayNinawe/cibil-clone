"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PlayIcon } from "@/components/icons";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

function VideoThumb() {
  return (
    <div className="relative w-full sm:w-80 h-44 rounded-lg overflow-hidden bg-gradient-to-br from-[#3a7a9a] to-[#1c4a5a] shrink-0 flex items-center justify-center">
      <button aria-label="Play video" className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
        <PlayIcon className="w-7 h-7 text-red-600 ml-0.5" />
      </button>
    </div>
  );
}

function VideoRow({ title, children, sidebar }: { title: string; children: React.ReactNode; sidebar?: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mb-12">
      <VideoThumb />
      <div className="flex-1">
        <p className="font-bold text-gray-900 mb-2">{title}</p>
        <div className="text-sm text-gray-700 leading-relaxed space-y-2">{children}</div>
      </div>
      {sidebar && <div className="hidden lg:block">{sidebar}</div>}
    </div>
  );
}

export default function CavContent() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#00b0f0] mb-12">{t("cavPageTitle")}</h1>

      <VideoRow title={t("cavVideo1Title")} sidebar={<CreditSidebarCard variant="subscribe" />}>
        <p>{t("cavVideo1Para1")}</p>
        <p>{t("cavVideo1Para2")}</p>
      </VideoRow>

      <VideoRow title={t("cavVideo2Title")}>
        <p>{t("cavVideo2Intro")}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("cavVideo2Bullet1")}</li>
          <li>{t("cavVideo2Bullet2")}</li>
          <li>{t("cavVideo2Bullet3")}</li>
        </ul>
        <p>{t("cavVideo2Outro")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>

      <VideoRow title={t("cavVideo3Title")}>
        <p className="italic">{t("cavVideo3Q")}</p>
        <p>{t("cavVideo3Body")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>

      <VideoRow title={t("cavVideo4Title")}>
        <p className="italic">{t("cavVideo4Q")}</p>
        <p>{t("cavVideo4Intro")}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("cavVideo4Bullet1")}</li>
          <li>{t("cavVideo4Bullet2")}</li>
          <li>{t("cavVideo4Bullet3")}</li>
        </ul>
        <p>{t("cavVideo4Outro")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>

      <VideoRow title={t("cavVideo5Title")}>
        <p className="italic">{t("cavVideo5Q")}</p>
        <p>{t("cavVideo5Body")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>
    </section>
  );
}
