"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Container, Section } from "@/components/v4/ui/Layout";
import Notice from "@/components/v4/ui/Notice";
import PageHero from "@/components/v4/ui/PageHero";
import { Article, ArticleList } from "@/components/v4/faq/FaqShell";
import RelatedTopics from "@/components/v4/faq/RelatedTopics";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

const HREF = toV4("/faq/score-simulator");

/**
 * `/v4/faq/score-simulator` — five questions, set open.
 *
 * The interesting decision here is the disclaimer. V1 prints it as 12px grey text inside a hairline
 * box at the very bottom of the page, which is the visual language of "we are legally required to
 * say this and would rather you did not read it". But it is the most important sentence on the page:
 * the simulator *cannot predict your score*, and a reader who believes it can will make a financial
 * decision on a number that was never a promise. So in V4 it is a `<Notice tone="warning">` — glyph,
 * fill, title — and it sits directly under the answers rather than below the fold.
 *
 * That is also V4's second rule showing its teeth: nothing on this page may imply an outcome the
 * bureau has not measured. The hero's gold marker is hollow for the same reason.
 */
export default function ScoreSimContent() {
  const { t } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("filterUnderstandingCibil"), href: toV4("/faq-brochure") }}
        label={t("faqs")}
        title={
          <>
            {t("ssHeroTitlePrefix")} <span className="v4-mark-word">{t("ssHeroTitleBold")}</span>
          </>
        }
        lede={t("ssHeroDesc")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("simulateNowBtn")}
          </ButtonLink>
        }
      />

      <Section space="lg">
        <Container width="wide">
          <div className="max-w-[52rem]">
            <ArticleList>
              <Article question={t("ssQ1")}>
                <p>{t("ssA1")}</p>
              </Article>

              <Article question={t("ssQ2")}>
                <p>{t("ssA2Intro")}</p>
                <ul>
                  <li>{t("ssA2Bullet1")}</li>
                  <li>{t("ssA2Bullet2")}</li>
                  <li>{t("ssA2Bullet3")}</li>
                  <li>{t("ssA2Bullet4")}</li>
                  <li>{t("ssA2Bullet5")}</li>
                </ul>
                <p>{t("ssA2Outro")}</p>
              </Article>

              <Article question={t("ssQ3")}>
                <p>
                  {t("ssA3Para1Prefix")}{" "}
                  {/* Both of V1's "click here"s on this page are `href="#"`. One means "buy a plan",
                      the other means "log in" — and both of those are real pages. */}
                  <Link href={toV4("/choose-subscription")}>{t("ssA3Para1Link")}</Link>
                  {"."}
                </p>
                <p>
                  {t("ssA3Para2Prefix")}{" "}
                  <Link href={toV4("/login")}>{t("ssA3Para2Link")}</Link>
                </p>
              </Article>

              <Article question={t("ssQ4")}>
                <p>{t("ssA4")}</p>
              </Article>

              <Article question={t("ssQ5")}>
                <p>{t("ssA5")}</p>
              </Article>
            </ArticleList>

            <Notice tone="warning" title={t("ssDisclaimerLabel")} className="mt-14">
              {t("ssDisclaimer")}
            </Notice>
          </div>
        </Container>
      </Section>

      <RelatedTopics
        current={HREF}
        actions={
          <>
            <ButtonLink href={toV4("/score-simulator")} arrow>
              {t("featScoreSimulator")}
            </ButtonLink>
            <ButtonLink href={toV4("/choose-subscription")} variant="secondary" arrow>
              {t("sitemapSubscriptionPlans")}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
