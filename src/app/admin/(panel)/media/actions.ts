"use server";

import { revalidatePath } from "next/cache";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

const ALLOWED_BUCKETS = [
  "portfolio-images",
  "portfolio-videos",
  "blog-images",
  "brand-assets",
  "testimonials",
] as const;

export type UploadState =
  | { status: "idle" }
  | {
      status: "success";
      message: string;
      publicUrl?: string;
      path?: string;
      bucket?: string;
    }
  | { status: "error"; message: string };

export type CreatePortfolioState =
  | { status: "idle" }
  | { status: "success"; message: string; slug?: string }
  | { status: "error"; message: string };

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180);
}

export async function uploadStorageObject(
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  const bucket = formData.get("bucket") as string | null;
  const file = formData.get("file") as File | null;

  if (!bucket || !ALLOWED_BUCKETS.includes(bucket as (typeof ALLOWED_BUCKETS)[number])) {
    return { status: "error", message: "Pick a valid storage bucket." };
  }
  if (!file || file.size === 0) {
    return { status: "error", message: "Choose a file to upload." };
  }

  const maxBytes = 80 * 1024 * 1024;
  if (file.size > maxBytes) {
    return { status: "error", message: "File is too large (max 80MB for this form)." };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      status: "error",
      message:
        "Supabase env vars are missing on the server. In the `site` folder, copy `.env.example` to `.env.local`, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then restart `npm run dev`. On Vercel, add the same keys under Project → Settings → Environment Variables.",
    };
  }

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    return { status: "error", message: "You are not signed in. Refresh and log in again." };
  }

  const safe = sanitizeFilename(file.name || "upload.bin");
  const path = `${user.id}/${Date.now()}-${safe}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    const hint =
      error.message.includes("row-level security") ||
      error.message.includes("RLS") ||
      error.message.includes("policy")
        ? " Check that your profile has is_admin = true in Supabase, and that storage policies are applied."
        : "";
    return { status: "error", message: `${error.message}${hint}` };
  }

  revalidatePath("/admin/media");

  if (bucket === "brand-assets") {
    const { data: signed, error: signErr } = await supabase.storage
      .from(bucket)
      .createSignedUrl(data.path, 60 * 60 * 24);

    if (signErr || !signed?.signedUrl) {
      return {
        status: "success",
        message: `Uploaded to ${bucket} at ${data.path}. (Could not create signed URL: ${signErr?.message ?? "unknown"})`,
        path: data.path,
        bucket,
      };
    }
    return {
      status: "success",
      message: `Uploaded to ${bucket}. Copy the signed URL (expires in 24h) or use the path in the dashboard.`,
      publicUrl: signed.signedUrl,
      path: data.path,
      bucket,
    };
  }

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return {
    status: "success",
    message:
      bucket === "portfolio-videos" || bucket === "portfolio-images"
        ? `Uploaded to ${bucket}. Add portfolio details below so this appears on the site.`
        : `Uploaded to ${bucket}. Public URL is ready to paste into portfolio or blog fields.`,
    publicUrl: pub.publicUrl,
    path: data.path,
    bucket,
  };
}

async function uniquePortfolioSlug(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  base: string,
) {
  let candidate = base;
  for (let n = 0; n < 40; n += 1) {
    const { data } = await supabase
      .from("portfolio_items")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${n + 2}`;
  }
  return `${base}-${Date.now()}`;
}

export async function createPortfolioFromUpload(
  _prev: CreatePortfolioState,
  formData: FormData,
): Promise<CreatePortfolioState> {
  const title = (formData.get("title") as string)?.trim();
  const slugInput = (formData.get("slug") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const mediaUrl = (formData.get("media_url") as string)?.trim();
  const sourceBucket = (formData.get("source_bucket") as string)?.trim();
  const coverUrl = (formData.get("cover_image_url") as string)?.trim() || null;
  const isPublished = formData.get("is_published") === "true";

  if (!title) {
    return { status: "error", message: "Title is required." };
  }
  if (!category || !(PORTFOLIO_CATEGORIES as readonly string[]).includes(category)) {
    return { status: "error", message: "Pick a valid category." };
  }
  if (!mediaUrl) {
    return { status: "error", message: "Missing media URL. Upload the file again." };
  }
  if (sourceBucket !== "portfolio-videos" && sourceBucket !== "portfolio-images") {
    return { status: "error", message: "Portfolio entries can only be created from portfolio-videos or portfolio-images uploads." };
  }

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

  const baseSlug = slugify(slugInput || title);
  const slug = await uniquePortfolioSlug(supabase, baseSlug);

  const isVideo = sourceBucket === "portfolio-videos";
  const row = {
    title,
    slug,
    excerpt,
    category,
    media_type: isVideo ? "video" : "image",
    video_url: isVideo ? mediaUrl : null,
    cover_image_url: isVideo ? coverUrl : mediaUrl,
    thumbnail_url: isVideo ? coverUrl : mediaUrl,
    is_published: isPublished,
    featured: false,
    sort_order: 0,
  };

  const { error } = await supabase.from("portfolio_items").insert(row);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");

  return {
    status: "success",
    message: isPublished
      ? "Portfolio piece published. It should appear on the site shortly."
      : "Saved as a draft (unpublished). Turn on publish in Supabase or edit later when we add editing.",
    slug,
  };
}

export async function listMyUploads(bucket: string) {
  if (!ALLOWED_BUCKETS.includes(bucket as (typeof ALLOWED_BUCKETS)[number])) {
    return { files: [] as { name: string; id?: string; created_at?: string }[], error: "Invalid bucket" };
  }

  const supabase = await createClient();
  if (!supabase) return { files: [], error: null };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { files: [], error: "Not signed in" };

  const { data, error } = await supabase.storage.from(bucket).list(user.id, {
    limit: 40,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    return { files: [], error: error.message };
  }

  return { files: data ?? [], error: null };
}

export async function deleteStorageObject(bucket: string, path: string) {
  if (!ALLOWED_BUCKETS.includes(bucket as (typeof ALLOWED_BUCKETS)[number])) {
    return { error: "Invalid bucket" };
  }
  const supabase = await createClient();
  if (!supabase) return { error: "Not configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };
  if (!path.startsWith(`${user.id}/`)) {
    return { error: "You can only delete files inside your own folder." };
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) return { error: error.message };
  revalidatePath("/admin/media");
  return { error: null };
}
