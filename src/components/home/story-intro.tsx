import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

export function StoryIntro() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <Badge tone="magenta" className="mb-5">
            The reinvention
          </Badge>
          <h2 className="font-serif text-3xl leading-tight text-[var(--color-plum)] sm:text-4xl">
            Life experience is not the finish line—it is the launchpad.
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="space-y-5 text-base leading-relaxed text-[var(--color-espresso)]/80">
          <p>
            Hippy Chick Life is a UGC-first lifestyle brand for creators who are
            writing a bold new chapter: colorful, grounded, and unapologetically
            current.
          </p>
          <p>
            We pair decades of business fluency with modern storytelling—UGC,
            publishing, demos, and voice-led narratives that feel human,
            elevated, and ready for the brands who value authenticity.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
