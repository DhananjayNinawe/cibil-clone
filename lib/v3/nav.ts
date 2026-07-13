import type { TranslationKey } from "@/lib/i18n";
import { toV3 } from "@/lib/v3/routes";

/**
 * V3's information architecture.
 *
 * The taxonomy is the one CIBIL's users already have in their heads (V1's header), but the
 * *presentation* of it is the opposite of a mega menu: V3 has no dropdowns at all. The masthead
 * carries five plain words; opening the index replaces the page with a full-screen, numbered
 * table of contents — every destination in the site visible at once, set as a printed index
 * rather than hidden behind hover.
 *
 * That is why this file is a flat, ordered list of parts and entries rather than a tree of
 * panels: an index has no hover state to model. Labels are TranslationKeys, resolved with `t()`.
 */

export interface IndexEntry {
  key: TranslationKey;
  href: string;
  /** Optional one-line gloss — a second key, never free text. */
  descKey?: TranslationKey;
}

export interface IndexGroup {
  heading: TranslationKey;
  entries: IndexEntry[];
}

export interface IndexPart {
  /** Folio number for the part — "01", "02". A numeral, not language. */
  folio: string;
  key: TranslationKey;
  /** The part title is itself a destination — no dead ends. */
  href: string;
  groups: IndexGroup[];
}

export const V3_INDEX: IndexPart[] = [
  {
    folio: "01",
    key: "navProducts",
    href: toV3("/choose-subscription"),
    groups: [
      {
        heading: "megaIndividualsHeading",
        entries: [
          { key: "megaCibilScoreReport", href: toV3("/cibil-score-report"), descKey: "productIndividualsDesc" },
          { key: "featCibilAlerts", href: toV3("/cibil-alerts"), descKey: "loginStaySubtitle" },
          { key: "megaFreeCibilScore", href: toV3("/freecibilscore"), descKey: "planFreeAnnualDesc" },
          { key: "featScoreSimulator", href: toV3("/score-simulator"), descKey: "loginSimulatorSubtitle" },
          { key: "sitemapSubscriptionPlans", href: toV3("/choose-subscription") },
        ],
      },
      {
        heading: "megaBusinessesHeading",
        entries: [
          { key: "megaCompanyCreditReport", href: toV3("/company-credit-report"), descKey: "productBusinessDesc" },
          { key: "filterCommercialCredit", href: toV3("/commercial-credit") },
        ],
      },
      {
        heading: "megaMicrofinanceHeading",
        entries: [{ key: "megaMfiScoreReport", href: toV3("/microfinance"), descKey: "productMfiDesc" }],
      },
    ],
  },
  {
    folio: "02",
    key: "navKnowledge",
    href: toV3("/credit-advice"),
    groups: [
      {
        heading: "megaCreditBasicsHeading",
        entries: [
          { key: "megaNewToCredit", href: toV3("/new-to-credit") },
          { key: "filterCreditAdvice", href: toV3("/credit-advice") },
          { key: "filterCreditMyths", href: toV3("/credit-myths") },
          { key: "filterUnderstandingCibil", href: toV3("/faq-brochure") },
          { key: "megaWatchAndLearn", href: toV3("/watch-and-learn") },
        ],
      },
      {
        heading: "faqs",
        entries: [
          { key: "megaUnderstandScoreReport", href: toV3("/faq/understand-your-credit-score-and-report") },
          { key: "megaCreditScoreLoanBasics", href: toV3("/faq/credit-score-and-loan-basics") },
          { key: "megaLoanRejectionsDisputes", href: toV3("/faq/loan-rejections-disputes") },
          { key: "megaScoreSimulatorFaqs", href: toV3("/faq/score-simulator") },
          { key: "megaPurchasePostPurchase", href: toV3("/faq/purchase-post-purchase-help") },
          { key: "megaRankCompanyFaqs", href: toV3("/faq/company-credit-report") },
          { key: "megaConsumerAwareness", href: toV3("/faq/consumer-awareness") },
        ],
      },
      {
        heading: "footerCreditEducation",
        entries: [
          { key: "footerBlog", href: toV3("/blog/main") },
          { key: "megaCibilJaagran", href: toV3("/jaagran") },
          { key: "featCibilSaksham", href: toV3("/cibil-saksham") },
        ],
      },
    ],
  },
  {
    folio: "03",
    key: "navGrievance",
    href: toV3("/consumer-dispute-resolution"),
    groups: [
      {
        heading: "megaGrievanceRedressalHeading",
        entries: [
          { key: "megaConsumerDisputeResolution", href: toV3("/consumer-dispute-resolution") },
          { key: "megaCompanyDisputeResolution", href: toV3("/company-dispute-resolution") },
          { key: "megaMfiDisputeResolution", href: toV3("/microfinance-dispute-resolution") },
          { key: "megaComplaintsEscalations", href: toV3("/complaints-and-escalations") },
        ],
      },
      {
        heading: "megaResourcesHeading",
        entries: [
          { key: "megaConsumerEnquiry", href: toV3("/enquiry") },
          { key: "megaCommercialEnquiry", href: toV3("/enquiryccr") },
          { key: "megaFrameworkCompensation", href: toV3("/framework-for-compensation") },
          { key: "megaNodalOfficerList", href: toV3("/nodal-officer-list") },
        ],
      },
    ],
  },
  {
    folio: "04",
    key: "navSupport",
    href: toV3("/contact-us"),
    groups: [
      {
        heading: "quickLinksHeading",
        entries: [
          { key: "sitemapContactUsLink", href: toV3("/contact-us") },
          { key: "megaNodalOfficerList", href: toV3("/nodal-officer-list") },
          { key: "searchTitle", href: toV3("/search") },
          { key: "footerSitemap", href: toV3("/sitemap") },
        ],
      },
      {
        heading: "sitemapMyAccount",
        entries: [
          { key: "login", href: toV3("/login") },
          { key: "createAccountLink", href: toV3("/register") },
        ],
      },
    ],
  },
  {
    folio: "05",
    key: "navAbout",
    href: toV3("/about-us"),
    groups: [
      {
        heading: "footerCorpAboutUsHeading",
        entries: [
          { key: "footerAboutTransunionCibil", href: toV3("/about-us") },
          { key: "footerCompanyHistory", href: toV3("/about-us/company-history") },
          { key: "footerOfficialPartners", href: toV3("/official-partners") },
          { key: "footerCodeOfConduct", href: toV3("/external-links/business-code-of-conduct") },
        ],
      },
      {
        heading: "footerInformation",
        entries: [
          { key: "footerRegulatoryDisclosure", href: toV3("/regulatory") },
          { key: "footerRbiNotifications", href: toV3("/external-links/rbi-notifications") },
          { key: "footerOverview", href: toV3("/suit-filed-cases/overview") },
          { key: "footerNonSuitCases", href: toV3("/suit-filed-cases/suit-filed-cases") },
          { key: "footerGistRbiScheme", href: toV3("/suit-filed-cases/gist-rbi-scheme") },
          { key: "privacyPolicy", href: toV3("/privacy-policy") },
          { key: "termsConditions", href: toV3("/legal/terms-and-conditions") },
        ],
      },
    ],
  },
];

/** The five words in the masthead. Each is a part of the index above. */
export const V3_MASTHEAD: { key: TranslationKey; href: string }[] = V3_INDEX.map((part) => ({
  key: part.key,
  href: part.href,
}));

/** Footer columns. Same link set as V1's footer, pointed at V3. */
export const V3_FOOTER_COLUMNS: IndexGroup[] = [
  {
    heading: "footerAboutUs",
    entries: [
      { key: "footerAboutTransunionCibil", href: toV3("/about-us") },
      { key: "footerCompanyHistory", href: toV3("/about-us/company-history") },
      { key: "footerSupport", href: toV3("/contact-us") },
      { key: "footerOfficialPartners", href: toV3("/official-partners") },
      { key: "footerCodeOfConduct", href: toV3("/external-links/business-code-of-conduct") },
    ],
  },
  {
    heading: "footerInformation",
    entries: [
      { key: "footerNonSuitCases", href: toV3("/suit-filed-cases/suit-filed-cases") },
      { key: "footerOverview", href: toV3("/suit-filed-cases/overview") },
      { key: "footerGistRbiScheme", href: toV3("/suit-filed-cases/gist-rbi-scheme") },
      { key: "footerRbiNotifications", href: toV3("/external-links/rbi-notifications") },
      { key: "footerRegulatoryDisclosure", href: toV3("/regulatory") },
    ],
  },
  {
    heading: "footerCreditEducation",
    entries: [
      { key: "footerBlog", href: toV3("/blog/main") },
      { key: "filterCreditAdvice", href: toV3("/credit-advice") },
      { key: "megaNewToCredit", href: toV3("/new-to-credit") },
      { key: "megaWatchAndLearn", href: toV3("/watch-and-learn") },
      { key: "megaCibilJaagran", href: toV3("/jaagran") },
    ],
  },
];

export const V3_FOOTER_LEGAL: IndexEntry[] = [
  { key: "privacyPolicy", href: toV3("/privacy-policy") },
  { key: "footerTermsOfUse", href: toV3("/legal/terms-and-conditions") },
  { key: "footerSitemap", href: toV3("/sitemap") },
  { key: "footerReportVulnerability", href: toV3("/contact-us") },
];

export const V3_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/credit-information-bureau-india-limited" },
  { label: "Facebook", href: "https://www.facebook.com/CIBIL-329225453912063/" },
  { label: "YouTube", href: "https://www.youtube.com/user/CIBILonline" },
  { label: "Instagram", href: "https://instagram.com/transunion_cibil/" },
] as const;
