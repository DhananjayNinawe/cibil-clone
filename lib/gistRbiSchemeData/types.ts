export interface GistScheme {
  /** Slug for the in-page anchor. Must be identical across locales so links keep working. */
  id: string;
  heading: string;
  body: string;
}
