"use client";

import Image from "next/image";
import { Reveal } from "@/components/v4/motion/Reveal";
import { PlayIcon } from "@/components/v4/ui/Icons";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import Tabs, { type TabItem } from "@/components/v4/ui/Tabs";
import { LibraryDisclaimer, SubscribeBand } from "./KnowledgeFurniture";
import { WATCH_LEARN_CARDS } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Watch and Learn — the video library.
 *
 * V1's version of this page is the same three-column blog grid as every other shelf, with four
 * still images and a dead "BLOG POST ›" link: a video library in which nothing plays. But the site
 * *does* own its videos — CIBIL's whole YouTube catalogue is already in V1's data, on the home page's
 * "Learn about credit" row, filed under the same six topic filters used here, and V1's own FAQ tells
 * a reader to "watch this video" and links them to this very page. So this page finally shows them:
 * every card below is a real link to a real video, with a play affordance and the video's own
 * translated title as its accessible name. Not one of them is invented — the ids, the titles and the
 * topics are V1's, moved to the page V1 already points at.
 *
 * The four articles V1 *does* list here are kept, underneath, as what they are: reading that goes
 * with the watching. They are headlines without bodies (`lib/blogCards.ts` holds the titles; the
 * articles are not part of this site), so they are not drawn as links — see CreditAdviceContent.
 *
 * The topic filter is a real tablist (`ui/Tabs`): arrow keys move between topics, one Tab press
 * moves past the whole strip. V1's filters are six `<button>`s a keyboard user must Tab through
 * one at a time.
 */

const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

interface Video {
  youtubeId: string;
  title: TranslationKey;
  /** The "Video / Credit Advice"-style label V1 sets above each card. */
  category: TranslationKey;
  topics: TranslationKey[];
}

/** CIBIL's video catalogue, exactly as V1 files it in components/home/LearnAboutCredit.tsx. */
const VIDEOS: Video[] = [
  {
    youtubeId: "tKeRVGid-6o",
    title: "ntcWhatIsCibilScore",
    category: "catVideoNewToCredit",
    topics: ["filterNewToCredit"],
  },
  {
    youtubeId: "qZEuqVen8ws",
    title: "ntcWhatIsRankCcr",
    category: "catVideoNewToCredit",
    topics: ["filterNewToCredit", "filterCommercialCredit"],
  },
  {
    youtubeId: "5kzfjlJ5s1o",
    title: "ntcBuildingProfile",
    category: "catVideoNewToCredit",
    topics: ["filterNewToCredit", "filterCreditAdvice"],
  },
  {
    youtubeId: "bFdXL8wZQ2g",
    title: "caWaysToImprove",
    category: "catVideoCreditAdvice",
    topics: ["filterCreditAdvice"],
  },
  {
    youtubeId: "AO5cLyNJ3hg",
    title: "cmMythsVsFacts",
    category: "catVideoCreditMyths",
    topics: ["filterCreditMyths"],
  },
  {
    youtubeId: "O3dTqchBkao",
    title: "ucWhatsInReport",
    category: "catVideoUnderstandingCibil",
    topics: ["filterUnderstandingCibil"],
  },
  {
    youtubeId: "U8aafURlWtQ",
    title: "ccWhatAreMsmes",
    category: "catVideoCommercial",
    topics: ["filterCommercialCredit"],
  },
  {
    youtubeId: "o0XdDIcfqaQ",
    title: "ccWhatIsGst",
    category: "catVideoCommercial",
    topics: ["filterCommercialCredit"],
  },
  {
    youtubeId: "g-wj-5EChRE",
    title: "ccScoreVsRank",
    category: "catVideoCommercial",
    topics: ["filterCommercialCredit"],
  },
];

const TOPICS: TranslationKey[] = [
  "filterFeatured", // everything — V1's own name for the unfiltered view
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

function VideoCard({ video, index }: { video: Video; index: number }) {
  const { t, t4 } = useV4();

  return (
    <Reveal as="li" index={index}>
      <a
        href={watch(video.youtubeId)}
        target="_blank"
        rel="noopener noreferrer"
        className="group block focus-visible:outline-none"
      >
        <div className="v4-plane relative aspect-video overflow-hidden">
          <Image
            src={yt(video.youtubeId)}
            // Decorative: the still adds nothing the title beneath it does not already say, and a
            // screen reader that has just read the link's name does not want to hear it twice.
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
            className="object-cover transition-transform duration-700 ease-[var(--v4-ease)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {/* The play affordance. A white plate rather than a red YouTube chip: the destination is
              announced in words, and V4 does not borrow another company's brand as a button. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[var(--v4-ease)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,255,255,0.92)] text-[var(--v4-deep)] shadow-[var(--v4-shadow-2)]">
              <PlayIcon size={26} />
            </span>
          </span>
        </div>

        <p className="v4-label mt-4">{t(video.category)}</p>
        <h3 className="mt-2 text-[1.0625rem] font-bold leading-snug tracking-[-0.012em] group-hover:text-[var(--v4-accent)] group-focus-visible:underline">
          {t(video.title)}
          {/* The tab changes under the reader; a sighted one sees YouTube open, a screen-reader
              user is told. Unannounced, it is a WCAG 3.2.5 failure. */}
          <span className="v4-sr"> {t4("v4OpensInNewTab")}</span>
        </h3>
      </a>
    </Reveal>
  );
}

export default function WatchAndLearnContent() {
  const { t, language } = useV4();

  const panelFor = (topic: TranslationKey) => {
    const videos =
      topic === "filterFeatured"
        ? VIDEOS
        : VIDEOS.filter((video) => video.topics.includes(topic));

    return (
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => (
          <VideoCard key={`${video.youtubeId}-${video.title}`} video={video} index={i} />
        ))}
      </ul>
    );
  };

  const tabs: TabItem[] = TOPICS.map((topic) => ({
    id: topic,
    label: t(topic),
    panel: panelFor(topic),
  }));

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navKnowledge"), href: toV4("/credit-advice") }}
        label={t("footerCreditEducation")}
        title={t("watchLearnTitle")}
        lede={t("learnSubtitle")}
      />

      {/* ── The screening room. A night band: you look at it, you do not read it. ───────────── */}
      <Section tone="night" space="lg" aria-labelledby="v4-wl-videos">
        <Container width="wide">
          <SectionHead id="v4-wl-videos" label={t("formatVideo")} title={t("topicsHeading")} />
          <div className="mt-10">
            <Tabs items={tabs} label={t("topicsHeading")} />
          </div>
        </Container>
      </Section>

      {/* ── The reading that goes with it: the four articles V1 files on this page. ─────────── */}
      <Section space="md" aria-labelledby="v4-wl-reading">
        <Container width="wide">
          <SectionHead id="v4-wl-reading" label={t("blogTag")} title={t("formatBlogs")} />

          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {WATCH_LEARN_CARDS.map((card, i) => (
              <Reveal as="li" key={`${card.title.en}-${i}`} index={i}>
                <article>
                  <div className="v4-plane relative aspect-16/10 overflow-hidden">
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 24vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <p className="v4-label mt-4">{t("blogTag")}</p>
                  <h3 className="mt-2 text-[0.9375rem] font-bold leading-snug">
                    {card.title[language]}
                  </h3>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <SubscribeBand />
      <LibraryDisclaimer />
    </>
  );
}
