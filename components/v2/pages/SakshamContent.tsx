"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import Card from "@/components/v2/ui/Card";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Steps, { type Step } from "@/components/v2/ui/Steps";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { RosetteCheckIcon } from "@/components/icons";

const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/saksham-banner.jpg";

/** Ships as one raster: the "Each course includes:" heading, the five cards, and the 60-day note. */
const COURSE_IMAGE =
  "https://www.cibil.com/cibil-saksham/_jcr_content/root/contentcontainer/pagesection/basicimage.coreimg.png/1762406676567/saksham-course.png";

const WHO: { key: string; bold: TranslationKey; body: TranslationKey }[] = [
  { key: "builders", bold: "sakshamWho1Bold", body: "sakshamWho1" },
  { key: "first-time", bold: "sakshamWho2Bold", body: "sakshamWho2" },
];

const COURSES: {
  key: string;
  title: TranslationKey;
  bold: TranslationKey;
  desc: TranslationKey;
  cta: TranslationKey;
}[] = [
  {
    key: "fundamentals",
    title: "sakshamCourse1Title",
    bold: "sakshamCourse1Bold",
    desc: "sakshamCourse1Desc",
    cta: "learnMoreUpper",
  },
  {
    key: "msme",
    title: "sakshamCourse2Title",
    bold: "sakshamCourse2Bold",
    desc: "sakshamCourse2Desc",
    cta: "learnNowUpper",
  },
];

const WHY: [TranslationKey, TranslationKey][] = [
  ["sakshamWhy1Bold", "sakshamWhy1"],
  ["sakshamWhy2Bold", "sakshamWhy2"],
  ["sakshamWhy3Bold", "sakshamWhy3"],
  ["sakshamWhy4Bold", "sakshamWhy4"],
];

/** Every locale writes these notes as "<label>: <body>". Split so the label can head the callout. */
function splitNote(text: string): { label?: string; body: string } {
  const at = text.indexOf(":");
  if (at === -1) return { body: text };
  return { label: text.slice(0, at), body: text.slice(at + 1).trim() };
}

/**
 * CIBIL Saksham — a course catalogue, so it is composed like one: the offer, who it is for, what
 * is in the box, the two courses as facing prospectuses, and the reasons to enrol as a numbered
 * rail. V1 runs the whole thing as one column of underlined paragraphs.
 */
export default function SakshamContent() {
  const { t } = useV2();

  const courseNote = splitNote(t("sakshamCourseNote"));
  const whyNote = splitNote(t("sakshamWhyNote"));

  /** The course raster carries its text as pixels, so restate it for screen readers — as V1 does. */
  const courseImageAlt = [
    t("sakshamIncludesHeading"),
    [t("sakshamInc1"), t("sakshamInc2"), t("sakshamInc3"), t("sakshamInc4"), t("sakshamInc5")].join(", "),
    t("sakshamAccessNote"),
  ].join(" ");

  const whySteps: Step[] = WHY.map(([bold, body]) => ({
    id: bold,
    title: t(bold),
    body: t(body),
  }));

  return (
    <>
      <PageHero
        size="md"
        tone="cyan"
        eyebrow={t("navKnowledge")}
        title={t("sakshamTitle")}
        lede={t("sakshamSubtitle")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("sakshamTitle") }]}
        actions={
          <Button href="#courses" arrow magnetic>
            {t("learnMoreUpper")}
          </Button>
        }
        media={<Plate src={HERO_IMAGE} alt="" surface="dark" width={760} height={560} priority />}
      />

      {/* What it is — a wide reading measure, then the two audiences as facing cards. */}
      <Section space="lg" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHeading index="01" eyebrow={t("sakshamTitle")} title={t("sakshamWhatHeading")} />
            <Reveal variant="up" delay={80}>
              <p className="v2-lede">{t("sakshamWhatDesc")}</p>
            </Reveal>
          </div>

          <h2 className="v2-h3 mt-24 text-[var(--v2-text)]">{t("sakshamWhoHeading")}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {WHO.map((who, index) => (
              <Reveal as="li" key={who.key} variant="up" delay={index * 100} className="h-full">
                <Card spotlight padding="lg" className="h-full">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(0,176,240,0.12)]"
                  >
                    <RosetteCheckIcon className="h-6 w-6 text-[var(--v2-cyan)]" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-[var(--v2-text)]">{t(who.bold)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">{t(who.body)}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* What's in the box — CIBIL's own artwork, on a lit plate. It was drawn for a white page. */}
      <Section space="md" tone="raised">
        <Container>
          <Reveal variant="blur">
            <Parallax speed={0.04}>
              <Plate
                src={COURSE_IMAGE}
                alt={courseImageAlt}
                width={1280}
                height={264}
                surface="light"
                className="mx-auto max-w-5xl"
              />
            </Parallax>
          </Reveal>
        </Container>
      </Section>

      {/* The two courses, as facing prospectuses. */}
      <Section id="courses" space="lg" tone="canvas">
        <Container>
          <SectionHeading index="02" eyebrow={t("navProducts")} title={t("sakshamCoursesHeading")} />

          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {COURSES.map((course, index) => (
              <Reveal as="li" key={course.key} variant="up" delay={index * 120} className="h-full">
                <Card spotlight padding="lg" className="flex h-full flex-col">
                  <p className="v2-eyebrow text-[var(--v2-text-3)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="v2-h3 mt-5 text-[var(--v2-text)]">{t(course.title)}</h3>
                  <p className="mt-6 text-base font-bold text-[var(--v2-cyan)]">{t(course.bold)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--v2-text-2)]">{t(course.desc)}</p>

                  <Callout tone="note" title={courseNote.label} className="mt-8">
                    {courseNote.body}
                  </Callout>

                  <div className="mt-8 pt-2">
                    <Button href={toV2("/register")} arrow>
                      {t(course.cta)}
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Why enrol — the reasons as a numbered rail rather than a bullet list. */}
      <Section space="lg" tone="deep">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div>
              <SectionHeading index="03" eyebrow={t("sakshamTitle")} title={t("sakshamWhyHeading")} />
              <Reveal variant="fade" delay={120} className="mt-10">
                <Callout tone="warning" title={whyNote.label}>
                  {whyNote.body}
                </Callout>
              </Reveal>
            </div>

            <Steps steps={whySteps} layout="rail" />
          </div>
        </Container>
      </Section>
    </>
  );
}
