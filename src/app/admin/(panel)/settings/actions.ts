"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { SETTINGS_KEYS } from "./keys";

export type SiteSettingsState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function saveSiteSettings(
  _prev: SiteSettingsState,
  formData: FormData,
): Promise<SiteSettingsState> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      status: "error",
      message:
        "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (locally in .env.local, on Vercel in Project Settings → Environment Variables).",
    };
  }

  const rows = SETTINGS_KEYS.map((key) => ({
    key,
    value: ((formData.get(key) as string | null) ?? "").trim(),
  }));

  const { error } = await supabase
    .from("site_settings")
    .upsert(rows, { onConflict: "key" });

  if (error) return { status: "error", message: error.message };

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/media-kit");

  return {
    status: "success",
    message: "Saved. Changes show on the live site within about a minute.",
  };
}
