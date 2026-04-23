import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Media Kit",
  description: "Brand assets, bios, and downloadable media kit for Hippy Chick Life.",
};

export default function MediaKitPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-plum)]/60">
        Media Kit
      </p>
      <h1 className="mt-4 font-serif text-4xl text-[var(--color-plum)]">
        Press-ready details, on your terms
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-[var(--color-espresso)]/75">
        Upload a PDF to the <code className="rounded bg-white/70 px-1">brand-assets</code>{" "}
        bucket in Supabase and surface a signed or public link via{" "}
        <code className="rounded bg-white/70 px-1">site_settings</code> when you are ready
        to share externally.
      </p>
      <div className="mt-10 flex justify-center">
        <Button href="/contact" variant="secondary" size="lg">
          Request the media kit
        </Button>
      </div>
    </div>
  );
}
