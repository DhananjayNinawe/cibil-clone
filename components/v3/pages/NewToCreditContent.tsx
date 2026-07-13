"use client";

import { NEW_TO_CREDIT_CARDS, NEW_TO_CREDIT_HERO } from "@/lib/blogCards";
import Collection from "@/components/v3/collection/Collection";

/** New To Credit. V1 labels its cards "READ MORE" rather than "BLOG POST"; V3 keeps the label. */
export default function NewToCreditContent() {
  return (
    <Collection
      titleKey="newToCreditTitle"
      cards={NEW_TO_CREDIT_CARDS}
      heroImage={NEW_TO_CREDIT_HERO}
      ctaKey="blogReadMore"
    />
  );
}
