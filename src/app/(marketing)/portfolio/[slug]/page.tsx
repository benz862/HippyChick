import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPortfolioMedia } from "@/lib/data/portfolio-media";
import { getPortfolioItemBySlug } from "@/lib/data/portfolio";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return { title: "Project" };
  return {
    title: item.title,
    description: item.excerpt ?? item.description ?? undefined,
    openGraph: {
      title: item.title,
      description: item.excerpt ?? undefined,
      images: item.cover_image_url ? [{ url: item.cover_image_url }] : undefined,
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) notFound();

  const gallery = await getPortfolioMedia(item.id);

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-6xl px-5 pt-10 md:px-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-plum)]/70 hover:text-[var(--color-plum)]"
        >
          <ArrowLeft className="h-4 w-4" />
          UGC Portfolio
        </Link>
      </div>

      <header className="mx-auto mt-8 max-w-4xl space-y-5 px-5 text-center md:px-8">
        <Badge tone="teal">{item.category}</Badge>
        <h1 className="font-serif text-4xl text-[var(--color-plum)] sm:text-5xl">
          {item.title}
        </h1>
        {item.excerpt ? (
          <p className="text-base text-[var(--color-espresso)]/75">{item.excerpt}</p>
        ) : null}
        <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-wide text-[var(--color-espresso)]/55">
          {item.client_name ? <span>Client: {item.client_name}</span> : null}
          {item.platform ? <span>Platform: {item.platform}</span> : null}
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-5xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-black shadow-[var(--shadow-soft-lg)]">
          {item.video_url ? (
            <video
              className="aspect-video w-full"
              controls
              playsInline
              poster={item.thumbnail_url ?? item.cover_image_url ?? undefined}
            >
              <source src={item.video_url} />
            </video>
          ) : item.cover_image_url ? (
            <div className="relative aspect-[16/9] bg-[var(--color-sand)]">
              <Image
                src={item.cover_image_url}
                alt={item.title}
                fill
                unoptimized
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-[var(--color-magenta)]/35 via-[var(--color-purple)]/25 to-[var(--color-teal)]/35" />
          )}
        </div>
      </div>

      {gallery.length > 0 ? (
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-5 md:grid-cols-2 md:px-8">
          {gallery.map((m) => (
            <figure
              key={m.id}
              className="overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[var(--color-sand)]">
                {m.media_type === "video" ? (
                  <video className="h-full w-full object-cover" controls playsInline>
                    <source src={m.url} />
                  </video>
                ) : (
                  <Image
                    src={m.url}
                    alt={m.alt_text ?? item.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                )}
              </div>
              {m.caption ? (
                <figcaption className="px-4 py-3 text-xs text-[var(--color-espresso)]/65">
                  {m.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}

      <div className="mx-auto mt-14 max-w-3xl space-y-6 px-5 text-base leading-relaxed text-[var(--color-espresso)]/80 md:px-8">
        {item.description ? (
          <div className="whitespace-pre-wrap">{item.description}</div>
        ) : (
          <p>
            Detailed case studies can be authored in Supabase alongside gallery
            media, deliverables, and external links.
          </p>
        )}
        {item.external_link ? (
          <p>
            <a
              href={item.external_link}
              className="font-semibold text-[var(--color-plum)] underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              View external link
            </a>
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-4 px-5 md:px-8">
        <Button href="/contact" size="lg">
          Inquire about this style of work
        </Button>
        <Button href="/portfolio" variant="secondary" size="lg">
          Back to UGC Portfolio
        </Button>
      </div>
    </article>
  );
}
