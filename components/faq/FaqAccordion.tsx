"use client";

import { useState } from "react";
import { PlusMinusCircleIcon } from "@/components/icons";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

/** Plus/minus FAQ accordion. `defaultOpenFirst` opens the first item on mount (matches the source pages). */
export default function FaqAccordion({ items, defaultOpenFirst = false }: { items: FaqItem[]; defaultOpenFirst?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenFirst ? 0 : null);

  return (
    <div>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i} className="border-b border-gray-200 py-4">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full flex items-start gap-3 text-left"
            >
              <PlusMinusCircleIcon expanded={open} className="w-5 h-5 text-[#00b0f0] mt-0.5 shrink-0" />
              <span className="font-bold text-sm text-gray-800">{item.question}</span>
            </button>
            {open && <div className="mt-3 ml-8 text-sm text-gray-600 leading-relaxed space-y-3">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
