"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ScoreScale from "@/components/v4/viz/ScoreScale";
import PageHero from "@/components/v4/ui/PageHero";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The free annual report.
 *
 * This is the one page on the site where CIBIL gives something away, and the reader's only real
 * question is *what will I actually see?* V1 answers it with a stock illustration of a woman
 * holding a phone. V4 answers it with the score scale itself — the same instrument the home page
 * opens on, and the thing the reader is about to be handed a position on. The marker stays hollow:
 * we have not met them yet.
 *
 * Everything else on the page is V1's, in V1's order: what you get, the ten questions, the video,
 * and the three terms that govern the offer.
 */

/* ── The catalog's own inline markup ──────────────────────────────────────────────────────────
 * A handful of V1's strings carry `**bold**`, `[label](/href)` and `- ` list syntax, so a whole
 * sentence stays one key per locale rather than being split into prefix/link/suffix triples.
 * `lib/richText.tsx` already parses exactly this grammar and V4 would happily import it but for two
 * things: it emits V1's hrefs (a reader following a link out of a V4 answer lands in V1 mid-
 * journey), and it paints them in V1's grey palette (`text-gray-700`), which is invisible on a
 * night band. So the grammar is the same and the routing and the colour are not — every internal
 * href goes through `toV4()`, and nothing here sets a colour at all: `.v4-prose` styles the strong,
 * the link and the list from the adaptive tokens, which is what lets the same copy sit on day or
 * night without knowing which.
 */
const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE)) {
    const start = match.index;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    const [raw, bold, label, href] = match;
    if (bold) {
      nodes.push(<strong key={`${keyPrefix}-b${start}`}>{bold}</strong>);
    } else if (/^https?:/.test(href)) {
      nodes.push(
        <a
          key={`${keyPrefix}-a${start}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={`${keyPrefix}-a${start}`} href={toV4(href)}>
          {label}
        </Link>,
      );
    }
    cursor = start + raw.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/** Pre-translated copy only. Pass `t("key")` — never a literal. */
function RichText({ text, className = "" }: { text: string; className?: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {items.map((item, i) => (
          <li key={i}>{renderInline(item, `ul${blocks.length}-${i}`)}</li>
        ))}
      </ul>,
    );
  };

  for (const [i, line] of text.split("\n").entries()) {
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
      continue;
    }
    flushBullets();
    if (line.trim()) blocks.push(<p key={`p-${i}`}>{renderInline(line, `p${i}`)}</p>);
  }
  flushBullets();

  return <div className={`v4-prose ${className}`}>{blocks}</div>;
}

/* ── The page's data, all of it V1's ─────────────────────────────────────────────────────────── */

const DAM = "https://www.cibil.com/content/dam/cibil/consumer/facr";

const WHAT_YOU_GET: { icon: string; text: TranslationKey }[] = [
  { icon: "cibil_score", text: "fcsGet1" },
  { icon: "cibil_payment", text: "fcsGet2" },
  { icon: "personal_info", text: "fcsGet3" },
  { icon: "all_enquiry", text: "fcsGet4" },
  { icon: "loan_credit", text: "fcsGet5" },
];

const FAQS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "fcsFaq1", a: "fcsA1" },
  { q: "fcsFaq2", a: "fcsA2" },
  { q: "fcsFaq3", a: "fcsA3" },
  { q: "fcsFaq4", a: "fcsA4" },
  { q: "fcsFaq5", a: "fcsA5" },
  { q: "fcsFaq6", a: "fcsA6" },
  { q: "fcsFaq7", a: "fcsA7" },
  { q: "fcsFaq8", a: "fcsA8" },
  { q: "fcsFaq9", a: "fcsA9" },
  { q: "fcsFaq10", a: "fcsA10" },
];

const TERMS: TranslationKey[] = ["fcsTerm1", "fcsTerm2", "fcsTerm3"];

export default function FcsContent() {
  const { t, t4 } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navProducts"), href: toV4("/choose-subscription") }}
        label={t("megaFreeCibilScore")}
        title={t("fcsHeroTitle")}
        actions={
          <>
            <ButtonLink href={toV4("/register")} size="lg" arrow>
              {t("getFreeScoreBtn")}
            </ButtonLink>
            <span className="v4-caption self-center">
              {t("alreadyHaveAccount")}{" "}
              <Link href={toV4("/login")} className="v4-link">
                {t("logInLink")}
              </Link>
            </span>
          </>
        }
        aside={
          <div className="v4-plane p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="v4-h3">{t4("v4ScaleTitle")}</h2>
              <span className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]">
                {t4("v4ScaleRange")}
              </span>
            </div>

            <ScoreScale className="mt-8" />

            <p className="v4-caption mt-6 border-t border-[var(--v4-edge)] pt-5">
              {t4("v4ScaleGoodZone")}
            </p>
          </div>
        }
      />

      {/* ── What you get. The eligibility rule rides above it, because it decides whether the rest
             of the page applies to the reader at all. ──────────────────────────────────────── */}
      <Section tone="day" aria-labelledby="v4-fcs-get">
        <Container width="wide">
          <Notice tone="info" title={t("fcsFreeBanner")}>
            {t("fcsHeroEligibility")}
          </Notice>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <div>
              <SectionHead
                id="v4-fcs-get"
                label={t4("v4SectionStart")}
                title={t("fcsWhatYouGetHeading")}
              />
              <div className="mt-8">
                <ButtonLink href={toV4("/register")} arrow>
                  {t("getStartedNowBtn")}
                </ButtonLink>
              </div>
            </div>

            <ul className="grid gap-4">
              {WHAT_YOU_GET.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.text}
                  index={i}
                  className="v4-plane flex items-start gap-5 p-5 sm:p-6"
                >
                  {/* CIBIL's own report iconography, drawn for a white ground — so it gets one. */}
                  <span className="v4-mount flex h-14 w-14 shrink-0 items-center justify-center">
                    <Image
                      src={`${DAM}/${item.icon}.svg`}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                    />
                  </span>
                  <RichText text={t(item.text)} className="pt-1 !text-[0.9375rem]" />
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── The ten questions. ──────────────────────────────────────────────────────────────── */}
      <Section tone="tint" aria-labelledby="v4-fcs-faq">
        <Container>
          <SectionHead id="v4-fcs-faq" label={t("faqs")} title={t("fcsFaqHeading")} />

          <div className="mt-10">
            <DisclosureList>
              {FAQS.map(({ q, a }, i) => (
                <Disclosure key={q} question={t(q)} defaultOpen={i === 0}>
                  <RichText text={t(a)} />
                </Disclosure>
              ))}
            </DisclosureList>
          </div>
        </Container>
      </Section>

      {/* ── The video invitation. The one band on the page that raises its voice. ───────────── */}
      <Section tone="night" space="md" aria-labelledby="v4-fcs-video">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_auto] lg:gap-16">
            <div>
              <h2 id="v4-fcs-video" className="v4-h2 max-w-[36rem]">
                {t("fcsVideoBannerTitle")}
              </h2>
              <div className="mt-8">
                <ButtonLink href={toV4("/watch-and-learn")} size="lg" arrow>
                  {t("watchNowBtn")}
                </ButtonLink>
              </div>
            </div>

            <Reveal variant="focus" className="v4-mount shrink-0 p-6">
              <Image
                src={`${DAM}/Watch_and_learn.svg`}
                alt={t("fcsWatchLearnAlt")}
                width={240}
                height={185}
                unoptimized
                className="h-auto w-full max-w-60"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The terms. Small print, set as small print — but never hidden. ──────────────────── */}
      <Section tone="day" space="md" aria-labelledby="v4-fcs-terms">
        <Container width="wide">
          <h2 id="v4-fcs-terms" className="v4-h3">
            {t("fcsTermsHeading")}
          </h2>

          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {TERMS.map((term, i) => (
              <Reveal
                as="li"
                key={term}
                index={i}
                className="border-t border-[var(--v4-edge-2)] pt-5"
              >
                <span aria-hidden="true" className="v4-num text-[0.75rem] text-[var(--v4-fg-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="v4-caption mt-2.5">{t(term)}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
