import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { togglePortfolioPublish } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">UGC Portfolio manager</h1>
        <p className="mt-4 text-sm text-[var(--color-espresso)]/70">
          Configure Supabase to manage portfolio pieces.
        </p>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-3">
        <h1 className="font-serif text-3xl text-[var(--color-plum)]">UGC Portfolio manager</h1>
        <p className="text-sm text-red-700">
          Unable to load portfolio. Confirm your profile has{" "}
          <code className="rounded bg-white/70 px-1 text-xs">is_admin = true</code> in Supabase.
        </p>
      </div>
    );
  }

  const rows = data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[var(--color-plum)]">UGC Portfolio manager</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--color-espresso)]/70">
            Create, edit, publish, and delete pieces. Upload media in the{" "}
            <Link
              href="/admin/media"
              className="font-semibold text-[var(--color-magenta)] underline decoration-[var(--color-magenta)]/35 underline-offset-4 hover:text-[var(--color-plum)]"
            >
              Media manager
            </Link>
            , then paste public URLs when editing a piece.
          </p>
        </div>
        <Button href="/admin/portfolio/new" size="lg">
          New portfolio piece
        </Button>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-[var(--color-espresso)]/60">
          No pieces yet. Create one here or publish from{" "}
          <Link href="/admin/media" className="font-medium text-[var(--color-plum)] underline">
            Media
          </Link>
          .
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--color-sand)]/60 text-xs uppercase tracking-wide text-[var(--color-plum)]/60">
              <tr>
                <th className="px-4 py-3">Preview</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Sort</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const thumb = row.thumbnail_url || row.cover_image_url;
                return (
                  <tr key={row.id} className="border-t border-white/60 align-middle">
                    <td className="px-4 py-3">
                      <div className="relative h-14 w-24 overflow-hidden rounded-xl bg-[var(--color-sand)]">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="96px"
                            unoptimized
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-[10px] text-[var(--color-espresso)]/40">
                            No image
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[var(--color-plum)]">{row.title}</p>
                      <p className="text-xs text-[var(--color-espresso)]/50">/{row.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-espresso)]/80">{row.category}</td>
                    <td className="px-4 py-3 text-[var(--color-espresso)]/70">{row.sort_order}</td>
                    <td className="px-4 py-3">
                      {row.is_published ? (
                        <span className="rounded-full bg-[var(--color-teal)]/15 px-2.5 py-1 text-xs font-semibold text-[var(--color-teal)]">
                          Live
                        </span>
                      ) : (
                        <span className="rounded-full bg-[var(--color-plum)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--color-plum)]/70">
                          Draft
                        </span>
                      )}
                      {row.featured ? (
                        <span className="ml-1 text-xs text-[var(--color-magenta)]">★</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <Button href={`/admin/portfolio/${row.id}`} variant="secondary" size="sm">
                          Edit
                        </Button>
                        {row.is_published ? (
                          <Button href={`/portfolio/${row.slug}`} variant="ghost" size="sm" target="_blank">
                            View
                          </Button>
                        ) : null}
                        <form action={togglePortfolioPublish} className="inline">
                          <input type="hidden" name="id" value={row.id} />
                          <input
                            type="hidden"
                            name="publish"
                            value={row.is_published ? "false" : "true"}
                          />
                          <Button type="submit" variant="ghost" size="sm">
                            {row.is_published ? "Unpublish" : "Publish"}
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
