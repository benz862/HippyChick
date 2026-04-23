import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-plum)] via-[#5c2c55] to-[var(--color-magenta)] px-8 py-14 text-center text-white shadow-[var(--shadow-soft-lg)] md:px-16">
          <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-[var(--color-teal)]/25 blur-3xl" />
          <h2 className="relative font-serif text-3xl sm:text-4xl">
            Ready for creative that feels current—and deeply human?
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Tell us about your launch, refresh, or always-on needs. We will
            follow up with thoughtful questions, not a generic pitch deck.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="border-transparent bg-white text-[var(--color-plum)] hover:bg-[var(--color-cream)]"
            >
              Start a conversation
            </Button>
            <Button
              href="/portfolio"
              variant="ghost"
              size="lg"
              className="text-white ring-1 ring-white/40 hover:bg-white/10"
            >
              Browse portfolio
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
