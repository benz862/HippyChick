import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Hippy Chick Life.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-serif text-4xl text-[var(--color-plum)]">Terms</h1>
      <p className="mt-6 text-sm leading-relaxed text-[var(--color-espresso)]/75">
        Terms of use will be finalized with your legal counsel. Until then, treat
        all site content as proprietary to Hippy Chick Life unless otherwise
        noted. For collaboration contracts, use your brand-approved agreements.
      </p>
    </div>
  );
}
