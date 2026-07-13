import type { TranslationKey } from "@/lib/i18n";

/**
 * The "Learn about credit & CIBIL" library.
 *
 * Same articles, same thumbnails and the same translation keys V1's LearnAboutCredit renders
 * (components/home/LearnAboutCredit.tsx) — that component keeps its data private, so V2 holds
 * its own copy rather than reaching into V1's internals. No new content is invented here: every
 * title and category is an existing key.
 */
export type ArticleFormat = "video" | "blog";

export interface LearnArticle {
  key: string;
  format: ArticleFormat;
  categoryLabel: TranslationKey;
  title: TranslationKey;
  image: string;
  /** The oversized lead card in the Featured collection. */
  featured?: boolean;
}

const CIBIL = "https://www.cibil.com/content/dam/cibil/homepage/shared";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const LEARN_FILTERS: TranslationKey[] = [
  "filterFeatured",
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

export const LEARN_SECTIONS: Record<string, LearnArticle[]> = {
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
    { key: "ntc-score", format: "video", categoryLabel: "catVideoNewToCredit", title: "ntcWhatIsCibilScore", image: yt("tKeRVGid-6o") },
    { key: "ntc-rank", format: "video", categoryLabel: "catVideoNewToCredit", title: "ntcWhatIsRankCcr", image: yt("qZEuqVen8ws") },
    { key: "ntc-profile", format: "video", categoryLabel: "catVideoNewToCredit", title: "ntcBuildingProfile", image: yt("5kzfjlJ5s1o") },
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
    { key: "ca-profile", format: "video", categoryLabel: "catVideoCreditAdvice", title: "ntcBuildingProfile", image: yt("5kzfjlJ5s1o") },
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
    { key: "ca-ways", format: "video", categoryLabel: "catVideoCreditAdvice", title: "caWaysToImprove", image: yt("bFdXL8wZQ2g") },
  ],
  filterCreditMyths: [
    { key: "cm-myths", format: "video", categoryLabel: "catVideoCreditMyths", title: "cmMythsVsFacts", image: yt("AO5cLyNJ3hg") },
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
    { key: "cc-msme", format: "video", categoryLabel: "catVideoCommercial", title: "ccWhatAreMsmes", image: yt("U8aafURlWtQ") },
    { key: "cc-gst", format: "video", categoryLabel: "catVideoCommercial", title: "ccWhatIsGst", image: yt("o0XdDIcfqaQ") },
    { key: "cc-rank", format: "video", categoryLabel: "catVideoCommercial", title: "ntcWhatIsRankCcr", image: yt("qZEuqVen8ws") },
    { key: "cc-scorevrank", format: "video", categoryLabel: "catVideoCommercial", title: "ccScoreVsRank", image: yt("g-wj-5EChRE") },
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
    { key: "uc-report", format: "video", categoryLabel: "catVideoUnderstandingCibil", title: "ucWhatsInReport", image: yt("O3dTqchBkao") },
  ],
};

/** The three product pillars, with the artwork V1 already ships for each. */
export const V2_PRODUCTS = [
  {
    key: "individuals",
    tag: "productIndividualsTag",
    title: "productIndividualsTitle",
    desc: "productIndividualsDesc",
    image: `${CIBIL}/ind-banner.png`,
    href: "/choose-subscription",
  },
  {
    key: "business",
    tag: "productBusinessTag",
    title: "productBusinessTitle",
    desc: "productBusinessDesc",
    image: `${CIBIL}/business-banner.png`,
    href: "/company-credit-report",
  },
  {
    key: "mfi",
    tag: "productMfiTag",
    title: "productMfiTitle",
    desc: "productMfiDesc",
    image: `${CIBIL}/micro-banner.png`,
    href: "/microfinance",
  },
] satisfies {
  key: string;
  tag: TranslationKey;
  title: TranslationKey;
  desc: TranslationKey;
  image: string;
  href: string;
}[];
