import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { PortfolioItem } from "@/types/database";
import { Badge } from "@/components/ui/badge";

type Props = {
  items: PortfolioItem[];
};

export function PortfolioGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-[var(--color-plum)]/20 bg-white/60 px-6 py-16 text-center text-sm text-[var(--color-espresso)]/65">
        No published portfolio items match this filter yet.
      </p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/portfolio/${item.slug}`}
          className="group overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-sand)]">
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
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-magenta)]/35 via-[var(--color-purple)]/25 to-[var(--color-teal)]/35" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f0f18]/75 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            {item.media_type === "video" || item.video_url ? (
              <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--color-plum)] shadow-md">
                <Play className="h-4 w-4 fill-current" />
              </span>
            ) : null}
          </div>
          <div className="space-y-3 px-7 py-6">
            <Badge tone="plum">{item.category}</Badge>
            <h2 className="font-serif text-2xl text-[var(--color-plum)]">{item.title}</h2>
            {item.excerpt ? (
              <p className="line-clamp-3 text-sm text-[var(--color-espresso)]/70">
                {item.excerpt}
              </p>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
