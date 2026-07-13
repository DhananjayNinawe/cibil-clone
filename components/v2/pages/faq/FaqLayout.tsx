"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { FAQ_TOPICS, faqTopic } from "@/components/v2/pages/faq/hub";
import ScorePanel, { type ScorePanelVariant } from "@/components/v2/pages/faq/ScorePanel";
import PageHero from "@/components/v2/ui/PageHero";
import SideNav from "@/components/v2/ui/SideNav";
import Button from "@/components/v2/ui/Button";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import { ArrowRightIcon } from "@/components/icons";

interface FaqLayoutProps {
  /** Which of the seven topics this page is — drives the nav, the breadcrumb and the cross-links. */
  slug: string;
  /** Pre-translated. */
  title: string;
  titleAccent?: string;
  /** Pre-translated eyebrow — each topic gets its own, so the seven pages read as siblings. */
  eyebrow: string;
  lede?: ReactNode;
  cta?: { label: string; href: string };
  media?: ReactNode;
  tone?: "cyan" | "gold" | "duo" | "deep";
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  /** Full-width band between the hero and the reading column (the CCR offer strip uses it). */
  band?: ReactNode;
  /** Which conversion card rides in the rail. */
  panel?: ScorePanelVariant;
  children: ReactNode;
}

/**
 * The FAQ hub shell.
 *
 * Every topic page is a hero, a sticky rail (all seven topics + the conversion card) and a
 * reading column. The rail is what turns seven orphan pages into one section: the reader can
 * cross from "loan rejections" to "disputes" without ever returning to the mega menu.
 *
 * On a phone the rail would be 500px of chrome before the first question, so it is desktop-only
 * — the cross-links at the foot of the page carry the same wayfinding for every viewport, and
 * the conversion card is re-planted under the answers where a phone reader actually reaches it.
 */
export default function FaqLayout({
  slug,
  title,
  titleAccent,
  eyebrow,
  lede,
  cta,
  media,
  tone = "duo",
  size = "md",
  align = "left",
  band,
  panel = "subscribe",
  children,
}: FaqLayoutProps) {
  const { t, tv } = useV2();
  const current = faqTopic(slug);
  const others = FAQ_TOPICS.filter((topic) => topic.slug !== slug);

  return (
    <>
      <PageHero
        title={title}
        titleAccent={titleAccent}
        eyebrow={eyebrow}
        lede={lede}
        tone={tone}
        size={size}
        align={align}
        media={media}
        breadcrumbs={[
          { label: t("navKnowledge"), href: toV2("/credit-advice") },
          { label: t("faqs") },
          { label: t(current.labelKey) },
        ]}
        actions={
          cta && (
            <Button href={cta.href} size="lg" arrow magnetic>
              {cta.label}
            </Button>
          )
        }
      />

      {band}

      <Section space="lg">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,256px)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                <SideNav
                  links={FAQ_TOPICS.map((topic) => ({ label: t(topic.labelKey), href: topic.href }))}
                />
                <ScorePanel variant={panel} />
              </div>
            </div>

            <div className="min-w-0">
              {children}

              <div className="mt-14 lg:hidden">
                <ScorePanel variant={panel} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section space="lg" tone="raised" aria-labelledby="faq-more">
        <Container>
          <SectionHeading
            eyebrow={tv("v2Explore")}
            title={<span id="faq-more">{t("faqs")}</span>}
            lede={t("navKnowledge")}
          />

          <nav aria-label={tv("v2RelatedPages")} className="mt-12">
            <ul>
              {others.map((topic, index) => (
                <Reveal as="li" key={topic.slug} variant="up" delay={index * 60}>
                  <Link
                    href={topic.href}
                    className="v2-focus group flex items-center justify-between gap-8 border-t border-[var(--v2-line)] py-6 transition-colors duration-500 last:border-b hover:border-[rgba(0,176,240,0.4)]"
                  >
                    <span className="text-[15px] font-bold leading-snug text-[var(--v2-text-2)] transition-colors duration-300 group-hover:text-[var(--v2-cyan)]">
                      {t(topic.labelKey)}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--v2-line-2)] text-[var(--v2-text-3)] transition-all duration-500 ease-[var(--v2-ease)] group-hover:border-[var(--v2-cyan)] group-hover:bg-[rgba(0,176,240,0.12)] group-hover:text-[var(--v2-cyan)]"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>
    </>
  );
}
