"use client";

import type { ReactNode } from "react";
import { useV2 } from "@/lib/v2/useV2";
import FaqLayout from "@/components/v2/pages/faq/FaqLayout";
import VideoCard from "@/components/v2/pages/faq/VideoCard";
import Prose from "@/components/v2/ui/Prose";
import { Divider } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";

/**
 * The five consumer-awareness films, with V1's own thumbnails where it pinned one.
 * The copy for each is assembled in `body()` below — same paragraphs, same bullets, same order.
 */
const VIDEOS = [
  { id: "qHU-uKKaRjs", thumb: "https://i.ytimg.com/vi_webp/qHU-uKKaRjs/sddefault.webp" },
  { id: "mFu-N6oDHoI", thumb: "https://i.ytimg.com/vi/mFu-N6oDHoI/sddefault.jpg" },
  { id: "7HpJpZi7q0U", thumb: "https://i.ytimg.com/vi/7HpJpZi7q0U/sddefault.jpg" },
  { id: "i-gAj6XLvvE", thumb: "https://i.ytimg.com/vi/i-gAj6XLvvE/sddefault.jpg" },
  { id: "HuCJuXSSzH0", thumb: "https://i.ytimg.com/vi/HuCJuXSSzH0/sddefault.jpg" },
];

export default function ConsumerAwarenessContent() {
  const { t } = useV2();

  const entries: { title: string; body: ReactNode }[] = [
    {
      title: t("cavVideo1Title"),
      body: (
        <>
          <p>{t("cavVideo1Para1")}</p>
          <p>{t("cavVideo1Para2")}</p>
        </>
      ),
    },
    {
      title: t("cavVideo2Title"),
      body: (
        <>
          <p>{t("cavVideo2Intro")}</p>
          <ul>
            <li>{t("cavVideo2Bullet1")}</li>
            <li>{t("cavVideo2Bullet2")}</li>
            <li>{t("cavVideo2Bullet3")}</li>
          </ul>
          <p>{t("cavVideo2Outro")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </>
      ),
    },
    {
      title: t("cavVideo3Title"),
      body: (
        <>
          <p className="italic text-[var(--v2-cyan-soft)]">{t("cavVideo3Q")}</p>
          <p>{t("cavVideo3Body")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </>
      ),
    },
    {
      title: t("cavVideo4Title"),
      body: (
        <>
          <p className="italic text-[var(--v2-cyan-soft)]">{t("cavVideo4Q")}</p>
          <p>{t("cavVideo4Intro")}</p>
          <ul>
            <li>{t("cavVideo4Bullet1")}</li>
            <li>{t("cavVideo4Bullet2")}</li>
            <li>{t("cavVideo4Bullet3")}</li>
          </ul>
          <p>{t("cavVideo4Outro")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </>
      ),
    },
    {
      title: t("cavVideo5Title"),
      body: (
        <>
          <p className="italic text-[var(--v2-cyan-soft)]">{t("cavVideo5Q")}</p>
          <p>{t("cavVideo5Body")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </>
      ),
    },
  ];

  return (
    <FaqLayout
      slug="consumer-awareness"
      eyebrow={t("megaWatchAndLearn")}
      title={t("cavPageTitle")}
      lede={t("learnSubtitle")}
      tone="deep"
      size="md"
      align="center"
      panel="subscribe"
    >
      {/* The one topic in the hub that is not a Q&A: five films, set as an editorial reel that
          alternates side to side instead of a stack of identical rows. */}
      <ul className="space-y-14">
        {entries.map((entry, index) => {
          const video = VIDEOS[index];
          const flipped = index % 2 === 1;

          return (
            <li key={video.id}>
              {index > 0 && <Divider className="mb-14" />}

              <Reveal variant="up" className="grid gap-8 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:gap-10">
                <VideoCard
                  videoId={video.id}
                  title={entry.title}
                  thumb={video.thumb}
                  className={flipped ? "md:order-2" : ""}
                />

                <div className={flipped ? "md:order-1" : ""}>
                  <h2 className="v2-h3 text-[var(--v2-text)]">{entry.title}</h2>
                  <Prose className="mt-4 text-sm">{entry.body}</Prose>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </FaqLayout>
  );
}
