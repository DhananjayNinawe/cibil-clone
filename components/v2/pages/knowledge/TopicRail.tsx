"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";

/** The five Knowledge Center listings, in V1's own order (header mega-panel, "Credit Basics"). */
const TOPICS: { key: TranslationKey; href: string }[] = [
  { key: "newToCreditTitle", href: toV2("/new-to-credit") },
  { key: "creditAdviceTitle", href: toV2("/credit-advice") },
  { key: "creditMythsTitle", href: toV2("/credit-myths") },
  { key: "watchLearnTitle", href: toV2("/watch-and-learn") },
  { key: "commercialCreditTitle", href: toV2("/commercial-credit") },
];

/**
 * Topic filters that are real navigation.
 *
 * The five listings are five routes, so the pills are links, not state — the lit pill is the page
 * you are on (`aria-current`), and every other pill actually goes somewhere. It replaces V1's
 * dead-end "Topics" heading, which named the taxonomy without ever letting you move through it.
 */
export default function TopicRail() {
  const { t, tv } = useV2();
  const pathname = usePathname();

  return (
    <div className="relative border-y border-[var(--v2-line)] bg-[var(--v2-bg-2)] py-6">
      <Container>
        <Reveal variant="fade">
          <nav aria-label={tv("v2FiltersLabel")}>
            <ul className="flex flex-wrap items-center gap-2.5">
              <li className="v2-eyebrow mr-3 hidden text-[var(--v2-text-3)] sm:block">
                {tv("v2Explore")}
              </li>
              {TOPICS.map((topic) => {
                const active = pathname === topic.href;
                return (
                  <li key={topic.href}>
                    <Link
                      href={topic.href}
                      aria-current={active ? "page" : undefined}
                      className={`v2-focus block rounded-full border px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                        active
                          ? "border-[var(--v2-cyan)] bg-[rgba(0,176,240,0.12)] text-[var(--v2-cyan)] shadow-[0_0_24px_-6px_rgba(0,176,240,0.8)]"
                          : "border-[var(--v2-line-2)] text-[var(--v2-text-2)] hover:border-[var(--v2-text-3)] hover:text-[var(--v2-text)]"
                      }`}
                    >
                      {t(topic.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Reveal>
      </Container>
    </div>
  );
}
