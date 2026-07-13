"use client";

import { useState } from "react";
import Image from "next/image";
import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import {
  JAAGRAN_BLOGS,
  JAAGRAN_CHECKS,
  JAAGRAN_COMICS,
  JAAGRAN_FILTERS,
  JAAGRAN_OFFERS,
  JAAGRAN_VIDEOS,
  JAAGRAN_WHY,
  youtubeStill,
  youtubeWatch,
} from "@/lib/v3/jaagranData";
import { Container, Section, SectionHead, Folio } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import Rule from "@/components/v3/ui/Rule";
import Steps from "@/components/v3/ui/Steps";
import Reveal from "@/components/v3/motion/Reveal";
import { ArrowUpRight, Play } from "@/components/v3/ui/Icons";

/**
 * CIBIL JAAG₹AN — the campaign.
 *
 * A campaign page has to raise its voice once, and V3 gives it exactly one place to do it: the ink
 * band carrying the campaign's whole argument in a single display line — *checking your own credit
 * score won't lower it* — with the three things a check buys you numbered beneath it. Everything
 * else on the page is quiet by comparison, which is what makes that band land.
 *
 * The wordmark is the masthead: CIBIL roman, JAAG₹AN italic, set at display scale. It stays in
 * Latin script in every locale — it is a logotype, and it is allowlisted as one.
 *
 * The topic strip below "Learn about credit" is the ruled index (the same gesture as the home
 * library): choosing a topic re-sets the programme listing and the reading list beneath it.
 */
export default function JaagranContent() {
  const { t, t3 } = useV3();
  const [filter, setFilter] = useState<TranslationKey>("filterFeatured");

  const matches = (topics: TranslationKey[]) =>
    filter === "filterFeatured" || topics.includes(filter);

  const videos = JAAGRAN_VIDEOS.filter((video) => matches(video.topics));
  const blogs = JAAGRAN_BLOGS.filter((blog) => matches(blog.topics));

  return (
    <>
      <PageHeader
        size="full"
        folio={t("jaagranTagline")}
        title={["CIBIL", <span key="wordmark" className="v3-em">JAAG₹AN</span>]}
        actions={
          <Button href={toV3("/register")} size="lg" arrow>
            {t("jaagranHeroCta")}
          </Button>
        }
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("navKnowledge"), href: toV3("/blog/main") },
          { label: t("megaCibilJaagran") },
        ]}
      />

      {/* ── About: the argument in the left column, the mission pinned in the margin beneath it. */}
      <Section space="lg">
        <Container>
          <SectionHead
            index="01"
            folio={t3("v3AtAGlance")}
            title={t("jaagranAboutHeading")}
            lede={t("jaagranAboutPara1")}
          />

          <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-[1.15fr_1fr]">
            <Reveal variant="rise">
              <p className="max-w-[58ch] text-pretty text-base leading-relaxed text-[var(--v3-fg-2)]">
                {t("jaagranAboutPara2")}
              </p>
            </Reveal>

            <Reveal variant="rise" delay={90}>
              <Callout tone="success" title={t("jaagranMissionLabel")}>
                <p>{t("jaagranMission")}</p>
              </Callout>
            </Reveal>
          </div>

          {/* What the programme offers, numbered. */}
          <Steps
            className="mt-16"
            layout="score"
            steps={JAAGRAN_OFFERS.map(([title, desc]) => ({
              title: t(title),
              body: <p>{t(desc)}</p>,
            }))}
          />
        </Container>
      </Section>

      {/* ── Why it matters: three ruled entries, read across. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <h2 className="v3-h2 text-balance">{t("jaagranWhyMattersHeading")}</h2>
          <Rule className="mt-8" />

          <div className="grid gap-x-12 sm:grid-cols-3">
            {JAAGRAN_WHY.map(([title, desc], i) => (
              <Reveal key={title} variant="rise" delay={i * 80}>
                <div className="border-b border-[var(--v3-line)] py-8 sm:border-b-0 sm:border-r sm:pr-10 sm:last:border-r-0">
                  <span aria-hidden className="v3-num block text-xs text-[var(--v3-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="v3-h3 mt-5 text-pretty">{t(title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--v3-fg-2)]">{t(desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── The campaign statement. The one moment the page raises its voice. */}
      <Section space="xl" tone="ink" className="overflow-hidden">
        <div aria-hidden className="v3-columns" />

        <Container className="relative">
          <Folio index="02">{t("jaagranTagline")}</Folio>

          <h2 className="v3-display mt-10 max-w-[18ch] text-balance">{t("jaagranDontWorry")}</h2>

          <ol className="mt-16 grid gap-px bg-[var(--v3-line)] sm:grid-cols-3">
            {JAAGRAN_CHECKS.map((check, i) => (
              <li key={check} className="bg-[var(--v3-bg)] p-6 sm:p-8">
                <span aria-hidden className="v3-num block text-3xl text-[var(--v3-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-base leading-snug text-[var(--v3-fg)]">{t(check)}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
            <p className="v3-lede max-w-[34ch] text-pretty">{t("jaagranCheckFree")}</p>
            <Button href={toV3("/register")} size="lg" arrow>
              {t("jaagranGetFreeScore")}
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── The library, filtered by topic: a programme listing, then a reading list. */}
      <Section space="lg" ruled>
        <Container>
          <SectionHead index="03" folio={t("navKnowledge")} title={t("jaagranLearnHeading")} />

          <div
            role="tablist"
            aria-label={t("jaagranLearnHeading")}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-1 border-b border-[var(--v3-line-2)]"
          >
            {JAAGRAN_FILTERS.map((key) => {
              const selected = key === filter;
              return (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setFilter(key)}
                  className={`v3-focus v3-num -mb-px cursor-pointer border-b-2 py-4 text-xs font-medium tracking-[0.08em] transition-colors ${
                    selected
                      ? "border-[var(--v3-fg)] text-[var(--v3-fg)]"
                      : "border-transparent text-[var(--v3-fg-3)] hover:text-[var(--v3-fg)]"
                  }`}
                >
                  {t(key)}
                </button>
              );
            })}
          </div>

          {/* `key={filter}` remounts the listing, so a new topic is *set* rather than swapped. */}
          <div key={filter}>
            {videos.length > 0 && (
              <section className="mt-14">
                <div className="flex items-end justify-between gap-6">
                  <h3 className="v3-h3">{t("jaagranVideosHeading")}</h3>
                  <Button href={toV3("/watch-and-learn")} variant="link" arrow>
                    {t("jaagranWatchMore")}
                  </Button>
                </div>

                <ol className="mt-6 border-t border-[var(--v3-line-2)]">
                  {videos.map((video, i) => (
                    <Reveal key={video.key} as="li" variant="rise" delay={i * 70}>
                      <a
                        href={youtubeWatch(video.youtubeId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="v3-focus v3-row group grid grid-cols-[1fr_auto] items-center gap-x-6 border-b border-[var(--v3-line)] py-5 sm:gap-x-10"
                      >
                        <div className="min-w-0">
                          <p className="v3-folio mb-2 flex items-center gap-2">
                            <Play />
                            <span>{t("jaagranVideosHeading")}</span>
                          </p>
                          <h4 className="text-pretty text-base leading-snug font-medium text-[var(--v3-fg)]">
                            <span className="v3-link-draw">{t(video.title)}</span>
                            <ArrowUpRight
                              aria-hidden
                              className="ml-1.5 inline-block align-baseline text-xs text-[var(--v3-fg-3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </h4>
                        </div>

                        {/* The film still, cropped square in a ruled frame. */}
                        <span className="v3-plate v3-plate-mount relative hidden h-16 w-28 shrink-0 sm:block">
                          <Image
                            src={youtubeStill(video.youtubeId)}
                            alt=""
                            fill
                            unoptimized
                            sizes="112px"
                            className="object-cover"
                          />
                        </span>
                      </a>
                    </Reveal>
                  ))}
                </ol>
              </section>
            )}

            {blogs.length > 0 && (
              <section className="mt-16">
                <div className="flex items-end justify-between gap-6">
                  <h3 className="v3-h3">{t("jaagranBlogsHeading")}</h3>
                  <Button href={toV3("/blog/main")} variant="link" arrow>
                    {t("jaagranReadMoreBlogs")}
                  </Button>
                </div>

                <ol className="mt-6 border-t border-[var(--v3-line-2)]">
                  {blogs.map((blog, i) => (
                    <Reveal key={blog.key} as="li" variant="rise" delay={i * 70}>
                      <a
                        href={blog.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="v3-focus v3-row group grid grid-cols-[1fr_auto] items-center gap-x-6 border-b border-[var(--v3-line)] py-5 sm:gap-x-10"
                      >
                        <div className="min-w-0">
                          <p className="v3-folio mb-2">{t("blogTag")}</p>
                          <h4 className="text-pretty text-base leading-snug font-medium text-[var(--v3-fg)]">
                            <span className="v3-link-draw">{t(blog.title)}</span>
                          </h4>
                          <p className="v3-caption mt-2">{t("jaagranReadNow")}</p>
                        </div>

                        <span className="v3-plate v3-plate-mount relative hidden h-16 w-28 shrink-0 sm:block">
                          <Image
                            src={blog.image}
                            alt=""
                            fill
                            unoptimized
                            sizes="112px"
                            className="object-cover"
                          />
                        </span>
                      </a>
                    </Reveal>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </Container>
      </Section>

      {/* ── CIBIL Ki Kahaaniyaan: five plated chapters, read down like a serial. */}
      <Section space="lg" tone="sunken" ruled>
        <Container>
          <SectionHead index="04" folio={t("jaagranIntroducing")} title={t("jaagranKahaaniyaan")} />

          <ol className="mt-4">
            {JAAGRAN_COMICS.map((comic, i) => (
              <Reveal key={comic.key} as="li" variant="rise" delay={i * 60}>
                <article className="grid grid-cols-[1fr_auto] items-center gap-x-6 border-b border-[var(--v3-line)] py-6 sm:gap-x-12 sm:py-7">
                  <div className="min-w-0">
                    <p className="v3-folio mb-3">
                      {t("jaagranChapterLabel")} <span className="v3-num">{i + 1}</span>
                    </p>
                    <h3 className="v3-h3 text-pretty">{t(comic.title)}</h3>
                  </div>

                  <span className="v3-plate v3-plate-mount relative h-20 w-24 shrink-0 sm:h-28 sm:w-40">
                    <Image
                      src={comic.image}
                      alt={t(comic.title)}
                      fill
                      unoptimized
                      sizes="160px"
                      className="object-cover"
                    />
                  </span>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
