import type { Metadata } from "next";
import { SITE_LEGAL_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${SITE_LEGAL_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-serif text-4xl text-[var(--color-plum)]">Terms</h1>
      <p className="mt-6 text-sm leading-relaxed text-[var(--color-espresso)]/75">
        Terms of use will be finalized with legal counsel. Until then, all site
        content, imagery, copy, and branding are proprietary to{" "}
        {SITE_LEGAL_NAME} unless otherwise noted. For collaboration contracts,
        please use brand-approved agreements.
      </p>
      <p className="mt-6 text-xs text-[var(--color-espresso)]/55">
        © {new Date().getFullYear()} {SITE_LEGAL_NAME}. All rights reserved.
      </p>
    </div>
  );
}
