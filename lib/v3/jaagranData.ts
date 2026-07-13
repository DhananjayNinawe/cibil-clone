import type { TranslationKey } from "@/lib/i18n";
import type { BlogCard } from "@/lib/blogCards";
import {
  COMMERCIAL_CREDIT_CARDS,
  CREDIT_ADVICE_CARDS,
  CREDIT_MYTHS_CARDS,
  NEW_TO_CREDIT_CARDS,
  WATCH_LEARN_CARDS,
} from "@/lib/blogCards";

/**
 * The knowledge cluster's data: the CIBIL Jaagran campaign, and the Knowledge Center's front page.
 *
 * Same videos, blogs, comics, filters and artwork V1 ships (components/jaagran/JaagranContent.tsx,
 * components/blog-main/BlogMainContent.tsx). Those components keep their data private — it is not
 * exported — so V3 holds its own copy of the *structure* rather than reaching into V1's internals,
 * exactly as lib/v3/libraryData.ts already does. No copy is invented: every label is an existing
 * TranslationKey, and every headline comes from the locale-keyed cards in lib/blogCards.ts, which
 * are imported, never duplicated.
 */
const CIBIL_BLOG = "https://www.cibil.com/blog";
const KAHAANIYAAN_ART = "https://www.cibil.com/content/dam/cibil/consumer/ack";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const youtubeStill = yt;
export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/** The six topics above "Learn about credit & CIBIL offerings"; "Featured" shows everything. */
export const JAAGRAN_FILTERS: TranslationKey[] = [
  "filterFeatured",
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

export interface JaagranVideo {
  key: string;
  youtubeId: string;
  title: TranslationKey;
  topics: TranslationKey[];
}

export interface JaagranBlog {
  key: string;
  title: TranslationKey;
  image: string;
  href: string;
  topics: TranslationKey[];
}

export const JAAGRAN_VIDEOS: JaagranVideo[] = [
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

export const JAAGRAN_BLOGS: JaagranBlog[] = [
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

/** CIBIL Ki Kahaaniyaan — the five illustrated chapters, in order. */
export const JAAGRAN_COMICS: { key: string; title: TranslationKey; image: string }[] = [
  { key: "dream-car", title: "jaagranComicDreamCar", image: `${KAHAANIYAAN_ART}/c1.jpg` },
  { key: "credit-card", title: "jaagranComicCreditCard", image: `${KAHAANIYAAN_ART}/c2.jpg` },
  { key: "dream-college", title: "jaagranComicDreamCollege", image: `${KAHAANIYAAN_ART}/c3.jpg` },
  { key: "neighbourhood-store", title: "jaagranComicNeighbourhoodStore", image: `${KAHAANIYAAN_ART}/c4.jpg` },
  { key: "cibil-myths", title: "jaagranComicCibilMyths", image: `${KAHAANIYAAN_ART}/c5.jpg` },
];

/** The three programme promises, and the three reasons it matters. Title + gloss, both keys. */
export const JAAGRAN_OFFERS: [TranslationKey, TranslationKey][] = [
  ["jaagranFeat1Title", "jaagranFeat1Desc"],
  ["jaagranFeat2Title", "jaagranFeat2Desc"],
  ["jaagranFeat3Title", "jaagranFeat3Desc"],
];

export const JAAGRAN_WHY: [TranslationKey, TranslationKey][] = [
  ["jaagranWhy1Title", "jaagranWhy1Desc"],
  ["jaagranWhy2Title", "jaagranWhy2Desc"],
  ["jaagranWhy3Title", "jaagranWhy3Desc"],
];

/** The three things a free score check buys you — V1 hangs an icon on each; V3 numbers them. */
export const JAAGRAN_CHECKS: TranslationKey[] = ["jaagranCheck1", "jaagranCheck2", "jaagranCheck3"];

/* ───────────────────────────────────────────────── The Knowledge Center front page (/blog/main) */

/** Hero band artwork for the blog masthead. */
export const BLOG_MAIN_HERO = "https://www.cibil.com/content/dam/cibil/consumer/main-banner.jpg";

/**
 * The four stories V1's blog masthead features. V1 types their headlines directly into the
 * component in English, which is precisely the translation hole AGENTS.md exists to close — so V3
 * takes the same four stories from the locale-keyed cards instead, and they read in the reader's
 * language for free.
 */
export const BLOG_MAIN_FEATURED: BlogCard[] = [
  CREDIT_ADVICE_CARDS[0], // Building a Strong Financial Foundation — Essential Money Skills…
  NEW_TO_CREDIT_CARDS[1], // New-to-credit? Here's how to maintain a healthy CIBIL score
  NEW_TO_CREDIT_CARDS[3], // First-time users guide to establishing credit
  CREDIT_ADVICE_CARDS[7], // Safeguarding your Credit Profile
];

/**
 * The six sections of the Knowledge Center, with the size of each collection — a printed contents
 * page states how many entries are under each heading, so V3 does too.
 *
 * "Life Events" has no route anywhere on the site: V1 links it to `"#"`. A dead link is not a
 * thing V3 ships, so the entry is listed without one rather than dropped.
 */
export const BLOG_MAIN_CATEGORIES: { key: TranslationKey; href?: string; count?: number }[] = [
  { key: "creditAdviceTitle", href: "/credit-advice", count: CREDIT_ADVICE_CARDS.length },
  { key: "creditMythsTitle", href: "/credit-myths", count: CREDIT_MYTHS_CARDS.length },
  { key: "watchLearnTitle", href: "/watch-and-learn", count: WATCH_LEARN_CARDS.length },
  { key: "blogCatLifeEvents" },
  { key: "commercialCreditTitle", href: "/commercial-credit", count: COMMERCIAL_CREDIT_CARDS.length },
  { key: "newToCreditTitle", href: "/new-to-credit", count: NEW_TO_CREDIT_CARDS.length },
];
