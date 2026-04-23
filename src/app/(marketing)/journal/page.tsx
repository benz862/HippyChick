import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Stories on reinvention, creator marketing, passive income experiments, and behind-the-scenes lessons.",
};

export const revalidate = 120;

export default async function JournalPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <header className="mb-14 max-w-2xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-plum)]/60">
          Journal
        </p>
        <h1 className="font-serif text-4xl text-[var(--color-plum)] sm:text-5xl">
          Notes from the colorful new chapter
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-espresso)]/75">
          Essays, experiments, and honest reflections on building a creative
          life with depth and delight.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-[var(--color-plum)]/20 bg-white/60 px-6 py-16 text-center text-sm text-[var(--color-espresso)]/65">
          Publish your first post in Supabase to populate the journal.
        </p>
      ) : (
        <div className="grid gap-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="grid gap-6 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[var(--shadow-soft)] md:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative min-h-[220px] bg-[var(--color-sand)] md:min-h-full">
                {post.featured_image_url ? (
                  <Image
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-magenta)]/35 via-[var(--color-purple)]/25 to-[var(--color-teal)]/35" />
                )}
              </div>
              <div className="flex flex-col justify-center space-y-4 px-8 py-10">
                {post.category ? <Badge tone="plum">{post.category}</Badge> : null}
                <h2 className="font-serif text-2xl text-[var(--color-plum)]">
                  <Link
                    href={`/journal/${post.slug}`}
                    className="hover:text-[var(--color-magenta)]"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.summary ? (
                  <p className="text-sm leading-relaxed text-[var(--color-espresso)]/75">
                    {post.summary}
                  </p>
                ) : null}
                {post.published_at ? (
                  <p className="text-xs uppercase tracking-wide text-[var(--color-espresso)]/50">
                    {new Date(post.published_at).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
