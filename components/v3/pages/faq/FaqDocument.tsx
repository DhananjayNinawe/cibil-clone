"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Accordion, { type AccordionItem } from "@/components/v3/ui/Accordion";
import MarginRail, { type RailLink } from "@/components/v3/ui/MarginRail";
import Callout from "@/components/v3/ui/Callout";
import Button from "@/components/v3/ui/Button";
import Reveal from "@/components/v3/motion/Reveal";
import Plate from "@/components/v3/motion/Plate";
import { ArrowRight, Play } from "@/components/v3/ui/Icons";

/**
 * The FAQ document — the one layout all eight pages of this cluster compose.
 *
 * Seven FAQ categories plus a brochure is the largest block of near-identical pages on the site,
 * and V1 answers that by repeating the same "questions on the left, yellow card on the right"
 * grid eight times. V3 answers it by treating an FAQ for what it is: a printed Q&A document.
 *
 *   · the masthead names the category and carries the trail;
 *   · the outer margin holds a sticky index of the questions — the real UX win here, because
 *     `loan-rejections-disputes` runs to eighteen questions and V1 gives you no way to find one;
 *   · the questions are ruled rows with a +/− at the end of the line, never grey boxes;
 *   · the "wait — what about my credit?" card becomes a marginal note with a rule down its edge;
 *   · and every page closes on the other seven, because the reader is always one wrong click from
 *     the category that actually holds their answer.
 *
 * Pages supply data. They do not supply layout.
 */

/* ── The eight destinations of the cluster. `key` is V1's own label for each. ─────────────── */
export const FAQ_CATEGORIES: { key: TranslationKey; href: string }[] = [
  { key: "megaUnderstandScoreReport", href: "/faq/understand-your-credit-score-and-report" },
  { key: "megaCreditScoreLoanBasics", href: "/faq/credit-score-and-loan-basics" },
  { key: "megaLoanRejectionsDisputes", href: "/faq/loan-rejections-disputes" },
  { key: "megaScoreSimulatorFaqs", href: "/faq/score-simulator" },
  { key: "megaPurchasePostPurchase", href: "/faq/purchase-post-purchase-help" },
  { key: "megaRankCompanyFaqs", href: "/faq/company-credit-report" },
  { key: "megaConsumerAwareness", href: "/faq/consumer-awareness" },
  { key: "filterUnderstandingCibil", href: "/faq-brochure" },
];

export interface FaqEntry extends AccordionItem {
  /** Required here, unlike on the primitive: every question is a rail destination. */
  id: string;
}

interface FaqDocumentProps {
  /** Which of FAQ_CATEGORIES this page is. Used for the trail and to omit it from the cross-links. */
  category: TranslationKey;
  /** Pre-translated. An array is set line by line. */
  title: ReactNode | ReactNode[];
  lede?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  /** Full-width, between the masthead and the document — the CIBIL Rank offer band uses it. */
  intro?: ReactNode;
  /** Rendered as `<Accordion numbered multiple>`, and indexed by the rail. */
  entries?: FaqEntry[];
  /** Overrides the rail when the body is not an accordion (the videos, the brochure). */
  rail?: RailLink[];
  /** The marginal note that replaces V1's sidebar card. */
  aside?: ReactNode;
  /** Body content after the questions — a disclaimer, a video ledger, a brochure. */
  children?: ReactNode;
}

export default function FaqDocument({
  category,
  title,
  lede,
  actions,
  media,
  intro,
  entries,
  rail,
  aside,
  children,
}: FaqDocumentProps) {
  const { t } = useV3();

  const railLinks: RailLink[] =
    rail ?? (entries ?? []).map((entry) => ({ id: entry.id, label: entry.question }));

  return (
    <>
      <PageHeader
        folio={t("faqs")}
        title={title}
        lede={lede}
        actions={actions}
        media={media}
        breadcrumbs={[
          { label: t("navKnowledge"), href: toV3("/credit-advice") },
          { label: t("faqs") },
          { label: t(category) },
        ]}
      />

      {intro}

      <Section space="md" as="div">
        <Container>
          <div className="grid gap-x-16 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
            {/* The index of the document, in the outer margin. Capped to the viewport and allowed
                to scroll inside itself, because eighteen questions is taller than most screens. */}
            <div>
              {railLinks.length > 0 && (
                <MarginRail
                  links={railLinks}
                  className="max-h-[calc(100vh-11rem)] overflow-y-auto pr-3"
                />
              )}
            </div>

            <div className="min-w-0">
              {entries && (
                <>
                  {/* The primitive sets each question as a level-3 heading; this is the level-2
                      they hang off, so the outline runs h1, h2, h3 without a gap. It has no
                      visual job — the folio in the masthead already says "FAQs" on the page. */}
                  <h2 className="sr-only">{t("faqs")}</h2>
                  <Accordion items={entries} numbered multiple />
                </>
              )}

              {children}

              {aside && <div className="mt-14">{aside}</div>}
            </div>
          </div>
        </Container>
      </Section>

      <FaqCrossLinks current={category} />
    </>
  );
}

/* ── The cross-reference block ────────────────────────────────────────────────────────────── */

/**
 * Every page in the cluster ends on the other seven, set as a numbered ruled index. An FAQ reader
 * who has landed in the wrong category should never have to go back to a menu to find the right
 * one — the answer they want is one line away at the foot of the page they are already on.
 */
function FaqCrossLinks({ current }: { current: TranslationKey }) {
  const { t, t3 } = useV3();
  const others = FAQ_CATEGORIES.filter((entry) => entry.key !== current);

  return (
    <Section space="md" tone="sunken" ruled>
      <Container>
        <SectionHead folio={t3("v3RelatedPages")} title={t("faqs")} />

        <ol className="mt-4">
          {others.map((entry, i) => (
            <Reveal key={entry.key} variant="rise" delay={i * 50} as="li">
              <Link
                href={toV3(entry.href)}
                className="v3-focus v3-row group flex items-baseline gap-5 border-b border-[var(--v3-line)] py-5 sm:gap-8"
              >
                <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1 text-pretty text-base text-[var(--v3-fg)] sm:text-lg">
                  <span className="v3-link-draw">{t(entry.key)}</span>
                </span>

                <ArrowRight
                  aria-hidden
                  className="shrink-0 text-base text-[var(--v3-fg-3)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]"
                />
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ── The marginal note ────────────────────────────────────────────────────────────────────── */

type NoteVariant = "score-report" | "subscribe" | "rank";

const NOTES: Record<NoteVariant, { body: TranslationKey; cta: TranslationKey; href: string }> = {
  "score-report": { body: "sidebarUnlimitedAccess", cta: "sidebarGetScoreReportBtn", href: "/register" },
  subscribe: { body: "sidebarMonitorReady", cta: "sidebarSubscribeNowBtn", href: "/choose-subscription" },
  rank: { body: "sidebarRankReport", cta: "sidebarGetYoursNowBtn", href: "/register" },
};

/**
 * V1's sidebar card — white cap, navy body, yellow pill — recomposed as what it always was: an
 * aside. A rule down the left edge, the question in a folio, the offer in prose, the action as a
 * stamped block. Same three strings, no card.
 */
export function FaqNote({ variant = "subscribe" }: { variant?: NoteVariant }) {
  const { t } = useV3();
  const note = NOTES[variant];

  return (
    <Callout tone="success" title={t("sidebarWaitTitle")}>
      <p className="max-w-[46ch] text-pretty">{t(note.body)}</p>
      <Button href={toV3(note.href)} variant="outline" size="sm" arrow className="mt-5">
        {t(note.cta)}
      </Button>
    </Callout>
  );
}

/* ── Shared answer furniture ──────────────────────────────────────────────────────────────── */

/** A paragraph inside an answer. Answers are prose; the accordion sets the measure. */
export function A({ children, italic = false }: { children: ReactNode; italic?: boolean }) {
  return <p className={`mb-3 last:mb-0 ${italic ? "italic" : ""}`}>{children}</p>;
}

/** An en-dashed list — the printed form. No dots anywhere in V3. */
export function Points({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-3 space-y-2 last:mb-0">
      {items.map((item, i) => (
        <li key={i} className="relative pl-6">
          <span aria-hidden className="absolute left-0 text-[var(--v3-fg-3)]">
            —
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A term and its definition, ruled — the shape of every "these are the sections of X" list. */
export function Defs({ items }: { items: { term: string; desc: string }[] }) {
  return (
    <dl className="mt-5 mb-3 border-t border-[var(--v3-line)] last:mb-0">
      {items.map((item) => (
        <div key={item.term} className="border-b border-[var(--v3-line)] py-4">
          <dt className="v3-folio mb-1.5 text-[var(--v3-fg)]">{item.term}</dt>
          <dd className="text-sm leading-relaxed text-[var(--v3-fg-2)]">{item.desc}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A video, as a plate you can click.
 *
 * The frame is ruled and square; the play mark is an engraved triangle in a box, not a red
 * rounded lozenge. The link's accessible name is the video's own title, which is why there is no
 * `aria-label` here inventing one.
 */
export function VideoPlate({
  videoId,
  title,
  thumb,
  caption = true,
  className = "",
}: {
  videoId: string;
  title: string;
  /** Defaults to YouTube's own still for the id. */
  thumb?: string;
  /** Off where the title is already printed beside the plate — it would be said twice. */
  caption?: boolean;
  className?: string;
}) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`v3-focus group block ${className}`}
    >
      {/* The alt text is the film's title, so the link has an accessible name with or without the
          caption below it — which is why there is no `aria-label` here inventing one. */}
      {/* `hqdefault`, not `maxresdefault`. YouTube generates hqdefault for every video; maxres
          only exists when the uploader happened to supply a high-resolution still, and when it
          does not, the still simply fails to load — which is exactly what "How to read your CIBIL
          Report" was doing. The rest of the codebase (lib/v3/libraryData.ts) already uses
          hqdefault for this reason. */}
      <Plate
        src={thumb ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        ratio="16 / 9"
        fit="cover"
        sizes="(max-width: 768px) 100vw, 420px"
      />

      {caption && (
        <span className="mt-3 flex items-baseline gap-2.5">
          <Play aria-hidden className="shrink-0 translate-y-0.5 text-sm text-[var(--v3-fg-3)]" />
          <span className="v3-link-draw text-sm leading-snug font-medium text-[var(--v3-fg)]">
            {title}
          </span>
        </span>
      )}
    </a>
  );
}

/**
 * The regional-language line: the five Indian languages the explainer videos are dubbed into,
 * set as a mono caption separated by rules. V1 makes each one an `href="#"` — a link that goes
 * nowhere is worse than the plain fact it was hiding, so V3 prints the fact.
 */
const REGIONAL: TranslationKey[] = ["langTamil", "langMalayalam", "langKannada", "langHindi", "langTelugu"];

export function RegionalLanguages() {
  const { t } = useV3();

  return (
    <p className="v3-caption mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
      {REGIONAL.map((key, i) => (
        <span key={key} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-[var(--v3-line-2)]" />}
          {t(key)}
        </span>
      ))}
    </p>
  );
}

/** A figure inside an answer — a flow diagram or a screenshot from the product. */
export function Figure({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  return (
    <Plate
      src={src}
      alt={alt}
      ratio={ratio}
      fit="contain"
      mount
      className="my-5"
      sizes="(max-width: 1024px) 100vw, 720px"
    />
  );
}
