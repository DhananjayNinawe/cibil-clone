"use client";

import { CREDIT_ADVICE_CARDS } from "@/lib/blogCards";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Button from "@/components/v2/ui/Button";
import KnowledgeGrid from "@/components/v2/pages/knowledge/KnowledgeGrid";
import KnowledgeOutro from "@/components/v2/pages/knowledge/KnowledgeOutro";
import TopicRail from "@/components/v2/pages/knowledge/TopicRail";

/**
 * Credit Advice — the deep archive (sixty articles), so it gets the purely typographic hero: no
 * artwork competing with the headline, one oversized lead story, then the twelve-column rhythm.
 * V1 shipped no hero image for this listing either.
 */
export default function CreditAdviceContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        size="lg"
        tone="duo"
        eyebrow={t("navKnowledge")}
        title={t("creditAdviceTitle")}
        lede={t("learnSubtitle")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("creditAdviceTitle") }]}
        actions={
          <>
            <Button href={toV2("/register")} arrow magnetic>
              {t("sidebarGetScoreReportBtn")}
            </Button>
            <Button href={toV2("/watch-and-learn")} variant="ghost">
              {t("watchLearnTitle")}
            </Button>
          </>
        }
      />

      <TopicRail />

      <Section space="lg" tone="canvas">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={t("filterCreditAdvice")}
            title={t("topicsHeading")}
          />
          <KnowledgeGrid
            className="mt-14"
            cards={CREDIT_ADVICE_CARDS}
            ctaKey="blogPostLink"
            lead
            href={toV2("/blog/main")}
          />
        </Container>
      </Section>

      <KnowledgeOutro />
    </>
  );
}
