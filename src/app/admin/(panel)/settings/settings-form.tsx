"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveSiteSettings, type SiteSettingsState } from "./actions";

const initial: SiteSettingsState = { status: "idle" };

type Props = {
  current: Record<string, string>;
  configured: boolean;
};

type Field = {
  key: string;
  label: string;
  placeholder: string;
  hint?: string;
  type?: string;
};

const FIELDS: Field[] = [
  {
    key: "hero_image_url",
    label: "Hero image URL",
    placeholder: "https://…supabase.co/storage/v1/…/hero.jpg",
    hint: "Shown full-bleed behind the homepage headline. Upload an image under Media → copy its URL → paste here.",
  },
  {
    key: "contact_email",
    label: "Contact email",
    placeholder: "hello@hippychicklife.com",
    hint: "Shown on the Contact page and footer.",
    type: "email",
  },
  {
    key: "instagram_url",
    label: "Instagram URL",
    placeholder: "https://instagram.com/yourhandle",
  },
  {
    key: "tiktok_url",
    label: "TikTok URL",
    placeholder: "https://tiktok.com/@yourhandle",
  },
  {
    key: "youtube_url",
    label: "YouTube URL",
    placeholder: "https://youtube.com/@yourhandle",
  },
  {
    key: "media_kit_url",
    label: "Media kit URL (PDF or page)",
    placeholder: "https://…/media-kit.pdf",
    hint: "Linked from /media-kit. Upload the PDF under Media (bucket: brand-assets) and paste the public URL.",
  },
];

export function SettingsForm({ current, configured }: Props) {
  const [state, formAction, pending] = useActionState(saveSiteSettings, initial);
  const heroUrl = current["hero_image_url"] ?? "";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">Site settings</h1>
        <p className="max-w-2xl text-sm text-[var(--color-espresso)]/75">
          Update the homepage hero image, your public contact email, and social
          / media kit links. Values save to Supabase and appear on the live
          site within a minute.
        </p>
        {!configured ? (
          <p className="rounded-xl bg-amber-100/70 px-4 py-3 text-xs text-amber-900">
            Supabase isn’t configured on the server yet. Add your env vars and
            redeploy before saving.
          </p>
        ) : null}
      </div>

      {heroUrl ? (
        <div className="rounded-2xl border border-white/70 bg-white/80 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-plum)]/70">
            Current hero image
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroUrl}
            alt="Current hero"
            className="aspect-[16/8] w-full rounded-xl object-cover"
          />
          <p className="mt-3 break-all text-[11px] text-[var(--color-espresso)]/60">
            {heroUrl}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--color-plum)]/25 bg-white/60 p-6 text-sm text-[var(--color-espresso)]/70">
          No hero image set yet. The site shows the bundled default (
          <code className="rounded bg-white/70 px-1 text-xs">/hero.jpg</code>)
          until you paste a URL below.{" "}
          <Link className="font-semibold underline" href="/admin/media">
            Upload one in Media
          </Link>
          , copy the URL, then paste it into “Hero image URL” and save.
        </div>
      )}

      <form
        action={formAction}
        className="space-y-6 rounded-2xl border border-white/70 bg-white/85 p-6 shadow-sm"
      >
        {FIELDS.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              name={f.key}
              type={f.type ?? "url"}
              defaultValue={current[f.key] ?? ""}
              placeholder={f.placeholder}
              className="font-mono text-xs"
            />
            {f.hint ? (
              <p className="text-xs text-[var(--color-espresso)]/55">{f.hint}</p>
            ) : null}
          </div>
        ))}

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

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save settings"}
          </Button>
          <Button href="/admin/media" variant="secondary" type="button">
            Open Media uploads
          </Button>
        </div>
      </form>
    </div>
  );
}
