"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PlayIcon } from "@/components/icons";
import CreditSidebarCard from "@/components/faq/CreditSidebarCard";

function VideoThumb({ id, thumb, title }: { id: string; thumb: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative w-full sm:w-80 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
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
      aria-label={`Play video: ${title}`}
      className="group relative w-full sm:w-80 aspect-video rounded-lg overflow-hidden bg-black shrink-0"
    >
      <Image
        src={thumb}
        alt={title}
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, 320px"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-11 w-16 items-center justify-center rounded-xl bg-red-600 transition-colors group-hover:bg-red-700">
          <PlayIcon className="ml-0.5 h-6 w-6 text-white" />
        </span>
      </span>
    </button>
  );
}

function VideoRow({
  id,
  thumb,
  title,
  children,
  sidebar,
}: {
  id: string;
  thumb: string;
  title: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-8 lg:flex-row">
      <VideoThumb id={id} thumb={thumb} title={title} />
      <div className="flex-1">
        <p className="mb-2 font-bold text-gray-900">{title}</p>
        <div className="space-y-2 text-sm leading-relaxed text-gray-700">{children}</div>
      </div>
      {sidebar && <div className="hidden lg:block">{sidebar}</div>}
    </div>
  );
}

export default function CavContent() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-2xl font-bold text-[#00b0f0] sm:text-3xl">{t("cavPageTitle")}</h1>

      <VideoRow
        id="qHU-uKKaRjs"
        thumb="https://i.ytimg.com/vi_webp/qHU-uKKaRjs/sddefault.webp"
        title={t("cavVideo1Title")}
        sidebar={<CreditSidebarCard variant="subscribe" />}
      >
        <p>{t("cavVideo1Para1")}</p>
        <p>{t("cavVideo1Para2")}</p>
      </VideoRow>

      <VideoRow
        id="mFu-N6oDHoI"
        thumb="https://i.ytimg.com/vi/mFu-N6oDHoI/sddefault.jpg"
        title={t("cavVideo2Title")}
      >
        <p>{t("cavVideo2Intro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t("cavVideo2Bullet1")}</li>
          <li>{t("cavVideo2Bullet2")}</li>
          <li>{t("cavVideo2Bullet3")}</li>
        </ul>
        <p>{t("cavVideo2Outro")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>

      <VideoRow
        id="7HpJpZi7q0U"
        thumb="https://i.ytimg.com/vi/7HpJpZi7q0U/sddefault.jpg"
        title={t("cavVideo3Title")}
      >
        <p className="italic">{t("cavVideo3Q")}</p>
        <p>{t("cavVideo3Body")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>

      <VideoRow
        id="i-gAj6XLvvE"
        thumb="https://i.ytimg.com/vi/i-gAj6XLvvE/sddefault.jpg"
        title={t("cavVideo4Title")}
      >
        <p className="italic">{t("cavVideo4Q")}</p>
        <p>{t("cavVideo4Intro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>{t("cavVideo4Bullet1")}</li>
          <li>{t("cavVideo4Bullet2")}</li>
          <li>{t("cavVideo4Bullet3")}</li>
        </ul>
        <p>{t("cavVideo4Outro")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>

      <VideoRow
        id="HuCJuXSSzH0"
        thumb="https://i.ytimg.com/vi/HuCJuXSSzH0/sddefault.jpg"
        title={t("cavVideo5Title")}
      >
        <p className="italic">{t("cavVideo5Q")}</p>
        <p>{t("cavVideo5Body")}</p>
        <p>{t("watchThisVideoLine")}</p>
      </VideoRow>
    </section>
  );
}
