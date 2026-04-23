import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type PortfolioMediaRow = Database["public"]["Tables"]["portfolio_media"]["Row"];

export async function getPortfolioMedia(
  portfolioItemId: string,
): Promise<PortfolioMediaRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("portfolio_media")
    .select("*")
    .eq("portfolio_item_id", portfolioItemId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPortfolioMedia", error.message);
    return [];
  }

  return data ?? [];
}
