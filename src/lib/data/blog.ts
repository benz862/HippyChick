import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPublishedBlogPosts", error.message);
    return [];
  }

  return data ?? [];
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("getBlogPostBySlug", error.message);
    return null;
  }

  if (!data?.published_at) return null;
  if (new Date(data.published_at) > new Date()) return null;

  return data;
}
