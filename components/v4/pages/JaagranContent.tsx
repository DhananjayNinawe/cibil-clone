"use client";

import Image from "next/image";
import { Reveal } from "@/components/v4/motion/Reveal";
import { ButtonLink, TextLink } from "@/components/v4/ui/Button";
import {
  AlertIcon,
  ChartIcon,
  DocumentIcon,
  PlayIcon,
  ScoreIcon,
  UsersIcon,
  type IconProps,
} from "@/components/v4/ui/Icons";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import Tabs, { type TabItem } from "@/components/v4/ui/Tabs";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * CIBIL Jaagran — the awareness campaign, not a product.
 *
 * This is a public-good programme, so it is the one page in the library allowed to *declare* rather
 * than list: it opens on a night band with the wordmark set at display weight, and the argument runs
 * as a sequence of tonal bands — what it is, why it matters, the one fear that stops people looking
 * (checking your own score does not lower it), then the material itself.
 *
 * What V4 does not do is borrow V1's costume for it. V1 draws a cartoon of a woman, three coins and
 * a bar chart in a pastel gradient, and hangs a gold pill off it. V4's gold means one thing — *this
 * is you* — and its heroes are typographic. The campaign's weight comes from the tone change and the
 * scale of the type, which is what a national credit-literacy campaign should look like anyway.
 *
 * The wordmark itself — CIBIL JAAG₹AN — is set as the brand writes it. Both tokens are on the
 * allowlist in `scripts/check-i18n.mjs` precisely because they are a trademark, not copy.
 */

const CIBIL_BLOG = "https://www.cibil.com/blog";
const KAHAANIYAAN_ART = "https://www.cibil.com/content/dam/cibil/consumer/ack";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

interface Video {
  key: string;
  youtubeId: string;
  title: TranslationKey;
  topics: TranslationKey[];
}

interface Blog {
  key: string;
  title: TranslationKey;
  image: string;
  href: string;
  topics: TranslationKey[];
}

const FILTERS: TranslationKey[] = [
  "filterFeatured", // V1's name for the unfiltered view — everything matches it
  "filterNewToCredit",
  "filterCreditAdvice",
  "filterCreditMyths",
  "filterCommercialCredit",
  "filterUnderstandingCibil",
];

const VIDEOS: Video[] = [
  {
    key: "five-simple-ways",
    youtubeId: "5kzfjlJ5s1o",
    title: "jaagranVideoFiveSimpleWays",
    topics: ["filterNewToCredit", "filterCreditAdvice"],
  },
  {
    key: "four-factors",
    youtubeId: "VOHHGpDfd-8",
    title: "jaagranVideoFourFactors",
    topics: ["filterUnderstandingCibil", "filterCreditAdvice", "filterCreditMyths"],
  },
  {
    key: "building-profile",
    youtubeId: "VOHHGpDfd-8",
    title: "jaagranVideoBuildingProfile",
    topics: ["filterNewToCredit", "filterUnderstandingCibil", "filterCommercialCredit"],
  },
];

const BLOGS: Blog[] = [
  {
    key: "maintain-healthy-score",
    title: "jaagranBlogMaintainHealthyScore",
    image: `${CIBIL_BLOG}/new-to-credit-heres-how-to-maintain-a-healthy-cibil-score/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.png/1699255454828/ntc-credit.png`,
    href: `${CIBIL_BLOG}/new-to-credit-heres-how-to-maintain-a-healthy-cibil-score/`,
    topics: ["filterNewToCredit", "filterCreditAdvice", "filterUnderstandingCibil"],
  },
  {
    key: "first-time-users",
    title: "jaagranBlogFirstTimeUsers",
    image: `${CIBIL_BLOG}/first-time-users-guide-to-establishing-credit-infographic/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.png/1671208834821/first-time-users-guide.png`,
    href: `${CIBIL_BLOG}/first-time-users-guide-to-establishing-credit-infographic/`,
    topics: ["filterNewToCredit", "filterCreditAdvice"],
  },
  {
    key: "stability-in-your-forties",
    title: "jaagranBlogStabilityForties",
    image: `${CIBIL_BLOG}/set-yourself-up-in-your-twenties-for-financial-stability-in-your-fourties/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.png/1696483648677/stability-in-your-fourties-.png`,
    href: `${CIBIL_BLOG}/set-yourself-up-in-your-twenties-for-financial-stability-in-your-fourties/`,
    topics: ["filterCreditAdvice", "filterCreditMyths"],
  },
  {
    key: "credit-roadmap",
    title: "jaagranBlogCreditRoadmap",
    image: `${CIBIL_BLOG}/how-to-create-your-financial-and-credit-roadmap/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.jpeg/1671208803156/credit-roadmap.jpeg`,
    href: `${CIBIL_BLOG}/how-to-create-your-financial-and-credit-roadmap/`,
    topics: ["filterCreditAdvice", "filterCommercialCredit", "filterCreditMyths"],
  },
  {
    key: "millennials-guide",
    title: "jaagranBlogMillennialsGuide",
    image: `${CIBIL_BLOG}/millennial-consumer-pattern/_jcr_content/root/pagesection_1639233989/image.coreimg.75.1440.jpeg/1671208513747/millenial.jpeg`,
    href: `${CIBIL_BLOG}/millennial-consumer-pattern/`,
    topics: ["filterNewToCredit", "filterCreditMyths", "filterCommercialCredit"],
  },
];

const KAHAANIYAAN: { title: TranslationKey; image: string }[] = [
  { title: "jaagranComicDreamCar", image: `${KAHAANIYAAN_ART}/c1.jpg` },
  { title: "jaagranComicCreditCard", image: `${KAHAANIYAAN_ART}/c2.jpg` },
  { title: "jaagranComicDreamCollege", image: `${KAHAANIYAAN_ART}/c3.jpg` },
  { title: "jaagranComicNeighbourhoodStore", image: `${KAHAANIYAAN_ART}/c4.jpg` },
  { title: "jaagranComicCibilMyths", image: `${KAHAANIYAAN_ART}/c5.jpg` },
];

const FEATURES: { Glyph: (p: IconProps) => React.ReactElement; title: TranslationKey; desc: TranslationKey }[] = [
  { Glyph: ScoreIcon, title: "jaagranFeat1Title", desc: "jaagranFeat1Desc" },
  { Glyph: ChartIcon, title: "jaagranFeat2Title", desc: "jaagranFeat2Desc" },
  { Glyph: UsersIcon, title: "jaagranFeat3Title", desc: "jaagranFeat3Desc" },
];

const WHY: [TranslationKey, TranslationKey][] = [
  ["jaagranWhy1Title", "jaagranWhy1Desc"],
  ["jaagranWhy2Title", "jaagranWhy2Desc"],
  ["jaagranWhy3Title", "jaagranWhy3Desc"],
];

const CHECKS: { Glyph: (p: IconProps) => React.ReactElement; label: TranslationKey }[] = [
  { Glyph: DocumentIcon, label: "jaagranCheck1" },
  { Glyph: AlertIcon, label: "jaagranCheck2" },
  { Glyph: ChartIcon, label: "jaagranCheck3" },
];

/** A video, as a real link that plays. Wide and short — this is a row, not a poster. */
function VideoCard({ video, index }: { video: Video; index: number }) {
  const { t, t4 } = useV4();

  return (
    <Reveal as="li" index={index}>
      <a
        href={watch(video.youtubeId)}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="v4-plane relative aspect-video overflow-hidden">
          <Image
            src={yt(video.youtubeId)}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 32vw"
            className="object-cover transition-transform duration-700 ease-[var(--v4-ease)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-13 w-13 items-center justify-center rounded-full bg-[rgba(255,255,255,0.92)] text-[var(--v4-deep)] shadow-[var(--v4-shadow-2)]">
              <PlayIcon size={24} />
            </span>
          </span>
        </div>
        <h4 className="mt-3.5 text-[0.9375rem] font-bold leading-snug group-hover:text-[var(--v4-accent)]">
          {t(video.title)}
          <span className="v4-sr"> {t4("v4OpensInNewTab")}</span>
        </h4>
      </a>
    </Reveal>
  );
}

/** A blog, as a real link. These ones *do* have bodies — they live on cibil.com. */
function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const { t, t4 } = useV4();

  return (
    <Reveal as="li" index={index}>
      <article className="v4-plane v4-plane-lift flex h-full flex-col overflow-hidden">
        <div className="relative aspect-16/10">
          <Image
            src={blog.image}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 p-5">
          <h4 className="text-[0.9375rem] font-bold leading-snug">{t(blog.title)}</h4>
          <a
            href={blog.href}
            target="_blank"
            rel="noopener noreferrer"
            className="v4-link self-start text-[0.875rem]"
          >
            {t("jaagranReadNow")}
            <span className="v4-sr"> {t4("v4OpensInNewTab")}</span>
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function JaagranContent() {
  const { t } = useV4();

  const panelFor = (filter: TranslationKey) => {
    const matches = (topics: TranslationKey[]) =>
      filter === "filterFeatured" || topics.includes(filter);

    const videos = VIDEOS.filter((video) => matches(video.topics));
    const blogs = BLOGS.filter((blog) => matches(blog.topics));

    return (
      <div className="grid gap-14">
        {videos.length > 0 ? (
          <section aria-labelledby={`v4-jg-videos-${filter}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 id={`v4-jg-videos-${filter}`} className="v4-h3">
                {t("jaagranVideosHeading")}
              </h3>
              <TextLink href={toV4("/watch-and-learn")}>{t("jaagranWatchMore")}</TextLink>
            </div>
            <ul className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, i) => (
                <VideoCard key={video.key} video={video} index={i} />
              ))}
            </ul>
          </section>
        ) : null}

        {blogs.length > 0 ? (
          <section aria-labelledby={`v4-jg-blogs-${filter}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 id={`v4-jg-blogs-${filter}`} className="v4-h3">
                {t("jaagranBlogsHeading")}
              </h3>
              {/* V1 sends this to "/blog", which is not a route on this site — /blog/main is. */}
              <TextLink href={toV4("/blog/main")}>{t("jaagranReadMoreBlogs")}</TextLink>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, i) => (
                <BlogCard key={blog.key} blog={blog} index={i} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    );
  };

  const tabs: TabItem[] = FILTERS.map((filter) => ({
    id: filter,
    label: t(filter),
    panel: panelFor(filter),
  }));

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navKnowledge"), href: toV4("/credit-advice") }}
        label={t("jaagranTagline")}
        title={
          <>
            CIBIL <span className="v4-mark-word">JAAG₹AN</span>
          </>
        }
        lede={t("jaagranMission")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("jaagranHeroCta")}
          </ButtonLink>
        }
      />

      {/* ── What it is ──────────────────────────────────────────────────────────────────────── */}
      <Section space="md" aria-labelledby="v4-jg-about">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <SectionHead
                id="v4-jg-about"
                label={t("megaCibilJaagran")}
                title={t("jaagranAboutHeading")}
              />
              <p className="v4-body mt-6">{t("jaagranAboutPara1")}</p>
              <p className="v4-body mt-4">{t("jaagranAboutPara2")}</p>
              <p className="v4-body mt-8 border-l-2 border-[var(--v4-marker-line)] pl-5">
                <strong className="font-bold text-[var(--v4-fg)]">{t("jaagranMissionLabel")}</strong>{" "}
                {t("jaagranMission")}
              </p>
            </div>

            <ul className="grid content-start gap-4">
              {FEATURES.map(({ Glyph, title, desc }, i) => (
                <Reveal as="li" key={title} index={i}>
                  <div className="v4-plane flex items-start gap-4 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--v4-r-sm)] bg-[var(--v4-surface-2)] text-[var(--v4-accent)]">
                      <Glyph size={20} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1rem] font-bold leading-snug">{t(title)}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                        {t(desc)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Why it matters ──────────────────────────────────────────────────────────────────── */}
      <Section tone="tint" space="md" aria-labelledby="v4-jg-why">
        <Container width="wide">
          <SectionHead
            id="v4-jg-why"
            label={t("megaResourcesHeading")}
            title={t("jaagranWhyMattersHeading")}
          />
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {WHY.map(([title, desc], i) => (
              <Reveal as="li" key={title} index={i}>
                <div className="border-t-2 border-[var(--v4-edge-2)] pt-5">
                  <span aria-hidden="true" className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="v4-h3 mt-3">{t(title)}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                    {t(desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── The one fear that stops people looking. A night band, and the page's quiet centre. ── */}
      <Section tone="night" space="md" aria-labelledby="v4-jg-free">
        <Container>
          <h2 id="v4-jg-free" className="v4-h2 text-center">
            {t("jaagranDontWorry")}
          </h2>

          <ul className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-3">
            {CHECKS.map(({ Glyph, label }, i) => (
              <Reveal as="li" key={label} index={i} className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-[var(--v4-r-md)] border border-[var(--v4-edge-2)] bg-[var(--v4-surface)] text-[var(--v4-accent)]">
                  <Glyph size={22} />
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">{t(label)}</p>
              </Reveal>
            ))}
          </ul>

          <div className="v4-plane mx-auto mt-12 flex max-w-2xl flex-col items-center gap-5 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[0.9375rem] text-[var(--v4-fg-2)]">{t("jaagranCheckFree")}</p>
            <ButtonLink href={toV4("/register")} className="shrink-0">
              {t("jaagranGetFreeScore")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ── The material ────────────────────────────────────────────────────────────────────── */}
      <Section space="lg" aria-labelledby="v4-jg-learn">
        <Container width="wide">
          <SectionHead
            id="v4-jg-learn"
            label={t("footerCreditEducation")}
            title={t("jaagranLearnHeading")}
          />
          <div className="mt-10">
            {/* A real tablist: arrow keys move across the six topics, one Tab press leaves the
                strip. V1's six chips cost a keyboard user six Tab presses to get past. */}
            <Tabs items={tabs} label={t("topicsHeading")} />
          </div>
        </Container>
      </Section>

      {/* ── CIBIL Ki Kahaaniyaan — the comics. ──────────────────────────────────────────────── */}
      <Section tone="tint" space="lg" aria-labelledby="v4-jg-comics">
        <Container width="wide">
          <SectionHead
            id="v4-jg-comics"
            label={t("jaagranIntroducing")}
            title={t("jaagranKahaaniyaan")}
          />

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {KAHAANIYAAN.map((chapter, i) => (
              <Reveal as="li" key={chapter.title} variant="focus" index={i}>
                <article>
                  <div className="v4-plane relative aspect-4/3 overflow-hidden">
                    <Image
                      src={chapter.image}
                      // The comic *is* the content here — its panels carry the story, and no
                      // caption beside it substitutes. So it takes the chapter's title as its
                      // text alternative rather than an empty alt.
                      alt={t(chapter.title)}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="v4-label mt-4">
                    {t("jaagranChapterLabel")}{" "}
                    <span className="v4-num">{String(i + 1).padStart(2, "0")}</span>
                  </p>
                  <h3 className="mt-2 text-[1rem] font-bold leading-snug">{t(chapter.title)}</h3>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
