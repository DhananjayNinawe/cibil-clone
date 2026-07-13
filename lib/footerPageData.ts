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
  { year: "2024", paras: ["Launched new solutions like API Market place, NTC 2.0, Early Risk Score, MFI Batch."] },
  {
    year: "2025",
    paras: [
      "Launched CreditVision® CIBIL Commercial Rank and as well as other flagship solutions",
      "Marked CIBIL's 25th anniversary by elevating the 15th Annual Credit Conference into a defining industry event, graced by stalwarts and thought leaders from across the credit landscape..",
    ],
  },
];

export interface OverviewSection {
  heading: string;
  /** Body copy in the inline markup understood by `lib/richText.tsx` (`**bold**`, links, `- ` bullets). */
  body: string;
}

export const SUIT_FILED_OVERVIEW: OverviewSection[] = [
  {
    heading: "RBI Suit-Filed Accounts - An Overview",
    body: `TransUnion CIBIL Limited (Formerly: CIBIL) - India's first credit information bureau - has been established to cater to the credit information requirement of the financial sector and serves as an effective mechanism for curbing the growth of Non-Performing Assets (NPAs). The Reserve Bank of India (RBI) constituted a Working Group in December 2001 to examine the possibility of TransUnion CIBIL performing the role of collecting and disseminating information on suit-filed accounts and list of defaulters, being reported to RBI by banks and notified Financial Institutions (FIs).
RBI then decided to implement some of the recommendations of the Working Group, which satisfied the existing legal framework of the time. In their letter no: DL.BC.111/20.16.001/2001-02 dated June 4, 2002; RBI apprised banks, FIs and state financial corporations of the formation of TransUnion CIBIL and directed them to send, to TransUnion CIBIL as well as to RBI, data on:
- Suit-filed accounts of ₹ 1 Crore and above, and
- Suit-filed accounts (wilful defaulters) of ₹ 25 Lacs and above
Consequently, banks and FIs submitted the list of suit-filed accounts of ₹ 1 Crore and above, as on March 31, 2002 and quarterly updates thereof till December 2002, to TransUnion CIBIL as well as RBI. They also submitted the list of suit-filed accounts (wilful defaulters) of ₹ 25 Lacs and above as at the end of March, June, September and December 2002. Thereafter, from March 31, 2003 onwards, this data is being submitted to TransUnion CIBIL alone.
At present, TransUnion CIBIL is maintaining a database on suit-filed accounts of ₹ 1 Crore and above and suit-filed accounts (wilful defaulters) of ₹ 25 Lacs and above. This information is based on an application developed to enable the users to access data through a parameterised search process across banks and companies at various geographical locations. Suit-filed accounts of lower value are being covered in a phased manner.`,
  },
  {
    heading: "RBI Non-Suit Filed Accounts - An Overview",
    body: `Reserve Bank of India had constituted a Committee to recommend data format for furnishing of credit information to Credit Information Companies. The report of the Committee was placed on RBI's website on March 22, 2014.
On the basis of the recommendations made by the Committee and after examining those recommendations, RBI had issued a circular dated June 27, 2014 on Defaulters of ₹ 1 crore and above (non-suit filed accounts) and Wilful Defaulters of ₹ 25 lakhs and above (non-suit filed accounts) – Changes in reporting to Reserve Bank of India (RBI)/Credit Information Companies (CICs), whereby Banks/FIs were advised to furnish data in respect of wilful defaulters (non-suit filed accounts) of ₹ 25 lakhs and above for the quarter ending December 31, 2014 and the data on defaulters (non-suit filed accounts) of ₹ 1 crore and above for the half year ending December 31, 2014 to CICs and not to RBI.
RBI further advised Banks/FIs that they may continue to furnish data in respect of defaulters/wilful defaulters to CICs on a monthly or a more frequent basis. This would enable such information to be available to the banks/FIs on a near real time basis. In the light of the above Circular, TransUnion CIBIL is maintaining the data in respect of wilful defaulters (non-suit filed accounts) of ₹ 25 lakhs & above and defaulters (non-suit filed accounts) of ₹ 1 crore and above for the quarter ending December 31, 2014 onwards.
Banks/FIs sharing information on Non – Suit filed accounts have access to the data. User ID and password is shared with them.
This information is based on an application developed to enable the users to access data through a parameterised search process across banks and companies at various geographical locations.`,
  },
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
