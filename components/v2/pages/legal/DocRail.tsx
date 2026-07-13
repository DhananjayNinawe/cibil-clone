"use client";

import { useEffect, useState } from "react";
import { useV2 } from "@/lib/v2/useV2";

export interface DocSection {
  /** Anchor id. Stable across locales — the data files guarantee it, or it is derived from index. */
  id: string;
  /** Pre-translated heading. */
  label: string;
}

/**
 * The in-page table of contents for a long document, plus the reading-progress cue.
 *
 * `<SideNav>` is the sibling of this component and cannot do its job: SideNav derives "active"
 * from the *pathname*, which is right for a cluster of pages and useless inside one 6,000-word
 * page. So this rail derives it from scroll position instead, and wears the same clothes — same
 * eyebrow, same tick-and-label row, same active treatment — so a page that shows both (the
 * suit-filed documents show the section nav above this) reads as one rail, not two widgets.
 *
 * Both readouts come from a single rAF-throttled scroll listener, because they are the same
 * measurement: where the reader is inside `bodyId`.
 */
export default function DocRail({
  sections,
  bodyId,
  numbered = true,
  className = "",
}: {
  sections: DocSection[];
  /** Element the progress bar measures — the document body wrapper. */
  bodyId: string;
  /** Headings that already carry their own numbering (“I. Terms…”) opt out. */
  numbered?: boolean;
  className?: string;
}) {
  const { t, tv } = useV2();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  // The caller rebuilds `sections` on every render (it is derived from `t()` and the language),
  // so depending on the array itself would tear down and re-attach the scroll listener on every
  // render. The ids are what the effect actually reads, and they only change when the document does.
  const ids = sections.map((section) => section.id).join("|");

  useEffect(() => {
    const sectionIds = ids.split("|").filter(Boolean);
    let ticking = false;

    const measure = () => {
      ticking = false;

      const body = document.getElementById(bodyId);
      if (body) {
        const rect = body.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        // Measured against the middle of the viewport, not its top edge: the reader is reading
        // what is in front of them, so the document is "finished" when its end reaches the fold,
        // not when it has been scrolled entirely off screen.
        const seen = window.scrollY + window.innerHeight / 2 - top;
        setProgress(rect.height > 0 ? Math.min(1, Math.max(0, seen / rect.height)) : 0);
      }

      // The last heading to have crossed the read-line is the one being read.
      let current = sectionIds[0] ?? "";
      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= 160) current = sectionId;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, bodyId]);

  return (
    // `lg:self-start`: as a grid item this rail would otherwise stretch to the full height of
    // the document column beside it, and a sticky box that is already as tall as its container
    // never sticks — the table of contents would scroll away with the text it is meant to track.
    <nav aria-label={t("termsTocHeading")} className={`lg:sticky lg:top-28 lg:self-start ${className}`}>
      <p className="v2-eyebrow mb-5 text-[var(--v2-text-3)]">{tv("v2OnThisPage")}</p>

      <div className="flex gap-5">
        {/* The reading-progress cue: one hairline that fills as the document is consumed. It is a
            real progressbar, so a screen reader can ask how far in it is. */}
        <div
          role="progressbar"
          aria-label={tv("v2ReadingProgress")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="relative hidden w-px shrink-0 rounded-full bg-[var(--v2-line)] lg:block"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 rounded-full bg-[var(--v2-cyan)] shadow-[0_0_12px_rgba(0,176,240,0.9)] transition-[height] duration-200 ease-[var(--v2-ease)]"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        <ol className="min-w-0 flex-1 space-y-0.5 lg:max-h-[58vh] lg:overflow-y-auto">
          {sections.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`v2-focus flex gap-3 rounded-[var(--v2-r-sm)] px-3 py-2 text-[13px] leading-snug transition-colors duration-300 ${
                    active
                      ? "bg-[rgba(0,176,240,0.10)] font-bold text-[var(--v2-cyan)]"
                      : "text-[var(--v2-text-2)] hover:bg-[var(--v2-surface)] hover:text-[var(--v2-text)]"
                  }`}
                >
                  {numbered && (
                    <span
                      aria-hidden
                      className={`shrink-0 tabular-nums ${active ? "text-[var(--v2-cyan)]" : "text-[var(--v2-text-3)]"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                  <span className="min-w-0">{section.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
