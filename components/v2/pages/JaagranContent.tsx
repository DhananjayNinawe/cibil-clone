"use client";

import { useRef, useState } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading, Divider } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Card from "@/components/v2/ui/Card";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import ArticleCard from "@/components/v2/ui/ArticleCard";
import Reveal from "@/components/v2/motion/Reveal";
import KnowledgeCard from "@/components/v2/pages/knowledge/KnowledgeCard";
import {
  ChevronDownIcon,
  DocumentIcon,
  DocumentAlertIcon,
  GaugeIcon,
  PeopleIcon,
  TrendIcon,
} from "@/components/icons";

/* ---------------------------------------------------------------- V1's content, verbatim.
   The videos, blogs and comics live inside V1's JaagranContent component rather than a data
   file in lib/, so there is nothing to import: the same keys and the same artwork URLs are
   restated here. Every headline is a TranslationKey — none of this is new copy. */

const CIBIL_BLOG = "https://www.cibil.com/blog";
const KAHAANIYAAN_ART = "https://www.cibil.com/content/dam/cibil/consumer/ack";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const FILTERS: TranslationKey[] = [
  "filterFeatured",
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

interface Video {
  key: string;
  youtubeId: string;
  title: TranslationKey;
  topics: TranslationKey[];
}

interface Blog {
  key: string;
  title: TranslationKey;
  image: string;
  href: string;
  topics: TranslationKey[];
}

const VIDEOS: Video[] = [
  {
    key: "five-simple-ways",
    youtubeId: "5kzfjlJ5s1o",
    title: "jaagranVideoFiveSimpleWays",
    topics: ["filterNewToCredit", "filterCreditAdvice"],
  },
  {
    key: "four-factors",
    youtubeId: "VOHHGpDfd-8",
    title: "jaagranVideoFourFactors",
    topics: ["filterUnderstandingCibil", "filterCreditAdvice", "filterCreditMyths"],
  },
  {
    key: "building-profile",
    youtubeId: "VOHHGpDfd-8",
    title: "jaagranVideoBuildingProfile",
    topics: ["filterNewToCredit", "filterUnderstandingCibil", "filterCommercialCredit"],
  },
];

const BLOGS: Blog[] = [
  {
    key: "maintain-healthy-score",
    title: "jaagranBlogMaintainHealthyScore",
    image: `${CIBIL_BLOG}/new-to-credit-heres-how-to-maintain-a-healthy-cibil-score/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.png/1699255454828/ntc-credit.png`,
    href: `${CIBIL_BLOG}/new-to-credit-heres-how-to-maintain-a-healthy-cibil-score/`,
    topics: ["filterNewToCredit", "filterCreditAdvice", "filterUnderstandingCibil"],
  },
  {
    key: "first-time-users",
    title: "jaagranBlogFirstTimeUsers",
    image: `${CIBIL_BLOG}/first-time-users-guide-to-establishing-credit-infographic/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.png/1671208834821/first-time-users-guide.png`,
    href: `${CIBIL_BLOG}/first-time-users-guide-to-establishing-credit-infographic/`,
    topics: ["filterNewToCredit", "filterCreditAdvice"],
  },
  {
    key: "stability-in-your-forties",
    title: "jaagranBlogStabilityForties",
    image: `${CIBIL_BLOG}/set-yourself-up-in-your-twenties-for-financial-stability-in-your-fourties/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.png/1696483648677/stability-in-your-fourties-.png`,
    href: `${CIBIL_BLOG}/set-yourself-up-in-your-twenties-for-financial-stability-in-your-fourties/`,
    topics: ["filterCreditAdvice", "filterCreditMyths"],
  },
  {
    key: "credit-roadmap",
    title: "jaagranBlogCreditRoadmap",
    image: `${CIBIL_BLOG}/how-to-create-your-financial-and-credit-roadmap/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.jpeg/1671208803156/credit-roadmap.jpeg`,
    href: `${CIBIL_BLOG}/how-to-create-your-financial-and-credit-roadmap/`,
    topics: ["filterCreditAdvice", "filterCommercialCredit", "filterCreditMyths"],
  },
  {
    key: "millennials-guide",
    title: "jaagranBlogMillennialsGuide",
    image: `${CIBIL_BLOG}/millennial-consumer-pattern/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.jpeg/1671208513747/millenial.jpeg`,
    href: `${CIBIL_BLOG}/millennial-consumer-pattern/`,
    topics: ["filterNewToCredit", "filterCreditMyths", "filterCommercialCredit"],
  },
];

const KAHAANIYAAN: { title: TranslationKey; image: string }[] = [
  { title: "jaagranComicDreamCar", image: `${KAHAANIYAAN_ART}/c1.jpg` },
  { title: "jaagranComicCreditCard", image: `${KAHAANIYAAN_ART}/c2.jpg` },
  { title: "jaagranComicDreamCollege", image: `${KAHAANIYAAN_ART}/c3.jpg` },
  { title: "jaagranComicNeighbourhoodStore", image: `${KAHAANIYAAN_ART}/c4.jpg` },
  { title: "jaagranComicCibilMyths", image: `${KAHAANIYAAN_ART}/c5.jpg` },
];

const FEATURES: { key: string; icon: React.ReactNode; title: TranslationKey; desc: TranslationKey }[] = [
  { key: "score", icon: <GaugeIcon className="h-5 w-5" />, title: "jaagranFeat1Title", desc: "jaagranFeat1Desc" },
  { key: "habits", icon: <TrendIcon className="h-5 w-5" />, title: "jaagranFeat2Title", desc: "jaagranFeat2Desc" },
  { key: "inclusion", icon: <PeopleIcon className="h-5 w-5" />, title: "jaagranFeat3Title", desc: "jaagranFeat3Desc" },
];

const WHY: [TranslationKey, TranslationKey][] = [
  ["jaagranWhy1Title", "jaagranWhy1Desc"],
  ["jaagranWhy2Title", "jaagranWhy2Desc"],
  ["jaagranWhy3Title", "jaagranWhy3Desc"],
];

const CHECKS: { key: TranslationKey; icon: React.ReactNode }[] = [
  { key: "jaagranCheck1", icon: <DocumentIcon className="h-7 w-7" /> },
  { key: "jaagranCheck2", icon: <DocumentAlertIcon className="h-7 w-7" /> },
  { key: "jaagranCheck3", icon: <TrendIcon className="h-7 w-7" /> },
];

/** The wordmark, set as art. "CIBIL" and "JAAG₹AN" are the brand lockup — never translated. */
function Wordmark() {
  return (
    <div className="v2-rim relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-[var(--v2-r-xl)] bg-linear-to-br from-[#0a3a52] via-[#0b1220] to-[#05070d] shadow-[var(--v2-shadow-3)]">
      <span aria-hidden className="v2-grid-lines" />
      <span
        aria-hidden
        className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(0,176,240,0.45),transparent_65%)] blur-2xl"
      />
      <span
        aria-hidden
        className="v2-float absolute bottom-8 right-10 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#f8d558] to-[#e0aa08] text-3xl font-bold text-[#fff8dc] shadow-[var(--v2-glow-gold)]"
      >
        ₹
      </span>
      <p aria-hidden className="relative text-center leading-none">
        <span className="block text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-[var(--v2-cyan)]">
          CIBIL
        </span>
        <span className="mt-2 block text-[clamp(2.4rem,5vw,3.75rem)] font-bold tracking-tight text-white">
          JAAG₹AN
        </span>
      </p>
    </div>
  );
}

export default function JaagranContent() {
  const { t, tv } = useV2();
  const [activeFilter, setActiveFilter] = useState<TranslationKey>("filterFeatured");
  const track = useRef<HTMLDivElement>(null);

  const matches = (topics: TranslationKey[]) =>
    activeFilter === "filterFeatured" || topics.includes(activeFilter);

  const videos = VIDEOS.filter((video) => matches(video.topics));
  const blogs = BLOGS.filter((blog) => matches(blog.topics));

  const scroll = (direction: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <>
      <PageHero
        size="md"
        tone="duo"
        eyebrow={t("jaagranTagline")}
        title={t("jaagranBrand")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("jaagranBrand") }]}
        actions={
          <Button href={toV2("/register")} arrow magnetic>
            {t("jaagranHeroCta")}
          </Button>
        }
        media={<Wordmark />}
      />

      {/* About — the argument, then the three promises beside it. */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div>
              <SectionHeading index="01" eyebrow={t("jaagranBrand")} title={t("jaagranAboutHeading")} />
              <Reveal variant="up" delay={80}>
                <p className="mt-8 leading-relaxed text-[var(--v2-text-2)]">{t("jaagranAboutPara1")}</p>
                <p className="mt-5 leading-relaxed text-[var(--v2-text-2)]">{t("jaagranAboutPara2")}</p>

                <blockquote className="mt-10 border-l-2 border-[var(--v2-cyan)] pl-6">
                  <p className="v2-eyebrow text-[var(--v2-cyan)]">{t("jaagranMissionLabel")}</p>
                  <p className="mt-3 text-lg font-light leading-relaxed text-[var(--v2-text)]">
                    {t("jaagranMission")}
                  </p>
                </blockquote>
              </Reveal>
            </div>

            <ul className="space-y-5">
              {FEATURES.map((feature, index) => (
                <Reveal as="li" key={feature.key} variant="left" delay={index * 100}>
                  <Card spotlight padding="md" className="flex gap-5">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--v2-r-sm)] bg-[rgba(0,176,240,0.12)] text-[var(--v2-cyan)]"
                    >
                      {feature.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-[var(--v2-text)]">{t(feature.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--v2-text-2)]">
                        {t(feature.desc)}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>

          <Divider className="mt-20" />

          <div className="mt-20">
            <Reveal variant="fade">
              <h2 className="v2-h3 text-center text-[var(--v2-text)]">{t("jaagranWhyMattersHeading")}</h2>
            </Reveal>
            <ul className="mt-12 grid gap-10 sm:grid-cols-3">
              {WHY.map(([title, desc], index) => (
                <Reveal as="li" key={title} variant="up" delay={index * 100}>
                  <p className="text-[var(--v2-cyan)] tabular-nums">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-base font-bold text-[var(--v2-text)]">{t(title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--v2-text-2)]">{t(desc)}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* The reassurance — the single most misunderstood fact about a credit score. */}
      <Section space="lg" tone="raised">
        <Container width="narrow">
          <Reveal variant="blur">
            <p className="v2-h2 text-center text-balance text-[var(--v2-text)]">{t("jaagranDontWorry")}</p>
          </Reveal>

          <ul className="mt-16 grid gap-10 sm:grid-cols-3">
            {CHECKS.map((check, index) => (
              <Reveal
                as="li"
                key={check.key}
                variant="up"
                delay={index * 100}
                className="flex flex-col items-center text-center"
              >
                <span
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(0,176,240,0.35)] bg-[rgba(0,176,240,0.08)] text-[var(--v2-cyan)] shadow-[0_0_36px_-10px_rgba(0,176,240,0.9)]"
                >
                  {check.icon}
                </span>
                <p className="mt-6 text-sm leading-relaxed text-[var(--v2-text-2)]">{t(check.key)}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal variant="scale" delay={120} className="mt-16">
            <Card
              spotlight
              padding="lg"
              className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"
            >
              <p className="v2-lede text-[var(--v2-text)]">{t("jaagranCheckFree")}</p>
              <Button href={toV2("/register")} arrow className="shrink-0">
                {t("jaagranGetFreeScore")}
              </Button>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* The library: two rails, one filter. */}
      <Section space="lg" tone="canvas">
        <Container>
          <SectionHeading index="02" eyebrow={t("navKnowledge")} title={t("jaagranLearnHeading")} />

          <Reveal variant="fade" delay={80} className="mt-10">
            <fieldset className="flex flex-wrap gap-2.5">
              <legend className="sr-only">{tv("v2FiltersLabel")}</legend>
              {FILTERS.map((filter) => {
                const active = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter)}
                    className={`v2-focus rounded-full border px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                      active
                        ? "border-[var(--v2-cyan)] bg-[rgba(0,176,240,0.12)] text-[var(--v2-cyan)] shadow-[0_0_24px_-6px_rgba(0,176,240,0.8)]"
                        : "border-[var(--v2-line-2)] text-[var(--v2-text-2)] hover:border-[var(--v2-text-3)] hover:text-[var(--v2-text)]"
                    }`}
                  >
                    {t(filter)}
                  </button>
                );
              })}
            </fieldset>
          </Reveal>

          {videos.length > 0 && (
            <div key={`videos-${activeFilter}`} className="mt-16">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="v2-h3 text-[var(--v2-text)]">{t("jaagranVideosHeading")}</h3>

                <div className="flex items-center gap-3">
                  <Button href={toV2("/watch-and-learn")} variant="link" arrow>
                    {t("jaagranWatchMore")}
                  </Button>
                  <div className="ml-3 hidden gap-2 sm:flex">
                    {([-1, 1] as const).map((direction) => (
                      <button
                        key={direction}
                        type="button"
                        onClick={() => scroll(direction)}
                        aria-label={direction === -1 ? tv("v2Previous") : tv("v2Next")}
                        className="v2-focus flex h-10 w-10 items-center justify-center rounded-full border border-[var(--v2-line-2)] text-[var(--v2-text-2)] transition-colors duration-300 hover:border-[var(--v2-cyan)] hover:text-[var(--v2-cyan)]"
                      >
                        <ChevronDownIcon
                          aria-hidden
                          className={`h-4 w-4 ${direction === -1 ? "rotate-90" : "-rotate-90"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                ref={track}
                className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
              >
                {videos.map((video) => (
                  <div
                    key={video.key}
                    className="w-[80%] shrink-0 snap-start sm:w-[calc((100%-3rem)/3)]"
                  >
                    <KnowledgeCard
                      title={t(video.title)}
                      eyebrow={t("formatVideo")}
                      cta={t("watchNowBtn")}
                      image={yt(video.youtubeId)}
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      external
                      video
                      videoLabel={t("a11yPlayVideo")}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {blogs.length > 0 && (
            <div key={`blogs-${activeFilter}`} className="mt-20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="v2-h3 text-[var(--v2-text)]">{t("jaagranBlogsHeading")}</h3>
                <Button href={toV2("/blog/main")} variant="link" arrow>
                  {t("jaagranReadMoreBlogs")}
                </Button>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog, index) => (
                  <Reveal key={blog.key} variant="up" delay={(index % 3) * 90} className="h-full">
                    <KnowledgeCard
                      title={t(blog.title)}
                      eyebrow={t("blogTag")}
                      cta={t("jaagranReadNow")}
                      image={blog.image}
                      href={blog.href}
                      external
                      index={index}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {videos.length === 0 && blogs.length === 0 && (
            <Callout tone="note" className="mt-16">
              {t("searchNoSuggestions")}
            </Callout>
          )}
        </Container>
      </Section>

      {/* CIBIL Ki Kahaaniyaan — the comics, on the shared editorial card. */}
      <Section space="lg" tone="deep">
        <Container>
          <SectionHeading index="03" eyebrow={t("jaagranIntroducing")} title={t("jaagranKahaaniyaan")} />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KAHAANIYAAN.map((chapter, index) => (
              <Reveal
                key={chapter.title}
                variant="up"
                delay={(index % 3) * 90}
                className={`h-full ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <ArticleCard
                  title={t(chapter.title)}
                  category={`${t("jaagranChapterLabel")} ${index + 1}`}
                  image={chapter.image}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
