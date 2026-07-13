import type { TranslationKey } from "@/lib/i18n";

/**
 * The sitemap maps the pages this site actually has — every href resolves to a real
 * route under app/. It is deliberately NOT a copy of cibil.com's sitemap, which lists
 * a large B2B catalog (Bureau Analyzer, CreditVision, DecisionEdge, …) that does not
 * exist here; linking to those would produce dead links.
 */
export interface SitemapLink {
  key: TranslationKey;
  href: string;
}

export interface SitemapGroup {
  /** Omitted for a headless group, whose links sit directly under the column title. */
  key?: TranslationKey;
  /**
   * When set, the group heading is itself a link (rendered in the teal link style,
   * e.g. "About TransUnion CIBIL"). Without it the heading is plain section text
   * (e.g. "Credit Report Products").
   */
  href?: string;
  links: SitemapLink[];
}

export interface SitemapColumn {
  key: TranslationKey;
  href: string;
  groups: SitemapGroup[];
}

const personal: SitemapColumn = {
  key: "navPersonal",
  href: "/",
  groups: [
    {
      key: "sitemapCreditReportProducts",
      links: [
        { key: "megaCibilScoreReport", href: "/cibil-score-report" },
        { key: "sitemapFreeScoreReport", href: "/freecibilscore" },
        { key: "sitemapSubscriptionPlans", href: "/choose-subscription" },
        { key: "featCibilAlerts", href: "/cibil-alerts" },
        { key: "featScoreSimulator", href: "/score-simulator" },
      ],
    },
    {
      key: "footerCreditEducation",
      links: [
        { key: "filterCreditAdvice", href: "/credit-advice" },
        { key: "megaNewToCredit", href: "/new-to-credit" },
        { key: "filterCreditMyths", href: "/credit-myths" },
        { key: "filterUnderstandingCibil", href: "/faq-brochure" },
        { key: "megaWatchAndLearn", href: "/watch-and-learn" },
        { key: "megaCibilJaagran", href: "/jaagran" },
        { key: "featCibilSaksham", href: "/cibil-saksham" },
        { key: "footerBlog", href: "/blog/main" },
      ],
    },
    {
      key: "sitemapMyAccount",
      links: [
        { key: "login", href: "/login" },
        { key: "createAccountLink", href: "/register" },
      ],
    },
  ],
};

const business: SitemapColumn = {
  key: "navBusiness",
  href: "/commercial-credit",
  groups: [
    {
      key: "sitemapCreditReportProducts",
      links: [
        { key: "sitemapRankCompanyReport", href: "/company-credit-report" },
        { key: "filterCommercialCredit", href: "/commercial-credit" },
        { key: "megaMfiScoreReport", href: "/microfinance" },
      ],
    },
    {
      key: "sitemapHelpCenter",
      links: [
        { key: "megaConsumerAwareness", href: "/faq/consumer-awareness" },
        { key: "megaCreditScoreLoanBasics", href: "/faq/credit-score-and-loan-basics" },
        { key: "megaLoanRejectionsDisputes", href: "/faq/loan-rejections-disputes" },
        { key: "megaUnderstandScoreReport", href: "/faq/understand-your-credit-score-and-report" },
        { key: "megaPurchasePostPurchase", href: "/faq/purchase-post-purchase-help" },
        { key: "megaScoreSimulatorFaqs", href: "/faq/score-simulator" },
        { key: "megaRankCompanyFaqs", href: "/faq/company-credit-report" },
      ],
    },
  ],
};

const supportAndAbout: SitemapColumn = {
  key: "sitemapSupportAbout",
  href: "/contact-us",
  groups: [
    {
      key: "megaGrievanceRedressalHeading",
      links: [
        { key: "megaConsumerDisputeResolution", href: "/consumer-dispute-resolution" },
        { key: "megaCompanyDisputeResolution", href: "/company-dispute-resolution" },
        { key: "megaMfiDisputeResolution", href: "/microfinance-dispute-resolution" },
        { key: "megaComplaintsEscalations", href: "/complaints-and-escalations" },
        { key: "megaConsumerEnquiry", href: "/enquiry" },
        { key: "megaCommercialEnquiry", href: "/enquiryccr" },
        { key: "megaFrameworkCompensation", href: "/framework-for-compensation" },
        { key: "megaNodalOfficerList", href: "/nodal-officer-list" },
      ],
    },
    { key: "footerCorpAboutUsHeading", links: [] },
    {
      key: "footerAboutTransunionCibil",
      href: "/about-us",
      links: [
        { key: "footerCompanyHistory", href: "/about-us/company-history" },
        { key: "sitemapContactUsLink", href: "/contact-us" },
        { key: "footerOfficialPartners", href: "/official-partners" },
      ],
    },
    {
      key: "footerCorpSuitFiledHeading",
      href: "/suit-filed-cases/overview",
      links: [
        // Labels reuse the suit-filed-cases sidebar keys so the sitemap reads the same as that section's own nav.
        { key: "suitFiledSideOverview", href: "/suit-filed-cases/overview" },
        { key: "suitFiledSideGist", href: "/suit-filed-cases/gist-rbi-scheme" },
        { key: "suitFiledSideSuit", href: "/suit-filed-cases/suit-filed-cases" },
        { key: "suitFiledSideNonSuit", href: "/suit-filed-cases/non-suit-filed-cases" },
        { key: "suitFiledSideRbi", href: "/external-links/rbi-notifications" },
        { key: "footerRegulatoryDisclosure", href: "/regulatory" },
      ],
    },
    { key: "searchTitle", href: "/search", links: [] },
    { key: "privacyPolicy", href: "/privacy-policy", links: [] },
    { key: "termsConditions", href: "/legal/terms-and-conditions", links: [] },
    { key: "footerCodeBusinessConduct", href: "/external-links/business-code-of-conduct", links: [] },
  ],
};

export const SITEMAP_COLUMNS: SitemapColumn[] = [personal, business, supportAndAbout];
