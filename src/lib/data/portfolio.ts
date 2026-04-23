import { createClient } from "@/lib/supabase/server";
import type { PortfolioItem } from "@/types/database";

export async function getPublishedPortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublishedPortfolioItems", error.message);
    return [];
  }

  return data ?? [];
}

export async function getFeaturedPortfolioItems(
  limit = 4,
): Promise<PortfolioItem[]> {
  const items = await getPublishedPortfolioItems();
  const featured = items.filter((i) => i.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return items.slice(0, limit);
}

export async function getPortfolioItemBySlug(
  slug: string,
): Promise<PortfolioItem | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("getPortfolioItemBySlug", error.message);
    return null;
  }

  return data;
}
