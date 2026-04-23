"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

const categories = PORTFOLIO_CATEGORIES as readonly string[];

/** Trim; empty → null; enforce max length on stored value. */
function optText(max: number) {
  return z
    .string()
    .max(max)
    .transform((s) => s.trim())
    .transform((s) => (s.length ? s : null));
}

const portfolioFields = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().max(120),
  category: z.string().refine((s) => categories.includes(s), "Pick a valid category"),
  subcategory: optText(200),
  media_type: z.enum(["image", "video"]),
  excerpt: optText(2000),
  description: optText(20000),
  client_name: optText(200),
  platform: optText(200),
  campaign_date: optText(40),
  cover_image_url: optText(2000),
  video_url: optText(2000),
  thumbnail_url: optText(2000),
  external_link: optText(2000),
  sort_order: z.coerce.number().int().min(-999999).max(999999).default(0),
  featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
});

export type PortfolioFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function emptyToNull(s: string | null | undefined): string | null {
  const t = (s ?? "").trim();
  return t.length ? t : null;
}

function parseOptionalUrl(label: string, raw: string | null | undefined): string | null {
  const s = emptyToNull(raw);
  if (!s) return null;
  try {
    new URL(s);
    return s;
  } catch {
    throw new Error(`${label} must be a full URL (https://…)`);
  }
}

async function uniquePortfolioSlug(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  base: string,
  excludeId?: string,
) {
  let candidate = base;
  for (let n = 0; n < 40; n += 1) {
    let q = supabase.from("portfolio_items").select("id").eq("slug", candidate);
    if (excludeId) q = q.neq("id", excludeId);
    const { data } = await q.maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${n + 2}`;
  }
  return `${base}-${Date.now()}`;
}

function parsePortfolioForm(formData: FormData) {
  const raw = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category: String(formData.get("category") ?? ""),
    subcategory: String(formData.get("subcategory") ?? "").slice(0, 200),
    media_type: String(formData.get("media_type") ?? "image"),
    excerpt: String(formData.get("excerpt") ?? ""),
    description: String(formData.get("description") ?? ""),
    client_name: String(formData.get("client_name") ?? ""),
    platform: String(formData.get("platform") ?? ""),
    campaign_date: String(formData.get("campaign_date") ?? ""),
    cover_image_url: String(formData.get("cover_image_url") ?? ""),
    video_url: String(formData.get("video_url") ?? ""),
    thumbnail_url: String(formData.get("thumbnail_url") ?? ""),
    external_link: String(formData.get("external_link") ?? ""),
    sort_order: String(formData.get("sort_order") ?? "").trim() || "0",
    featured: formData.get("featured") === "on",
    is_published: formData.get("is_published") === "on",
  };

  const parsed = portfolioFields.safeParse(raw);
  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.title?.[0] ||
      parsed.error.flatten().fieldErrors.category?.[0] ||
      "Please review the form.";
    return { ok: false as const, error: msg };
  }

  let campaign_date: string | null = null;
  const cd = emptyToNull(parsed.data.campaign_date ?? undefined);
  if (cd) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cd)) {
      return { ok: false as const, error: "Campaign date must be YYYY-MM-DD or empty." };
    }
    campaign_date = cd;
  }

  try {
    return {
      ok: true as const,
      data: {
        ...parsed.data,
        subcategory: emptyToNull(parsed.data.subcategory ?? undefined),
        excerpt: emptyToNull(parsed.data.excerpt ?? undefined),
        description: emptyToNull(parsed.data.description ?? undefined),
        client_name: emptyToNull(parsed.data.client_name ?? undefined),
        platform: emptyToNull(parsed.data.platform ?? undefined),
        campaign_date,
        cover_image_url: parseOptionalUrl("Cover image URL", parsed.data.cover_image_url),
        video_url: parseOptionalUrl("Video URL", parsed.data.video_url),
        thumbnail_url: parseOptionalUrl("Thumbnail URL", parsed.data.thumbnail_url),
        external_link: parseOptionalUrl("External link", parsed.data.external_link),
      },
    };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "Invalid URL",
    };
  }
}

function revalidatePortfolio(slug?: string) {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  if (slug) revalidatePath(`/portfolio/${slug}`);
}

export async function savePortfolioItem(
  _prev: PortfolioFormState,
  formData: FormData,
): Promise<PortfolioFormState> {
  const intent = (formData.get("intent") as string) || "create";
  const id = (formData.get("id") as string)?.trim();

  const parsed = parsePortfolioForm(formData);
  if (!parsed.ok) return { status: "error", message: parsed.error };

  const supabase = await createClient();
  if (!supabase) {
    return { status: "error", message: "Supabase is not configured." };
  }

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    return { status: "error", message: "You must be signed in as an admin." };
  }

  const d = parsed.data;
  const slugInput = emptyToNull(d.slug);
  const baseSlug = slugify(slugInput || d.title);

  if (intent === "create") {
    const slug = await uniquePortfolioSlug(supabase, baseSlug);
    const row = {
      title: d.title,
      slug,
      category: d.category,
      subcategory: d.subcategory,
      media_type: d.media_type,
      excerpt: d.excerpt,
      description: d.description,
      client_name: d.client_name,
      platform: d.platform,
      campaign_date: d.campaign_date,
      cover_image_url: d.cover_image_url,
      video_url: d.video_url,
      thumbnail_url: d.thumbnail_url,
      external_link: d.external_link,
      sort_order: d.sort_order,
      featured: d.featured,
      is_published: d.is_published,
    };

    const { data, error } = await supabase
      .from("portfolio_items")
      .insert(row)
      .select("id")
      .single();

    if (error) return { status: "error", message: error.message };
    if (!data?.id) return { status: "error", message: "Insert failed." };

    revalidatePortfolio(slug);
    redirect(`/admin/portfolio/${data.id}`);
  }

  if (intent === "update") {
    if (!id) return { status: "error", message: "Missing portfolio id." };

    const slug = await uniquePortfolioSlug(supabase, baseSlug, id);
    const row = {
      title: d.title,
      slug,
      category: d.category,
      subcategory: d.subcategory,
      media_type: d.media_type,
      excerpt: d.excerpt,
      description: d.description,
      client_name: d.client_name,
      platform: d.platform,
      campaign_date: d.campaign_date,
      cover_image_url: d.cover_image_url,
      video_url: d.video_url,
      thumbnail_url: d.thumbnail_url,
      external_link: d.external_link,
      sort_order: d.sort_order,
      featured: d.featured,
      is_published: d.is_published,
    };

    const { error } = await supabase.from("portfolio_items").update(row).eq("id", id);

    if (error) return { status: "error", message: error.message };

    revalidatePortfolio(slug);
    return { status: "success", message: "Saved. The live site will update shortly." };
  }

  return { status: "error", message: "Unknown action." };
}

export async function deletePortfolioItem(formData: FormData) {
  const id = (formData.get("id") as string)?.trim();
  if (!id) redirect("/admin/portfolio");

  const supabase = await createClient();
  if (!supabase) redirect("/admin/portfolio");

  const { data: row } = await supabase.from("portfolio_items").select("slug").eq("id", id).maybeSingle();

  await supabase.from("portfolio_items").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  if (row?.slug) revalidatePath(`/portfolio/${row.slug}`);

  redirect("/admin/portfolio");
}

export async function togglePortfolioPublish(formData: FormData): Promise<void> {
  const id = (formData.get("id") as string)?.trim();
  const publish = formData.get("publish") === "true";
  if (!id) return;

  const supabase = await createClient();
  if (!supabase) return;

  const { data: before } = await supabase
    .from("portfolio_items")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  await supabase.from("portfolio_items").update({ is_published: publish }).eq("id", id);

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  if (before?.slug) revalidatePath(`/portfolio/${before.slug}`);
}
