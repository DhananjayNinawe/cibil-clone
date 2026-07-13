"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import {
  ChevronDownIcon,
  DocumentIcon,
  DocumentAlertIcon,
  GaugeIcon,
  PeopleIcon,
  TrendIcon,
} from "@/components/icons";

const CIBIL_BLOG = "https://www.cibil.com/blog";
const KAHAANIYAAN_ART = "https://www.cibil.com/content/dam/cibil/consumer/ack";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/** The six chips above the "Learn about credit" section; "Featured" shows everything. */
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

function HeroArt() {
  return (
    <svg viewBox="0 0 520 260" aria-hidden className="w-full h-full" fill="none">
      <circle cx="96" cy="72" r="72" fill="#cdeefb" />
      <circle cx="158" cy="34" r="26" fill="#b3e4f7" />
      <g stroke="#a9dcf1" strokeWidth="4" strokeLinecap="round">
        <path d="M392 96h108M400 96v74M424 96v74M448 96v74M472 96v74M492 96v74M384 178h116" />
        <path d="M446 58l58 38H388l58-38z" strokeLinejoin="round" />
      </g>
      <g>
        <path
          d="M262 150c-30 0-54 15-54 34v34h108v-34c0-19-24-34-54-34z"
          fill="#4a7d96"
        />
        <path d="M262 60a34 34 0 100 68 34 34 0 000-68z" fill="#6ea6bd" />
        <path d="M240 150h44l-22 30-22-30z" fill="#dbeef7" />
      </g>
      <g>
        <circle cx="150" cy="196" r="38" fill="#f3c623" />
        <circle cx="150" cy="196" r="27" fill="#e0aa08" />
        <text
          x="150"
          y="207"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill="#fff8dc"
        >
          ₹
        </text>
        <circle cx="370" cy="212" r="30" fill="#f3c623" />
        <circle cx="370" cy="212" r="21" fill="#e0aa08" />
        <text
          x="370"
          y="221"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#fff8dc"
        >
          ₹
        </text>
        <circle cx="204" cy="234" r="20" fill="#f8d558" />
      </g>
    </svg>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f7fd] text-[#00b0f0]">
        {icon}
      </span>
      <div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  const { t } = useLanguage();

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-900">
        <Image
          src={yt(video.youtubeId)}
          alt={t(video.title)}
          fill
          unoptimized
          sizes="(max-width: 640px) 80vw, 33vw"
          className="object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-9 w-13 items-center justify-center rounded-lg bg-[#ff0000]/90 transition-colors group-hover:bg-[#ff0000]">
            <svg viewBox="0 0 24 24" fill="#fff" className="ml-0.5 h-4 w-4">
              <path d="M8 5.14v13.72a1 1 0 001.5.87l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
            </svg>
          </span>
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-snug text-gray-800 group-hover:text-[#00b0f0]">
        {t(video.title)}
      </p>
    </a>
  );
}

function VideoCarousel({ videos }: { videos: Video[] }) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] scrollbar-none"
      >
        {videos.map((video) => (
          <div
            key={video.key}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)]"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>

      {(["prev", "next"] as const).map((direction) => (
        <button
          key={direction}
          type="button"
          onClick={() => scroll(direction === "prev" ? -1 : 1)}
          aria-label={direction === "prev" ? "Previous videos" : "Next videos"}
          className={`absolute top-[35%] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-md transition-colors hover:text-[#00b0f0] sm:flex ${
            direction === "prev" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
          }`}
        >
          <ChevronDownIcon
            className={`h-4 w-4 ${direction === "prev" ? "rotate-90" : "-rotate-90"}`}
          />
        </button>
      ))}
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  const { t } = useLanguage();

  return (
    <article className="flex flex-col overflow-hidden rounded-lg">
      <div className="relative aspect-16/10 bg-gray-100">
        <Image
          src={blog.image}
          alt={t(blog.title)}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-[#eef1f8] px-4 py-3">
        <p className="text-sm font-semibold leading-snug text-gray-800">{t(blog.title)}</p>
        <a
          href={blog.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 self-start text-xs text-[#0a5cb8] underline hover:text-[#00b0f0]"
        >
          {t("jaagranReadNow")}
        </a>
      </div>
    </article>
  );
}

export default function JaagranContent() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<TranslationKey>("filterFeatured");

  const matches = (topics: TranslationKey[]) =>
    activeFilter === "filterFeatured" || topics.includes(activeFilter);

  const videos = VIDEOS.filter((video) => matches(video.topics));
  const blogs = BLOGS.filter((blog) => matches(blog.topics));

  const why: [TranslationKey, TranslationKey][] = [
    ["jaagranWhy1Title", "jaagranWhy1Desc"],
    ["jaagranWhy2Title", "jaagranWhy2Desc"],
    ["jaagranWhy3Title", "jaagranWhy3Desc"],
  ];

  const checks: [TranslationKey, React.ReactNode][] = [
    ["jaagranCheck1", <DocumentIcon key="1" className="h-8 w-8" />],
    ["jaagranCheck2", <DocumentAlertIcon key="2" className="h-8 w-8" />],
    ["jaagranCheck3", <TrendIcon key="3" className="h-8 w-8" />],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-r from-white via-[#eaf7fd] to-[#c9ebfa]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pt-12 pb-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-4xl font-extrabold leading-tight tracking-tight text-[#00b0f0]">
              CIBIL
              <br />
              <span className="text-[#0a3a52]">JAAG₹AN</span>
            </p>
            <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-gray-600">
              {t("jaagranTagline")}
            </p>
            <Link
              href="/register"
              className="mt-7 inline-block rounded-full bg-[#f5c518] px-6 py-2.5 text-xs font-bold text-gray-900 transition-colors hover:bg-[#e8b800]"
            >
              {t("jaagranHeroCta")}
            </Link>
          </div>
          <div className="h-48 sm:h-56 lg:h-64">
            <HeroArt />
          </div>
        </div>
        <span className="absolute bottom-4 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00b0f0]" />
      </section>

      {/* About */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-16 hidden h-16 w-24 bg-[radial-gradient(#a9dcf1_1.5px,transparent_1.5px)] bg-size-[10px_10px] lg:block"
        />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("jaagranAboutHeading")}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">{t("jaagranAboutPara1")}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{t("jaagranAboutPara2")}</p>
            <div className="mt-6 border-l-2 border-[#00b0f0] pl-4">
              <p className="text-sm font-semibold text-gray-800">{t("jaagranMissionLabel")}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{t("jaagranMission")}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Feature
              icon={<GaugeIcon className="h-5 w-5" />}
              title={t("jaagranFeat1Title")}
              desc={t("jaagranFeat1Desc")}
            />
            <Feature
              icon={<TrendIcon className="h-5 w-5" />}
              title={t("jaagranFeat2Title")}
              desc={t("jaagranFeat2Desc")}
            />
            <Feature
              icon={<PeopleIcon className="h-5 w-5" />}
              title={t("jaagranFeat3Title")}
              desc={t("jaagranFeat3Desc")}
            />
          </div>
        </div>

        {/* Why it matters */}
        <div className="mt-12 rounded-xl bg-[#f4f6f9] px-6 py-8 sm:px-10">
          <h3 className="text-center font-bold text-gray-900">{t("jaagranWhyMattersHeading")}</h3>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {why.map(([title, desc]) => (
              <div key={title}>
                <p className="text-sm font-bold text-gray-800">{t(title)}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't worry / free score */}
      <section className="bg-[#eef5fb] px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold text-gray-800">{t("jaagranDontWorry")}</p>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {checks.map(([label, icon]) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <span className="text-[#00b0f0]">{icon}</span>
                <p className="max-w-40 text-xs leading-relaxed text-gray-600">{t(label)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 inline-flex flex-col items-center gap-4 rounded-full bg-white px-6 py-3 shadow-sm sm:flex-row">
            <span className="text-sm text-gray-700">{t("jaagranCheckFree")}</span>
            <Link
              href="/register"
              className="rounded-full bg-[#f5c518] px-5 py-2 text-xs font-bold text-gray-900 transition-colors hover:bg-[#e8b800]"
            >
              {t("jaagranGetFreeScore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Learn about credit */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t("jaagranLearnHeading")}</h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeFilter === filter
                  ? "border-[#00b0f0] bg-[#e6f7fd] text-[#00b0f0]"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {t(filter)}
            </button>
          ))}
        </div>

        {videos.length > 0 && (
          <>
            <div className="mt-10 mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">{t("jaagranVideosHeading")}</h3>
              <Link
                href="/watch-and-learn"
                className="text-sm text-[#0a5cb8] underline-offset-2 hover:underline"
              >
                {t("jaagranWatchMore")} →
              </Link>
            </div>
            <VideoCarousel videos={videos} />
          </>
        )}

        {blogs.length > 0 && (
          <>
            <div className="mt-12 mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">{t("jaagranBlogsHeading")}</h3>
              <Link
                href="/blog"
                className="text-sm text-[#0a5cb8] underline-offset-2 hover:underline"
              >
                {t("jaagranReadMoreBlogs")} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.key} blog={blog} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* CIBIL Ki Kahaaniyaan */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">{t("jaagranIntroducing")}</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          {t("jaagranKahaaniyaan")}
        </h2>
        <span className="mt-3 block h-0.5 w-24 bg-[#00b0f0]" />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KAHAANIYAAN.map((chapter, index) => (
            <article key={chapter.title}>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={chapter.image}
                  alt={t(chapter.title)}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-gray-500">
                {t("jaagranChapterLabel")} {index + 1}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-gray-800">{t(chapter.title)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
