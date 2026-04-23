"use client";

import { useActionState } from "react";
import { createPortfolioFromUpload, type CreatePortfolioState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";

const initial: CreatePortfolioState = { status: "idle" };

type Props = {
  mediaUrl: string;
  sourceBucket: "portfolio-videos" | "portfolio-images";
};

export function AddToPortfolioForm({ mediaUrl, sourceBucket }: Props) {
  const [state, formAction, pending] = useActionState(createPortfolioFromUpload, initial);

  const isVideo = sourceBucket === "portfolio-videos";

  return (
    <div className="mt-4 rounded-2xl border border-[var(--color-groovy-teal)]/25 bg-white/95 p-5 shadow-sm">
      <h3 className="font-serif text-lg text-[var(--color-plum)]">
        Add this file to your portfolio
      </h3>
      <p className="mt-1 text-xs text-[var(--color-espresso)]/70">
        Upload only puts the file in storage. This step creates the database row so it appears on
        the public portfolio.
      </p>

      <form action={formAction} className="mt-4 space-y-4">
        <input type="hidden" name="media_url" value={mediaUrl} />
        <input type="hidden" name="source_bucket" value={sourceBucket} />

        <div className="space-y-2">
          <Label htmlFor="pf-title">Title</Label>
          <Input id="pf-title" name="title" required placeholder="e.g. Spring skincare UGC reel" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pf-slug">Slug (optional)</Label>
          <Input
            id="pf-slug"
            name="slug"
            placeholder="Leave blank to generate from title"
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pf-category">Category</Label>
          <select
            id="pf-category"
            name="category"
            required
            className="h-12 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-plum)_12%,transparent)] bg-white px-4 text-sm"
            defaultValue="UGC Video"
          >
            {PORTFOLIO_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pf-excerpt">Short excerpt (optional)</Label>
          <Textarea id="pf-excerpt" name="excerpt" rows={3} placeholder="One or two lines for cards and SEO" />
        </div>

        {isVideo ? (
          <div className="space-y-2">
            <Label htmlFor="pf-cover">Poster / cover image URL (optional)</Label>
            <Input
              id="pf-cover"
              name="cover_image_url"
              placeholder="Upload a JPG/PNG to portfolio-images first, then paste URL here for a thumbnail"
              className="font-mono text-xs"
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="pf-vis">Visibility</Label>
          <select
            id="pf-vis"
            name="is_published"
            className="h-12 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-plum)_12%,transparent)] bg-white px-4 text-sm"
            defaultValue="true"
          >
            <option value="true">Published — show on public portfolio</option>
            <option value="false">Draft — hide until you publish in Supabase</option>
          </select>
        </div>

        {state.status === "error" ? (
          <p className="text-sm text-red-700" role="alert">
            {state.message}
          </p>
        ) : null}

        {state.status === "success" ? (
          <p className="text-sm text-[var(--color-teal)]" role="status">
            {state.message}
            {state.slug ? (
              <>
                {" "}
                <a
                  className="font-semibold underline"
                  href={`/portfolio/${state.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </>
            ) : null}
          </p>
        ) : null}

        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Create portfolio piece"}
        </Button>
      </form>
    </div>
  );
}
