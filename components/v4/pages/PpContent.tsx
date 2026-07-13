"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import { ChartIcon, DocumentIcon } from "@/components/v4/ui/Icons";
import { Container, Section } from "@/components/v4/ui/Layout";
import PageHero from "@/components/v4/ui/PageHero";
import { Article, ArticleList } from "@/components/v4/faq/FaqShell";
import RelatedTopics from "@/components/v4/faq/RelatedTopics";
import { Reveal } from "@/components/v4/motion/Reveal";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

const HREF = toV4("/faq/purchase-post-purchase-help");

/**
 * `/v4/faq/purchase-post-purchase-help` — four questions.
 *
 * Four is below the threshold where progressive disclosure buys anything: an accordion here hides
 * the entire page and asks for four clicks to reveal that it was a page you could have read in two
 * minutes. So no rail, no accordions — an article, at a reading measure, the way a help page for a
 * reader who is already mid-purchase and mildly annoyed should read.
 *
 * The one graphic is the "Refresh Center" panel from Q2. V1 shows a screenshot of it: a PNG of an
 * English user interface, which stays English on the Tamil page, cannot be read by a screen reader,
 * and blurs when a low-vision reader zooms. Every string in that screenshot is already in the
 * catalog (`ppRefreshCenter`, `ppReportAge`, `ppBuyReportsBtn`) and unused — so V4 draws the panel
 * instead of photographing it.
 */
export default function PpContent() {
  const { t } = useV4();

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("filterUnderstandingCibil"), href: toV4("/faq-brochure") }}
        label={t("faqs")}
        title={t("ppHeroTitle")}
        actions={
          <ButtonLink href={toV4("/choose-subscription")} size="lg" arrow>
            {t("getYoursNowBtn")}
          </ButtonLink>
        }
      />

      <Section space="lg">
        <Container width="wide">
          <div className="max-w-[52rem]">
            <ArticleList>
              <Article question={t("ppQ1")}>
                <p>
                  {t("ppA1Prefix")}{" "}
                  <Link href={toV4("/choose-subscription")}>{t("ppA1Link")}</Link>{" "}
                  {t("ppA1Suffix")}
                </p>
              </Article>

              <Article question={t("ppQ2")}>
                <p>{t("ppA2")}</p>
                <RefreshCenter />
                <p>
                  <Link href={toV4("/login")}>{t("ppLoginMyCibil")}</Link>
                </p>
              </Article>

              <Article question={t("ppQ3")}>
                <p>{t("ppA3Para1")}</p>
                <p>{t("ppA3Para2")}</p>
              </Article>

              <Article question={t("ppQ4")}>
                <p>
                  {/* V1's "download" points at `href="#"` — the form it means is not a page on this
                      site, so the instruction is kept and the dead link is not. */}
                  {t("ppA4Prefix")} <strong>{t("ppA4Link")}</strong> {t("ppA4Suffix")}
                </p>
              </Article>
            </ArticleList>
          </div>
        </Container>
      </Section>

      <RelatedTopics
        current={HREF}
        actions={
          <>
            <ButtonLink href={toV4("/choose-subscription")} arrow>
              {t("sitemapSubscriptionPlans")}
            </ButtonLink>
            <ButtonLink href={toV4("/contact-us")} variant="secondary" arrow>
              {t("sitemapContactUsLink")}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}

/**
 * The myCIBIL Refresh Center, drawn.
 *
 * A `<figure>`, not a control: nothing in it is clickable, because clicking it here would do nothing
 * — it is a depiction of a panel that lives behind the login. The "Buy Credit Reports" affordance is
 * therefore a `<span>` styled as a button, and the whole thing carries a caption naming what it is.
 * A `<button>` that cannot be pressed is worse than a picture of one.
 */
function RefreshCenter() {
  const { t } = useV4();

  return (
    <Reveal variant="focus" as="figure" className="my-6 max-w-[30rem]">
      <div className="v4-plane overflow-hidden">
        <p className="v4-label flex items-center gap-2 border-b border-[var(--v4-edge)] bg-[var(--v4-surface-2)] px-5 py-3.5">
          <ChartIcon size={15} className="text-[var(--v4-fg-3)]" />
          {t("ppRefreshCenter")}
        </p>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-[var(--v4-fg-2)]">
            <DocumentIcon size={17} className="mt-px shrink-0 text-[var(--v4-fg-3)]" />
            {t("ppReportAge")}
          </p>
          {/* Painted as a button, but a <span>: it depicts a control that lives behind the login and
              cannot be pressed from here. A real <button> that does nothing is worse than a picture
              of one — it takes a tab stop and promises an action it will not perform. */}
          <span className="v4-btn v4-btn-primary v4-btn-sm shrink-0 cursor-default">
            {t("ppBuyReportsBtn")}
          </span>
        </div>
      </div>

      <figcaption className="v4-caption mt-3">{t("ppRefreshCenter")}</figcaption>
    </Reveal>
  );
}
