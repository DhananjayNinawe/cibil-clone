"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/v4/ui/Button";
import PageHero from "@/components/v4/ui/PageHero";
import { FaqBody, type FaqGroup } from "@/components/v4/faq/FaqShell";
import RelatedTopics from "@/components/v4/faq/RelatedTopics";
import VideoPlate from "@/components/v4/faq/VideoPlate";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

const HREF = toV4("/faq/consumer-awareness");

/**
 * `/v4/faq/consumer-awareness` — the one leaf that is not a question-and-answer page.
 *
 * Five videos, and V1 renders each as an autoplaying-on-click iframe with a red YouTube pill on top
 * of it. V4 keeps the videos (they are the content) and changes two things: the player is loaded
 * only after the reader asks for it — five embeds is roughly a megabyte of third-party JavaScript
 * and a set of tracking cookies for a page nobody has pressed play on yet — and the transcript-ish
 * summary beside each one is treated as the primary content rather than the caption, because a
 * reader who cannot or will not watch a video should still leave knowing what it said.
 *
 * The rail lists the five, which is the difference between a video page and a video *library*.
 */
export default function CavContent() {
  const { t } = useV4();

  const groups: FaqGroup[] = [
    {
      id: "raise-a-dispute",
      label: t("cavVideo1Title"),
      content: (
        <VideoRow
          id="qHU-uKKaRjs"
          thumb="https://i.ytimg.com/vi_webp/qHU-uKKaRjs/sddefault.webp"
          title={t("cavVideo1Title")}
        >
          <p>{t("cavVideo1Para1")}</p>
          <p>{t("cavVideo1Para2")}</p>
        </VideoRow>
      ),
    },
    {
      id: "credit-education-basics",
      label: t("cavVideo2Title"),
      content: (
        <VideoRow
          id="mFu-N6oDHoI"
          thumb="https://i.ytimg.com/vi/mFu-N6oDHoI/sddefault.jpg"
          title={t("cavVideo2Title")}
        >
          <p>{t("cavVideo2Intro")}</p>
          <ul>
            <li>{t("cavVideo2Bullet1")}</li>
            <li>{t("cavVideo2Bullet2")}</li>
            <li>{t("cavVideo2Bullet3")}</li>
          </ul>
          <p>{t("cavVideo2Outro")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </VideoRow>
      ),
    },
    {
      id: "decode-your-report",
      label: t("cavVideo3Title"),
      content: (
        <VideoRow
          id="7HpJpZi7q0U"
          thumb="https://i.ytimg.com/vi/7HpJpZi7q0U/sddefault.jpg"
          title={t("cavVideo3Title")}
        >
          <p>
            <em>{t("cavVideo3Q")}</em>
          </p>
          <p>{t("cavVideo3Body")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </VideoRow>
      ),
    },
    {
      id: "report-updates",
      label: t("cavVideo4Title"),
      content: (
        <VideoRow
          id="i-gAj6XLvvE"
          thumb="https://i.ytimg.com/vi/i-gAj6XLvvE/sddefault.jpg"
          title={t("cavVideo4Title")}
        >
          <p>
            <em>{t("cavVideo4Q")}</em>
          </p>
          <p>{t("cavVideo4Intro")}</p>
          <ul>
            <li>{t("cavVideo4Bullet1")}</li>
            <li>{t("cavVideo4Bullet2")}</li>
            <li>{t("cavVideo4Bullet3")}</li>
          </ul>
          <p>{t("cavVideo4Outro")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </VideoRow>
      ),
    },
    {
      id: "enquiries-and-your-score",
      label: t("cavVideo5Title"),
      content: (
        <VideoRow
          id="HuCJuXSSzH0"
          thumb="https://i.ytimg.com/vi/HuCJuXSSzH0/sddefault.jpg"
          title={t("cavVideo5Title")}
        >
          <p>
            <em>{t("cavVideo5Q")}</em>
          </p>
          <p>{t("cavVideo5Body")}</p>
          <p>{t("watchThisVideoLine")}</p>
        </VideoRow>
      ),
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("filterUnderstandingCibil"), href: toV4("/faq-brochure") }}
        label={t("megaConsumerAwareness")}
        title={t("cavPageTitle")}
        actions={
          <ButtonLink href={toV4("/watch-and-learn")} size="lg" arrow>
            {t("megaWatchAndLearn")}
          </ButtonLink>
        }
      />

      <FaqBody groups={groups} />

      <RelatedTopics
        current={HREF}
        actions={
          <>
            <ButtonLink href={toV4("/consumer-dispute-resolution")} arrow>
              {t("megaConsumerDisputeResolution")}
            </ButtonLink>
            <ButtonLink href={toV4("/credit-advice")} variant="secondary" arrow>
              {t("filterCreditAdvice")}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}

/** The video and what it says, side by side — neither one the caption of the other. */
function VideoRow({
  id,
  thumb,
  title,
  children,
}: {
  id: string;
  thumb: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12">
      <VideoPlate id={id} thumb={thumb} title={title} />
      <div className="v4-prose">{children}</div>
    </div>
  );
}
