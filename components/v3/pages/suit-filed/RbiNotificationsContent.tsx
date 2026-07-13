"use client";

import { useV3 } from "@/lib/v3/useV3";
import { toV3 } from "@/lib/v3/routes";
import { RBI_CIRCULARS } from "@/lib/footerPageData";
import { Container, Section } from "@/components/v3/ui/Layout";
import PageHeader from "@/components/v3/ui/PageHeader";
import Rule from "@/components/v3/ui/Rule";
import SectionRail from "@/components/v3/pages/suit-filed/SectionRail";

/**
 * The RBI circulars that govern credit-information reporting.
 *
 * V1 sets these as a boxed five-column grid, which is the wrong object: nobody scans this table
 * across, they read down it looking for one instrument. So V3 sets it as a ruled register — one
 * numbered entry per circular, category as its folio, the circular's full name as the entry, and
 * the RBI reference and date as the two facts stamped beneath it.
 *
 * Reference numbers stay in Latin script and in the mono voice; they are identifiers, not prose,
 * and they are the same string in every locale. The dates are localised, so they are *not* set in
 * mono — the mono face carries no Devanagari or Tamil, and a half-mono date is worse than none.
 */
export default function RbiNotificationsContent() {
  const { t, language } = useV3();

  return (
    <>
      <PageHeader
        folio={t("footerInformation")}
        title={t("rbiNotifTitle")}
        breadcrumbs={[
          { label: t("searchHome"), href: toV3("/") },
          { label: t("footerCorpSuitFiledHeading"), href: toV3("/suit-filed-cases/overview") },
          { label: t("footerRbiNotifications") },
        ]}
      />

      <Section space="lg">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
            <SectionRail active="suitFiledSideRbi" className="self-start lg:sticky lg:top-32" />

            <div className="min-w-0">
              <ol className="border-t border-[var(--v3-line-3)]">
                {RBI_CIRCULARS[language].map((circular) => (
                  <li
                    key={circular.sr}
                    className="v3-row grid gap-x-6 gap-y-3 border-b border-[var(--v3-line)] py-7 sm:grid-cols-[2.5rem_minmax(0,1fr)]"
                  >
                    <p className="v3-num text-xs text-[var(--v3-fg-3)]">
                      <span className="sr-only">{t("rbiColSrNo")}</span>
                      {String(circular.sr).padStart(2, "0")}
                    </p>

                    <div className="min-w-0">
                      <p className="v3-folio">
                        <span className="sr-only">{t("rbiColCategory")}</span>
                        {circular.category}
                      </p>

                      <h2 className="mt-3 text-pretty text-base leading-snug font-medium text-[var(--v3-fg)]">
                        {circular.name}
                      </h2>

                      <dl className="mt-5 flex flex-wrap gap-x-12 gap-y-4">
                        <div>
                          <dt className="v3-folio">{t("rbiColReference")}</dt>
                          <dd className="v3-num mt-1.5 text-sm text-[var(--v3-fg-2)]">
                            {circular.reference}
                          </dd>
                        </div>

                        <div>
                          <dt className="v3-folio">{t("rbiColDate")}</dt>
                          <dd className="mt-1.5 text-sm text-[var(--v3-fg-2)]">{circular.date}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <Rule className="mt-24 sm:mt-32" />
        </Container>
      </Section>
    </>
  );
}
