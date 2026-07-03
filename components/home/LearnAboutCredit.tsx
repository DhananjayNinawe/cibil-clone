"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import { ChevronDownIcon } from "@/components/icons";

type ArticleFormat = "video" | "blog";

interface Article {
  /** Stable unique key — used for React keys. */
  key: string;
  /** Content format, drives the "All Formats" dropdown filter. */
  format: ArticleFormat;
  /** "Video / Credit Advice"-style label shown above the title. */
  categoryLabel: TranslationKey;
  title: TranslationKey;
  image: string;
  /** The large hero card — only used in the Featured section. */
  featured?: boolean;
}

const CIBIL = "https://www.cibil.com/content/dam/cibil/homepage/shared";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/** Each filter chip maps to its own ordered list of articles. */
const SECTIONS: Record<TranslationKey, Article[]> = {
  filterFeatured: [
    {
      key: "feat-crash-course",
      format: "video",
      categoryLabel: "catVideoCreditAdvice",
      title: "articleCrashCourse",
      image: `${CIBIL}/video-banner-yt.png`,
      featured: true,
    },
    {
      key: "feat-alerts",
      format: "blog",
      categoryLabel: "catBlogCreditAdvice",
      title: "articleAlertsTitle",
      image: `${CIBIL}/alerts-banner.png`,
    },
    {
      key: "feat-bounce",
      format: "blog",
      categoryLabel: "catBlogCreditAdvice",
      title: "articleBounceBackTitle",
      image: `${CIBIL}/Can-You-Bounce-Back-From-A-Low-CIBIL%20-Score.jpg`,
    },
    {
      key: "feat-business",
      format: "blog",
      categoryLabel: "catBlogCreditAdvice",
      title: "articleBusinessAccessTitle",
      image: `${CIBIL}/Want-to-improve-access-to-credit-for-your-business-Here%CE%93%C3%87%C3%96s-how-to-do-it.jpg`,
    },
    {
      key: "feat-firsttime",
      format: "blog",
      categoryLabel: "catBlogNewToCredit",
      title: "articleFirstTimeTitle",
      image: `${CIBIL}/First-time-users-guide-to-establishing-credit.jpg`,
    },
  ],
  filterNewToCredit: [
    {
      key: "ntc-score",
      format: "video",
      categoryLabel: "catVideoNewToCredit",
      title: "ntcWhatIsCibilScore",
      image: yt("tKeRVGid-6o"),
    },
    {
      key: "ntc-rank",
      format: "video",
      categoryLabel: "catVideoNewToCredit",
      title: "ntcWhatIsRankCcr",
      image: yt("qZEuqVen8ws"),
    },
    {
      key: "ntc-profile",
      format: "video",
      categoryLabel: "catVideoNewToCredit",
      title: "ntcBuildingProfile",
      image: yt("5kzfjlJ5s1o"),
    },
    {
      key: "ntc-firsttime",
      format: "blog",
      categoryLabel: "catBlogNewToCredit",
      title: "articleFirstTimeTitle",
      image: `${CIBIL}/First-time-users-guide-to-establishing-credit.jpg`,
    },
    {
      key: "ntc-maintain",
      format: "blog",
      categoryLabel: "catBlogNewToCredit",
      title: "ntcMaintainHealthy",
      image: `${CIBIL}/New-to-credit-Here's-how-to-maintain-a-healthy-CIBIL-score%20.jpg`,
    },
  ],
  filterCreditAdvice: [
    {
      key: "ca-profile",
      format: "video",
      categoryLabel: "catVideoCreditAdvice",
      title: "ntcBuildingProfile",
      image: yt("5kzfjlJ5s1o"),
    },
    {
      key: "ca-mistakes",
      format: "blog",
      categoryLabel: "catBlogCreditAdvice",
      title: "caCommonMistakes",
      image: `${CIBIL}/Some-of-the-Common-Credit-Mistakes-to-Avoid.jpg`,
    },
    {
      key: "ca-positive",
      format: "blog",
      categoryLabel: "catBlogCreditAdvice",
      title: "caPositiveProfile",
      image: `${CIBIL}/Build-A-Positive-Credit-Profile-With-Good-Credit-Habits.jpg`,
    },
    {
      key: "ca-ways",
      format: "video",
      categoryLabel: "catVideoCreditAdvice",
      title: "caWaysToImprove",
      image: yt("bFdXL8wZQ2g"),
    },
  ],
  filterCreditMyths: [
    {
      key: "cm-myths",
      format: "video",
      categoryLabel: "catVideoCreditMyths",
      title: "cmMythsVsFacts",
      image: yt("AO5cLyNJ3hg"),
    },
    {
      key: "cm-bounce",
      format: "blog",
      categoryLabel: "catBlogCreditMyths",
      title: "articleBounceBackTitle",
      image: `${CIBIL}/Can-You-Bounce-Back-From-A-Low-CIBIL%20-Score.jpg`,
    },
    {
      key: "cm-settled",
      format: "blog",
      categoryLabel: "catBlogCreditMyths",
      title: "cmSettledStatus",
      image: `${CIBIL}/Impact-Of-Settled-Status-On-Your-CIBIL-Score%20.jpg`,
    },
  ],
  filterCommercialCredit: [
    {
      key: "cc-msme",
      format: "video",
      categoryLabel: "catVideoCommercial",
      title: "ccWhatAreMsmes",
      image: yt("U8aafURlWtQ"),
    },
    {
      key: "cc-gst",
      format: "video",
      categoryLabel: "catVideoCommercial",
      title: "ccWhatIsGst",
      image: yt("o0XdDIcfqaQ"),
    },
    {
      key: "cc-rank",
      format: "video",
      categoryLabel: "catVideoCommercial",
      title: "ntcWhatIsRankCcr",
      image: yt("qZEuqVen8ws"),
    },
    {
      key: "cc-scorevrank",
      format: "video",
      categoryLabel: "catVideoCommercial",
      title: "ccScoreVsRank",
      image: yt("g-wj-5EChRE"),
    },
    {
      key: "cc-business",
      format: "blog",
      categoryLabel: "catBlogCommercial",
      title: "articleBusinessAccessTitle",
      image: `${CIBIL}/Want-to-improve-access-to-credit-for-your-business-Here%CE%93%C3%87%C3%96s-how-to-do-it.jpg`,
    },
    {
      key: "cc-paving",
      format: "blog",
      categoryLabel: "catBlogCommercial",
      title: "ccPavingWay",
      image: `${CIBIL}/paving-the-way.jpeg`,
    },
  ],
  filterUnderstandingCibil: [
    {
      key: "uc-report",
      format: "video",
      categoryLabel: "catVideoUnderstandingCibil",
      title: "ucWhatsInReport",
      image: yt("O3dTqchBkao"),
    },
  ],
} as Record<TranslationKey, Article[]>;

const FILTERS: TranslationKey[] = [
  "filterFeatured",
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

type FormatOption = "all" | "video" | "blog";

const FORMAT_OPTIONS: { value: FormatOption; label: TranslationKey }[] = [
  { value: "all", label: "allFormats" },
  { value: "blog", label: "formatBlogs" },
  { value: "video", label: "formatVideo" },
];

function ArticleCard({ article, hero = false }: { article: Article; hero?: boolean }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      <div
        className={`relative overflow-hidden rounded-lg bg-gray-100 ${
          hero ? "aspect-4/3 lg:aspect-auto lg:min-h-0 lg:flex-1" : "aspect-video"
        }`}
      >
        <Image
          src={article.image}
          alt={t(article.title)}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <p className="mt-3 text-xs font-semibold text-[#00b0f0]">{t(article.categoryLabel)}</p>
      <p className="mt-1 text-sm font-semibold leading-snug text-gray-800">{t(article.title)}</p>
    </div>
  );
}

function FormatDropdown({
  value,
  onChange,
}: {
  value: FormatOption;
  onChange: (value: FormatOption) => void;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = FORMAT_OPTIONS.find((o) => o.value === value) ?? FORMAT_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-44 items-center justify-between gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400"
      >
        {t(selected.label)}
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {FORMAT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                  option.value === value ? "font-semibold text-gray-900" : "text-gray-700"
                }`}
              >
                {t(option.label)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LearnAboutCredit() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<TranslationKey>("filterFeatured");
  const [format, setFormat] = useState<FormatOption>("all");

  const visible = (SECTIONS[activeFilter] ?? []).filter(
    (article) => format === "all" || article.format === format,
  );

  const featured = visible.find((article) => article.featured);
  const rest = visible.filter((article) => !article.featured);

  return (
    <section className="relative overflow-visible bg-white py-16 px-4">
      <Image
        src="/round-element.svg"
        alt=""
        aria-hidden
        width={206}
        height={444}
        className="pointer-events-none absolute left-0 -top-1/2 hidden -translate-y-1/2 select-none md:block"
      />
      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t("learnHeadingPrefix")} <span className="text-[#00b0f0]">{t("learnHeadingBrand")}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl">{t("learnSubtitle")}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                  activeFilter === filter
                    ? "border-[#00b0f0] text-[#00b0f0] bg-[#e6f7fd]"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {t(filter)}
              </button>
            ))}
          </div>
          <FormatDropdown value={format} onChange={setFormat} />
        </div>

        {featured && rest.length > 0 ? (
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch">
            <div className="lg:w-[38%]">
              <ArticleCard article={featured} hero />
            </div>
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:flex-1 lg:auto-rows-fr">
              {rest.map((article) => (
                <div key={article.key} className="w-[78%] shrink-0 snap-start sm:w-auto">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        ) : visible.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => (
              <ArticleCard key={article.key} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-gray-500">{t("learnSubtitle")}</p>
        )}
      </div>
    </section>
  );
}
