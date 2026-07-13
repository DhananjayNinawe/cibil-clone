"use client";

import { useState } from "react";
import { PlusMinusCircleIcon } from "@/components/icons";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

/**
 * Plus/minus FAQ accordion.
 * `defaultOpenFirst` opens the first item on mount (matches the source pages).
 * `variant` — "divider" (rule between rows) or "card" (separate white cards, used on tinted sections).
 */
export default function FaqAccordion({
  items,
  defaultOpenFirst = false,
  variant = "divider",
}: {
  items: FaqItem[];
  defaultOpenFirst?: boolean;
  variant?: "divider" | "card";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenFirst ? 0 : null);
  const card = variant === "card";

  return (
    <div className={card ? "space-y-2" : undefined}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={i}
            className={card ? "rounded bg-white px-4 py-3.5 shadow-sm sm:px-6" : "border-b border-gray-200 py-4"}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-start gap-3 text-left"
            >
              <PlusMinusCircleIcon expanded={open} className="mt-0.5 h-5 w-5 shrink-0 text-[#00b0f0]" />
              <span className="text-sm font-bold text-gray-800">{item.question}</span>
            </button>
            {open && <div className="mt-3 ml-8 space-y-3 text-sm leading-relaxed text-gray-600">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
