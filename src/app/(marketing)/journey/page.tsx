import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Journey",
  description:
    "The Hippy Chick Life reinvention story—values, creative courage, and why this chapter matters.",
};

export default function JourneyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Reveal className="mb-12 space-y-5 text-center">
        <Badge tone="magenta">Our Journey</Badge>
        <h1 className="font-serif text-4xl text-[var(--color-plum)] sm:text-5xl">
          Wise enough to know better—bold enough to begin again
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-espresso)]/75">
          This chapter is about color, clarity, and creative courage after decades
          of building, learning, and leading.
        </p>
      </Reveal>

      <div className="space-y-12 text-base leading-relaxed text-[var(--color-espresso)]/80">
        <Reveal>
          <h2 className="font-serif text-2xl text-[var(--color-plum)]">
            A reinvention grounded in experience
          </h2>
          <p className="mt-4">
            Hippy Chick Life is not a pivot away from expertise—it is the next
            expression of it. We bring business fluency, emotional intelligence, and
            a love of craft to every collaboration.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-2xl text-[var(--color-plum)]">
            Why this chapter matters
          </h2>
          <p className="mt-4">
            Audiences are hungry for authenticity that still feels elevated. Brands
            need partners who can translate strategy into warm, modern storytelling—
            without losing the human spark.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-serif text-2xl text-[var(--color-plum)]">
            Values we protect
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Kind, direct communication</li>
            <li>Creative integrity over trends</li>
            <li>Respect for timelines and teams</li>
            <li>Joy in the work—always</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-2xl text-[var(--color-plum)]">
            What makes us different
          </h2>
          <p className="mt-4">
            Maturity as an advantage: we listen like leaders and create like artists.
            You get dependable process with portfolio-worthy output—UGC, demos,
            lifestyle, and narrative content that feels current, not chasing youth.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-16 flex flex-wrap justify-center gap-4">
        <Button href="/portfolio" size="lg">
          Explore UGC Portfolio
        </Button>
        <Button href="/contact" variant="secondary" size="lg">
          Start a conversation
        </Button>
      </Reveal>
    </div>
  );
}
