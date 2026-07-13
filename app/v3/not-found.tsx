"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section } from "@/components/v3/ui/Layout";
import Button from "@/components/v3/ui/Button";
import Rule from "@/components/v3/ui/Rule";
import SetType from "@/components/v3/motion/SetType";
import Reveal from "@/components/v3/motion/Reveal";

/**
 * The 404 — a page torn out of the volume.
 *
 * The status code is set as a mono numeral in the left margin, exactly where a folio sits on every
 * other page, and the notice runs beside it. No cracked-egg illustration and no oversized outlined
 * glyph: a printed index that cannot find an entry simply says so, and points you at the index.
 */
export default function V3NotFound() {
  const { t, t3 } = useV3();

  return (
    <Section space="xl" className="flex min-h-[70svh] items-center">
      <Container className="w-full">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[auto_1fr] lg:items-start">
          {/* A numeral, not language. */}
          <p aria-hidden className="v3-num text-6xl leading-none text-[var(--v3-fg-3)] sm:text-8xl">
            404
          </p>

          <div className="min-w-0">
            <h1 className="v3-h1 text-balance">
              <SetType lines={[t3("v3NotFoundTitle")]} />
            </h1>

            <Reveal variant="rise" delay={200}>
              <p className="v3-lede mt-8 max-w-[52ch] text-pretty">{t3("v3NotFoundBody")}</p>
            </Reveal>

            <Rule className="mt-12" />

            <Reveal variant="rise" delay={360} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={toV3("/")} arrow>
                {t3("v3GoHome")}
              </Button>

              <Button href={toV3("/sitemap")} variant="outline">
                {t("footerSitemap")}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
