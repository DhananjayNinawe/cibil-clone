"use client";

import Link from "next/link";
import type { TranslationKey } from "@/lib/i18n";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Plate from "@/components/v2/ui/Plate";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import Parallax from "@/components/v2/motion/Parallax";
import { ArrowRightIcon } from "@/components/icons";

const SERVICE_ART = "https://www.cibil.com/content/dam/cibil/homepage/shared/service-banner.png";

/** The three self-service jobs V1 lists — same copy, same destinations, one row each. */
const TASKS: { key: string; textKey: TranslationKey; href: string }[] = [
  { key: "report", textKey: "selfServiceReportDispute", href: "/consumer-dispute-resolution" },
  { key: "mfi", textKey: "selfServiceMfiDispute", href: "/microfinance-dispute-resolution" },
  { key: "docs", textKey: "selfServiceUploadDocs", href: "/company-dispute-resolution" },
];

export default function SelfService() {
  const { t } = useV2();

  return (
    <Section id="self-service" space="xl" tone="canvas">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              index="04"
              eyebrow={t("selfServiceHeadingBrand")}
              title={
                <>
                  {t("selfServiceHeadingPrefix")}{" "}
                  <span className="text-[var(--v2-cyan)]">{t("selfServiceHeadingBrand")}</span>
                </>
              }
            />

            <ul className="mt-12">
              {TASKS.map((task, index) => (
                <Reveal as="li" key={task.key} variant="up" delay={index * 100}>
                  {/*
                    V1 renders these as a sentence with the verb buried in a trailing "here."
                    link. Here the whole row is the target: bigger hit area, and the action is
                    legible without reading to the end of the line.
                  */}
                  <Link
                    href={toV2(task.href)}
                    className="v2-focus group flex items-start justify-between gap-8 border-t border-[var(--v2-line)] py-7 transition-colors duration-500 last:border-b hover:border-[rgba(0,176,240,0.4)]"
                  >
                    <span className="text-[15px] leading-relaxed text-[var(--v2-text-2)] transition-colors duration-300 group-hover:text-[var(--v2-text)]">
                      {t(task.textKey)}
                    </span>
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--v2-line-2)] text-[var(--v2-text-3)] transition-all duration-500 ease-[var(--v2-ease)] group-hover:border-[var(--v2-cyan)] group-hover:bg-[rgba(0,176,240,0.12)] group-hover:text-[var(--v2-cyan)]"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>

          <Parallax speed={0.06}>
            <Reveal variant="blur">
              <Plate src={SERVICE_ART} alt="" width={640} height={340} className="lg:ml-8" />
            </Reveal>
          </Parallax>
        </div>
      </Container>
    </Section>
  );
}
