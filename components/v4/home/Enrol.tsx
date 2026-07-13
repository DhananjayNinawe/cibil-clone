"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The close.
 *
 * One sentence, one button, and a great deal of space around both. Everything the page has argued
 * for arrives here, so nothing else is allowed on screen to compete with it — no second CTA, no
 * newsletter box, no app badges, no chat bubble. A closing section with four choices in it is a
 * closing section that closes nothing.
 */
export default function Enrol() {
  const { t } = useV4();

  return (
    <Section space="xl" className="relative overflow-hidden">
      <div className="v4-field" aria-hidden="true" />

      <Container width="wide" className="relative">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <h2 className="v4-h1">
            <span className="v4-mark-word">{t("heroBecomeReady")}</span>
          </h2>

          <p className="v4-lede mx-auto mt-6">{t("heroText")} CIBIL.</p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <ButtonLink href={toV4("/freecibilscore")} size="lg" arrow>
              {t("heroCta")}
            </ButtonLink>

            <p className="v4-caption">
              {t("heroAlreadyAccount")}{" "}
              <Link href={toV4("/login")} className="v4-link">
                {t("heroLogIn")}
              </Link>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
