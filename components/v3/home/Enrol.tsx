"use client";

import Link from "next/link";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section, Folio } from "@/components/v3/ui/Layout";
import Button from "@/components/v3/ui/Button";
import Reveal from "@/components/v3/motion/Reveal";
import SetType from "@/components/v3/motion/SetType";

/**
 * The closing call.
 *
 * One sentence at display scale against the ruled grid, the action beneath it, and nothing else
 * on the page. After four sections of ruled density, the emptiness is the emphasis — this is the
 * one place in V3 where whitespace does the shouting.
 */
export default function Enrol() {
  const { t, t3 } = useV3();

  return (
    <Section space="xl" tone="sunken" ruled className="overflow-hidden">
      <div aria-hidden className="v3-columns" />

      <Container className="relative">
        <Folio index="05">{t3("v3CtaKicker")}</Folio>

        <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="v3-display">
            <SetType lines={[t3("v3CtaHeadline")]} />
          </h2>

          <Reveal variant="rise" delay={200} className="lg:pb-3">
            <p className="v3-lede max-w-[36ch] text-pretty">{t3("v3CtaBody")}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={toV3("/register")} size="lg" arrow>
                {t("heroCta")}
              </Button>

              <p className="text-sm text-[var(--v3-fg-2)]">
                {t("heroAlreadyAccount")}{" "}
                <Link href={toV3("/login")} className="v3-focus v3-link font-medium text-[var(--v3-fg)]">
                  {t("heroLogIn")}
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
