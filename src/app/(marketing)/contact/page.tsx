import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Hippy Chick Life for collaborations, campaigns, and partnerships.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-12 space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-plum)]/60">
          Contact
        </p>
        <h1 className="font-serif text-4xl text-[var(--color-plum)]">
          Let’s make something beautiful
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-espresso)]/75">
          Share a snapshot of your goals, timeline, and creative needs. We read
          every message with care.
        </p>
      </div>
      <ContactForm />
      <p className="mt-10 text-center text-xs text-[var(--color-espresso)]/55">
        We typically reply within two business days.
      </p>
    </div>
  );
}
