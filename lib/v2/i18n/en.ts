/**
 * V2-only copy.
 *
 * V1's catalog (lib/i18n/*) is the source of truth for every string the product already
 * says — V2 re-presents that copy, it does not rewrite it. This file holds *only* the
 * strings V2's own chrome introduces (skip links, scroll hints, section labels, its 404).
 * It is a separate catalog so lib/i18n/{en,hi,mr,ta}.ts stay byte-identical to production.
 *
 * The same rule from AGENTS.md applies here: a key added to en must be added — and really
 * translated — in hi.ts, mr.ts and ta.ts. `v2Translations` is typed
 * Record<Language, Record<V2Key, string>>, so a missing key fails the build.
 */
export const v2en = {
  // Chrome & accessibility
  v2SkipToContent: "Skip to main content",
  v2MainNavLabel: "Main navigation",
  v2BreadcrumbLabel: "Breadcrumb",
  v2SectionNavLabel: "Section navigation",
  v2ReadingProgress: "Reading progress",
  v2LanguageLabel: "Language",
  v2BackToTop: "Back to top",
  v2ViewClassicSite: "View classic site",
  v2SearchHint: "Search across every page",

  // Feature-matrix cells. V1 marks these with a bare tick/cross glyph and no text
  // alternative, so a screen reader hears the feature name and then nothing at all —
  // it cannot tell an included row from an excluded one. These are the labels for it.
  v2Included: "Included",
  v2NotIncluded: "Not included",

  // Wayfinding
  v2ScrollHint: "Scroll to explore",
  v2OnThisPage: "On this page",
  v2InThisSection: "In this section",
  v2RelatedPages: "Related pages",
  v2AllPages: "All pages",
  v2Explore: "Explore",
  v2Previous: "Previous",
  v2Next: "Next",
  v2FiltersLabel: "Filters",
  v2ExpandAll: "Expand all",
  v2CollapseAll: "Collapse all",

  // Section labels — composable eyebrows for ported pages
  v2AtAGlance: "At a glance",
  v2KeyPoints: "Key points",
  v2ProcessLabel: "Process",
  v2DetailsLabel: "Details",
  v2StatsKicker: "By the numbers",
  v2Step: "Step",

  // Home
  v2HeroKicker: "India's credit information pioneer",
  v2CtaKicker: "Get started",
  v2CtaHeadline: "Your credit story starts here",
  v2CtaBody: "Create your CIBIL account and see the score lenders see.",

  // Sitemap
  v2SitemapLede: "Every page of this experience, in one place.",

  // Error states
  v2NotFoundTitle: "Page not found",
  v2NotFoundBody:
    "The page you are looking for has moved or does not exist. Try the sitemap, or return home.",
  v2GoHome: "Go to homepage",
  v2ErrorTitle: "Something went wrong",
  v2ErrorBody: "An unexpected error occurred while loading this page.",
  v2Retry: "Try again",
} as const;

export type V2TranslationKey = keyof typeof v2en;
