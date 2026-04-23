import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/types/database";

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPublishedTestimonials", error.message);
    return [];
  }

  return data ?? [];
}
