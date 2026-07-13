"use client";

import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The two things every page in the knowledge library carries at its foot: the subscribe band and
 * the legal disclaimer.
 *
 * They live here rather than in each page because they are *furniture*, not layout — the same two
 * sentences, the same destination, on five pages. Copying them five times is how one of them
 * quietly ends up pointing somewhere else.
 */

/** The one commercial ask the library makes. A night band, so it reads as a break, not a card. */
export function SubscribeBand() {
  const { t } = useV4();

  return (
    <Section tone="night" space="md">
      <Container width="wide">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="v4-h3 max-w-xl">{t("blogSubscribeBanner")}</p>
          <ButtonLink href={toV4("/choose-subscription")} arrow className="shrink-0">
            {t("sidebarSubscribeNowBtn")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

/**
 * The disclaimer. Four hundred words of it, and it is not decoration: it is the statement that this
 * library is consumer education and not credit advice. So it is set as real small print — quiet, but
 * at a readable measure and at a contrast that clears 4.5:1, not the 3:1 grey V1 sets it in.
 */
export function LibraryDisclaimer() {
  const { t } = useV4();

  return (
    <Section tone="tint" space="sm">
      <Container width="wide">
        <p className="v4-caption max-w-none border-t border-[var(--v4-edge)] pt-8 text-justify">
          {t("blogDisclaimer")}
        </p>
      </Container>
    </Section>
  );
}
