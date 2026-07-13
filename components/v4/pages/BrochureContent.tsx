"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import { ArrowRightIcon } from "@/components/v4/ui/Icons";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { Reveal, Tick } from "@/components/v4/motion/Reveal";
import { FAQ_TOPICS, FAQ_TOTAL, FAQ_VIDEO_TOTAL, type FaqTopic } from "@/components/v4/faq/topics";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * `/v4/faq-brochure` — the front door of the help system.
 *
 * V1 files this page as a two-tab accordion whose second tab says "content coming soon", with the
 * seven real FAQ pages nowhere on it: they exist only as a column of the mega-menu. So the help
 * system has no home, and a reader with a question has to guess which of seven titles hides it.
 *
 * V4 makes this page the *directory*. It is deliberately not another wall of accordions — a hub
 * whose treatment is identical to the leaves teaches the reader nothing about where they are. It is
 * a set of planes, one per topic, each stating how many questions it answers and showing three of
 * them verbatim. That preview is the whole point: a card that reads "Loan Rejections and Disputes"
 * repeats the menu, while a card showing "How will I know the status of my dispute?" answers the
 * only question the reader actually has, which is *is my question in there*.
 *
 * The counts come from `faq/topics.ts` and are facts about this site, not claims about credit — the
 * one kind of number V4 is allowed to author.
 */
export default function BrochureContent() {
  const { t } = useV4();

  return (
    <>
      <PageHero
        tone="night"
        label={t("filterUnderstandingCibil")}
        title={t("brochurePageTitle")}
        lede={t("brochureFooterText")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("sidebarGetScoreReportBtn")}
          </ButtonLink>
        }
        aside={<Scale />}
      />

      {/* ── Who CIBIL is. V1's first tab, set as an article rather than an accordion: it is the one
          thing on the page that is prose, and hiding prose behind a plus sign is not disclosure, it
          is a lid. ─────────────────────────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-brochure-about">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
            <h2 id="v4-brochure-about" className="v4-h2">
              {t("brochureTab1")}
            </h2>
            <div className="v4-prose">
              <p>{t("brochureTab1Para1")}</p>
              <p>{t("brochureTab1Para2")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The directory. ──────────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" space="lg" aria-labelledby="v4-brochure-topics">
        <Container width="wide">
          <SectionHead id="v4-brochure-topics" label={t("faqs")} title={t("topicsHeading")} />

          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FAQ_TOPICS.map((topic, i) => (
              <Reveal key={topic.href} as="li" index={i % 3}>
                <TopicCard topic={topic} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

/**
 * The hero's aside: how big this help system is, in three numbers.
 *
 * A `<dl>` rather than a grid of styled divs, because that is exactly what it is — three terms and
 * their values — and it is the difference between a screen reader announcing "Topics, 7" and
 * announcing "7 Topics 52 FAQs 5 Videos" as one run-on string.
 */
function Scale() {
  const { t } = useV4();

  const rows: { key: TranslationKey; value: number }[] = [
    { key: "topicsHeading", value: FAQ_TOPICS.length },
    { key: "faqs", value: FAQ_TOTAL },
    { key: "jaagranVideosHeading", value: FAQ_VIDEO_TOTAL },
  ];

  return (
    <dl className="v4-plane grid gap-px overflow-hidden bg-[var(--v4-edge)] sm:grid-cols-3">
      {rows.map((row) => (
        // `flex-col-reverse`: the term precedes its value in the DOM, as the spec requires, while the
        // figure reads above its label on screen. Reversing it in CSS keeps both true at once.
        <div
          key={row.key}
          className="flex flex-col-reverse gap-3 bg-[var(--v4-surface)] px-6 py-7"
        >
          <dt className="v4-label">{t(row.key)}</dt>
          <dd className="v4-num text-[2.25rem] font-medium leading-none text-[var(--v4-fg)]">
            <Tick value={String(row.value)} />
            {/* The ticking figure is `aria-hidden` — a counter wired into the accessibility tree is
                read out on every frame. The number it lands on still has to be *in* the document. */}
            <span className="v4-sr">{row.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * One topic. The whole plane is the target — the `after:inset-0` on the title's anchor stretches its
 * hit area over the card, which keeps the accessible name on the heading (one link, one name) while
 * giving a mouse the 300px rectangle it expects. A card wrapped in an anchor instead would announce
 * the count and all three preview questions as part of the link's name.
 */
function TopicCard({ topic }: { topic: FaqTopic }) {
  const { t } = useV4();

  return (
    <article className="v4-plane v4-plane-lift relative flex h-full flex-col p-6 sm:p-7">
      <h3 className="v4-h3">
        <Link
          href={topic.href}
          className="group flex items-start justify-between gap-4 after:absolute after:inset-0 after:content-['']"
        >
          <span>{t(topic.key)}</span>
          <ArrowRightIcon
            size={18}
            className="mt-1 shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Link>
      </h3>

      <p className="v4-caption mt-2">
        <span className="v4-num font-bold text-[var(--v4-fg-2)]">{topic.count}</span>{" "}
        {t(topic.unit)}
      </p>

      <ul className="mt-6 grid gap-2.5 border-t border-[var(--v4-edge)] pt-6">
        {topic.peek.map((question) => (
          <li key={question} className="relative pl-4 text-[0.875rem] leading-snug text-[var(--v4-fg-3)]">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.5em] h-[5px] w-[5px] rounded-[1px] bg-[var(--v4-mark)]"
            />
            {t(question)}
          </li>
        ))}
      </ul>
    </article>
  );
}
