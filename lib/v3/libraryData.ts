import type { TranslationKey } from "@/lib/i18n";

/**
 * The "Learn about credit & CIBIL" library, and the three product pillars.
 *
 * Same articles, same thumbnails and the same translation keys V1's home page renders
 * (components/home/LearnAboutCredit.tsx, components/home/ProductsServices.tsx). Those
 * components keep their data private — it is not exported — so V3 holds its own copy rather
 * than reaching into V1's internals. No content is invented here: every title and category is
 * an existing key from V1's catalog.
 *
 * V3 is independent of V2 by design, so it does not import lib/v2/learnData either: the two
 * versions must be able to evolve (or be deleted) without touching each other.
 */
export type ArticleFormat = "video" | "blog";

export interface LibraryArticle {
  key: string;
  format: ArticleFormat;
  categoryLabel: TranslationKey;
  title: TranslationKey;
  image: string;
  /** The lead item of a collection — set at editorial scale, spanning the spread. */
  lead?: boolean;
}

const CIBIL = "https://www.cibil.com/content/dam/cibil/homepage/shared";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const LIBRARY_FILTERS: TranslationKey[] = [
  "filterFeatured",
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

export const LIBRARY_SECTIONS: Record<string, LibraryArticle[]> = {
  filterFeatured: [
    {
      key: "feat-crash-course",
      format: "video",
      categoryLabel: "catVideoCreditAdvice",
      title: "articleCrashCourse",
      image: `${CIBIL}/video-banner-yt.png`,
      lead: true,
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
    { key: "ntc-score", format: "video", categoryLabel: "catVideoNewToCredit", title: "ntcWhatIsCibilScore", image: yt("tKeRVGid-6o"), lead: true },
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
    { key: "ca-profile", format: "video", categoryLabel: "catVideoCreditAdvice", title: "ntcBuildingProfile", image: yt("5kzfjlJ5s1o"), lead: true },
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
    { key: "cm-myths", format: "video", categoryLabel: "catVideoCreditMyths", title: "cmMythsVsFacts", image: yt("AO5cLyNJ3hg"), lead: true },
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
    { key: "cc-msme", format: "video", categoryLabel: "catVideoCommercial", title: "ccWhatAreMsmes", image: yt("U8aafURlWtQ"), lead: true },
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
    { key: "uc-report", format: "video", categoryLabel: "catVideoUnderstandingCibil", title: "ucWhatsInReport", image: yt("O3dTqchBkao"), lead: true },
  ],
};

/** The three product pillars, with the artwork V1 already ships for each. */
export const V3_PRODUCTS = [
  {
    key: "individuals",
    folio: "01",
    tag: "productIndividualsTag",
    title: "productIndividualsTitle",
    desc: "productIndividualsDesc",
    image: `${CIBIL}/ind-banner.png`,
    href: "/choose-subscription",
  },
  {
    key: "business",
    folio: "02",
    tag: "productBusinessTag",
    title: "productBusinessTitle",
    desc: "productBusinessDesc",
    image: `${CIBIL}/business-banner.png`,
    href: "/company-credit-report",
  },
  {
    key: "mfi",
    folio: "03",
    tag: "productMfiTag",
    title: "productMfiTitle",
    desc: "productMfiDesc",
    image: `${CIBIL}/micro-banner.png`,
    href: "/microfinance",
  },
] satisfies {
  key: string;
  folio: string;
  tag: TranslationKey;
  title: TranslationKey;
  desc: TranslationKey;
  image: string;
  href: string;
}[];

/** The three figures V1's stats bar reports, as numbers the tally can actually count to. */
export const V3_STATS = [
  { key: "years", value: 25, valueKey: "statYearsValue", unitKey: "statYearsUnit", labelKey: "statYearsLabel" },
  { key: "users", value: 183, valueKey: "statUsersValue", unitKey: "statUsersUnit", labelKey: "statUsersLabel" },
  { key: "improved", value: 46, valueKey: "statImprovedValue", unitKey: null, labelKey: "statImprovedLabel" },
] satisfies {
  key: string;
  value: number;
  valueKey: TranslationKey;
  unitKey: TranslationKey | null;
  labelKey: TranslationKey;
}[];
