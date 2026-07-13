"use client";

import Link from "next/link";
import { useV2 } from "@/lib/v2/useV2";
import { toV2 } from "@/lib/v2/routes";
import Backdrop from "@/components/v2/ui/Backdrop";
import Button from "@/components/v2/ui/Button";
import { Container, Eyebrow } from "@/components/v2/ui/Layout";
import Reveal from "@/components/v2/motion/Reveal";
import SplitText from "@/components/v2/motion/SplitText";
import ScoreDial from "@/components/v2/home/ScoreDial";

/**
 * The first screen.
 *
 * Same promise V1 makes, in V1's words — the headline, the reassurance, the CTA and the login
 * line are all existing keys. What changes is the staging: the copy is set at display scale
 * and lifts word by word, the score *scale* replaces a flat banner, and the whole thing sits in
 * a lit room rather than on a white page.
 */
export default function Hero() {
  const { t, tv } = useV2();

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <Backdrop tone="duo" grid />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* min-w-0: a grid item's automatic minimum is its min-content width, so without
              this any wide child (a long CTA label, a table) pushes the column past the
              viewport instead of shrinking. */}
          <div className="min-w-0">
            <Reveal variant="fade">
              <Eyebrow>{tv("v2HeroKicker")}</Eyebrow>
            </Reveal>

            <h1 className="v2-display mt-8 text-[var(--v2-text)]">
              <SplitText text={t("heroTitlePrefix")} />{" "}
              <SplitText text={t("heroTitleBrand")} className="text-[var(--v2-cyan)]" delay={80} />
              <SplitText text={t("heroTitleSuffix")} delay={200} />
              <span className="block text-[var(--v2-text-2)]">
                <SplitText text={t("heroTitleLine2")} delay={320} />
              </span>
            </h1>

            <Reveal variant="up" delay={520}>
              <p className="v2-lede mt-8 max-w-xl text-pretty">{t("heroBecomeReady")}</p>
            </Reveal>

            <Reveal variant="up" delay={620} className="mt-10 flex flex-wrap items-center gap-5">
              <Button href={toV2("/register")} size="lg" arrow magnetic>
                {t("heroCta")}
              </Button>

              <p className="text-sm text-[var(--v2-text-2)]">
                {t("heroAlreadyAccount")}{" "}
                <Link
                  href={toV2("/login")}
                  className="v2-focus v2-underline font-bold text-[var(--v2-cyan)]"
                >
                  {t("heroLogIn")}
                </Link>
              </p>
            </Reveal>

            <Reveal variant="fade" delay={800} className="mt-16 hidden items-center gap-3 lg:flex">
              <span
                aria-hidden
                className="flex h-9 w-5.5 items-start justify-center rounded-full border border-[var(--v2-line-2)] p-1"
              >
                <span className="h-2 w-0.5 rounded-full bg-[var(--v2-cyan)] [animation:v2-float_1.8s_ease-in-out_infinite]" />
              </span>
              <span className="v2-eyebrow text-[var(--v2-text-3)]">{tv("v2ScrollHint")}</span>
            </Reveal>
          </div>

          <ScoreDial />
        </div>
      </Container>
    </section>
  );
}
