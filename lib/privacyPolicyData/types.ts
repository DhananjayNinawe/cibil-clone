export interface PolicyPart {
  /** Optional sub-heading within a section (e.g. "Information we collect automatically"). */
  subheading?: string;
  /** Rich-text body; paragraphs separated by newlines. */
  body?: string;
  /** A tight, un-spaced run of lines — used for the Grievance Officer's postal address. */
  lines?: string[];
}

export interface PolicySection {
  heading: string;
  parts: PolicyPart[];
}
