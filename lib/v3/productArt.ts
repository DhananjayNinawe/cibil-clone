/**
 * The artwork and media the product pages ship.
 *
 * These are the same remote assets V1's product components point at (components/product-csr,
 * components/alerts, components/score-sim-product, components/ccr-product,
 * components/microfinance). V1 keeps them as private module constants — they are not exported —
 * so V3 restates the URLs rather than reaching into a component's internals. They are addresses,
 * not copy: nothing here is user-visible text, and nothing here is translated.
 *
 * Every one of them is served from cibil.com and is *not* in next.config.ts's optimizer
 * allowlist, which is why they are only ever rendered through <Plate> (or an <Image unoptimized>).
 */

const CONSUMER = "https://www.cibil.com/content/dam/cibil/consumer";
const BLOG = "https://www.cibil.com/blog";

/** CIBIL Score & Report. */
export const CSR_HERO = `${CONSUMER}/banners/cibil_score_report.png`;
export const CSR_DASHBOARD =
  "https://www.cibil.com/consumer/_jcr_content/root/contentcontainer/pagesection_2012935909/columnrow/image.coreimg.75.1440.png/1715930130945/consumer-laptop.png";
export const CSR_BLOG_1 = `${BLOG}/credit-matters-at-every-important-stage-in-your-life/_jcr_content/teaserImage.coreimg.75.1440.png/1726219468878/credit-rating-across-life.png`;
export const CSR_BLOG_2 = `${BLOG}/first-time-users-guide-to-establishing-credit/_jcr_content/teaserImage.coreimg.75.1440.png/1671208834821/first-time-users-guide.png`;

/** CIBIL Alerts. Ships with its own backdrop, phone and notification pills baked in. */
export const ALERTS_HERO = `${CONSUMER}/alerts/alert-banner-web.png`;

/** Score Simulator — the product walkthrough. */
export const SIMULATOR_VIDEO = `${CONSUMER}/scr-sim%20video.mp4`;

/** CIBIL Rank & Company Credit Report. */
export const CCR_HERO = `${CONSUMER}/vyapaari.jpg`;
export const CCR_RANK_VIDEO = `${CONSUMER}/media/video/cibil-rank.mp4`;

/** CIBIL Microfinance Score & Report. */
export const MFI_HERO = `${CONSUMER}/mfi.jpg`;

/**
 * The 25%-off CIBIL Rank promotion V1 counts down to on the Company Credit Report page
 * (components/shared/OfferBanner.tsx): midnight at the end of 31st July 2026, IST. The copy that
 * states the date — `ccrfOfferValid` — is in V1's catalog; this is the same instant as a number.
 */
export const CCR_OFFER_DEADLINE = new Date("2026-07-31T23:59:59+05:30").getTime();
