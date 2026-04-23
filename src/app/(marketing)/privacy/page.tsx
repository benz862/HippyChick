import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy practices for Hippy Chick Life.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-serif text-4xl text-[var(--color-plum)]">Privacy Policy</h1>
      <p className="mt-6 text-sm leading-relaxed text-[var(--color-espresso)]/75">
        This policy will be finalized with your legal counsel. The site collects
        contact inquiries submitted through the contact form and stores them in
        Supabase with row-level security so only authenticated administrators can
        read them. Analytics and marketing pixels should be disclosed here once
        configured.
      </p>
    </div>
  );
}
