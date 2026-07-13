"use client";

import { WATCH_LEARN_CARDS } from "@/lib/blogCards";
import Collection from "@/components/v3/collection/Collection";

const HERO_IMAGE =
  "https://www.cibil.com/content/dam/cibil/consumer/Blog-Banner-1440x460_Watchlearn.jpg";

/**
 * Watch and Learn — the one video-led collection.
 *
 * Same layout as its siblings, different voice: the lead carries the projector mark, the index runs
 * on an ink band, and each plate is a film still with the mark struck over it. A programme listing,
 * not a wall of thumbnails.
 */
export default function WatchAndLearnContent() {
  return (
    <Collection titleKey="watchLearnTitle" cards={WATCH_LEARN_CARDS} heroImage={HERO_IMAGE} video />
  );
}
