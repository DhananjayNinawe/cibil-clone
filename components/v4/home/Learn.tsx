"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { TextLink } from "@/components/v4/ui/Button";
import { PlayIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Learn about credit.
 *
 * An editorial spread: one lead story with its artwork, four more listed beside it as a stack of
 * hairline-separated rows. Not a carousel, and not five identical tiles — a library has a front
 * table and a shelf, and they do not look the same.
 *
 * Every card here is a *teaser into a section that exists*. V1's version of this row renders the
 * same five articles behind filter chips that go nowhere; each one here resolves to the library
 * page it belongs to, because a card the reader cannot open is a card that should not be drawn.
 */

interface Story {
  category: TranslationKey;
  title: TranslationKey;
  image: string;
  href: string;
  video?: boolean;
}

const ART = "https://www.cibil.com/content/dam/cibil/homepage/shared";

const LEAD: Story = {
  category: "catVideoCreditAdvice",
  title: "articleCrashCourse",
  image: `${ART}/video-banner-yt.png`,
  href: toV4("/watch-and-learn"),
  video: true,
};

const STORIES: Story[] = [
  {
    category: "catBlogCreditAdvice",
    title: "articleAlertsTitle",
    image: `${ART}/alerts-banner.png`,
    href: toV4("/cibil-alerts"),
  },
  {
    category: "catBlogCreditAdvice",
    title: "articleBounceBackTitle",
    image: `${ART}/Can-You-Bounce-Back-From-A-Low-CIBIL%20-Score.jpg`,
    href: toV4("/credit-advice"),
  },
  {
    category: "catBlogCreditAdvice",
    title: "articleBusinessAccessTitle",
    image: `${ART}/Want-to-improve-access-to-credit-for-your-business-Here%CE%93%C3%87%C3%96s-how-to-do-it.jpg`,
    href: toV4("/commercial-credit"),
  },
  {
    category: "catBlogNewToCredit",
    title: "articleFirstTimeTitle",
    image: `${ART}/First-time-users-guide-to-establishing-credit.jpg`,
    href: toV4("/new-to-credit"),
  },
];

export default function Learn() {
  const { t, t4 } = useV4();

  return (
    <Section aria-labelledby="v4-learn-heading">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            id="v4-learn-heading"
            label={t4("v4SectionLearn")}
            title={
              <>
                {t("learnHeadingPrefix")}{" "}
                <span className="v4-mark-word">{t("learnHeadingBrand")}</span>
              </>
            }
            lede={t("learnSubtitle")}
          />
          <TextLink href={toV4("/credit-advice")} className="mb-1.5">
            {t4("v4ViewAll")}
          </TextLink>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* The lead story. */}
          <Reveal variant="focus">
            <Link href={LEAD.href} className="group block">
              <div className="v4-plane relative aspect-16/10 overflow-hidden">
                <Image
                  src={LEAD.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-[var(--v4-ease)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  unoptimized
                />
                {LEAD.video ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,255,255,0.92)] text-[var(--v4-deep)] shadow-[var(--v4-shadow-2)]">
                      <PlayIcon size={26} />
                    </span>
                  </span>
                ) : null}
              </div>
              <p className="v4-label mt-5">{t(LEAD.category)}</p>
              <h3 className="v4-h2 mt-3 group-hover:text-[var(--v4-accent)]">{t(LEAD.title)}</h3>
            </Link>
          </Reveal>

          {/* The shelf. */}
          <ul className="grid content-start">
            {STORIES.map((story, i) => (
              <li key={story.title}>
                <Reveal index={i}>
                  <Link
                    href={story.href}
                    className="group flex items-center gap-5 border-t border-[var(--v4-edge)] py-5 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="v4-label">{t(story.category)}</p>
                      <h3 className="mt-2 text-[1.0625rem] font-bold leading-snug tracking-[-0.012em] transition-colors group-hover:text-[var(--v4-accent)]">
                        {t(story.title)}
                      </h3>
                    </div>
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--v4-r-sm)] border border-[var(--v4-edge)]">
                      <Image
                        src={story.image}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
