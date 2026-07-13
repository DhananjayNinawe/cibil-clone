"use client";

import PageHero from "@/components/v4/ui/PageHero";
import Notice from "@/components/v4/ui/Notice";
import { Step, Steps } from "@/components/v4/ui/Steps";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { BuildingIcon, DocumentIcon, MailIcon, SupportIcon } from "@/components/v4/ui/Icons";
import { DisputeProcessSection, ImportantPointsSection } from "./DisputeProcess";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * Microfinance dispute resolution.
 *
 * The same procedure as the consumer page, for a reader in a very different position: an MFI
 * borrower is far more likely to be on a phone, on a slow connection, and to need the report posted
 * to them rather than downloaded. V1 serves them a 1440px JPEG of four steps — text, rendered as
 * pixels, at the top of the page. The four steps exist in the catalog as `mfiStep1Title` …
 * `mfiStep4Title` and are simply never used; this page uses them.
 *
 * The layout departs from the consumer page's deliberately: the procedure comes first and alone,
 * and "how to get the report at all" is given a night band of its own, because for this reader that
 * is not a footnote — it is the first obstacle.
 */

/** The four steps of the postal request form. Numbered by V1's own `step1Label` … `step4Label`. */
const FORM_STEPS: { label: TranslationKey; desc: TranslationKey }[] = [
  { label: "step1Label", desc: "mfiRequestFormStep1" },
  { label: "step2Label", desc: "mfiRequestFormStep2" },
  { label: "step3Label", desc: "mfiRequestFormStep3" },
  { label: "step4Label", desc: "mfiRequestFormStep4" },
];

export default function MfiDisputeContent() {
  const { t } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("navGrievance"), href: toV4("/consumer-dispute-resolution") }}
        label={t("megaMfiDisputeResolution")}
        title={t("mfiDisputeHeroTitle")}
        lede={t("mfiDisputeHeroDesc")}
        actions={
          <ButtonLink href="#how-to-fix" size="lg" arrow>
            {t("disputeHeroBtn")}
          </ButtonLink>
        }
        aside={<Notice tone="success">{t("mfiFreeServiceBanner")}</Notice>}
      />

      {/* ── The four steps ──────────────────────────────────────────────────────────────────── */}
      <Section id="how-to-fix" tone="plane" aria-labelledby="v4-mfi-fix-heading">
        <Container width="text">
          <SectionHead
            id="v4-mfi-fix-heading"
            title={t("mfiHowToFixHeading")}
            lede={t("mfiFollowStepsHeading")}
          />

          <div className="mt-12">
            <Steps>
              <Step n={1} title={t("mfiStep1Title")} index={0} />
              <Step n={2} title={t("mfiStep2Title")} index={1} />
              <Step n={3} title={t("mfiStep3Title")} index={2} />
              <Step n={4} title={t("mfiStep4Title")} index={3} />
            </Steps>
          </div>
        </Container>
      </Section>

      {/* ── Getting the report in the first place ───────────────────────────────────────────── */}
      <Section tone="night" aria-labelledby="v4-mfi-report-heading">
        <Container>
          <SectionHead id="v4-mfi-report-heading" title={t("mfiGetReportHeading")} />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="v4-plane p-6 sm:p-8">
              <DocumentIcon size={26} className="text-[var(--v4-accent)]" />

              <ol className="mt-6 grid gap-0">
                {FORM_STEPS.map((step, i) => (
                  <li
                    key={step.label}
                    className="border-t border-[var(--v4-edge)] py-4 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <p className="v4-label">{t(step.label)}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                      {t(step.desc)}
                      {/* V1 hangs "request form" on `href="#"`. There is no form to serve here, so
                          it is named rather than linked — a dead link helps nobody, and the next
                          three steps say exactly what to do with the form once it is printed. */}
                      {i === 0 ? (
                        <span className="font-bold text-[var(--v4-fg)]">
                          {" "}
                          {t("mfiRequestFormLink")}
                        </span>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal index={1} className="v4-plane flex flex-col justify-center p-6 sm:p-8">
              <MailIcon size={26} className="text-[var(--v4-accent)]" />
              <h3 className="v4-h3 mt-5">{t("writeToUsTitle")}</h3>
              <a
                href={`mailto:${t("registeredOfficeEmail")}`}
                className="v4-link mt-3 block break-words text-[0.9375rem]"
              >
                {t("mfiWriteToUsEmail")}
              </a>
              <p className="v4-caption mt-3">{t("mfiContactUsFaqLabel")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── What happens next ───────────────────────────────────────────────────────────────── */}
      <DisputeProcessSection headingKey="disputeHappensHeading" />

      <ImportantPointsSection />

      {/* ── The three doors ─────────────────────────────────────────────────────────────────── */}
      <Section aria-labelledby="v4-mfi-ways-heading">
        <Container>
          <SectionHead id="v4-mfi-ways-heading" title={t("waysToRaiseDisputeHeading")} />

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <Channel
              index={0}
              glyph={<MailIcon size={22} />}
              title={t("writeToUsTitle")}
              note={t("mfiWriteToUsNote")}
            >
              <a
                href={`mailto:${t("registeredOfficeEmail")}`}
                className="v4-link break-words text-[0.9375rem]"
              >
                {t("mfiWriteToUsEmail")}
              </a>
            </Channel>

            <Channel
              index={1}
              glyph={<SupportIcon size={22} />}
              title={t("callUsTitle")}
              note={t("mfiCallTimings")}
            >
              <p className="v4-num text-[0.9375rem] text-[var(--v4-fg-2)]">
                {t("mfiHelplineNumber")}
              </p>
            </Channel>

            <Channel
              index={2}
              glyph={<BuildingIcon size={22} />}
              title={t("visitUsTitle")}
              note={t("mfiVisitTimings")}
            >
              <p className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
                {t("mfiVisitAddress")}
              </p>
            </Channel>
          </div>
        </Container>
      </Section>
    </>
  );
}

/**
 * One way in. The note — timings, what to quote in the letter — is the part the reader needs
 * *before* they act, so it sits with the channel rather than in a footnote at the bottom.
 */
function Channel({
  glyph,
  title,
  note,
  children,
  index,
}: {
  glyph: React.ReactNode;
  title: string;
  note: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <Reveal index={index} className="v4-plane flex flex-col p-6">
      <span className="text-[var(--v4-accent)]">{glyph}</span>
      <h3 className="v4-h3 mt-4">{title}</h3>
      <div className="mt-3 flex-1">{children}</div>
      <p className="v4-caption mt-5 border-t border-[var(--v4-edge)] pt-4">{note}</p>
    </Reveal>
  );
}
