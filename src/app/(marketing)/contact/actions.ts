"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email required"),
  company: z.string().trim().optional(),
  project_type: z.string().trim().optional(),
  budget_range: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    project_type: formData.get("project_type"),
    budget_range: formData.get("budget_range"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.name?.[0] ||
      first.email?.[0] ||
      first.message?.[0] ||
      "Please review the form and try again.";
    return { status: "error", message: msg };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      status: "error",
      message:
        "Supabase env vars are missing. In the `site` folder, copy `.env.example` to `.env.local`, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then restart the dev server.",
    };
  }

  const { error } = await supabase.from("contact_inquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company || null,
    project_type: parsed.data.project_type || null,
    budget_range: parsed.data.budget_range || null,
    message: parsed.data.message,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  return {
    status: "success",
    message: "Thank you—your message is in. We will reply thoughtfully soon.",
  };
}
