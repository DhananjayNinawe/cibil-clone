import type { TranslationKey } from "@/lib/i18n";
import { toV2 } from "@/lib/v2/routes";

/**
 * V2's information architecture.
 *
 * Same taxonomy as V1's header (components/Header.tsx) — the categories are how CIBIL's
 * users already think — but every destination is a real page. V1's nav parks "Knowledge
 * Center" and "Consumer Grievance" on "#", which is a dead end for a top-level tab; here
 * they open onto their own hub. Labels are TranslationKeys, resolved with `t()` at render.
 */

export interface NavLink {
  key: TranslationKey;
  href: string;
  /** Optional one-line gloss under the link — a second key, not free text. */
  descKey?: TranslationKey;
}

export interface NavColumn {
  heading: TranslationKey;
  links: NavLink[];
}

export interface NavSection {
  key: TranslationKey;
  /** The tab itself is a link — every top-level destination resolves. */
  href: string;
  columns?: NavColumn[];
  /** Promo tile pinned to the right of the mega panel. */
  feature?: {
    titleKey: TranslationKey;
    bodyKey: TranslationKey;
    ctaKey: TranslationKey;
    href: string;
    image: string;
  };
}

const CIBIL_ART = "https://www.cibil.com/content/dam/cibil/homepage/shared";

export const V2_NAV: NavSection[] = [
  {
    key: "navProducts",
    href: toV2("/choose-subscription"),
    columns: [
      {
        heading: "megaIndividualsHeading",
        links: [
          { key: "megaCibilScoreReport", href: toV2("/cibil-score-report"), descKey: "productIndividualsDesc" },
          { key: "featCibilAlerts", href: toV2("/cibil-alerts"), descKey: "loginStaySubtitle" },
          { key: "megaFreeCibilScore", href: toV2("/freecibilscore"), descKey: "planFreeAnnualDesc" },
          { key: "featScoreSimulator", href: toV2("/score-simulator"), descKey: "loginSimulatorSubtitle" },
          { key: "sitemapSubscriptionPlans", href: toV2("/choose-subscription") },
        ],
      },
      {
        heading: "megaBusinessesHeading",
        links: [
          { key: "megaCompanyCreditReport", href: toV2("/company-credit-report"), descKey: "productBusinessDesc" },
          { key: "filterCommercialCredit", href: toV2("/commercial-credit") },
        ],
      },
      {
        heading: "megaMicrofinanceHeading",
        links: [{ key: "megaMfiScoreReport", href: toV2("/microfinance"), descKey: "productMfiDesc" }],
      },
    ],
    feature: {
      titleKey: "productIndividualsTitle",
      bodyKey: "productIndividualsDesc",
      ctaKey: "productGetStarted",
      href: toV2("/choose-subscription"),
      image: `${CIBIL_ART}/ind-banner.png`,
    },
  },
  {
    key: "navKnowledge",
    href: toV2("/credit-advice"),
    columns: [
      {
        heading: "megaCreditBasicsHeading",
        links: [
          { key: "megaNewToCredit", href: toV2("/new-to-credit") },
          { key: "filterCreditAdvice", href: toV2("/credit-advice") },
          { key: "filterCreditMyths", href: toV2("/credit-myths") },
          { key: "filterUnderstandingCibil", href: toV2("/faq-brochure") },
          { key: "megaWatchAndLearn", href: toV2("/watch-and-learn") },
        ],
      },
      {
        heading: "faqs",
        links: [
          { key: "megaUnderstandScoreReport", href: toV2("/faq/understand-your-credit-score-and-report") },
          { key: "megaCreditScoreLoanBasics", href: toV2("/faq/credit-score-and-loan-basics") },
          { key: "megaLoanRejectionsDisputes", href: toV2("/faq/loan-rejections-disputes") },
          { key: "megaScoreSimulatorFaqs", href: toV2("/faq/score-simulator") },
          { key: "megaPurchasePostPurchase", href: toV2("/faq/purchase-post-purchase-help") },
          { key: "megaRankCompanyFaqs", href: toV2("/faq/company-credit-report") },
          { key: "megaConsumerAwareness", href: toV2("/faq/consumer-awareness") },
        ],
      },
      {
        heading: "footerCreditEducation",
        links: [
          { key: "footerBlog", href: toV2("/blog/main") },
          { key: "megaCibilJaagran", href: toV2("/jaagran") },
          { key: "featCibilSaksham", href: toV2("/cibil-saksham") },
        ],
      },
    ],
    feature: {
      titleKey: "articleCrashCourse",
      bodyKey: "learnSubtitle",
      ctaKey: "megaWatchAndLearn",
      href: toV2("/watch-and-learn"),
      image: `${CIBIL_ART}/video-banner-yt.png`,
    },
  },
  {
    key: "navGrievance",
    href: toV2("/consumer-dispute-resolution"),
    columns: [
      {
        heading: "megaGrievanceRedressalHeading",
        links: [
          { key: "megaConsumerDisputeResolution", href: toV2("/consumer-dispute-resolution") },
          { key: "megaCompanyDisputeResolution", href: toV2("/company-dispute-resolution") },
          { key: "megaMfiDisputeResolution", href: toV2("/microfinance-dispute-resolution") },
          { key: "megaComplaintsEscalations", href: toV2("/complaints-and-escalations") },
        ],
      },
      {
        heading: "megaResourcesHeading",
        links: [
          { key: "megaConsumerEnquiry", href: toV2("/enquiry") },
          { key: "megaCommercialEnquiry", href: toV2("/enquiryccr") },
          { key: "megaFrameworkCompensation", href: toV2("/framework-for-compensation") },
          { key: "megaNodalOfficerList", href: toV2("/nodal-officer-list") },
        ],
      },
    ],
    feature: {
      titleKey: "disputeHeroTitle",
      bodyKey: "disputeFreeServiceBanner",
      ctaKey: "disputeHeroBtn",
      href: toV2("/consumer-dispute-resolution"),
      image: `${CIBIL_ART}/service-banner.png`,
    },
  },
  {
    key: "navSupport",
    href: toV2("/contact-us"),
    columns: [
      {
        heading: "quickLinksHeading",
        links: [
          { key: "sitemapContactUsLink", href: toV2("/contact-us") },
          { key: "megaNodalOfficerList", href: toV2("/nodal-officer-list") },
          { key: "searchTitle", href: toV2("/search") },
          { key: "footerSitemap", href: toV2("/sitemap") },
        ],
      },
      {
        heading: "sitemapMyAccount",
        links: [
          { key: "login", href: toV2("/login") },
          { key: "createAccountLink", href: toV2("/register") },
        ],
      },
    ],
  },
  {
    key: "navAbout",
    href: toV2("/about-us"),
    columns: [
      {
        heading: "footerCorpAboutUsHeading",
        links: [
          { key: "footerAboutTransunionCibil", href: toV2("/about-us") },
          { key: "footerCompanyHistory", href: toV2("/about-us/company-history") },
          { key: "footerOfficialPartners", href: toV2("/official-partners") },
          { key: "footerCodeOfConduct", href: toV2("/external-links/business-code-of-conduct") },
        ],
      },
      {
        heading: "footerInformation",
        links: [
          { key: "footerRegulatoryDisclosure", href: toV2("/regulatory") },
          { key: "footerRbiNotifications", href: toV2("/external-links/rbi-notifications") },
          { key: "footerOverview", href: toV2("/suit-filed-cases/overview") },
          { key: "privacyPolicy", href: toV2("/privacy-policy") },
          { key: "termsConditions", href: toV2("/legal/terms-and-conditions") },
        ],
      },
    ],
  },
];

/** Footer columns. Same link set as V1's footer, pointed at V2. */
export const V2_FOOTER_COLUMNS: NavColumn[] = [
  {
    heading: "footerAboutUs",
    links: [
      { key: "footerAboutTransunionCibil", href: toV2("/about-us") },
      { key: "footerCompanyHistory", href: toV2("/about-us/company-history") },
      { key: "footerSupport", href: toV2("/contact-us") },
      { key: "footerOfficialPartners", href: toV2("/official-partners") },
      { key: "footerCodeOfConduct", href: toV2("/external-links/business-code-of-conduct") },
    ],
  },
  {
    heading: "footerInformation",
    links: [
      { key: "footerNonSuitCases", href: toV2("/suit-filed-cases/suit-filed-cases") },
      { key: "footerOverview", href: toV2("/suit-filed-cases/overview") },
      { key: "footerGistRbiScheme", href: toV2("/suit-filed-cases/gist-rbi-scheme") },
      { key: "footerRbiNotifications", href: toV2("/external-links/rbi-notifications") },
      { key: "footerRegulatoryDisclosure", href: toV2("/regulatory") },
    ],
  },
  {
    heading: "footerCreditEducation",
    links: [
      { key: "footerBlog", href: toV2("/blog/main") },
      { key: "filterCreditAdvice", href: toV2("/credit-advice") },
      { key: "megaNewToCredit", href: toV2("/new-to-credit") },
      { key: "megaWatchAndLearn", href: toV2("/watch-and-learn") },
      { key: "megaCibilJaagran", href: toV2("/jaagran") },
    ],
  },
];

export const V2_FOOTER_LEGAL: NavLink[] = [
  { key: "privacyPolicy", href: toV2("/privacy-policy") },
  { key: "footerTermsOfUse", href: toV2("/legal/terms-and-conditions") },
  { key: "footerSitemap", href: toV2("/sitemap") },
  { key: "footerReportVulnerability", href: toV2("/contact-us") },
];

export const V2_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/credit-information-bureau-india-limited" },
  { label: "Facebook", href: "https://www.facebook.com/CIBIL-329225453912063/" },
  { label: "YouTube", href: "https://www.youtube.com/user/CIBILonline" },
  { label: "Instagram", href: "https://instagram.com/transunion_cibil/" },
] as const;
