"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, Folio } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Button from "@/components/v3/ui/Button";
import Callout from "@/components/v3/ui/Callout";
import MarginRail from "@/components/v3/ui/MarginRail";
import Rule from "@/components/v3/ui/Rule";
import Steps from "@/components/v3/ui/Steps";
import Plate from "@/components/v3/motion/Plate";
import Reveal from "@/components/v3/motion/Reveal";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/saksham-banner.jpg";

/** V1 ships this as one raster: the "Each course includes:" heading, five cards and the 60-day note. */
const COURSE_IMAGE =
  "https://www.cibil.com/cibil-saksham/_jcr_content/root/contentcontainer/pagesection/basicimage.coreimg.png/1762406676567/saksham-course.png";

/** The two audiences and the four reasons — each a bold label and the sentence that follows it. */
const WHO: [TranslationKey, TranslationKey][] = [
  ["sakshamWho1Bold", "sakshamWho1"],
  ["sakshamWho2Bold", "sakshamWho2"],
];

const WHY: [TranslationKey, TranslationKey][] = [
  ["sakshamWhy1Bold", "sakshamWhy1"],
  ["sakshamWhy2Bold", "sakshamWhy2"],
  ["sakshamWhy3Bold", "sakshamWhy3"],
  ["sakshamWhy4Bold", "sakshamWhy4"],
];

/** What every course carries — V1 has these as pixels inside the artwork; V3 sets them as type. */
const INCLUDES: TranslationKey[] = [
  "sakshamInc1",
  "sakshamInc2",
  "sakshamInc3",
  "sakshamInc4",
  "sakshamInc5",
];

const COURSES: {
  id: string;
  titleKey: TranslationKey;
  boldKey: TranslationKey;
  descKey: TranslationKey;
  ctaKey: TranslationKey;
}[] = [
  {
    id: "course-1",
    titleKey: "sakshamCourse1Title",
    boldKey: "sakshamCourse1Bold",
    descKey: "sakshamCourse1Desc",
    ctaKey: "learnMoreUpper",
  },
  {
    id: "course-2",
    titleKey: "sakshamCourse2Title",
    boldKey: "sakshamCourse2Bold",
    descKey: "sakshamCourse2Desc",
    ctaKey: "learnNowUpper",
  },
];

/**
 * CIBIL Saksham — the programme.
 *
 * A syllabus is a document, so V3 sets it as one: a two-column spread with a sticky margin rail
 * tracking the reader down the page, and each part of the prospectus — what it is, who it is for,
 * what a course carries, the courses themselves, why to take one — a ruled section beneath it.
 *
 * V1 renders the "Each course includes" panel as a single raster with its text baked into the
 * pixels, restated in the alt attribute. V3 keeps the artwork, plated, but sets those five
 * inclusions as real type in a numbered set — so the programme's contents are readable, selectable
 * and translated rather than living inside a PNG. The plate is then decorative, as it should be.
 */
export default function SakshamContent() {
  const { t, t3 } = useV3();

  const rail = [
    { id: "what", label: t("sakshamWhatHeading") },
    { id: "who", label: t("sakshamWhoHeading") },
    { id: "includes", label: t("sakshamIncludesHeading") },
    { id: "courses", label: t("sakshamCoursesHeading") },
    { id: "why", label: t("sakshamWhyHeading") },
  ];

  return (
    <>
      <PageHeader
        size="full"
        folio={t("featCibilSaksham")}
        title={[t("sakshamTitle")]}
        lede={t("sakshamSubtitle")}
        actions={
          <Button href="#courses" size="lg" arrow>
            {t("learnMoreUpper")}
          </Button>
        }
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("navKnowledge"), href: toV3("/blog/main") },
          { label: t("sakshamTitle") },
        ]}
        media={
          <Plate
            src={HERO_IMAGE}
            alt={`${t("sakshamTitle")} — ${t("sakshamSubtitle")}`}
            ratio="4 / 3"
            fit="cover"
            mount
            drift
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 lg:grid-cols-[13rem_1fr]">
            <MarginRail links={rail} />

            <div className="min-w-0">
              {/* ── What it is */}
              <section id="what" className="scroll-mt-32">
                <Folio index="01">{t3("v3AtAGlance")}</Folio>
                <h2 className="v3-h2 mt-6 text-balance">{t("sakshamWhatHeading")}</h2>
                <Rule className="mt-8" />
                <Reveal variant="rise">
                  <p className="mt-8 max-w-[62ch] text-pretty text-base leading-relaxed text-[var(--v3-fg-2)]">
                    {t("sakshamWhatDesc")}
                  </p>
                </Reveal>
              </section>

              {/* ── Who it is for */}
              <section id="who" className="mt-24 scroll-mt-32">
                <Folio index="02">{t3("v3Explore")}</Folio>
                <h2 className="v3-h2 mt-6 text-balance">{t("sakshamWhoHeading")}</h2>
                <Rule className="mt-8" />

                <dl className="mt-2">
                  {WHO.map(([bold, rest], i) => (
                    <Reveal key={bold} variant="rise" delay={i * 70}>
                      <div className="grid grid-cols-1 gap-x-10 gap-y-2 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[14rem_1fr]">
                        <dt className="v3-h3 text-pretty">{t(bold)}</dt>
                        <dd className="max-w-[52ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                          {t(rest)}
                        </dd>
                      </div>
                    </Reveal>
                  ))}
                </dl>
              </section>

              {/* ── What a course carries */}
              <section id="includes" className="mt-24 scroll-mt-32">
                <Folio index="03">{t3("v3DetailsLabel")}</Folio>
                <h2 className="v3-h2 mt-6 text-balance">{t("sakshamIncludesHeading")}</h2>
                <Rule className="mt-8" />

                <ol className="mt-10 grid gap-px bg-[var(--v3-line)] sm:grid-cols-2 lg:grid-cols-5">
                  {INCLUDES.map((item, i) => (
                    <li key={item} className="bg-[var(--v3-bg)] p-5">
                      <span aria-hidden className="v3-num block text-2xl text-[var(--v3-accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-4 text-sm leading-snug font-medium text-[var(--v3-fg)]">
                        {t(item)}
                      </p>
                    </li>
                  ))}
                </ol>

                {/* The official artwork, plated. Its copy is set above as type, so it is decorative. */}
                <Plate
                  className="mt-10"
                  src={COURSE_IMAGE}
                  alt=""
                  ratio="1280 / 264"
                  fit="contain"
                  mount
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />

                <Callout className="mt-10" tone="note">
                  <p>{t("sakshamAccessNote")}</p>
                </Callout>
              </section>

              {/* ── The courses */}
              <section id="courses" className="mt-24 scroll-mt-32">
                <Folio index="04">{t3("v3Contents")}</Folio>
                <h2 className="v3-h2 mt-6 text-balance">{t("sakshamCoursesHeading")}</h2>
                <Rule className="mt-8" />

                <ol className="mt-2">
                  {COURSES.map((course, i) => (
                    <Reveal key={course.id} as="li" variant="rise" delay={i * 80}>
                      <div className="grid grid-cols-[2.5rem_1fr] gap-x-6 border-b border-[var(--v3-line)] py-10 sm:grid-cols-[4rem_1fr] sm:gap-x-10">
                        <span aria-hidden className="v3-num pt-2 text-sm text-[var(--v3-fg-3)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0">
                          <h3 className="v3-h3 text-pretty">{t(course.titleKey)}</h3>
                          <p className="mt-4 text-base font-medium text-[var(--v3-fg)]">
                            {t(course.boldKey)}
                          </p>
                          <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[var(--v3-fg-2)]">
                            {t(course.descKey)}
                          </p>

                          <Callout className="mt-6" tone="note">
                            <p>{t("sakshamCourseNote")}</p>
                          </Callout>

                          <Button className="mt-8" href={toV3("/register")} arrow>
                            {t(course.ctaKey)}
                          </Button>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </section>

              {/* ── Why choose it */}
              <section id="why" className="mt-24 scroll-mt-32">
                <Folio index="05">{t3("v3KeyPoints")}</Folio>
                <h2 className="v3-h2 mt-6 text-balance">{t("sakshamWhyHeading")}</h2>
                <Rule className="mt-8" />

                <Steps
                  className="mt-6"
                  steps={WHY.map(([bold, rest]) => ({
                    title: t(bold),
                    body: <p>{t(rest)}</p>,
                  }))}
                />

                <Callout className="mt-10" tone="note">
                  <p>{t("sakshamWhyNote")}</p>
                </Callout>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
