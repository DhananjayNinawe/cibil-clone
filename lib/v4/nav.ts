import type { TranslationKey } from "@/lib/i18n";
import type { V4TranslationKey } from "@/lib/v4/i18n";
import { toV4 } from "@/lib/v4/routes";

/**
 * V4's information architecture.
 *
 * The taxonomy is the one CIBIL's readers already have in their heads — V1's mega menu — because a
 * redesign that re-files the site teaches the reader nothing except that their bookmarks are wrong.
 * What V4 changes is the *shape* of the surface it is presented on.
 *
 * V1 and V2 hang five hover menus off the header. V3 replaces them with a printed index. V4 does a
 * third thing: one surface, the Launcher, which is the menu and the search box at the same time.
 * Open it and the entire site is laid out in columns; type, and the same columns filter down to
 * what matched. There is no separate "search mode", because a reader who wants a page does not care
 * whether they find it by browsing or by typing, and making them choose is the cognitive load.
 *
 * ── Two deliberate departures from V1's menu ─────────────────────────────────────────────────
 *
 * 1. TASKS COME FIRST. V1's menu is organised the way the company is organised (Products,
 *    Knowledge, Grievance, Support, About). Most readers arrive with a *verb*: check my score, fix
 *    a mistake, compare plans, talk to a human. Those four sit at the top of the Launcher, ahead of
 *    the taxonomy — which is still there, underneath, for everyone else.
 *
 * 2. NO DEAD HEADINGS. In V1's header, "Knowledge Center" and "Consumer Grievance" are `href: "#"`
 *    — headings that look like links and go nowhere. Every entry here, section titles included,
 *    resolves to a real page. (AGENTS.md bans `"#"` in the sitemap for exactly this reason; a
 *    heading that lies in the nav is no better than one that lies in the sitemap.)
 *
 * Labels are `TranslationKey`s resolved through `t()` at render — never free text, or the strings
 * would not switch language.
 */

export interface NavEntry {
  key: TranslationKey;
  href: string;
  /** Optional one-line gloss, always a key — never free text. */
  descKey?: TranslationKey;
}

export interface NavGroup {
  heading: TranslationKey;
  entries: NavEntry[];
}

export interface NavSection {
  key: TranslationKey;
  /** The section title is itself a destination. No dead ends. */
  href: string;
  groups: NavGroup[];
}

/** The four verbs. Each points at a page that already exists. */
export interface NavTask {
  key: V4TranslationKey;
  href: string;
  /** Names a glyph in components/v4/ui/Icons.tsx — not an image path. */
  icon: "score" | "dispute" | "plans" | "support";
}

export const V4_TASKS: NavTask[] = [
  { key: "v4TaskCheckScore", href: toV4("/freecibilscore"), icon: "score" },
  { key: "v4TaskRaiseDispute", href: toV4("/consumer-dispute-resolution"), icon: "dispute" },
  { key: "v4TaskBuyPlan", href: toV4("/choose-subscription"), icon: "plans" },
  { key: "v4TaskContact", href: toV4("/contact-us"), icon: "support" },
];

export const V4_SECTIONS: NavSection[] = [
  {
    key: "navProducts",
    href: toV4("/choose-subscription"),
    groups: [
      {
        heading: "megaIndividualsHeading",
        entries: [
          {
            key: "megaCibilScoreReport",
            href: toV4("/cibil-score-report"),
            descKey: "productIndividualsDesc",
          },
          { key: "megaFreeCibilScore", href: toV4("/freecibilscore") },
          { key: "sitemapSubscriptionPlans", href: toV4("/choose-subscription") },
          { key: "featCibilAlerts", href: toV4("/cibil-alerts") },
          { key: "featScoreSimulator", href: toV4("/score-simulator") },
        ],
      },
      {
        heading: "megaBusinessesHeading",
        entries: [
          {
            key: "megaCompanyCreditReport",
            href: toV4("/company-credit-report"),
            descKey: "productBusinessDesc",
          },
          { key: "filterCommercialCredit", href: toV4("/commercial-credit") },
        ],
      },
      {
        heading: "megaMicrofinanceHeading",
        entries: [
          { key: "megaMfiScoreReport", href: toV4("/microfinance"), descKey: "productMfiDesc" },
        ],
      },
    ],
  },
  {
    // V1 parks this behind a `#`. It has a real home: the credit-advice library.
    key: "navKnowledge",
    href: toV4("/credit-advice"),
    groups: [
      {
        heading: "footerCreditEducation",
        entries: [
          { key: "filterCreditAdvice", href: toV4("/credit-advice") },
          { key: "megaNewToCredit", href: toV4("/new-to-credit") },
          { key: "filterCreditMyths", href: toV4("/credit-myths") },
          { key: "megaWatchAndLearn", href: toV4("/watch-and-learn") },
          { key: "footerBlog", href: toV4("/blog/main") },
        ],
      },
      {
        heading: "faqs",
        entries: [
          { key: "filterUnderstandingCibil", href: toV4("/faq-brochure") },
          { key: "megaCreditScoreLoanBasics", href: toV4("/faq/credit-score-and-loan-basics") },
          {
            key: "megaUnderstandScoreReport",
            href: toV4("/faq/understand-your-credit-score-and-report"),
          },
          { key: "megaLoanRejectionsDisputes", href: toV4("/faq/loan-rejections-disputes") },
          { key: "megaPurchasePostPurchase", href: toV4("/faq/purchase-post-purchase-help") },
          { key: "megaScoreSimulatorFaqs", href: toV4("/faq/score-simulator") },
          { key: "megaRankCompanyFaqs", href: toV4("/faq/company-credit-report") },
          { key: "megaConsumerAwareness", href: toV4("/faq/consumer-awareness") },
        ],
      },
      {
        heading: "megaResourcesHeading",
        entries: [
          { key: "megaCibilJaagran", href: toV4("/jaagran") },
          { key: "featCibilSaksham", href: toV4("/cibil-saksham") },
          { key: "filterCommercialCredit", href: toV4("/commercial-credit") },
        ],
      },
    ],
  },
  {
    // Also a `#` in V1. A grievance actually starts at dispute resolution.
    key: "navGrievance",
    href: toV4("/consumer-dispute-resolution"),
    groups: [
      {
        heading: "megaGrievanceRedressalHeading",
        entries: [
          { key: "megaConsumerDisputeResolution", href: toV4("/consumer-dispute-resolution") },
          { key: "megaCompanyDisputeResolution", href: toV4("/company-dispute-resolution") },
          { key: "megaMfiDisputeResolution", href: toV4("/microfinance-dispute-resolution") },
          { key: "megaComplaintsEscalations", href: toV4("/complaints-and-escalations") },
        ],
      },
      {
        heading: "megaResourcesHeading",
        entries: [
          { key: "megaConsumerEnquiry", href: toV4("/enquiry") },
          { key: "megaCommercialEnquiry", href: toV4("/enquiryccr") },
          { key: "megaFrameworkCompensation", href: toV4("/framework-for-compensation") },
          { key: "megaNodalOfficerList", href: toV4("/nodal-officer-list") },
        ],
      },
    ],
  },
  {
    key: "navSupport",
    href: toV4("/contact-us"),
    groups: [
      {
        heading: "sitemapHelpCenter",
        entries: [
          { key: "sitemapContactUsLink", href: toV4("/contact-us") },
          { key: "footerNonSuitCases", href: toV4("/suit-filed-cases/overview") },
          { key: "footerOfficialPartners", href: toV4("/official-partners") },
        ],
      },
      {
        heading: "sitemapMyAccount",
        entries: [
          { key: "login", href: toV4("/login") },
          { key: "signUpLink", href: toV4("/register") },
        ],
      },
    ],
  },
  {
    key: "navAbout",
    href: toV4("/about-us"),
    groups: [
      {
        heading: "footerAboutUs",
        entries: [
          { key: "footerAboutTransunionCibil", href: toV4("/about-us") },
          { key: "footerCompanyHistory", href: toV4("/about-us/company-history") },
          { key: "footerRegulatoryDisclosure", href: toV4("/regulatory") },
          { key: "footerRbiNotifications", href: toV4("/external-links/rbi-notifications") },
          { key: "footerCodeOfConduct", href: toV4("/external-links/business-code-of-conduct") },
        ],
      },
      {
        heading: "footerInformation",
        entries: [
          { key: "privacyPolicy", href: toV4("/privacy-policy") },
          { key: "footerTermsOfUse", href: toV4("/legal/terms-and-conditions") },
          { key: "footerSitemap", href: toV4("/sitemap") },
        ],
      },
    ],
  },
];
