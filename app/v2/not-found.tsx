"use client";

import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import { Container } from "@/components/v2/ui/Layout";

export default function V2NotFound() {
  const { t, tv } = useV2();

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden py-32">
      <Backdrop tone="duo" grid />

      <Container className="relative text-center">
        {/* The status code is a numeral, not language. */}
        <p
          aria-hidden
          className="text-[clamp(6rem,18vw,14rem)] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(0,176,240,0.35)]"
        >
          404
        </p>
        <h1 className="v2-h2 mt-6 text-[var(--v2-text)]">{tv("v2NotFoundTitle")}</h1>
        <p className="v2-lede mx-auto mt-6 max-w-xl">{tv("v2NotFoundBody")}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={toV2("/")} arrow magnetic>
            {tv("v2GoHome")}
          </Button>
          <Button href={toV2("/sitemap")} variant="secondary">
            {t("footerSitemap")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
