"use client";

import { useEffect } from "react";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import { Container } from "@/components/v2/ui/Layout";

/** Route-level error boundary for every page under /v2. */
export default function V2Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { tv } = useV2();

  useEffect(() => {
    // No error-reporting service is wired up in this project; the console is the only sink.
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden py-32">
      <Backdrop tone="gold" />

      <Container className="relative text-center">
        <h1 className="v2-h2 text-[var(--v2-text)]">{tv("v2ErrorTitle")}</h1>
        <p className="v2-lede mx-auto mt-6 max-w-xl">{tv("v2ErrorBody")}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button onClick={reset} magnetic>
            {tv("v2Retry")}
          </Button>
          <Button href={toV2("/")} variant="secondary">
            {tv("v2GoHome")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
