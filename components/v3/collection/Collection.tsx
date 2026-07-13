"use client";

import Image from "next/image";
import type { BlogCard } from "@/lib/blogCards";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, Folio } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import ArticleCard from "@/components/v3/ui/ArticleCard";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Rule from "@/components/v3/ui/Rule";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";
import { Play } from "@/components/v3/ui/Icons";

interface CollectionProps {
  /** The section's name — becomes the <h1> and the last breadcrumb. */
  titleKey: TranslationKey;
  cards: BlogCard[];
  /** Artwork for the masthead spread. Without one, the headline runs into open space instead. */
  heroImage?: string;
  /** The label V1 prints under each card — "BLOG POST" here, "READ MORE" there. */
  ctaKey?: TranslationKey;
  /** A video collection: the lead carries a projector mark and the plates are film stills. */
  video?: boolean;
}

/**
 * The collection layout, shared by every Knowledge Center listing page.
 *
 * It is a newspaper spread, not a grid: one **lead story set large** — plate above a headline at
 * display scale — and then the rest of the collection as a **ruled index**, each entry a numbered
 * row with a small square plate at the end of the line. That hierarchy is the point. A five-across
 * grid of identical cards asserts that all sixty articles matter equally, which is never true of an
 * editorial collection, and it is what V1 and V2 both do.
 *
 * The strip above the index carries the section label on the left and the entry count on the right,
 * the way a printed index heads its column.
 *
 * Nothing here links to an article: V1's cards all point at `"#"` — there is no per-article route in
 * the codebase and none in `lib/blogCards.ts`. V3 does not ship a dead link, so the entries are set
 * as an index (which is what an unresolvable list of headlines actually is) and V1's card label is
 * kept as the index's own mark rather than dressed up as a link that goes nowhere.
 */
export default function Collection({
  titleKey,
  cards,
  heroImage,
  ctaKey = "blogPostLink",
  video = false,
}: CollectionProps) {
  const { t, language } = useV3();

  const [lead, ...rest] = cards;

  return (
    <>
      <PageHeader
        size="full"
        folio={t("navKnowledge")}
        title={t(titleKey)}
        lede={t("learnSubtitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("navKnowledge"), href: toV3("/blog/main") },
          { label: t(titleKey) },
        ]}
        media={
          heroImage ? (
            <Plate
              src={heroImage}
              alt=""
              ratio="16 / 9"
              fit="cover"
              mount
              drift
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          ) : undefined
        }
      />

      {/* ── The lead story. Set at editorial scale, alone on its line, with the page's one piece of
             open space to its right — the broadsheet equivalent of "above the fold". */}
      {lead && (
        <Section space="md">
          <Container>
            <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <Reveal variant="rise">
                <ArticleCard
                  lead
                  title={lead.title[language]}
                  category={t("blogTag")}
                  image={lead.image}
                  video={video}
                />
              </Reveal>

              <Reveal variant="fade" delay={180} className="lg:pb-2">
                <Folio index="01">{t(ctaKey)}</Folio>
                <p className="v3-lede mt-6 max-w-[32ch] text-pretty">{t("blogSubscribeBanner")}</p>
                <Button className="mt-8" href={toV3("/choose-subscription")} arrow>
                  {t("sidebarSubscribeNowBtn")}
                </Button>
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {/* ── The index. Every remaining entry, ruled, numbered, plated.
             A video collection takes the ink: a programme listing reads as a schedule board, and
             the plates keep their paper mounts, so the stills sit on the band as mounted prints. */}
      {rest.length > 0 && (
        <Section space="lg" tone={video ? "ink" : "sunken"} ruled>
          <Container>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="v3-h3">{t("topicsHeading")}</h2>
              <p className="v3-folio">
                <span className="v3-num">{cards.length}</span>
              </p>
            </div>

            <Rule className="mt-5" strong />

            <ol>
              {rest.map((card, i) => {
                const title = card.title[language];

                return (
                  <Reveal
                    key={`${title}-${i}`}
                    as="li"
                    variant="rise"
                    delay={Math.min(i, 6) * 60}
                  >
                    <article className="v3-row grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-5 border-b border-[var(--v3-line)] py-5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-8 sm:py-6">
                      <span aria-hidden className="v3-num text-xs text-[var(--v3-fg-3)]">
                        {String(i + 2).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <p className="v3-folio mb-2">{t("blogTag")}</p>
                        <h3 className="text-pretty text-base leading-snug font-medium text-[var(--v3-fg)]">
                          {title}
                        </h3>
                      </div>

                      {/* A small square plate — an index illustration, not a hero. On a video
                          collection it is a film still, marked with the projector glyph. */}
                      <span
                        aria-hidden
                        className="v3-plate v3-plate-mount relative hidden h-16 w-16 shrink-0 sm:block"
                      >
                        {card.image && (
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            unoptimized
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                        {video && (
                          <span className="absolute inset-0 flex items-center justify-center bg-[var(--v3-ink)]/25 text-[var(--v3-paper)]">
                            <Play className="text-base" />
                          </span>
                        )}
                      </span>
                    </article>
                  </Reveal>
                );
              })}
            </ol>
          </Container>
        </Section>
      )}

      {/* ── The disclaimer, set as a marginal note rather than grey small print in a corner. */}
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
