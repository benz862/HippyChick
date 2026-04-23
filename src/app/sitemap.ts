import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { getPublishedPortfolioItems } from "@/lib/data/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];

  const [portfolio, posts] = await Promise.all([
    getPublishedPortfolioItems(),
    getPublishedBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/journey",
    "/portfolio",
    "/work-with-us",
    "/journal",
    "/contact",
    "/media-kit",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolio.map((item) => ({
    url: `${base}/portfolio/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const journalRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/journal/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...journalRoutes];
}
