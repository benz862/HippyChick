import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";
import {
  DEFAULT_CONTACT_EMAIL,
  DEFAULT_HERO_IMAGE,
} from "@/lib/constants";

export async function getSiteSetting(key: string): Promise<Json | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) return null;
  return data.value;
}

export async function getHeroImageUrl(): Promise<string> {
  const raw = await getSiteSetting("hero_image_url");
  if (typeof raw === "string" && raw.length > 0) return raw;
  return DEFAULT_HERO_IMAGE;
}

export async function getContactEmail(): Promise<string> {
  const raw = await getSiteSetting("contact_email");
  if (typeof raw === "string" && raw.includes("@")) return raw;
  return DEFAULT_CONTACT_EMAIL;
}
