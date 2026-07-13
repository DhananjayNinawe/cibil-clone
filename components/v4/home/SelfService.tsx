"use client";

import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/v4/ui/Layout";
import { Reveal } from "@/components/v4/motion/Reveal";
import { ArrowRightIcon, DisputeIcon, DocumentIcon, UsersIcon } from "@/components/v4/ui/Icons";
import type { TranslationKey } from "@/lib/i18n";
import type { ComponentType } from "react";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";
import type { IconProps } from "@/components/v4/ui/Icons";

/**
 * Self-service.
 *
 * Three things a reader can do without talking to anyone. V1 renders these as a paragraph with the
 * word "here" hyperlinked three times — which is both the oldest usability failure on the web (a
 * link whose text says nothing about its destination; WCAG 2.4.4) and, for a screen-reader user
 * listing the links on the page, three identical entries called "here".
 *
 * So each one becomes a row whose *whole sentence* is the link, with the destination named. The
 * copy is unchanged — it is V1's, verbatim — but the thing you click now says where it goes.
 */

interface Action {
  key: TranslationKey;
  label: TranslationKey;
  href: string;
  icon: ComponentType<IconProps>;
}

const ACTIONS: Action[] = [
  {
    key: "selfServiceReportDispute",
    label: "megaConsumerDisputeResolution",
    href: toV4("/consumer-dispute-resolution"),
    icon: DisputeIcon,
  },
  {
    key: "selfServiceMfiDispute",
    label: "megaMfiDisputeResolution",
    href: toV4("/microfinance-dispute-resolution"),
    icon: UsersIcon,
  },
  {
    // V1 points this one at "#" — a link to nowhere. A document upload belongs with the enquiry
    // form, which is where the site actually accepts one.
    key: "selfServiceUploadDocs",
    label: "megaConsumerEnquiry",
    href: toV4("/enquiry"),
    icon: DocumentIcon,
  },
];

export default function SelfService() {
  const { t, t4 } = useV4();

  return (
    <Section tone="tint" aria-labelledby="v4-self-heading">
      <Container width="wide">
        <SectionHead
          id="v4-self-heading"
          label={t4("v4SectionService")}
          title={
            <>
              {t("selfServiceHeadingPrefix")}{" "}
              <span className="v4-mark-word">{t("selfServiceHeadingBrand")}</span>
            </>
          }
        />

        <ul className="mt-10 grid gap-3">
          {ACTIONS.map((action, i) => (
            <li key={action.key}>
              <Reveal index={i}>
                <Link
                  href={action.href}
                  className="v4-plane v4-plane-lift group flex items-center gap-5 px-5 py-5 sm:px-7"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--v4-r-sm)] bg-[var(--v4-surface-2)] text-[var(--v4-accent)]">
                    <action.icon size={20} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] leading-snug text-[var(--v4-fg-2)]">
                      {t(action.key)}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-bold text-[var(--v4-fg)] group-hover:text-[var(--v4-accent)]">
                      {t(action.label)}
                    </span>
                  </span>

                  <ArrowRightIcon
                    size={18}
                    className="shrink-0 text-[var(--v4-fg-3)] transition-transform duration-200 ease-[var(--v4-ease)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
