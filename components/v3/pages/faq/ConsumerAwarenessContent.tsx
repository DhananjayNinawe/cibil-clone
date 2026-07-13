"use client";

import type { ReactNode } from "react";
import { useV3 } from "@/lib/v3/useV3";
import type { RailLink } from "@/components/v3/ui/MarginRail";
import Reveal from "@/components/v3/motion/Reveal";
import FaqDocument, { A, FaqNote, Points, VideoPlate } from "@/components/v3/pages/faq/FaqDocument";

interface Film {
  id: string;
  videoId: string;
  thumb?: string;
  title: string;
  body: ReactNode;
}

/**
 * Consumer Awareness Videos.
 *
 * The one page in the cluster whose entries are *not* questions, and so the one that does not get
 * the accordion: a video you have to click twice to see is a video nobody watches. It is set as an
 * open ledger instead — a numbered entry per film, the plate in the left column, the summary in
 * the right, a hairline between each. Same shell, different rhythm, and the rail still indexes it.
 */
export default function ConsumerAwarenessContent() {
  const { t } = useV3();

  const films: Film[] = [
    {
      id: "raise-a-dispute",
      videoId: "qHU-uKKaRjs",
      thumb: "https://i.ytimg.com/vi_webp/qHU-uKKaRjs/sddefault.webp",
      title: t("cavVideo1Title"),
      body: (
        <>
          <A>{t("cavVideo1Para1")}</A>
          <A>{t("cavVideo1Para2")}</A>
        </>
      ),
    },
    {
      id: "credit-education-basics",
      videoId: "mFu-N6oDHoI",
      thumb: "https://i.ytimg.com/vi/mFu-N6oDHoI/sddefault.jpg",
      title: t("cavVideo2Title"),
      body: (
        <>
          <A>{t("cavVideo2Intro")}</A>
          <Points items={[t("cavVideo2Bullet1"), t("cavVideo2Bullet2"), t("cavVideo2Bullet3")]} />
          <A>{t("cavVideo2Outro")}</A>
          <A>{t("watchThisVideoLine")}</A>
        </>
      ),
    },
    {
      id: "decode-your-report",
      videoId: "7HpJpZi7q0U",
      thumb: "https://i.ytimg.com/vi/7HpJpZi7q0U/sddefault.jpg",
      title: t("cavVideo3Title"),
      body: (
        <>
          <A italic>{t("cavVideo3Q")}</A>
          <A>{t("cavVideo3Body")}</A>
          <A>{t("watchThisVideoLine")}</A>
        </>
      ),
    },
    {
      id: "report-updates",
      videoId: "i-gAj6XLvvE",
      thumb: "https://i.ytimg.com/vi/i-gAj6XLvvE/sddefault.jpg",
      title: t("cavVideo4Title"),
      body: (
        <>
          <A italic>{t("cavVideo4Q")}</A>
          <A>{t("cavVideo4Intro")}</A>
          <Points items={[t("cavVideo4Bullet1"), t("cavVideo4Bullet2"), t("cavVideo4Bullet3")]} />
          <A>{t("cavVideo4Outro")}</A>
          <A>{t("watchThisVideoLine")}</A>
        </>
      ),
    },
    {
      id: "enquiries-explained",
      videoId: "HuCJuXSSzH0",
      thumb: "https://i.ytimg.com/vi/HuCJuXSSzH0/sddefault.jpg",
      title: t("cavVideo5Title"),
      body: (
        <>
          <A italic>{t("cavVideo5Q")}</A>
          <A>{t("cavVideo5Body")}</A>
          <A>{t("watchThisVideoLine")}</A>
        </>
      ),
    },
  ];

  const rail: RailLink[] = films.map((film) => ({ id: film.id, label: film.title }));

  return (
    <FaqDocument
      category="megaConsumerAwareness"
      title={t("cavPageTitle")}
      rail={rail}
      aside={<FaqNote variant="subscribe" />}
    >
      <ol className="border-t border-[var(--v3-line-2)]">
        {films.map((film, i) => (
          <li
            key={film.id}
            id={film.id}
            className="scroll-mt-28 border-b border-[var(--v3-line)] py-10 sm:scroll-mt-32"
          >
            <Reveal variant="rise">
              <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
                <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
                  <VideoPlate
                    videoId={film.videoId}
                    thumb={film.thumb}
                    title={film.title}
                    caption={false}
                  />

                  <div>
                    <h2 className="v3-h3 text-pretty">{film.title}</h2>
                    <div className="mt-3 text-sm leading-relaxed text-[var(--v3-fg-2)]">
                      {film.body}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </FaqDocument>
  );
}
