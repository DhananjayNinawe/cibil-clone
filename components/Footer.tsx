"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";
import {
  LinkedInIcon,
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
} from "@/components/icons";

export type FooterVariant = "simple" | "minimal" | "full" | "corporate";

interface FooterProps {
  /**
   * "simple"    – copyright + FAQs/Terms/Privacy links, border-top (default, used by /register)
   * "minimal"   – copyright only, no border, no links (used by /login)
   * "full"      – multi-column site footer with contact card (used by /choose-subscription and home page)
   * "corporate" – multi-column site footer with About us/Information/Suit filed cases columns + certification line (used by /about-us)
   */
  variant?: FooterVariant;
  /** Renders a gold accent border-top instead of the plain gray one (used by the home page). */
  accentTop?: boolean;
}

/** Maps footer link translation keys to their internal route. Missing keys fall back to "#". */
const FOOTER_LINK_HREFS: Partial<Record<TranslationKey, string>> = {
  privacyPolicy: "/privacy-policy",
  termsConditions: "/legal/terms-and-conditions",
  footerTermsOfUse: "/legal/terms-and-conditions",
  footerAboutTransunionCibil: "/about-us",
  footerCompanyHistory: "/about-us/company-history",
  footerSupport: "/contact-us",
  footerReportVulnerability: "/contact-us",
  footerCodeOfConduct: "/external-links/business-code-of-conduct",
  footerOfficialPartners: "/official-partners",
  footerOverview: "/suit-filed-cases/overview",
  footerNonSuitCases: "/suit-filed-cases/suit-filed-cases",
  footerRbiNotifications: "/external-links/rbi-notifications",
  footerRegulatoryDisclosure: "/regulatory",
  footerBlog: "/blog/main",
  footerSitemap: "/sitemap",
};

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/credit-information-bureau-india-limited",
    Icon: LinkedInIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/CIBIL-329225453912063/",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/CIBILonline",
    Icon: YoutubeIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/transunion_cibil/",
    Icon: InstagramIcon,
  },
];

interface FooterColumnConfig {
  title: string;
  links: TranslationKey[];
}

export default function Footer({ variant = "simple", accentTop = false }: FooterProps) {
  const { t } = useLanguage();

  if (variant === "minimal") {
    return (
      <footer className="bg-white py-6 px-4">
        <p className="text-xs text-gray-500 text-center">{t("copyright")}</p>
      </footer>
    );
  }

  if (variant === "full") {
    const columns: FooterColumnConfig[] = [
      {
        title: t("footerAboutUs"),
        links: ["footerAboutTransunionCibil", "footerCompanyHistory", "footerSupport", "footerReportVulnerability", "footerCodeOfConduct"],
      },
      {
        title: t("footerInformation"),
        links: ["footerOfficialPartners", "footerNonSuitCases", "footerRbiNotifications", "footerRegulatoryDisclosure"],
      },
      { title: t("footerCreditEducation"), links: ["footerBlog"] },
    ];
    const bottomLinks: TranslationKey[] = ["privacyPolicy", "footerTermsOfUse", "footerSitemap", "footerReportVulnerability"];

    return <FullFooterLayout columns={columns} bottomLinks={bottomLinks} accentTop={accentTop} />;
  }

  if (variant === "corporate") {
    const columns: FooterColumnConfig[] = [
      {
        title: t("footerCorpAboutUsHeading"),
        links: [
          "footerAboutTransunionCibil",
          "footerNewsroom",
          "footerCareers",
          "footerCompanyHistory",
          "footerCorporateInformation",
          "footerLifeAtTu",
          "footerReportVulnerability",
          "footerCodeOfConduct",
        ],
      },
      { title: t("footerInformation"), links: ["footerBecomeMember", "footerRbiNotifications"] },
      { title: t("footerCorpSuitFiledHeading"), links: ["footerOverview", "footerGistRbiScheme"] },
    ];
    const bottomLinks: TranslationKey[] = ["privacyPolicy", "termsConditions", "footerReportVulnerability", "footerCodeBusinessConduct"];

    return <FullFooterLayout columns={columns} bottomLinks={bottomLinks} accentTop={accentTop} extraLine={t("footerCertifications")} />;
  }

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2 text-center">
        <p className="text-xs text-gray-500">{t("copyright")}</p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a href="#" className="text-xs text-gray-500 hover:text-[#00b0f0] hover:underline transition-colors">
            {t("faqs")}
          </a>
          <Link href="/legal/terms-and-conditions" className="text-xs text-gray-500 hover:text-[#00b0f0] hover:underline transition-colors">
            {t("termsConditions")}
          </Link>
          <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-[#00b0f0] hover:underline transition-colors">
            {t("privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ linkKey }: { linkKey: TranslationKey }) {
  const { t } = useLanguage();
  const href = FOOTER_LINK_HREFS[linkKey] ?? "#";
  return (
    <Link href={href} className="text-sm font-semibold text-gray-700 hover:text-[#00b0f0] hover:underline">
      {t(linkKey)}
    </Link>
  );
}

function FullFooterLayout({
  columns,
  bottomLinks,
  accentTop,
  extraLine,
}: {
  columns: FooterColumnConfig[];
  bottomLinks: TranslationKey[];
  accentTop: boolean;
  extraLine?: string;
}) {
  const { t } = useLanguage();

  return (
    <footer className={`bg-white ${accentTop ? "border-t-[3px] border-[#f5c518]" : "border-t border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold text-gray-800 border-b-2 border-[#00b0f0] pb-2 mb-3 inline-block">{column.title}</h3>
              <ul className="space-y-2.5 mt-1">
                {column.links.map((linkKey) => (
                  <li key={linkKey}>
                    <FooterLink linkKey={linkKey} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t("haveQuestions")}</h3>
            <Link
              href="/contact-us"
              className="inline-block bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full px-6 py-2.5 transition-colors"
            >
              {t("contactUs")}
            </Link>
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <Image
                src="/ifg-lockup-yellow-grey.svg"
                alt={t("infoForGood")}
                width={150}
                height={86}
                className="h-auto w-37.5 select-none"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4 max-w-xs">{t("copyright")}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
          {bottomLinks.map((linkKey) => (
            <Link
              key={linkKey}
              href={FOOTER_LINK_HREFS[linkKey] ?? "#"}
              className="text-xs text-gray-500 hover:text-[#00b0f0] hover:underline transition-colors"
            >
              {t(linkKey)}
            </Link>
          ))}
        </div>
        {extraLine && (
          <div className="max-w-7xl mx-auto mt-4">
            <p className="text-xs text-gray-400 tracking-wide">{extraLine}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
