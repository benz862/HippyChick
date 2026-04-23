import Link from "next/link";
import { SiteLogo } from "@/components/layout/site-logo";
import { NAV_LINKS, SITE_LEGAL_NAME } from "@/lib/constants";
import { getContactEmail } from "@/lib/data/site-settings";

const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: "/media-kit", label: "Media Kit" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export async function SiteFooter() {
  const contactEmail = await getContactEmail();
  return (
    <footer className="mt-24 border-t border-white/60 bg-[color-mix(in_srgb,var(--color-sand)_55%,white)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-16 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-sm space-y-4">
          <SiteLogo className="max-w-[220px] opacity-95 md:max-w-[260px]" />
          <p className="text-sm leading-relaxed text-[var(--color-espresso)]/75">
            A warm, editorial lifestyle brand for mature creators blending
            authenticity, business wisdom, and vibrant storytelling.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-groovy-teal)]/70">
              Explore
            </p>
            <ul className="space-y-2 text-[var(--color-espresso)]/80">
              {FOOTER_LINKS.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <Link
                    className="transition hover:text-[var(--color-groovy-pink)]"
                    href={l.href}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-groovy-teal)]/70">
              Connect
            </p>
            <ul className="space-y-2 text-[var(--color-espresso)]/80">
              <li>
                <Link className="hover:text-[var(--color-groovy-pink)]" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--color-groovy-pink)]" href="/work-with-us">
                  Work With Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--color-groovy-pink)]" href="/media-kit">
                  Media Kit
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-groovy-pink)]"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-groovy-teal)]/70">
              Legal
            </p>
            <ul className="space-y-2 text-[var(--color-espresso)]/80">
              <li>
                <Link className="hover:text-[var(--color-groovy-pink)]" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--color-groovy-pink)]" href="/terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/50 py-6 text-center text-xs text-[var(--color-espresso)]/55">
        © {new Date().getFullYear()} {SITE_LEGAL_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
