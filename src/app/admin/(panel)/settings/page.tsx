import { createClient } from "@/lib/supabase/server";
import { SETTINGS_KEYS } from "./keys";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const current: Record<string, string> = {};

  if (supabase) {
    const { data } = await supabase
      .from("site_settings")
      .select("key,value")
      .in("key", [...SETTINGS_KEYS]);
    for (const row of data ?? []) {
      const val = row.value;
      if (typeof val === "string") current[row.key] = val;
      else if (val != null) current[row.key] = JSON.stringify(val);
    }
  }

  return <SettingsForm current={current} configured={!!supabase} />;
}
