export const SITE_NAME = "Hippy Chick Life";

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
  "Photography",
  "Social Clips",
  "Brand Concepts",
  "Behind the Scenes",
  "Featured",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/** Bundled hero art; override anytime via `site_settings.hero_image_url` in Supabase. */
export const DEFAULT_HERO_IMAGE = "/hero.jpg";
