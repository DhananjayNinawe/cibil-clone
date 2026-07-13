/**
 * V3-only copy.
 *
 * V1's catalog (lib/i18n/*) is the source of truth for every string the product already says —
 * V3 re-presents that copy, it does not rewrite it. This file holds *only* the strings V3's own
 * chrome introduces (the index overlay, the reading rail, folio marks, its 404). It is a separate
 * catalog so lib/i18n/{en,hi,mr,ta}.ts stay byte-identical to production, and so V2's catalog
 * stays untouched too.
 *
 * The same rule from AGENTS.md applies here: a key added to en must be added — and really
 * translated — in hi.ts, mr.ts and ta.ts. `v3Translations` is typed
 * Record<Language, Record<V3Key, string>>, so a missing key fails the build.
 */
export const v3en = {
  // Chrome & accessibility
  v3SkipToContent: "Skip to main content",
  v3MainNavLabel: "Main navigation",
  v3BreadcrumbLabel: "Breadcrumb",
  v3SectionNavLabel: "Section navigation",
  v3ReadingProgress: "Reading progress",
  v3LanguageLabel: "Language",
  v3BackToTop: "Back to top",
  v3ViewClassicSite: "View classic site",
  v3SearchHint: "Search across every page",
  v3CloseLabel: "Close",
  // The contact page's chat affordance. V1 answers a click with a browser alert() in English;
  // V3 answers it with a translated, dismissible note, which is why this string exists.
  v3ChatUnavailable: "Chat is not available in this demo.",

  // The index overlay — V3's navigation is a full-screen table of contents, not a dropdown.
  v3IndexLabel: "Index",
  v3IndexLede: "Every section of CIBIL, set out in full.",
  v3OpenIndex: "Open the index",
  v3CloseIndex: "Close the index",

  // Feature-matrix cells. V1 marks these with a bare tick/cross glyph and no text alternative,
  // so a screen reader hears the feature name and then nothing at all — it cannot tell an
  // included row from an excluded one. These are the labels for it.
  v3Included: "Included",
  v3NotIncluded: "Not included",

  // Column headings for the plan ledgers. V1 sets its pricing out as cards, so it never needed a
  // word for the column a price sits in; a <Ledger> does, and a table whose headers are blank is
  // unusable with a screen reader. These name the axis, not the product — which is exactly the
  // chrome this catalog exists for.
  v3Plan: "Plan",
  v3Price: "Price",
  v3Term: "Term",

  // Wayfinding
  v3ScrollHint: "Read on",
  v3Contents: "Contents",
  v3InThisSection: "In this section",
  v3RelatedPages: "Related pages",
  v3AllPages: "All pages",
  v3Explore: "Explore",
  v3Previous: "Previous",
  v3Next: "Next",
  v3FiltersLabel: "Filters",
  v3ExpandAll: "Expand all",
  v3CollapseAll: "Collapse all",

  // Section labels — composable folio marks for ported pages.
  v3AtAGlance: "At a glance",
  v3KeyPoints: "Key points",
  v3ProcessLabel: "The process",
  v3DetailsLabel: "Details",
  v3StatsKicker: "By the numbers",
  v3Step: "Step",
  v3FigureLabel: "Figure",

  // Home
  v3HeroKicker: "India's credit information pioneer",
  v3CtaKicker: "Get started",
  v3CtaHeadline: "Your credit story starts here",
  v3CtaBody: "Create your CIBIL account and see the score lenders see.",

  // Sitemap
  v3SitemapLede: "Every page of this experience, in one place.",

  // Error states
  v3NotFoundTitle: "Page not found",
  v3NotFoundBody:
    "The page you are looking for has moved or does not exist. Try the index, or return home.",
  v3GoHome: "Go to homepage",
  v3ErrorTitle: "Something went wrong",
  v3ErrorBody: "An unexpected error occurred while loading this page.",
  v3Retry: "Try again",
} as const;

export type V3TranslationKey = keyof typeof v3en;
