"use client";

import Image from "next/image";
import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { BLOG_MAIN_CATEGORIES, BLOG_MAIN_FEATURED, BLOG_MAIN_HERO } from "@/lib/v3/jaagranData";
import { Container, Section, SectionHead } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { ArrowRight } from "@/components/v3/ui/Icons";

/**
 * The Knowledge Center front page — the paper's front page.
 *
 * Three movements, none of them a card grid:
 *   · the masthead, headline running across the spread with the banner plated beside it;
 *   · **the featured stories on an ink band** — four numbered entries, the page's one raised voice;
 *   · **the contents page** — the six collections as a ruled ledger, each with the number of
 *     entries filed under it, set in mono. A printed contents page tells you how much is there.
 *
 * The four featured headlines come from `lib/blogCards.ts`, which is locale-keyed — V1 types them
 * into the component in English, so they stay English in Hindi, Marathi and Tamil. They do not here.
 */
export default function BlogMainContent() {
  const { t, language } = useV3();

  return (
    <>
      <PageHeader
        size="full"
        folio={t("blogHeroSubtitle")}
        title={[t("blogHeroTitle")]}
        lede={t("learnSubtitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerBlog") },
        ]}
        media={
          <Plate
            src={BLOG_MAIN_HERO}
            alt=""
            ratio="4 / 3"
            fit="cover"
            mount
            drift
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      {/* ── Featured. The ink band: four stories, numbered, plated, and nothing else. */}
      <Section space="lg" tone="ink">
        <Container>
          <SectionHead index="01" folio={t("blogTag")} title={t("filterFeatured")} />

          <ol className="mt-4">
            {BLOG_MAIN_FEATURED.map((card, i) => {
              const title = card.title[language];

              return (
                <Reveal key={title} as="li" variant="rise" delay={i * 70}>
                  <article className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-5 border-b border-[var(--v3-line)] py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-8 sm:py-8">
                    <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <p className="v3-folio mb-3">{t("blogTag")}</p>
                      <h3 className="v3-h3 text-pretty">{title}</h3>
                    </div>

                    <span
                      aria-hidden
                      className="v3-plate v3-plate-mount relative hidden h-20 w-20 shrink-0 sm:block"
                    >
                      {card.image && (
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          unoptimized
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* ── The contents page: every collection, its size, and the way in. */}
      <Section space="lg" ruled>
        <Container>
          <SectionHead
            index="02"
            folio={t("blogCategoryLabel")}
            title={t("navKnowledge")}
            aside={
              <Button href={toV3("/credit-advice")} variant="link" arrow>
                {t("blogViewAllPlain")}
              </Button>
            }
          />

          <div className="mt-4">
            {BLOG_MAIN_CATEGORIES.map((category, i) => {
              const row = (
                <>
                  <span aria-hidden className="v3-num text-sm text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="v3-h3 min-w-0 text-pretty">
                    <span className={category.href ? "v3-link-draw" : ""}>{t(category.key)}</span>
                  </h3>

                  <p className="v3-folio">
                    {category.count !== undefined && (
                      <span className="v3-num">{category.count}</span>
                    )}
                  </p>

                  {category.href && (
                    <span className="v3-num flex shrink-0 items-center gap-2 text-xs tracking-[0.08em] text-[var(--v3-fg-2)] transition-colors group-hover:text-[var(--v3-accent)]">
                      <span className="hidden sm:inline">{t("blogViewAll")}</span>
                      <ArrowRight className="text-base transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                    </span>
                  )}
                </>
              );

              const shape =
                "grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-6 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[3.5rem_1fr_5rem_auto] sm:gap-x-10 sm:py-8";

              return (
                <Reveal key={category.key} variant="rise" delay={i * 60}>
                  {category.href ? (
                    <Link href={toV3(category.href)} className={`v3-focus v3-row group ${shape}`}>
                      {row}
                    </Link>
                  ) : (
                    /* Life Events has no destination anywhere on the site — V1 links it to "#".
                       It is listed, not linked: V3 does not ship a dead link. */
                    <div className={shape}>{row}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section space="md" ruled>
        <Container>
          <Callout tone="regulatory">
            <p>{t("blogDisclaimer")}</p>
          </Callout>
        </Container>
      </Section>
    </>
  );
}
