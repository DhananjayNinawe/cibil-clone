"use client";

import { CREDIT_MYTHS_CARDS } from "@/lib/blogCards";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import Button from "@/components/v2/ui/Button";
import KnowledgeGrid from "@/components/v2/pages/knowledge/KnowledgeGrid";
import KnowledgeOutro from "@/components/v2/pages/knowledge/KnowledgeOutro";
import TopicRail from "@/components/v2/pages/knowledge/TopicRail";

/** V1's hero artwork for this listing. */
const HERO_IMAGE = "https://www.cibil.com/content/dam/cibil/consumer/myths.jpg";

/**
 * Credit Myths — two articles, so a grid would be an empty room. The pair is staged as a centered
 * two-up spread instead, and the hero carries the artwork beside the headline. Gold tone: this is
 * the page that argues with something.
 */
export default function CreditMythsContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        size="md"
        tone="gold"
        eyebrow={t("navKnowledge")}
        title={t("creditMythsTitle")}
        lede={t("learnSubtitle")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("creditMythsTitle") }]}
        actions={
          <Button href={toV2("/faq-brochure")} variant="ghost" arrow>
            {t("filterUnderstandingCibil")}
          </Button>
        }
        media={<Plate src={HERO_IMAGE} alt="" surface="dark" width={760} height={520} priority />}
      />

      <TopicRail />

      <Section space="lg" tone="canvas">
        <Container>
          <SectionHeading
            align="center"
            index="01"
            eyebrow={t("filterCreditMyths")}
            title={t("topicsHeading")}
          />
          <KnowledgeGrid
            className="mx-auto mt-14 max-w-5xl"
            cards={CREDIT_MYTHS_CARDS}
            ctaKey="blogPostLink"
            href={toV2("/blog/main")}
          />
        </Container>
      </Section>

      <KnowledgeOutro />
    </>
  );
}
