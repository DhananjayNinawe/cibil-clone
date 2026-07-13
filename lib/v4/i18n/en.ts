/**
 * V4's own string catalog — and *only* V4's own strings.
 *
 * Every substantive thing this site says already lives in `lib/i18n` (V1's catalog) and in the
 * locale-keyed data modules under `lib/`, translated into all four languages. V4 re-presents that
 * copy; it does not rewrite it, and it does not add to it. What lives here is the chrome V4
 * invents and V1 has no word for: the Launcher, the chart labels, the empty and error states, the
 * screen-reader descriptions of graphics that did not exist before.
 *
 * The hard rule, inherited from V2 and V3: **no new keys in `lib/i18n`**. That catalog is V1's
 * production surface and is read-only.
 *
 * Two things every string here obeys:
 *   1. It is structural, not substantive. No claim about CIBIL, its products, its regulator or its
 *      numbers originates in this file — those come from `t()`. A redesign that invents facts is
 *      not a redesign.
 *   2. It is actually translated in hi/mr/ta, not copied through. See AGENTS.md: a key whose Hindi
 *      value is the English string compiles, ships, and silently leaves the page in English.
 */
export const v4en = {
  // ── Shell ────────────────────────────────────────────────────────────────────────────────────
  v4SkipToContent: "Skip to content",
  v4PrimaryNav: "Primary",
  v4FooterNav: "Footer",
  v4BackToTop: "Back to top",
  v4LanguageLabel: "Language",
  v4ChooseLanguage: "Choose a language",

  // ── The Launcher — V4's one navigation surface. It is the menu and the search box at once. ──
  v4Explore: "Explore",
  v4OpenExplore: "Open the site directory",
  v4CloseExplore: "Close the site directory",
  v4LauncherTitle: "Everything on this site",
  v4LauncherHint: "Type to filter, or browse below.",
  v4FilterPlaceholder: "Filter pages",
  v4QuickTasks: "Common tasks",
  v4Directory: "Directory",
  v4NoMatches: "Nothing matches that",
  v4NoMatchesHint: "Try a shorter word, or browse the directory below.",
  v4MatchesLabel: "matches",
  v4MatchLabel: "match",

  // Task shortcuts. Each points at a page that already exists — the wording is a verb for a
  // destination the reader already has, never a new product.
  v4TaskCheckScore: "Check my CIBIL Score",
  v4TaskRaiseDispute: "Correct a mistake in my report",
  v4TaskBuyPlan: "Compare subscription plans",
  v4TaskContact: "Talk to someone",

  // ── Search ───────────────────────────────────────────────────────────────────────────────────
  v4Search: "Search",
  v4SearchPlaceholder: "Search every page",
  v4SearchResultsFor: "Results for",
  v4SearchEmptyTitle: "No page matches that search",
  v4SearchEmptyBody:
    "Check the spelling, try a broader word, or open the directory to see every page on the site.",
  v4SearchStartTitle: "Search the whole site",
  v4SearchStartBody: "Type a word — a product, a form, a question — and every matching page appears here.",

  // ── The score scale. The one graphic on the home page, and the anchor of V4's data language. ──
  // Every number below is stated in V1's own copy: the score runs 300–900, and a score above 700
  // is generally considered good. Nothing here is a new claim.
  v4ScaleTitle: "The CIBIL Score scale",
  v4ScaleRange: "300 to 900",
  v4ScaleGoodZone: "700 and above is generally considered good",
  v4ScaleYours: "Your score goes here",
  v4ScaleA11y:
    "An illustration of the CIBIL Score scale, which runs from 300 to 900. The range from 700 to 900 is marked as the zone generally considered good.",
  v4ScaleLegendScale: "The scale",
  v4ScaleLegendGood: "Generally good",
  v4ScaleLegendYou: "You",

  // ── Section framing on the home page. Structural labels, not headlines. ─────────────────────
  v4SectionProducts: "Products",
  v4SectionLearn: "Learn",
  v4SectionFigures: "By the numbers",
  v4SectionService: "Self-service",
  v4SectionStart: "Get started",
  v4SectionScale: "The scale",

  v4FiguresA11y: "Key figures about CIBIL, presented as a chart.",
  v4StatsSource: "Figures as published by TransUnion CIBIL.",

  // ── Common furniture ─────────────────────────────────────────────────────────────────────────
  v4ReadMore: "Read more",
  v4ViewAll: "View all",
  v4LearnMore: "Learn more",
  v4Step: "Step",
  v4OnThisPage: "On this page",
  v4Breadcrumb: "Breadcrumb",
  v4Home: "Home",
  v4Expand: "Expand",
  v4Collapse: "Collapse",
  v4OpensInNewTab: "opens in a new tab",
  v4Required: "Required",
  v4Optional: "Optional",
  v4ShowMore: "Show more",
  v4ShowLess: "Show less",

  // ── Forms ────────────────────────────────────────────────────────────────────────────────────
  // A masked field's toggle needs its own words. Composing one out of "Show more" + the field's
  // name gets the state right and the sentence wrong ("Show more — Password"), and a screen-reader
  // user hears exactly that.
  v4ShowPassword: "Show password",
  v4HidePassword: "Hide password",
  v4ShowValue: "Show value",
  v4HideValue: "Hide value",
  /** Heads the error summary a form puts up on a failed submit. */
  v4FormErrorsTitle: "There are problems with this form",

  // ── States ───────────────────────────────────────────────────────────────────────────────────
  v4Loading: "Loading",
  v4EmptyTitle: "Nothing to show yet",
  v4EmptyBody: "There is no content in this section at the moment.",
  v4ErrorTitle: "Something went wrong at our end",
  v4ErrorBody:
    "The page could not be displayed. This is a fault on our side, not yours — please try again.",
  v4ErrorRetry: "Try again",
  v4NotFoundTitle: "That page is not here",
  v4NotFoundBody:
    "The address may be mistyped, or the page may have moved. Everything on the site is one click away in the directory.",
  v4NotFoundCta: "Open the directory",
  v4GoHome: "Go to the home page",
} as const;

export type V4TranslationKey = keyof typeof v4en;
