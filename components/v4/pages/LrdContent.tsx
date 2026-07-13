"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/v4/ui/Button";
import { Disclosure, DisclosureList } from "@/components/v4/ui/Disclosure";
import Notice from "@/components/v4/ui/Notice";
import PageHero from "@/components/v4/ui/PageHero";
import { Step, Steps } from "@/components/v4/ui/Steps";
import { FaqBody, type FaqGroup } from "@/components/v4/faq/FaqShell";
import RelatedTopics from "@/components/v4/faq/RelatedTopics";
import type { TranslationKey } from "@/lib/i18n";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

const HREF = toV4("/faq/loan-rejections-disputes");

/**
 * `/v4/faq/loan-rejections-disputes` — the longest page in the help system, and the one a reader is
 * most likely to arrive at frightened.
 *
 * Eighteen questions. V1 renders them as eighteen `<h2>`s in one column: no map, no grouping, and no
 * way to tell from the top of the page whether the thing you came to ask is even in there. Here they
 * are grouped into the four stages a reader is actually in — *I have found an error*, *how do I
 * report it*, *what happens next*, *it still is not fixed* — and the rail keeps those four visible
 * the whole way down. Order within each group is V1's, unchanged; the groups are simply the seams
 * that were already there.
 *
 * The other change is the process diagram. V1 shows the online dispute flow as a 1440px JPEG with
 * its steps baked into the pixels — untranslatable, unreadable by a screen reader, and unusable at
 * 400% zoom. The steps themselves are already in the catalog, so V4 sets them as an `<ol>` and
 * throws the picture away.
 */
export default function LrdContent() {
  const { t } = useV4();

  const groups: FaqGroup[] = [
    {
      id: "errors-in-your-report",
      label: t("disputeHeroTitle"),
      content: (
        <DisclosureList>
          <Disclosure question={t("lrdQ1")} defaultOpen>
            <p>{t("lrdA1")}</p>
          </Disclosure>

          <Disclosure question={t("lrdQ2")}>
            <Inaccuracies />
          </Disclosure>

          <Disclosure question={t("lrdQ3")}>
            <p>{t("lrdA3")}</p>
          </Disclosure>

          <Disclosure question={t("lrdQ4")}>
            <p>{t("lrdA4")}</p>
          </Disclosure>
        </DisclosureList>
      ),
    },
    {
      id: "raise-a-dispute",
      label: t("howToInitiateHeading"),
      content: (
        <DisclosureList>
          <Disclosure question={t("lrdQ5")}>
            <p>{t("lrdA5Intro")}</p>
            <DisputeSteps />
            <p>
              <Link href={toV4("/watch-and-learn")}>{t("lrdA5VideoLink")}</Link>
            </p>
            <p>
              <em>{t("lrdA5Note")}</em>
            </p>
            <p>
              <strong>{t("lrdA5Received")}</strong> {t("lrdA5ReceivedDesc")}
            </p>
            <p>{t("lrdA5Once")}</p>
            <p>{t("lrdA5Time")}</p>
            <p>
              <Link href={toV4("/consumer-dispute-resolution")}>{t("lrdA5UnderstandLink")}</Link>{" "}
              {t("lrdA5UnderstandSuffix")}
            </p>
          </Disclosure>

          <Disclosure question={t("lrdQ6")}>
            <p>{t("lrdA6")}</p>
          </Disclosure>

          <Disclosure question={t("lrdQ7")}>
            <p>{t("lrdA7")}</p>
          </Disclosure>

          <Disclosure question={t("lrdQ8")}>
            <p>{t("lrdA8Para1")}</p>
            <p>{t("lrdA8Para2")}</p>
          </Disclosure>
        </DisclosureList>
      ),
    },
    {
      id: "dispute-resolution-process",
      label: t("disputeProcessHeading"),
      content: (
        <DisclosureList>
          {(
            [
              ["lrdQ9", "lrdA9"],
              ["lrdQ10", "lrdA10"],
              ["lrdQ11", "lrdA11"],
              ["lrdQ12", "lrdA12"],
              ["lrdQ13", "lrdA13"],
              ["lrdQ14", "lrdA14"],
              ["lrdQ15", "lrdA15"],
              ["lrdQ16", "lrdA16"],
            ] as [TranslationKey, TranslationKey][]
          ).map(([question, answer]) => (
            <Disclosure key={question} question={t(question)}>
              <p>{t(answer)}</p>
            </Disclosure>
          ))}
        </DisclosureList>
      ),
    },
    {
      id: "still-not-updated",
      label: t("pointsToNoteHeading"),
      content: (
        <DisclosureList>
          <Disclosure question={t("lrdQ17")}>
            <p>{t("lrdA17Intro")}</p>
            <ul>
              <li>{t("lrdA17Bullet1")}</li>
              <li>{t("lrdA17Bullet2")}</li>
            </ul>
            <p>{t("lrdA17Suffix")}</p>
          </Disclosure>

          <Disclosure question={t("lrdQ18")}>
            <p>{t("lrdA18")}</p>
          </Disclosure>
        </DisclosureList>
      ),
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb={{ label: t("filterUnderstandingCibil"), href: toV4("/faq-brochure") }}
        label={t("faqs")}
        title={t("lrdHeroTitle")}
        lede={t("disputeHeroDesc")}
        actions={
          <>
            <ButtonLink href={toV4("/consumer-dispute-resolution")} size="lg" arrow>
              {t("raiseDisputeOnlineBtn")}
            </ButtonLink>
            <ButtonLink href={toV4("/complaints-and-escalations")} size="lg" variant="secondary" arrow>
              {t("megaComplaintsEscalations")}
            </ButtonLink>
          </>
        }
        aside={
          // The single most reassuring fact on the page, and V1 buries it two screens down the
          // dispute page instead of putting it where the frightened reader lands.
          <Notice tone="success">{t("disputeFreeServiceBanner")}</Notice>
        }
      />

      <FaqBody groups={groups} />

      <RelatedTopics
        current={HREF}
        actions={
          <>
            <ButtonLink href={toV4("/consumer-dispute-resolution")} arrow>
              {t("megaConsumerDisputeResolution")}
            </ButtonLink>
            <ButtonLink href={toV4("/nodal-officer-list")} variant="secondary" arrow>
              {t("megaNodalOfficerList")}
            </ButtonLink>
            <ButtonLink href={toV4("/framework-for-compensation")} variant="secondary" arrow>
              {t("megaFrameworkCompensation")}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}

/** The three kinds of inaccuracy a report can carry — a definition list, because that is what it is. */
function Inaccuracies() {
  const { t } = useV4();

  const dt = "font-bold text-[var(--v4-fg)]";
  const dd = "mt-1";

  return (
    <dl className="grid gap-4">
      <div>
        <dt className={dt}>{t("lrdA2Ownership")}</dt>
        <dd className={dd}>{t("lrdA2OwnershipDesc")}</dd>
      </div>

      <div>
        <dt className={dt}>{t("lrdA2Incorrect")}</dt>
        <dd className={dd}>{t("lrdA2IncorrectDesc")}</dd>
      </div>

      <div>
        <dt className={dt}>{t("lrdA2Inaccurate")}</dt>
        <dd className={dd}>
          {t("lrdA2InaccurateDesc")}{" "}
          {/* V1 sends "click here to view how to raise a dispute" to `href="#"`. It has a real home. */}
          <Link href={toV4("/consumer-dispute-resolution")}>{t("lrdA2ClickHere")}</Link>{" "}
          {t("lrdA2ClickHereSuffix")}
        </dd>
      </div>
    </dl>
  );
}

/**
 * The online dispute process, as an ordered list.
 *
 * This is the content of the flow diagram V1 ships as a JPEG on this page — the same four steps, in
 * the same order, drawn from the same catalog keys the dispute-resolution page uses to caption them.
 * Nothing here is new; it is the picture, read out.
 */
function DisputeSteps() {
  const { t } = useV4();

  return (
    <Steps>
      <Step n={1} title={t("step1Line1")} index={0}>
        <p>
          <Link href={toV4("/login")}>{t("login")}</Link> {t("step1LoginSuffix")}
        </p>
        <p>
          <Link href={toV4("/register")}>{t("step1EnrollLink")}</Link> {t("step1EnrollSuffix")}
        </p>
      </Step>

      <Step n={2} title={t("step2Desc")} index={1} />

      <Step n={3} title={t("step3Desc")} index={2} />

      <Step n={4} title={t("login")} index={3}>
        <p>{t("step4Desc")}</p>
      </Step>
    </Steps>
  );
}
