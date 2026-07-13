"use client";

import { useId, useState } from "react";
import { Container, Section } from "@/components/v4/ui/Layout";
import Notice from "@/components/v4/ui/Notice";
import { Reveal } from "@/components/v4/motion/Reveal";
import { useV4 } from "@/lib/v4/useV4";

/**
 * The Ethics Helpline gate.
 *
 * This page is not a page — it is a door with a sign on it. V1 renders it as a bare white sheet
 * with no navigation at all, because the reader is one click from leaving the site, and the whole
 * job of the screen is to make them read one sentence before they do: *do not report a credit
 * report problem here.* V4 keeps that job and keeps the sign in front of the door — one plane, one
 * warning, one control, nothing else on the band competing for the eye.
 *
 * ── About that control ──────────────────────────────────────────────────────────────────────────
 * There is no Ethics Helpline URL anywhere in this codebase: V1's "Continue" is `href="#"`, and V2
 * preserved the dead anchor. Neither option is open here — V4 does not ship a link that goes
 * nowhere (a link that lies is the exact failure this whole page exists to warn about), and it
 * certainly does not *invent* the address of a whistleblowing service, which is a fact and not a
 * design decision. So "Continue" is what it honestly is: a real, keyboard-reachable `<button>`,
 * wired to the disclosure pattern, which discloses that the destination is not wired up yet — in
 * the catalog's own words (`sectionContentComingSoon`, V1's standard not-yet-available notice).
 */
export default function CodeOfConductContent() {
  const { t } = useV4();
  const [open, setOpen] = useState(false);
  const panelId = `${useId()}-helpline`;

  return (
    <Section tone="tint" space="xl">
      <Container width="text">
        <Reveal className="v4-plane p-7 sm:p-10">
          <h1 className="v4-h2">{t("footerCodeBusinessConduct")}</h1>

          {/* The reason the gate exists, and the only thing on the page that must be read. */}
          <Notice tone="warning" title={t("cocImportantLabel")} className="mt-7">
            {t("cocImportantText")}
          </Notice>

          <div className="v4-prose mt-8">
            <p>
              {t("cocEthicsPrefix")}{" "}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((value) => !value)}
                className="v4-link"
              >
                {t("cocContinueLink")}
              </button>{" "}
              {t("cocEthicsSuffix")}
            </p>
          </div>

          {/* Always present, so `aria-controls` always resolves — it is the *content* that appears. */}
          <div id={panelId}>
            {open ? (
              <Notice tone="info" className="mt-6">
                {t("sectionContentComingSoon")}
              </Notice>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
