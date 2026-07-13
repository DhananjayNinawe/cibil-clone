"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The error boundary.
 *
 * It says the fault is ours, because it is — a reader who hits a render error did not do anything
 * wrong, and telling them "something went wrong" without saying whose fault it was leaves them
 * checking their own typing. It offers a retry (`reset()` re-renders the segment without a full
 * page load) and a way out.
 */
export default function V4Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t4 } = useV4();

  useEffect(() => {
    // The digest is the only handle on the server-side stack, which is deliberately not shipped to
    // the browser. Without logging it here, a production error is unreconstructable.
    console.error(error);
  }, [error]);

  return (
    <Section space="xl" className="relative overflow-hidden">
      <div className="v4-field" aria-hidden="true" />

      <Container width="text" className="relative text-center">
        <h1 className="v4-h1">{t4("v4ErrorTitle")}</h1>
        <p className="v4-lede mx-auto mt-5">{t4("v4ErrorBody")}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>{t4("v4ErrorRetry")}</Button>
          <ButtonLink href={toV4("/")} variant="secondary">
            {t4("v4GoHome")}
          </ButtonLink>
        </div>

        {error.digest ? (
          <p className="v4-caption v4-num mt-8">{error.digest}</p>
        ) : null}
      </Container>
    </Section>
  );
}
