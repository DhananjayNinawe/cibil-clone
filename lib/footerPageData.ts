/**
 * Content data for the footer-linked pages, transcribed from the source site.
 * These are factual/proper-noun content (company milestones, RBI circular titles, partner brand
 * names) rather than UI chrome, so they live here as plain English data — consistent with
 * `lib/blogCards.ts`. All surrounding page chrome (headings, table column labels, terms) is i18n'd.
 */

export interface TimelineEntry {
  year: string;
  paras: string[];
  bullets?: string[];
}

export const COMPANY_HISTORY: TimelineEntry[] = [
  { year: "2000", paras: ["TransUnion CIBIL Limited (formerly Credit Information Bureau (India) Limited) was incorporated based on recommendations made by the RBI Siddiqui Committee."] },
  { year: "2004", paras: ["Credit bureau services are launched in India (Consumer Bureau)."] },
  { year: "2006", paras: ["Commercial bureau operations commenced."] },
  { year: "2007", paras: ["CIBIL Score, India's first generic risk scoring model for banks and financial institutions, was introduced."] },
  {
    year: "2010",
    paras: ["Two firsts for the credit industry in India with the launch of:"],
    bullets: [
      "CIBIL Detect: India's first repository for information on high-risk activity.",
      "CIBIL Mortgage Check: The first centralized database on mortgages in India.",
    ],
  },
  { year: "2011", paras: ["Empowering Consumers- Direct access to CIBIL Report and Score through online and offline mode made available to consumers"] },
  {
    year: "2017",
    paras: [
      "TransUnion acquired a 92.1% stake in CIBIL.",
      "CreditVision is launched to expand the eligible consumer base and drive access to finance for many more deserving consumers.",
      "Free Annual Credit Report (FACR) is made available to individual consumers",
      "CIBIL MSME Rank (CMR) to assess the credit risk ranking of Micro, Small and Medium Enterprises (MSMEs) is introduced.",
    ],
  },
  { year: "2018", paras: ['SIDBI and TransUnion CIBIL launch "MSME Pulse" – India\'s largest study based on over 5 million active MSMEs.'] },
  { year: "2021", paras: ["TransUnion CIBIL Credit Market Indicator launched to chart health of India's Retail Lending Market"] },
  { year: "2023", paras: ["Launched MFI Score based on Joint Liability Group undertakings, to facilitate digital and centralized underwriting and drive financial inclusion."] },
  { year: "", paras: ["Launched new solutions like API Market place, NTC 2.0, Early Risk Score, MFI Batch."] },
  {
    year: "",
    paras: [
      "Launched CreditVision® CIBIL Commercial Rank and as well as other flagship solutions",
      "Marked CIBIL's 25th anniversary by elevating the 15th Annual Credit Conference into a defining industry event, graced by stalwarts and thought leaders from across the credit landscape..",
    ],
  },
];

export const OFFICIAL_PARTNERS: string[] = [
  "amazon pay", "G Pay", "KPMG", "Paytm", "paisabazaar", "G Pay Business",
  "Bajaj Finserv", "OneScore", "prefr", "kiwi", "TallyCapital", "scapia",
  "CSC", "IndiaLends", "First Advantage", "uni", "finfinity",
  "urban money", "Maruti Suzuki", "Nova Credit", "TATA NEU", "CRED",
  "AMBAK", "FINPLEX", "TURNO", "Spinny",
];

export interface RbiCircular {
  sr: number;
  category: string;
  name: string;
  reference: string;
  date: string;
}

export const RBI_CIRCULARS: RbiCircular[] = [
  { sr: 1, category: "Core", name: "Reserve Bank of India (Credit Information Companies) Directions, 2025", reference: "RBI/DOR/2025-26/378", date: "28-Nov-2025" },
  { sr: 2, category: "Amendment", name: "Reserve Bank of India (Credit Information Companies) Amendment Directions, 2025", reference: "RBI/DOR/2025-26/119", date: "04-Dec-2025" },
  { sr: 3, category: "Customer", name: "Reserve Bank of India (Credit Information Companies – Internal Ombudsman) Directions, 2026", reference: "RBI/CEPD/2025-26/386", date: "14-Jan-2026" },
  { sr: 4, category: "Customer", name: "Reserve Bank – Integrated Ombudsman Scheme (RB-IOS), 2026", reference: "Press Release 2025-26/1936", date: "14-Jan-2026" },
  { sr: 5, category: "Defaulter", name: "Reserve Bank of India (Commercial Banks – Treatment of Wilful Defaulters and Large Defaulters) Directions, 2025", reference: "RBI/DOR/2025-26/166", date: "28-Nov-2025" },
  { sr: 6, category: "Defaulter", name: "Reserve Bank of India (Non-Banking Financial Companies – Treatment of Wilful Defaulters and Large Defaulters) Directions, 2025", reference: "RBI/DOR/2025-26/358", date: "28-Nov-2025" },
  { sr: 7, category: "Defaulter", name: "Reserve Bank of India (All India Financial Institutions – Treatment of Wilful Defaulters and Large Defaulters) Directions, 2025", reference: "RBI/DOR/2025-26/333", date: "28-Nov-2025" },
  { sr: 8, category: "Operational", name: "Frequency of reporting of credit information by Credit Institutions to Credit Information Companies", reference: "RBI/2024-25/60", date: "08-Aug-2024" },
  { sr: 9, category: "Operational", name: "Implementation of Credit Information Reporting Mechanism subsequent to cancellation of licence or Certificate of Registration", reference: "RBI/2024-25/81", date: "10-Oct-2024" },
];
