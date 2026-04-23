import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug } from "@/lib/data/blog";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.summary ?? undefined,
    openGraph: {
      title: post.title,
      description: post.summary ?? undefined,
      images: post.featured_image_url
        ? [{ url: post.featured_image_url }]
        : undefined,
    },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-plum)]/70 hover:text-[var(--color-plum)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Journal
      </Link>

      <header className="mt-8 space-y-4">
        {post.category ? <Badge tone="teal">{post.category}</Badge> : null}
        <h1 className="font-serif text-4xl leading-tight text-[var(--color-plum)] sm:text-5xl">
          {post.title}
        </h1>
        {post.published_at ? (
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-espresso)]/50">
            {new Date(post.published_at).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        ) : null}
      </header>

      {post.featured_image_url ? (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-white/70 bg-[var(--color-sand)] shadow-[var(--shadow-soft)]">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            unoptimized
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}

      <div className="mt-12 space-y-6 text-base leading-relaxed text-[var(--color-espresso)]/85">
        {post.body.split(/\n\n+/).map((para, idx) => (
          <p key={idx} className="whitespace-pre-wrap">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
