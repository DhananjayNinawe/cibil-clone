"use client";

import { COMMERCIAL_CREDIT_CARDS, COMMERCIAL_CREDIT_HERO } from "@/lib/blogCards";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Button from "@/components/v2/ui/Button";
import HeroBand from "@/components/v2/pages/knowledge/HeroBand";
import KnowledgeGrid from "@/components/v2/pages/knowledge/KnowledgeGrid";
import KnowledgeOutro from "@/components/v2/pages/knowledge/KnowledgeOutro";
import TopicRail from "@/components/v2/pages/knowledge/TopicRail";

/**
 * Commercial Credit — the business desk. Left-aligned masthead over a full-bleed band, then the
 * long rhythm: fifteen articles is enough backlog to earn the seven-card cycle, and the section
 * sits on the raised surface so the whole page reads a step apart from the consumer listings.
 */
export default function CommercialCreditContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        size="md"
        tone="duo"
        eyebrow={t("navBusiness")}
        title={t("commercialCreditTitle")}
        lede={t("learnSubtitle")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("commercialCreditTitle") }]}
        actions={
          <>
            <Button href={toV2("/company-credit-report")} arrow magnetic>
              {t("sidebarGetYoursNowBtn")}
            </Button>
            <Button href={toV2("/credit-advice")} variant="ghost">
              {t("creditAdviceTitle")}
            </Button>
          </>
        }
      />

      <HeroBand src={COMMERCIAL_CREDIT_HERO} />

      <TopicRail />

      <Section space="lg" tone="raised">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={t("filterCommercialCredit")}
            title={t("topicsHeading")}
          />
          <KnowledgeGrid
            className="mt-14"
            cards={COMMERCIAL_CREDIT_CARDS}
            ctaKey="blogReadMore"
            lead
            href={toV2("/blog/main")}
          />
        </Container>
      </Section>

      <KnowledgeOutro />
    </>
  );
}
