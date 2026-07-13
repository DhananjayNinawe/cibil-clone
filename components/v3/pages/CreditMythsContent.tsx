"use client";

import { CREDIT_MYTHS_CARDS } from "@/lib/blogCards";
import Collection from "@/components/v3/collection/Collection";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/myths.jpg";

/** Credit Myths — the shortest collection: a lead story and a single index entry beneath it. */
export default function CreditMythsContent() {
  return (
    <Collection titleKey="creditMythsTitle" cards={CREDIT_MYTHS_CARDS} heroImage={HERO_IMAGE} />
  );
}
