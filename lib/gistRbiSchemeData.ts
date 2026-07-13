/**
 * Content for the "Gist of RBI Scheme" page, transcribed from the source site.
 *
 * Like `lib/legalPageData.ts`, this is long-form regulatory copy rather than UI chrome, so it lives
 * here as plain English data instead of being split across the four locale files. The text quotes
 * RBI circulars verbatim (including the definition of "wilful default") and must not be
 * machine-translated; the page chrome around it (title, side nav) *is* i18n'd. To refresh the
 * document, replace the strings below — the page renders whatever is in this array, so no component
 * changes are needed.
 *
 * `body` strings support the inline markup understood by `lib/richText.tsx`:
 *   `**bold**`, `[label](/href)`, and lines starting with `- ` become bullets.
 *
 * Headings are numbered by the component from array order — do not prefix them with "1." here.
 */

export interface GistScheme {
  /** Slug for the in-page anchor. */
  id: string;
  heading: string;
  body: string;
}

export const GIST_RBI_SCHEMES: GistScheme[] = [
  {
    id: "defaulters-1-crore",
    heading: "Scheme on collection and dissemination of information regarding defaulters of ₹ 1 crore and above",
    body: `In its circular DBOD No.BC/CIS/47/20.16.002/94 dated April 23, 1994 Reserve Bank of India (RBI) has advised the scheduled commercial banks and financial institutions (FIs) that the Hon'ble Finance Minister in his Budget Speech on February 28, 1994, announced that in order to alert the banks and financial institutions (FIs) and put them on guard against borrowers who have defaulted in their dues to other lending institutions, the RBI was putting in place arrangements for circulating among banks and FIs names of defaulting borrowers above a threshold limit. He further mentioned that the Reserve Bank would also publish a list of defaulting borrowers in cases where suits have been filed by banks and FIs.`,
  },
  {
    id: "salient-features",
    heading:
      "Accordingly, the Reserve Bank of India has prepared a scheme to collect and disseminate information on the defaulters of ₹ 1 crore and above. The salient features of the scheme, as modified from time to time, are as under at present:",
    body: `- The banks and FIs are required to submit the details of the non-suit filed borrowal accounts which have been classified as doubtful and loss accounts by them with outstandings (both under funded and non-funded) aggregating ₹ 1 crore and above in prescribed format to the Reserve Bank of India as on March 31 and September 30 every year.
- The data on defaulters received from banks/FIs, as mentioned above is circulated in a consolidated form by RBI to the banks and FIs as on March 31 and September 30 every year for their confidential use. It is the responsibility of the banks/ FIs to ensure accuracy of their data furnished to RBI. RBI is not liable for any discrepancy/inaccuracy in this regard.`,
  },
  {
    id: "wilful-defaults-25-lakh",
    heading: "Scheme on collection and dissemination of information on wilful defaults of ₹ 25 lakh and above",
    body: `(i) Pursuant to the instructions of the Central Vigilance Commission, Reserve Bank of India introduced above scheme in terms of circular DBOD No.BC.DL(W)12/20.16.002(1)/98-99 dated February 20, 1999 addressed to banks and notified FIs under which it collects and disseminates information from/to them on cases of wilful defaults of ₹ 25 lakh and above on a quarterly basis. In terms of circular DBOD No.DL(W)BC.110/ 20.16.003/2001-02 dated May 30, 2002, the term 'wilful default' has been redefined in supersession of earlier definition / illustrations, as follows: "A wilful default would be deemed to have occurred if any of the following events is noted:
- The unit has defaulted in meeting its payment/repayment obligations to the lender even when it has the capacity to honour the said obligations.
- The unit has defaulted in meeting its payment/repayment obligations to the lender and has not utilised the finance from the lender for the specific purposes.`,
  },
];
