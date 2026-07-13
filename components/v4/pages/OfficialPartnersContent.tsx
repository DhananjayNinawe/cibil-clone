"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalIcon } from "@/components/v4/ui/Icons";
import { Container, Section } from "@/components/v4/ui/Layout";
import Logo from "@/components/v4/ui/Logo";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import { toV4 } from "@/lib/v4/routes";
import { useV4 } from "@/lib/v4/useV4";

/** The single artwork holding every partner's mark, as published on cibil.com. */
const PARTNER_LOGOS_URL =
  "https://www.cibil.com/official-partners/_jcr_content/root/contentcontainer/pagesection/image.coreimg.75.1440.png/1781601071300/logo16jun.png";

/**
 * Official Partners — a page that exists because people are being defrauded.
 *
 * Read what it actually says: entities are falsely claiming to be CIBIL partners in order to get
 * consumers to hand over their PAN and date of birth. So this is not a logo wall. It is a warning
 * with a reference image attached, and V4 orders it that way — the marks first, so a reader can
 * check the site they were sent to against them, and then the disclosure, at full legibility, with
 * the one sentence that tells them what to look for raised into a warning banner.
 *
 * The partners' marks are drawn for white and sit on a night band, so they are seated on the white
 * mount (`.v4-mount`) rather than recoloured. You do not tint someone else's trademark to match
 * your section — which is the same rule that governs CIBIL's own logo two inches above them.
 */
export default function OfficialPartnersContent() {
  const { t } = useV4();

  return (
    <>
      <Section space="md">
        <Container>
          <p className="v4-label">
            <span className="inline-block h-[3px] w-[14px] translate-y-[-3px] rounded-[1px] bg-[var(--v4-mark)]" />
            <span className="ml-2.5">{t("footerOfficialPartners")}</span>
          </p>
          <h1 className="v4-h1 mt-4 max-w-[24ch]">{t("officialPartnersTitle")}</h1>
        </Container>
      </Section>

      {/* ── The marks ─────────────────────────────────────────────────────────────────────────── */}
      <Section tone="night" space="md" aria-labelledby="v4-partners-heading">
        <Container>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Logo tone="night" />
            <p id="v4-partners-heading" className="v4-body">
              {t("officialPartnersIntro")}
            </p>
          </div>

          <Reveal variant="focus" className="v4-mount mt-10 p-6 sm:p-10">
            <Image
              src={PARTNER_LOGOS_URL}
              alt={t("officialPartnersTitle")}
              width={934}
              height={642}
              unoptimized
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="mx-auto h-auto w-full max-w-[58rem]"
            />
          </Reveal>
        </Container>
      </Section>

      {/* ── The disclosure ────────────────────────────────────────────────────────────────────── */}
      <Section space="lg">
        <Container>
          <div className="v4-prose">
            <p>{t("officialPartnersWarn1")}</p>
          </div>

          {/* The single most useful sentence on the page — how to tell a real partner from a fake
              one. In V1 it is one bold paragraph in a run of six. Here it is the warning it is. */}
          <Notice tone="warning" className="my-8 max-w-[var(--v4-measure)]">
            {t("officialPartnersWarn2")}
          </Notice>

          <div className="v4-prose">
            <p>{t("officialPartnersWarn3")}</p>
            <p>{t("officialPartnersWarn4")}</p>
            <RichText text={t("officialPartnersReport")} />
            <p>{t("officialPartnersWarn5")}</p>
            <RichText text={t("officialPartnersWarn6")} />
          </div>

          <p className="v4-caption mt-10 max-w-[var(--v4-measure)] border-t border-[var(--v4-edge)] pt-5 italic">
            {t("officialPartnersKpmgNote")}
          </p>
        </Container>
      </Section>
    </>
  );
}

/**
 * The catalog's inline markup, rendered in V4's own language.
 *
 * Two of these strings carry links inside the sentence — `[clicking here](/contact-us)` and
 * `[www.cibil.com](https://www.cibil.com)` — which is why the copy is stored with markup at all:
 * splitting a legal sentence into prefix/link/suffix keys is how a translator ends up reassembling
 * it in the wrong order. `lib/richText.tsx` already parses this, but it emits V1's grey palette and
 * — the disqualifying part — routes internal links to V1, dropping the reader out of V4 mid-page.
 * So the same grammar is parsed here and drawn with V4's rules: `toV4()` on every internal href,
 * and the external-link glyph plus an announced "opens in a new tab" on every outbound one.
 */
function RichText({ text }: { text: string }) {
  const { t4 } = useV4();
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    const [raw, bold, label, href] = match;

    if (bold) {
      nodes.push(<strong key={start}>{bold}</strong>);
    } else if (/^https?:/.test(href)) {
      nodes.push(
        <a
          key={start}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-1"
        >
          {label}
          <ExternalIcon size={13} className="self-center" />
          <span className="v4-sr">{t4("v4OpensInNewTab")}</span>
        </a>,
      );
    } else {
      nodes.push(
        <Link key={start} href={toV4(href)}>
          {label}
        </Link>,
      );
    }

    cursor = start + raw.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return <p>{nodes}</p>;
}
