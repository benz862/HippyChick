"use client";

import Link from "next/link";
import { useActionState } from "react";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import type { PortfolioItem } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  deletePortfolioItem,
  savePortfolioItem,
  type PortfolioFormState,
} from "./actions";

const initial: PortfolioFormState = { status: "idle" };

const selectClass = cn(
  "h-12 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-plum)_12%,transparent)] bg-white/90 px-4 text-sm text-[var(--color-espresso)] shadow-inner shadow-black/[0.02] outline-none transition focus:border-[color-mix(in_srgb,var(--color-magenta)_45%,transparent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-magenta)_25%,transparent)]",
);

type Props = {
  mode: "create" | "edit";
  item?: PortfolioItem;
};

export function PortfolioEditor({ mode, item }: Props) {
  const [state, formAction, pending] = useActionState(savePortfolioItem, initial);

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-[var(--color-plum)]/15 bg-white/70 px-5 py-4 text-sm text-[var(--color-espresso)]/75">
        <p>
          <strong className="text-[var(--color-plum)]">Media files</strong> — upload
          images and videos in the{" "}
          <Link
            href="/admin/media"
            className="font-semibold text-[var(--color-magenta)] underline decoration-[var(--color-magenta)]/40 underline-offset-4 hover:text-[var(--color-plum)]"
          >
            Media manager
          </Link>
          , then paste the public URL into cover, thumbnail, or video fields below.
        </p>
      </div>

      <form action={formAction} className="space-y-8">
        <input type="hidden" name="intent" value={mode === "create" ? "create" : "update"} />
        {mode === "edit" && item ? <input type="hidden" name="id" value={item.id} /> : null}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required defaultValue={item?.title ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="auto from title if empty"
              defaultValue={item?.slug ?? ""}
            />
            <p className="text-xs text-[var(--color-espresso)]/55">
              Public URL: /portfolio/your-slug — leave blank to generate from title.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              required
              defaultValue={item?.category ?? PORTFOLIO_CATEGORIES[0]}
              className={selectClass}
            >
              {item?.category &&
              !(PORTFOLIO_CATEGORIES as readonly string[]).includes(item.category) ? (
                <option value={item.category}>{item.category} (update to save)</option>
              ) : null}
              {PORTFOLIO_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory (optional)</Label>
            <Input
              id="subcategory"
              name="subcategory"
              placeholder="e.g. Spring campaign"
              defaultValue={item?.subcategory ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="media_type">Media type</Label>
            <select
              id="media_type"
              name="media_type"
              defaultValue={item?.media_type ?? "image"}
              className={selectClass}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort order</Label>
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={item?.sort_order ?? 0}
            />
            <p className="text-xs text-[var(--color-espresso)]/55">
              Higher numbers sort first on the public UGC Portfolio page.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-espresso)]/85">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={item?.featured ?? false}
                className="h-4 w-4 rounded border-[var(--color-plum)]/30 text-[var(--color-magenta)]"
              />
              Featured on homepage
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-espresso)]/85">
              <input
                type="checkbox"
                name="is_published"
                defaultChecked={item?.is_published ?? false}
                className="h-4 w-4 rounded border-[var(--color-plum)]/30 text-[var(--color-magenta)]"
              />
              Published (visible on site)
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={item?.excerpt ?? ""} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={6}
              defaultValue={item?.description ?? ""}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="client_name">Client / brand</Label>
            <Input id="client_name" name="client_name" defaultValue={item?.client_name ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              name="platform"
              placeholder="TikTok, Instagram, web…"
              defaultValue={item?.platform ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign_date">Campaign date</Label>
            <Input
              id="campaign_date"
              name="campaign_date"
              type="date"
              defaultValue={item?.campaign_date?.slice(0, 10) ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="external_link">External link</Label>
            <Input
              id="external_link"
              name="external_link"
              type="url"
              placeholder="https://"
              defaultValue={item?.external_link ?? ""}
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-plum)]/55">
            Media URLs
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="cover_image_url">Cover image URL</Label>
              <Input
                id="cover_image_url"
                name="cover_image_url"
                type="url"
                placeholder="https://…supabase.co/…"
                defaultValue={item?.cover_image_url ?? ""}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="video_url">Video URL</Label>
              <Input
                id="video_url"
                name="video_url"
                type="url"
                placeholder="https://… (for video pieces)"
                defaultValue={item?.video_url ?? ""}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="thumbnail_url">Thumbnail / poster URL</Label>
              <Input
                id="thumbnail_url"
                name="thumbnail_url"
                type="url"
                placeholder="Optional; used as video poster"
                defaultValue={item?.thumbnail_url ?? ""}
              />
            </div>
          </div>
        </div>

        {state.status === "error" ? (
          <p className="text-sm text-red-700" role="alert">
            {state.message}
          </p>
        ) : null}
        {state.status === "success" ? (
          <p className="text-sm text-[var(--color-teal)]" role="status">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending} size="lg">
            {pending ? "Saving…" : mode === "create" ? "Create piece" : "Save changes"}
          </Button>
          <Button href="/admin/portfolio" variant="secondary" size="lg">
            Back to list
          </Button>
          {mode === "edit" && item?.is_published ? (
            <Button href={`/portfolio/${item.slug}`} variant="ghost" size="lg" target="_blank">
              View live
            </Button>
          ) : null}
        </div>
      </form>

      {mode === "edit" && item ? (
        <div className="border-t border-[var(--color-plum)]/10 pt-8">
          <p className="mb-3 text-sm font-medium text-red-800/90">Danger zone</p>
          <form
            action={deletePortfolioItem}
            onSubmit={(e) => {
              if (!confirm("Delete this UGC Portfolio piece permanently?")) e.preventDefault();
            }}
          >
            <input type="hidden" name="id" value={item.id} />
            <Button type="submit" variant="secondary" size="sm" className="text-red-800">
              Delete this piece
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
