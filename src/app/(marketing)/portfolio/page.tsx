import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioFilters } from "@/components/portfolio/portfolio-filters";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { getPublishedPortfolioItems } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "UGC Portfolio",
  description:
    "Browse UGC, demos, lifestyle, photography, and brand storytelling from Hippy Chick Life.",
};

export const revalidate = 120;

type SearchParams = { category?: string };

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await searchParams;
  const all = await getPublishedPortfolioItems();
  const items = category
    ? all.filter((i) => i.category.toLowerCase() === category.toLowerCase())
    : all;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-12 max-w-2xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-plum)]/60">
          UGC Portfolio
        </p>
        <h1 className="font-serif text-4xl text-[var(--color-plum)] sm:text-5xl">
          UGC that feels lived-in and launch-ready
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-espresso)]/75">
          Filter by format, preview with calm overlays, and open any UGC project
          for full context—media, deliverables, and collaboration notes.
        </p>
      </div>

      <Suspense fallback={null}>
        <div className="mb-10">
          <PortfolioFilters />
        </div>
      </Suspense>

      <PortfolioGrid items={items} />
    </div>
  );
}
