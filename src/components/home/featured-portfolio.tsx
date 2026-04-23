import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { PortfolioItem } from "@/types/database";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

type FeaturedPortfolioProps = {
  items: PortfolioItem[];
};

const tone = ["magenta", "teal", "purple", "gold"] as const;

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps) {
  return (
    <section className="border-y border-white/60 bg-[color-mix(in_srgb,white_55%,var(--color-sand))] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 pb-12 md:flex-row md:items-end">
          <Reveal className="max-w-xl space-y-4">
            <Badge tone="teal">Portfolio</Badge>
            <h2 className="font-serif text-3xl text-[var(--color-plum)] sm:text-4xl">
              Featured work with room to breathe
            </h2>
            <p className="text-[var(--color-espresso)]/75">
              A curated look at collaborations, campaigns, and creative that
              blends warmth with commercial polish.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-plum)] hover:text-[var(--color-magenta)]"
            >
              View full portfolio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {items.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-[var(--color-plum)]/20 bg-white/60 px-6 py-16 text-center text-sm text-[var(--color-espresso)]/65">
            Portfolio pieces will appear here once published in Supabase.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="group relative block overflow-hidden rounded-[1.75rem] bg-[var(--color-plum)] shadow-[var(--shadow-soft-lg)]"
                >
                  <div className="relative aspect-[16/11]">
                    {item.cover_image_url || item.thumbnail_url ? (
                      <Image
                        src={(item.cover_image_url || item.thumbnail_url)!}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 45vw, 100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-magenta)]/40 via-[var(--color-purple)]/35 to-[var(--color-teal)]/35" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f0f18]/85 via-[#1f0f18]/25 to-transparent" />
                    {item.media_type === "video" || item.video_url ? (
                      <span className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--color-plum)] shadow-md">
                        <Play className="h-5 w-5 fill-current" />
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2 px-8 py-7 text-white">
                    <Badge tone={tone[index % tone.length]} className="bg-white/15 text-white">
                      {item.category}
                    </Badge>
                    <h3 className="font-serif text-2xl leading-snug">{item.title}</h3>
                    {item.excerpt ? (
                      <p className="line-clamp-2 text-sm text-white/80">{item.excerpt}</p>
                    ) : null}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
