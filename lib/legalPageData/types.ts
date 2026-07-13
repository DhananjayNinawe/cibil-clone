export interface TermsSubsection {
  heading: string;
  body: string;
}

export interface TermsSection {
  /**
   * Slug for the in-page anchor and the table-of-contents link.
   * Must be identical across locales so anchors keep working when the language changes.
   */
  id: string;
  heading: string;
  body?: string;
  subsections?: TermsSubsection[];
}
