"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PortfolioFilters() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  return (
    <div className="flex flex-wrap gap-2">
      <FilterPill href="/portfolio" active={!active}>
        All
      </FilterPill>
      {PORTFOLIO_CATEGORIES.map((cat) => (
        <FilterPill
          key={cat}
          href={`/portfolio?category=${encodeURIComponent(cat)}`}
          active={active === cat}
        >
          {cat}
        </FilterPill>
      ))}
    </div>
  );
}

function FilterPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition",
        active
          ? "border-[var(--color-plum)] bg-[var(--color-plum)] text-white shadow-sm"
          : "border-white/70 bg-white/60 text-[var(--color-espresso)]/75 hover:border-[var(--color-plum)]/25 hover:text-[var(--color-plum)]",
      )}
    >
      {children}
    </Link>
  );
}
