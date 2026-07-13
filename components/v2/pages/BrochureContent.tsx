"use client";

import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Tabs, { type TabItem } from "@/components/v2/ui/Tabs";
import Accordion from "@/components/v2/ui/Accordion";
import Card from "@/components/v2/ui/Card";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Prose from "@/components/v2/ui/Prose";
import Reveal from "@/components/v2/motion/Reveal";

/**
 * The CIBIL brochure.
 *
 * V1 gives it two tabs where the second is empty, an accordion that duplicates the first tab's own
 * label, and a "Download" link pointing at `"#"` — the PDF was never ported. Here the tabs are a
 * real WAI-ARIA tablist, the accordion opens on the first panel, and the download line keeps its
 * copy without pretending to be a link that goes nowhere.
 */
export default function BrochureContent() {
  const { t } = useV2();

  const tabs: TabItem[] = [
    {
      id: "about-transunion-cibil",
      label: t("brochureTab1"),
      panel: (
        <Accordion
          defaultOpen={0}
          items={[
            {
              id: "about",
              question: t("brochureTab1"),
              answer: (
                <Prose>
                  <p>{t("brochureTab1Para1")}</p>
                  <p>{t("brochureTab1Para2")}</p>
                </Prose>
              ),
            },
          ]}
        />
      ),
    },
    {
      id: "about-score-report",
      label: t("brochureTab2"),
      panel: <Callout tone="note">{t("sectionContentComingSoon")}</Callout>,
    },
  ];

  return (
    <>
      <PageHero
        size="sm"
        tone="deep"
        align="center"
        eyebrow={t("filterUnderstandingCibil")}
        title={t("brochurePageTitle")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("filterUnderstandingCibil") }]}
      />

      <Section space="md" tone="canvas">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
            <div>
              <Tabs items={tabs} label={t("filterUnderstandingCibil")} />

              <Reveal variant="fade" className="mt-16">
                <p className="max-w-3xl leading-relaxed text-[var(--v2-text-2)]">
                  {t("brochureFooterText")}{" "}
                  {/* V1 hangs this word on href="#": the brochure PDF does not exist in this
                      tree, so it stays a word rather than becoming a link to nowhere. */}
                  <strong className="font-bold text-[var(--v2-cyan)]">{t("downloadWord")}</strong>{" "}
                  {t("brochureDownloadPrefix")}
                </p>
              </Reveal>
            </div>

            {/* V1's sidebar card, rebuilt on the V2 surface. */}
            <Reveal variant="right" delay={120}>
              {/* lg:self-start — a stretched grid item cannot stick. */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <Card spotlight padding="lg" className="text-center">
                  <p className="v2-eyebrow text-[var(--v2-text-3)]">{t("sidebarWaitTitle")}</p>
                  <p className="mt-6 text-lg font-bold leading-snug text-[var(--v2-text)]">
                    {t("sidebarUnlimitedAccess")}
                  </p>
                  <Button href={toV2("/register")} full arrow className="mt-8">
                    {t("sidebarGetScoreReportBtn")}
                  </Button>
                </Card>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
