"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddToPortfolioForm } from "./add-to-portfolio-form";
import { createClient } from "@/lib/supabase/client";

const BUCKETS = [
  { id: "portfolio-images", label: "UGC Portfolio images (public)" },
  { id: "portfolio-videos", label: "UGC Portfolio videos (public)" },
  { id: "blog-images", label: "Blog images (public)" },
  { id: "testimonials", label: "Testimonials (public)" },
  { id: "brand-assets", label: "Brand assets (private — signed URL after upload)" },
] as const;

type BucketId = (typeof BUCKETS)[number]["id"];

type Result =
  | { status: "idle" }
  | { status: "uploading"; progress: number | null }
  | { status: "error"; message: string }
  | {
      status: "success";
      bucket: BucketId;
      path: string;
      publicUrl: string;
    };

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180);
}

export function MediaUploadForm() {
  const [bucket, setBucket] = useState<BucketId>("portfolio-images");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result>({ status: "idle" });

  const pending = result.status === "uploading";

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setResult({ status: "error", message: "Choose a file to upload." });
      return;
    }

    setResult({ status: "uploading", progress: null });

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setResult({
        status: "error",
        message:
          "Supabase client isn't configured in the browser. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      });
      return;
    }

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      setResult({
        status: "error",
        message: "You are signed out. Reload and sign in at /admin/login.",
      });
      return;
    }

    const userId = userData.user.id;
    const safeName = sanitizeFilename(file.name);
    const path = `${userId}/${Date.now()}-${safeName}`;

    const { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: false,
        contentType: file.type || undefined,
        cacheControl: "3600",
      });

    if (upErr) {
      setResult({
        status: "error",
        message:
          upErr.message ||
          "Upload failed. Check bucket RLS policies and that your profile has is_admin = true.",
      });
      return;
    }

    const isPrivate = bucket === "brand-assets";
    let publicUrl = "";
    if (isPrivate) {
      const { data: signed, error: signErr } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60 * 24 * 7);
      if (signErr || !signed) {
        setResult({
          status: "error",
          message: signErr?.message || "Couldn’t create a signed URL.",
        });
        return;
      }
      publicUrl = signed.signedUrl;
    } else {
      const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
      publicUrl = pub.publicUrl;
    }

    setResult({ status: "success", bucket, path, publicUrl });
    toast.success("Upload complete", { description: "Use Copy to grab the URL." });
  }

  return (
    <form
      onSubmit={handleUpload}
      className="max-w-xl space-y-5 rounded-2xl border border-white/70 bg-white/85 p-6 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="bucket">Bucket</Label>
        <select
          id="bucket"
          name="bucket"
          required
          value={bucket}
          onChange={(e) => setBucket(e.target.value as BucketId)}
          className="h-12 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-plum)_12%,transparent)] bg-white px-4 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-groovy-teal)] focus:ring-2 focus:ring-[var(--color-groovy-teal)]/25"
        >
          {BUCKETS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          name="file"
          type="file"
          required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="cursor-pointer py-3 file:mr-4"
        />
        <p className="text-xs text-[var(--color-espresso)]/55">
          Files upload directly from your browser to Supabase — no Vercel size
          limit. Large videos (100MB+) are fine.
        </p>
      </div>

      {result.status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          {result.message}
        </p>
      ) : null}

      {result.status === "success" ? (
        <div className="space-y-2 rounded-xl bg-[var(--color-cream)] px-4 py-3 text-sm" role="status">
          <p className="font-medium text-[var(--color-plum)]">
            Uploaded to {result.bucket}. {result.bucket === "portfolio-videos" || result.bucket === "portfolio-images"
              ? "Fill the form below so it appears on the public UGC Portfolio."
              : "Public URL is ready to paste into Settings, a blog post, or a testimonial."}
          </p>
          <p className="text-xs text-[var(--color-espresso)]/65">
            <span className="font-semibold">Path:</span> {result.path}
          </p>
          <div className="space-y-1">
            <Label className="text-[10px]">URL</Label>
            <div className="flex flex-wrap gap-2">
              <Input readOnly value={result.publicUrl} className="font-mono text-xs" />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="shrink-0"
                onClick={() => {
                  void navigator.clipboard.writeText(result.publicUrl);
                  toast.message("Copied to clipboard");
                }}
              >
                Copy
              </Button>
            </div>
          </div>

          {result.bucket === "portfolio-videos" || result.bucket === "portfolio-images" ? (
            <AddToPortfolioForm
              key={`${result.bucket}-${result.publicUrl}`}
              mediaUrl={result.publicUrl}
              sourceBucket={result.bucket}
            />
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Uploading…" : "Upload"}
        </Button>
      </div>
    </form>
  );
}
