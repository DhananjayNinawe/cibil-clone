"use client";

import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import { Container, Section } from "@/components/v2/ui/Layout";
import Button from "@/components/v2/ui/Button";
import Card from "@/components/v2/ui/Card";
import Reveal from "@/components/v2/motion/Reveal";

/**
 * The tail every Knowledge Center listing shares: the subscribe band and the legal disclaimer.
 *
 * V1 renders the band as a flat teal bar; here it is a lit glass plate with the gold pill, so the
 * one conversion moment on an otherwise editorial page actually reads as one.
 */
export default function KnowledgeOutro() {
  const { t } = useV2();

  return (
    <Section space="md" tone="canvas">
      <Container>
        <Reveal variant="scale">
          <Card
            spotlight
            padding="lg"
            className="flex flex-col items-start justify-between gap-7 bg-linear-to-br from-[rgba(10,58,82,0.9)] to-[rgba(11,18,32,0.9)] sm:flex-row sm:items-center"
          >
            <p className="v2-lede max-w-xl text-[var(--v2-text)]">{t("blogSubscribeBanner")}</p>
            <Button href={toV2("/choose-subscription")} arrow magnetic className="shrink-0">
              {t("sidebarSubscribeNowBtn")}
            </Button>
          </Card>
        </Reveal>

        <Reveal variant="fade" delay={120}>
          <p className="mx-auto mt-14 max-w-4xl text-xs leading-relaxed text-[var(--v2-text-3)]">
            {t("blogDisclaimer")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
