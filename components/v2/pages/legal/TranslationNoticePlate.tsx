"use client";

import TranslationNotice from "@/components/shared/TranslationNotice";

/**
 * The "English original prevails" banner, on V2's dark canvas.
 *
 * The banner itself is V1's `components/shared/TranslationNotice` — the same component, imported,
 * not reimplemented: it owns both the copy (`legalTranslationNotice`) and the rule that decides
 * when the disclaimer applies (never on English). Duplicating either into V2 would be duplicating
 * a legal safeguard, and the copy could then drift away from the document it disclaims.
 *
 * What it does not own is V2's palette — it paints a pale `#e6f7fd` card for V1's white pages,
 * which on this canvas would read as a slip of paper torn out of another site. So it is *wrapped*,
 * never edited: the arbitrary-variant classes below retint its one `<p>` from the outside. Each
 * `[&>p]:…` selector compiles to `.wrapper > p` — a class plus an element — so it outranks the
 * plain single-class utilities baked into the banner without a single `!important`.
 *
 * The spacing is applied to that `<p>` rather than to this wrapper on purpose: on English the
 * banner renders nothing, and a wrapper carrying its own margin would leave a hole behind it.
 */
export default function TranslationNoticePlate() {
  return (
    <div className="[&>p]:mb-12 [&>p]:rounded-[var(--v2-r-md)] [&>p]:border-l-2 [&>p]:border-[var(--v2-cyan)] [&>p]:bg-[rgba(0,176,240,0.08)] [&>p]:px-5 [&>p]:py-4 [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-[var(--v2-text-2)] [&>p]:backdrop-blur-sm">
      <TranslationNotice />
    </div>
  );
}
