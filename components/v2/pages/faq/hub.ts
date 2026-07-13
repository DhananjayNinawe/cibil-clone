import type { TranslationKey } from "@/lib/i18n";
import { toV2 } from "@/lib/v2/routes";

/**
 * The seven topics of the FAQ hub.
 *
 * V1 ships them as seven unrelated pages, each reachable only from the mega menu. V2 treats
 * them as one section: this list drives the sticky side nav, the breadcrumb tail and the
 * cross-links at the foot of every topic — so a reader can move between topics without
 * going back to the nav, and adding a topic never means editing four places.
 *
 * `labelKey` is the label V1's own mega menu already uses for the page (lib/v2/nav.ts) —
 * no new copy, and the two navigations can never disagree.
 */
export interface FaqTopic {
  slug: string;
  labelKey: TranslationKey;
  href: string;
}

const TOPICS: [slug: string, labelKey: TranslationKey][] = [
  ["understand-your-credit-score-and-report", "megaUnderstandScoreReport"],
  ["credit-score-and-loan-basics", "megaCreditScoreLoanBasics"],
  ["loan-rejections-disputes", "megaLoanRejectionsDisputes"],
  ["score-simulator", "megaScoreSimulatorFaqs"],
  ["purchase-post-purchase-help", "megaPurchasePostPurchase"],
  ["company-credit-report", "megaRankCompanyFaqs"],
  ["consumer-awareness", "megaConsumerAwareness"],
];

export const FAQ_TOPICS: FaqTopic[] = TOPICS.map(([slug, labelKey]) => ({
  slug,
  labelKey,
  href: toV2(`/faq/${slug}`),
}));

export function faqTopic(slug: string): FaqTopic {
  const topic = FAQ_TOPICS.find((candidate) => candidate.slug === slug);
  // A slug that is not in the list is a programming error, not a runtime condition: every
  // caller is one of the seven pages in this folder.
  if (!topic) throw new Error(`Unknown FAQ topic: ${slug}`);
  return topic;
}
