"use client";

import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * 404.
 *
 * An empty state is a design surface, not an apology. It says plainly what happened, does not blame
 * the reader for mistyping, and — the part most 404s forget — offers the two doors that actually
 * help: the home page, and the directory that holds every page on the site.
 */
export default function V4NotFound() {
  const { t4 } = useV4();

  return (
    <Section space="xl" className="relative overflow-hidden">
      <div className="v4-field" aria-hidden="true" />

      <Container width="text" className="relative text-center">
        <p className="v4-num text-[clamp(4rem,12vw,7rem)] font-medium leading-none text-[var(--v4-fg-3)]">
          404
        </p>

        <h1 className="v4-h1 mt-6">{t4("v4NotFoundTitle")}</h1>
        <p className="v4-lede mx-auto mt-5">{t4("v4NotFoundBody")}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={toV4("/")} arrow>
            {t4("v4GoHome")}
          </ButtonLink>
          <ButtonLink href={toV4("/sitemap")} variant="secondary">
            {t4("v4NotFoundCta")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
