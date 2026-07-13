"use client";

import { CREDIT_ADVICE_CARDS } from "@/lib/blogCards";
import Collection from "@/components/v3/collection/Collection";

/**
 * Credit Advice — the largest collection on the site (sixty-odd entries), which is exactly why it
 * is set as a ruled index rather than a grid: sixty equal cards is a wall, sixty ruled entries is
 * a contents page you can run your finger down.
 *
 * No hero artwork on this one in V1 either, so the headline runs into open space instead.
 */
export default function CreditAdviceContent() {
  return <Collection titleKey="creditAdviceTitle" cards={CREDIT_ADVICE_CARDS} />;
}
