import { SITEMAP_COLUMNS } from "./sitemapData";
import { translations, type Language, type TranslationKey } from "./i18n";

/**
 * The site is a fixed set of static pages, so search is a client-side page finder over an
 * index built from `sitemapData` — no backend, no request. Because AGENTS.md already forces
 * every route under `app/` into the sitemap, a page added there becomes searchable for free.
 */
export interface SearchEntry {
  href: string;
  titleKey: TranslationKey;
  /** Sitemap column the page sits under — Personal / Business / Support & About. */
  sectionKey: TranslationKey;
  /** Group heading inside that column, when the page belongs to one. */
  groupKey?: TranslationKey;
}

export interface SearchResult extends SearchEntry {
  score: number;
}

/**
 * Comma-separated synonyms for what a reader types but the title never contains —
 * "password" for Login, "cancel" for Subscription Plans, "wilful defaulter" for Suit Filed.
 * Translated like any other string: a Hindi reader searching in Hindi has to hit them too.
 */
const KEYWORD_KEYS: Record<string, TranslationKey> = {
  "/": "searchKwHome",
  "/cibil-score-report": "searchKwScoreReport",
  "/freecibilscore": "searchKwFreeScore",
  "/choose-subscription": "searchKwSubscription",
  "/cibil-alerts": "searchKwAlerts",
  "/score-simulator": "searchKwSimulator",
  "/login": "searchKwLogin",
  "/register": "searchKwRegister",
  "/company-credit-report": "searchKwCompanyReport",
  "/commercial-credit": "searchKwCommercial",
  "/microfinance": "searchKwMicrofinance",
  "/consumer-dispute-resolution": "searchKwConsumerDispute",
  "/company-dispute-resolution": "searchKwCompanyDispute",
  "/microfinance-dispute-resolution": "searchKwMfiDispute",
  "/complaints-and-escalations": "searchKwComplaints",
  "/enquiry": "searchKwEnquiry",
  "/nodal-officer-list": "searchKwNodal",
  "/framework-for-compensation": "searchKwCompensation",
  "/contact-us": "searchKwContact",
  "/faq-brochure": "searchKwFaqBrochure",
  "/credit-advice": "searchKwCreditAdvice",
  "/credit-myths": "searchKwCreditMyths",
  "/new-to-credit": "searchKwNewToCredit",
  "/watch-and-learn": "searchKwWatchLearn",
  "/jaagran": "searchKwJaagran",
  "/cibil-saksham": "searchKwSaksham",
  "/blog/main": "searchKwBlog",
  "/privacy-policy": "searchKwPrivacy",
  "/legal/terms-and-conditions": "searchKwTerms",
  "/suit-filed-cases/overview": "searchKwSuitFiled",
  "/about-us": "searchKwAbout",
  "/official-partners": "searchKwPartners",
  "/regulatory": "searchKwRegulatory",
  "/sitemap": "searchKwSitemap",
};

/** The results page must not return itself. */
const EXCLUDED_HREFS = new Set(["/search"]);

/**
 * Routes the sitemap reaches only through a column heading, whose label ("Personal") would be a
 * misleading result title. Listed first so they win the de-dupe below.
 */
const EXTRA_ENTRIES: SearchEntry[] = [
  { href: "/", titleKey: "searchHome", sectionKey: "navPersonal" },
  { href: "/sitemap", titleKey: "footerSitemap", sectionKey: "sitemapSupportAbout" },
];

function buildEntries(): SearchEntry[] {
  const byHref = new Map<string, SearchEntry>();

  // A page can be linked from several columns (e.g. Contact Us). First mention wins, so the
  // result carries the label of the section that owns it.
  const add = (entry: SearchEntry) => {
    if (EXCLUDED_HREFS.has(entry.href) || byHref.has(entry.href)) return;
    byHref.set(entry.href, entry);
  };

  EXTRA_ENTRIES.forEach(add);

  for (const column of SITEMAP_COLUMNS) {
    for (const group of column.groups) {
      if (group.key && group.href) {
        add({ href: group.href, titleKey: group.key, sectionKey: column.key });
      }
      for (const link of group.links) {
        add({ href: link.href, titleKey: link.key, sectionKey: column.key, groupKey: group.key });
      }
    }
  }

  return [...byHref.values()];
}

export const SEARCH_ENTRIES: SearchEntry[] = buildEntries();

/** Shown on the results page before anything is typed, and when nothing matches. */
export const POPULAR_HREFS = [
  "/freecibilscore",
  "/cibil-score-report",
  "/choose-subscription",
  "/consumer-dispute-resolution",
  "/contact-us",
  "/faq-brochure",
];

export const POPULAR_ENTRIES: SearchEntry[] = POPULAR_HREFS.map(
  (href) => SEARCH_ENTRIES.find((entry) => entry.href === href)!,
).filter(Boolean);

const normalize = (value: string) => value.toLowerCase().trim();

interface IndexedEntry {
  entry: SearchEntry;
  title: string;
  keywords: string;
  context: string;
}

const indexCache = new Map<Language, IndexedEntry[]>();

function indexFor(language: Language): IndexedEntry[] {
  const cached = indexCache.get(language);
  if (cached) return cached;

  const local = translations[language];
  const english = translations.en;

  // English text is folded into every haystack: a reader on the Hindi site still types
  // "cibil score" as often as "सिबिल स्कोर", and both must find the page.
  const both = (key: TranslationKey) =>
    language === "en" ? english[key] : `${local[key]} ${english[key]}`;

  const built = SEARCH_ENTRIES.map<IndexedEntry>((entry) => {
    const keywordKey = KEYWORD_KEYS[entry.href];
    return {
      entry,
      title: normalize(both(entry.titleKey)),
      keywords: keywordKey ? normalize(both(keywordKey)) : "",
      context: normalize(
        [
          entry.groupKey ? both(entry.groupKey) : "",
          both(entry.sectionKey),
          entry.href.replace(/[/-]/g, " "),
        ].join(" "),
      ),
    };
  });

  indexCache.set(language, built);
  return built;
}

const TITLE_PREFIX_SCORE = 10;
const TITLE_SCORE = 6;
const KEYWORD_SCORE = 4;
const CONTEXT_SCORE = 1;

/**
 * Ranked matches for `query`, best first. Every token must land somewhere, so "free report"
 * won't surface a page that only matches "free".
 */
export function searchPages(query: string, language: Language, limit?: number): SearchResult[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const item of indexFor(language)) {
    let score = 0;

    for (const token of tokens) {
      const hit = item.title.startsWith(token)
        ? TITLE_PREFIX_SCORE
        : item.title.includes(token)
          ? TITLE_SCORE
          : item.keywords.includes(token)
            ? KEYWORD_SCORE
            : item.context.includes(token)
              ? CONTEXT_SCORE
              : 0;

      if (hit === 0) {
        score = 0;
        break;
      }
      score += hit;
    }

    if (score > 0) results.push({ ...item.entry, score });
  }

  const titleOf = (result: SearchResult) => translations[language][result.titleKey];
  results.sort((a, b) => b.score - a.score || titleOf(a).localeCompare(titleOf(b)));

  return limit ? results.slice(0, limit) : results;
}
