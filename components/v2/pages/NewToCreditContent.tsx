"use client";

import { NEW_TO_CREDIT_CARDS, NEW_TO_CREDIT_HERO } from "@/lib/blogCards";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section, SectionHeading } from "@/components/v2/ui/Layout";
import PageHero from "@/components/v2/ui/PageHero";
import Plate from "@/components/v2/ui/Plate";
import Button from "@/components/v2/ui/Button";
import Callout from "@/components/v2/ui/Callout";
import Reveal from "@/components/v2/motion/Reveal";
import KnowledgeGrid from "@/components/v2/pages/knowledge/KnowledgeGrid";
import KnowledgeOutro from "@/components/v2/pages/knowledge/KnowledgeOutro";
import TopicRail from "@/components/v2/pages/knowledge/TopicRail";

/**
 * New To Credit — the on-ramp. The lead story is the first thing you should read, the three that
 * follow sit in a single clean row, and the page closes on the one reassurance a first-time reader
 * always needs: checking your own score does not lower it.
 */
export default function NewToCreditContent() {
  const { t } = useV2();

  return (
    <>
      <PageHero
        size="md"
        tone="cyan"
        eyebrow={t("navKnowledge")}
        title={t("newToCreditTitle")}
        lede={t("learnSubtitle")}
        breadcrumbs={[{ label: t("navKnowledge") }, { label: t("newToCreditTitle") }]}
        actions={
          <>
            <Button href={toV2("/register")} arrow magnetic>
              {t("jaagranGetFreeScore")}
            </Button>
            <Button href={toV2("/cibil-saksham")} variant="ghost">
              {t("learnMoreUpper")}
            </Button>
          </>
        }
        media={<Plate src={NEW_TO_CREDIT_HERO} alt="" surface="dark" width={760} height={520} priority />}
      />

      <TopicRail />

      <Section space="lg" tone="canvas">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={t("filterNewToCredit")}
            title={t("topicsHeading")}
          />
          <KnowledgeGrid
            className="mt-14"
            cards={NEW_TO_CREDIT_CARDS}
            ctaKey="blogReadMore"
            lead
            href={toV2("/blog/main")}
          />

          <Reveal variant="up" className="mt-14">
            <Callout tone="info" className="mx-auto max-w-3xl">
              {t("jaagranDontWorry")}
            </Callout>
          </Reveal>
        </Container>
      </Section>

      <KnowledgeOutro />
    </>
  );
}
