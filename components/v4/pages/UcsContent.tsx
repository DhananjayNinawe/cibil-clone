"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import PageHero from "@/components/v4/ui/PageHero";
import { FaqBody, type FaqGroup } from "@/components/v4/faq/FaqShell";
import RelatedTopics from "@/components/v4/faq/RelatedTopics";
import VideoPlate from "@/components/v4/faq/VideoPlate";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

const HREF = toV4("/faq/understand-your-credit-score-and-report");

/**
 * `/v4/faq/understand-your-credit-score-and-report` — eleven questions, grouped by the part of the
 * report they are about.
 *
 * That grouping is not decoration. The report has six named sections, and this page tells you what
 * they are (Q4) and then answers questions about them (Q6–Q9 are all Account Information; Q10 is
 * Enquiry Information). V1 lists all eleven flat, so the reader has to re-derive that structure for
 * themselves. Here the group headings are the report's own section names, straight from the
 * catalog — the page is filed the way the document it explains is filed.
 */
export default function UcsContent() {
  const { t } = useV4();

  const groups: FaqGroup[] = [
    {
      id: "score-and-report",
      label: t("featCibilScoreReport"),
      content: (
        <DisclosureList>
          <Disclosure question={t("ucsQ1")} defaultOpen>
            <p>{t("ucsA1")}</p>
          </Disclosure>

          <Disclosure question={t("ucsQ2")}>
            <p>{t("ucsA2")}</p>
            <VideoPlate
              id="7cHGllcvWjY"
              thumb="https://i.ytimg.com/vi/7cHGllcvWjY/maxresdefault.jpg"
              title={t("ucsVideoReadReportTitle")}
              className="max-w-lg"
            />
          </Disclosure>
        </DisclosureList>
      ),
    },
    {
      id: "credit-report",
      label: t("featCibilCreditReport"),
      content: (
        <DisclosureList>
          <Disclosure question={t("ucsQ3")}>
            <p>
              {t("ucsA3Prefix")}{" "}
              <Link href={toV4("/choose-subscription")}>{t("ucsA3Link")}</Link>
              {t("ucsA3Suffix")}
            </p>
            <p>
              <Link href={toV4("/watch-and-learn")}>{t("ucsVideoLinkLine")}</Link>
            </p>
            <p>{t("ucsRegionalLangs")}</p>
            <RegionalLanguages />
          </Disclosure>

          <Disclosure question={t("ucsQ4")}>
            {/* V1 links "Understand Your CIR" at a document that does not exist on this site, via
                `href="#"`. The name of the document is kept; the dead link is not. */}
            <p>
              {t("ucsA4Prefix")} <strong>{t("ucsA4Link")}</strong> {t("ucsA4Suffix")}
            </p>
            <ReportSections />
          </Disclosure>

          <Disclosure question={t("ucsQ5")}>
            <p>
              {t("ucsA5Prefix")} <strong>{t("ucsA5Link")}</strong> {t("ucsA5Suffix")}
            </p>
          </Disclosure>
        </DisclosureList>
      ),
    },
    {
      id: "account-information",
      label: t("ucsSectionAccount"),
      content: (
        <DisclosureList>
          <Disclosure question={t("ucsQ6")}>
            <p>{t("ucsA6")}</p>
          </Disclosure>

          <Disclosure question={t("ucsQ7")}>
            <p>{t("ucsA7")}</p>
          </Disclosure>

          <Disclosure question={t("ucsQ8")}>
            <p>{t("ucsA8Para1")}</p>
            {/* The catalog string opens a parenthesis it never closes — V1 prints the ")" as a bare
                text node in the JSX. Kept, as punctuation rather than copy. */}
            <p>
              <em>
                {t("ucsA8Para2Italic")}{" "}
                <Link href={toV4("/choose-subscription")}>{t("sitemapSubscriptionPlans")}</Link>
                {")"}
              </em>
            </p>
          </Disclosure>

          <Disclosure question={t("ucsQ9")}>
            <p>
              {t("ucsA9")}{" "}
              <Link href={toV4("/choose-subscription")}>{t("sitemapSubscriptionPlans")}</Link>
            </p>
          </Disclosure>
        </DisclosureList>
      ),
    },
    {
      id: "enquiry-information",
      label: t("ucsSectionEnquiry"),
      content: (
        <DisclosureList>
          <Disclosure question={t("ucsQ10")}>
            <VideoPlate
              id="FS08WcDyBkA"
              thumb="https://i.ytimg.com/vi/FS08WcDyBkA/maxresdefault.jpg"
              title={t("ucsVideoEnquiryTitle")}
              className="max-w-lg"
            />
            <p>{t("ucsEnquiriesRegional")}</p>
            <RegionalLanguages />
          </Disclosure>
        </DisclosureList>
      ),
    },
    {
      id: "information-security",
      label: t("ucsQ11"),
      content: (
        <div className="v4-prose">
          <p>{t("ucsA11")}</p>
          <p>
            {/* V1 sends this to `#`. The brochure it names is a real page on this site. */}
            <Link href={toV4("/faq-brochure")}>{t("ucsDownloadBrochure")}</Link>
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("filterUnderstandingCibil"), href: toV4("/faq-brochure") }}
        label={t("faqs")}
        title={t("ucsHeroTitle")}
        actions={
          <ButtonLink href={toV4("/register")} size="lg" arrow>
            {t("checkNewScoreBtn")}
          </ButtonLink>
        }
      />

      <FaqBody groups={groups} />

      <RelatedTopics
        current={HREF}
        actions={
          <>
            <ButtonLink href={toV4("/cibil-score-report")} arrow>
              {t("megaCibilScoreReport")}
            </ButtonLink>
            <ButtonLink href={toV4("/consumer-dispute-resolution")} variant="secondary" arrow>
              {t("megaConsumerDisputeResolution")}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}

/**
 * The six sections of a CIBIL Report, as a definition list.
 *
 * V1 renders them as bold-then-linebreak inside a `<ul>`, which announces "CIBIL Score Your CIBIL
 * score, calculated based on…" as one undifferentiated run. A `<dl>` says which half is the name and
 * which is the explanation, and it is what the content already is.
 */
function ReportSections() {
  const { t } = useV4();

  const sections: { term: TranslationKey; desc: TranslationKey }[] = [
    { term: "ucsSectionScore", desc: "ucsSectionScoreDesc" },
    { term: "ucsSectionPersonal", desc: "ucsSectionPersonalDesc" },
    { term: "ucsSectionContact", desc: "ucsSectionContactDesc" },
    { term: "ucsSectionEmployment", desc: "ucsSectionEmploymentDesc" },
    { term: "ucsSectionAccount", desc: "ucsSectionAccountDesc" },
    { term: "ucsSectionEnquiry", desc: "ucsSectionEnquiryDesc" },
  ];

  return (
    <dl className="v4-plane-flat divide-y divide-[var(--v4-edge)]">
      {sections.map((section) => (
        <div key={section.term} className="grid gap-1 p-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
          <dt className="text-[0.9375rem] font-bold text-[var(--v4-fg)]">{t(section.term)}</dt>
          <dd className="text-[0.9375rem] leading-relaxed text-[var(--v4-fg-2)]">
            {t(section.desc)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The regional languages the videos are available in.
 *
 * V1 renders each as a link to `href="#"` — five dead links in a row. There is no per-language video
 * page on this site to point them at, so V4 states the fact (these languages exist) without lying
 * about being able to take you there. A list of five nouns is worth more than five links to nowhere.
 */
function RegionalLanguages() {
  const { t } = useV4();
  const languages: TranslationKey[] = [
    "langTamil",
    "langMalayalam",
    "langKannada",
    "langHindi",
    "langTelugu",
  ];

  return (
    <ul className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <li key={language} className="v4-chip">
          {t(language)}
        </li>
      ))}
    </ul>
  );
}
