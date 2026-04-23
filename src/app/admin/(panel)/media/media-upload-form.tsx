"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddToPortfolioForm } from "./add-to-portfolio-form";
import { uploadStorageObject, type UploadState } from "./actions";

const BUCKETS = [
  { id: "portfolio-images", label: "UGC Portfolio images (public)" },
  { id: "portfolio-videos", label: "UGC Portfolio videos (public)" },
  { id: "blog-images", label: "Blog images (public)" },
  { id: "testimonials", label: "Testimonials (public)" },
  { id: "brand-assets", label: "Brand assets (private — signed URL after upload)" },
] as const;

const initial: UploadState = { status: "idle" };

export function MediaUploadForm() {
  const [state, formAction, pending] = useActionState(uploadStorageObject, initial);
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    if (state.status !== "success" || !state.publicUrl) return;
    if (lastUrl.current === state.publicUrl) return;
    lastUrl.current = state.publicUrl;
    toast.success("Upload complete", { description: "Use Copy to grab the URL." });
  }, [state]);

  return (
    <form
      action={formAction}
      className="max-w-xl space-y-5 rounded-2xl border border-white/70 bg-white/85 p-6 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="bucket">Bucket</Label>
        <select
          id="bucket"
          name="bucket"
          required
          className="h-12 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-plum)_12%,transparent)] bg-white px-4 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-groovy-teal)] focus:ring-2 focus:ring-[var(--color-groovy-teal)]/25"
          defaultValue="portfolio-images"
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
        <Input id="file" name="file" type="file" required className="cursor-pointer py-3 file:mr-4" />
        <p className="text-xs text-[var(--color-espresso)]/55">
          Files are stored under your user id folder. Images and videos for public buckets get a
          permanent public URL.
        </p>
      </div>

      {state.status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          {state.message}
        </p>
      ) : null}

      {state.status === "success" ? (
        <div className="space-y-2 rounded-xl bg-[var(--color-cream)] px-4 py-3 text-sm" role="status">
          <p className="font-medium text-[var(--color-plum)]">{state.message}</p>
          {state.path ? (
            <p className="text-xs text-[var(--color-espresso)]/65">
              <span className="font-semibold">Path:</span> {state.path}
            </p>
          ) : null}
          {state.publicUrl ? (
            <div className="space-y-1">
              <Label className="text-[10px]">URL</Label>
              <div className="flex flex-wrap gap-2">
                <Input readOnly value={state.publicUrl} className="font-mono text-xs" />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="shrink-0"
                  onClick={() => {
                    void navigator.clipboard.writeText(state.publicUrl!);
                    toast.message("Copied to clipboard");
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          ) : null}

          {state.publicUrl &&
          state.bucket &&
          (state.bucket === "portfolio-videos" || state.bucket === "portfolio-images") ? (
            <AddToPortfolioForm
              key={`${state.bucket}-${state.publicUrl}`}
              mediaUrl={state.publicUrl}
              sourceBucket={state.bucket}
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
