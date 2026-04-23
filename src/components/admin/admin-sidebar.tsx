"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/portfolio", label: "UGC Portfolio" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Settings" },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    if (!isSupabaseConfigured()) {
      router.push("/admin/login");
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 flex-col border-r border-white/60 bg-white/70 p-6 md:flex">
      <Link href="/" className="font-serif text-lg text-[var(--color-plum)]">
        Hippy Chick Life
      </Link>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-espresso)]/45">
        Admin
      </p>
      <nav className="mt-8 flex flex-col gap-1 text-sm">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "rounded-xl px-3 py-2 font-medium transition",
              pathname === l.href
                ? "bg-[var(--color-plum)] text-white shadow-sm"
                : "text-[var(--color-espresso)]/75 hover:bg-white/80",
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => void signOut()}
        className="mt-auto rounded-full border border-[var(--color-plum)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-plum)] transition hover:bg-[var(--color-plum)]/5"
      >
        Sign out
      </button>
    </aside>
  );
}
