"use client";

import { Reveal } from "@/components/v4/motion/Reveal";
import { ButtonLink } from "@/components/v4/ui/Button";
import {
  ChartIcon,
  CheckIcon,
  DocumentIcon,
  PlayIcon,
  ScaleIcon,
  UserIcon,
  type IconProps,
} from "@/components/v4/ui/Icons";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import Notice from "@/components/v4/ui/Notice";
import PageHero from "@/components/v4/ui/PageHero";
import Rail from "@/components/v4/ui/Rail";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * CIBIL Saksham — the credit-education courses.
 *
 * The other pages in this library are shelves. This one is a *syllabus*: it is read top to bottom,
 * it has five named parts, and a reader deciding whether to enrol wants to jump between them. So it
 * is the only page here built as a document — a sticky rail on the left that marks where you are in
 * gold, the prose in a single column at a real measure on the right. Nothing else in the section
 * looks like this, because nothing else in the section is a course prospectus.
 *
 * ── The raster ──────────────────────────────────────────────────────────────────────────────────
 * V1 ships "Each course includes:", its five items and the 60-day access note as a single PNG — text
 * baked into pixels. It cannot be selected, searched, translated or resized, and V1 knows it, which
 * is why it laboriously reassembles the same words into the image's `alt`. Every one of those words
 * already exists in the catalog (`sakshamIncludesHeading`, `sakshamInc1`…`5`, `sakshamAccessNote`),
 * so V4 simply sets them as text. Same content, in four languages, at any zoom level.
 */

const INCLUDES: { Glyph: (p: IconProps) => React.ReactElement; key: TranslationKey }[] = [
  { Glyph: DocumentIcon, key: "sakshamInc1" },
  { Glyph: PlayIcon, key: "sakshamInc2" },
  { Glyph: ChartIcon, key: "sakshamInc3" },
  { Glyph: ScaleIcon, key: "sakshamInc4" },
  { Glyph: CheckIcon, key: "sakshamInc5" },
];

const WHO: { boldKey: TranslationKey; key: TranslationKey }[] = [
  { boldKey: "sakshamWho1Bold", key: "sakshamWho1" },
  { boldKey: "sakshamWho2Bold", key: "sakshamWho2" },
];

interface Course {
  titleKey: TranslationKey;
  boldKey: TranslationKey;
  descKey: TranslationKey;
  ctaKey: TranslationKey;
}

const COURSES: Course[] = [
  {
    titleKey: "sakshamCourse1Title",
    boldKey: "sakshamCourse1Bold",
    descKey: "sakshamCourse1Desc",
    ctaKey: "learnMoreUpper",
  },
  {
    titleKey: "sakshamCourse2Title",
    boldKey: "sakshamCourse2Bold",
    descKey: "sakshamCourse2Desc",
    ctaKey: "learnNowUpper",
  },
];

const WHY: [TranslationKey, TranslationKey][] = [
  ["sakshamWhy1Bold", "sakshamWhy1"],
  ["sakshamWhy2Bold", "sakshamWhy2"],
  ["sakshamWhy3Bold", "sakshamWhy3"],
  ["sakshamWhy4Bold", "sakshamWhy4"],
];

export default function SakshamContent() {
  const { t } = useV4();

  const sections = [
    { id: "what", label: t("sakshamWhatHeading") },
    { id: "who", label: t("sakshamWhoHeading") },
    { id: "includes", label: t("sakshamIncludesHeading") },
    { id: "courses", label: t("sakshamCoursesHeading") },
    { id: "why", label: t("sakshamWhyHeading") },
  ];

  return (
    <>
      <PageHero
        tone="night"
        breadcrumb={{ label: t("navKnowledge"), href: toV4("/credit-advice") }}
        label={t("megaResourcesHeading")}
        title={t("sakshamTitle")}
        lede={t("sakshamSubtitle")}
        actions={
          // An in-page anchor, and the one on this page that earns its place: the reader's question
          // is "what are the courses", and the courses are 1,200 words down.
          <ButtonLink href="#courses" size="lg">
            {t("learnMoreUpper")}
          </ButtonLink>
        }
      />

      <Section space="md">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            <Rail sections={sections} />

            <div>
              {/* ── What ─────────────────────────────────────────────────────────────────── */}
              <section aria-labelledby="what" className="scroll-mt-28">
                <SectionHead
                  id="what"
                  label={t("featCibilSaksham")}
                  title={t("sakshamWhatHeading")}
                />
                <p className="v4-body mt-6">{t("sakshamWhatDesc")}</p>
              </section>

              {/* ── Who ──────────────────────────────────────────────────────────────────── */}
              <section aria-labelledby="who" className="mt-20 scroll-mt-28">
                <h2 id="who" className="v4-h2">
                  {t("sakshamWhoHeading")}
                </h2>

                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {WHO.map(({ boldKey, key }, i) => (
                    <Reveal as="li" key={boldKey} index={i}>
                      <div className="v4-plane flex h-full items-start gap-4 p-5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--v4-r-sm)] bg-[var(--v4-surface-2)] text-[var(--v4-accent)]">
                          <UserIcon size={20} />
                        </span>
                        <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                          <strong className="block font-bold text-[var(--v4-fg)]">
                            {t(boldKey)}
                          </strong>
                          <span className="mt-1 block">{t(key)}</span>
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </section>

              {/* ── What a course contains. V1's raster, set as text. ─────────────────────── */}
              <section aria-labelledby="includes" className="mt-20 scroll-mt-28">
                <h2 id="includes" className="v4-h2">
                  {t("sakshamIncludesHeading")}
                </h2>

                <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {INCLUDES.map(({ Glyph, key }, i) => (
                    <Reveal as="li" key={key} index={i}>
                      <div className="v4-plane flex h-full flex-col gap-4 p-5">
                        <span className="text-[var(--v4-accent)]">
                          <Glyph size={22} />
                        </span>
                        <span className="text-[0.9375rem] font-bold leading-snug">{t(key)}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>

                <Notice tone="info" className="mt-6">
                  {t("sakshamAccessNote")}
                </Notice>
              </section>

              {/* ── The courses ──────────────────────────────────────────────────────────── */}
              <section aria-labelledby="courses" className="mt-20 scroll-mt-28">
                <h2 id="courses" className="v4-h2">
                  {t("sakshamCoursesHeading")}
                </h2>

                <ol className="mt-8 grid gap-6">
                  {COURSES.map((course, i) => (
                    <Reveal as="li" key={course.titleKey} index={i}>
                      <article className="v4-plane p-6 sm:p-8">
                        <div className="flex items-baseline gap-4">
                          <span
                            aria-hidden="true"
                            className="v4-num text-[0.8125rem] text-[var(--v4-fg-3)]"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="v4-h3 text-[1.25rem]">{t(course.titleKey)}</h3>
                        </div>

                        <p className="mt-5 text-[1.0625rem] font-bold text-[var(--v4-fg)]">
                          {t(course.boldKey)}
                        </p>
                        <p className="v4-body mt-2">{t(course.descKey)}</p>

                        <p className="v4-caption mt-5">{t("sakshamCourseNote")}</p>

                        <div className="mt-6">
                          <ButtonLink href={toV4("/register")} arrow>
                            {t(course.ctaKey)}
                          </ButtonLink>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </ol>
              </section>

              {/* ── Why ──────────────────────────────────────────────────────────────────── */}
              <section aria-labelledby="why" className="mt-20 scroll-mt-28">
                <h2 id="why" className="v4-h2">
                  {t("sakshamWhyHeading")}
                </h2>

                <ul className="mt-8 grid gap-0 border-t border-[var(--v4-edge)]">
                  {WHY.map(([bold, rest], i) => (
                    <li key={bold} className="border-b border-[var(--v4-edge)]">
                      <Reveal index={i} className="flex items-start gap-4 py-5">
                        <CheckIcon
                          size={19}
                          className="mt-0.5 shrink-0 text-[var(--v4-success)]"
                        />
                        <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                          <strong className="font-bold text-[var(--v4-fg)]">{t(bold)}</strong>{" "}
                          {t(rest)}
                        </p>
                      </Reveal>
                    </li>
                  ))}
                </ul>

                <p className="v4-caption mt-6">{t("sakshamWhyNote")}</p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
