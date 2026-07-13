"use client";

import { useEffect } from "react";
import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { Container, Section } from "@/components/v3/ui/Layout";
import Button from "@/components/v3/ui/Button";
import Rule from "@/components/v3/ui/Rule";
import Reveal from "@/components/v3/motion/Reveal";
import SetType from "@/components/v3/motion/SetType";

/**
 * The route-level error boundary for every page under /v3.
 *
 * An error boundary must be a Client Component — and this one has to be one anyway, because the
 * notice it prints is translated. It is set as a struck-out entry: a heavy rule, the notice, and
 * the two ways out. `reset` re-renders the segment; the home link is the escape hatch when it
 * fails twice.
 */
export default function V3Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t3 } = useV3();

  useEffect(() => {
    // No error-reporting service is wired up in this project; the console is the only sink.
    console.error(error);
  }, [error]);

  return (
    <Section space="xl" className="flex min-h-[70svh] items-center">
      <Container className="w-full">
        <div className="max-w-[46rem]">
          <Rule strong still />

          <h1 className="v3-h1 mt-10 text-balance">
            <SetType lines={[t3("v3ErrorTitle")]} />
          </h1>

          <Reveal variant="rise" delay={200}>
            <p className="v3-lede mt-8 max-w-[52ch] text-pretty">{t3("v3ErrorBody")}</p>
          </Reveal>

          <Reveal variant="rise" delay={300} className="mt-12 flex flex-wrap items-center gap-4">
            <Button type="button" onClick={reset} arrow>
              {t3("v3Retry")}
            </Button>

            <Button href={toV3("/")} variant="outline">
              {t3("v3GoHome")}
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
