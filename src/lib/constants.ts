export const SITE_NAME = "Hippy Chick Life";

/** Legal entity name — used in copyright line, Terms, Privacy, and any legal context. */
export const SITE_LEGAL_NAME = "Hippy Chick Life LLC";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Our Journey" },
  { href: "/portfolio", label: "UGC Portfolio" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export const PORTFOLIO_CATEGORIES = [
  "UGC Video",
  "Product Demo",
  "Lifestyle Content",
  "Publishing",
  "Social Clips",
  "Brand Concepts",
  "Behind the Scenes",
  "Featured",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/** Bundled hero art; override anytime via `site_settings.hero_image_url` in Supabase. */
export const DEFAULT_HERO_IMAGE = "/hero.jpg";

/** Public-facing contact email (shown in footer, Contact page mailto). */
export const DEFAULT_CONTACT_EMAIL = "contact@hippychicklife.com";

/** Inbox that receives contact-form submissions. Override with NOTIFY_EMAIL env var. */
export const DEFAULT_NOTIFY_EMAIL = "info@hippychicklife.com";
