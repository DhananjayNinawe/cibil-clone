import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";

/**
 * The help system's own table of contents.
 *
 * V1 scatters these seven pages across a mega-menu column and nothing else: there is no page that
 * *is* the FAQ, only seven leaves you can reach if you already know they exist. V4 gives them a
 * front door (`/v4/faq-brochure`) and, because the door and the leaves must agree about what is
 * behind them, both read this file.
 *
 * Everything here is either a `TranslationKey` — resolved through `t()` at render, never free text —
 * or a count of the questions actually on the page. The count is a fact about *this site*, not a
 * claim about credit, which is the only kind of number V4 is allowed to author.
 *
 * `peek` is the scent: the first questions a topic answers, shown on the directory card. A card that
 * says only "Loan Rejections and Disputes" tells a reader nothing they did not already know from the
 * menu; a card that shows the question they came to ask does.
 */
export interface FaqTopic {
  /** The topic's name — V1's own nav label for it. */
  key: TranslationKey;
  href: string;
  /** How many questions (or videos) the page answers. */
  count: number;
  /** What the count counts: "FAQs", or "Videos" for the awareness page. */
  unit: TranslationKey;
  /** Three questions from the page, verbatim, as the card's preview. */
  peek: TranslationKey[];
}

export const FAQ_TOPICS: FaqTopic[] = [
  {
    key: "megaCreditScoreLoanBasics",
    href: toV4("/faq/credit-score-and-loan-basics"),
    count: 6,
    unit: "faqs",
    peek: ["csbQ1", "csbQ3", "csbQ4"],
  },
  {
    key: "megaUnderstandScoreReport",
    href: toV4("/faq/understand-your-credit-score-and-report"),
    count: 11,
    unit: "faqs",
    peek: ["ucsQ1", "ucsQ4", "ucsQ7"],
  },
  {
    key: "megaLoanRejectionsDisputes",
    href: toV4("/faq/loan-rejections-disputes"),
    count: 18,
    unit: "faqs",
    peek: ["lrdQ5", "lrdQ10", "lrdQ13"],
  },
  {
    key: "megaPurchasePostPurchase",
    href: toV4("/faq/purchase-post-purchase-help"),
    count: 4,
    unit: "faqs",
    peek: ["ppQ1", "ppQ3", "ppQ4"],
  },
  {
    key: "megaScoreSimulatorFaqs",
    href: toV4("/faq/score-simulator"),
    count: 5,
    unit: "faqs",
    peek: ["ssQ1", "ssQ3", "ssQ4"],
  },
  {
    key: "megaRankCompanyFaqs",
    href: toV4("/faq/company-credit-report"),
    count: 8,
    unit: "faqs",
    peek: ["ccrfQ1", "ccrfQ3", "ccrfQ6"],
  },
  {
    key: "megaConsumerAwareness",
    href: toV4("/faq/consumer-awareness"),
    count: 5,
    unit: "jaagranVideosHeading",
    peek: ["cavVideo1Title", "cavVideo3Title", "cavVideo5Title"],
  },
];

/** Every question the help system answers. Rendered on the hub, so the door states its own size. */
export const FAQ_TOTAL = FAQ_TOPICS.filter((topic) => topic.unit === "faqs").reduce(
  (sum, topic) => sum + topic.count,
  0,
);

export const FAQ_VIDEO_TOTAL = FAQ_TOPICS.filter(
  (topic) => topic.unit === "jaagranVideosHeading",
).reduce((sum, topic) => sum + topic.count, 0);
