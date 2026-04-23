"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--color-groovy-pink)_12%,transparent)] bg-[color-mix(in_srgb,#fffdf8_92%,white)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 md:px-8 md:py-4">
        <Link
          href="/"
          className="group min-w-0 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-groovy-teal)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8]"
        >
          <SiteLogo
            size="sm"
            className="transition group-hover:opacity-95 group-active:scale-[0.98]"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-groovy-teal)] transition hover:text-[var(--color-groovy-pink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-groovy-pink)]/25 bg-white/90 text-[var(--color-groovy-plum)] shadow-sm md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-white/60 bg-[var(--color-cream)]/98 px-5 py-4 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-groovy-teal)] hover:bg-white/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
