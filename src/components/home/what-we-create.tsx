import { Camera, Clapperboard, Mic2, Palette, Sparkles, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cards = [
  {
    title: "UGC Videos",
    copy: "Natural, confident on-camera delivery that feels like a friend—not a script.",
    icon: Clapperboard,
    accent: "from-[var(--color-magenta)]/25 to-transparent",
  },
  {
    title: "Product Demos",
    copy: "Clear, artful walkthroughs that respect the product and the audience.",
    icon: Sparkles,
    accent: "from-[var(--color-teal)]/25 to-transparent",
  },
  {
    title: "Lifestyle Content",
    copy: "Warm editorial scenes with texture, light, and lived-in beauty.",
    icon: Palette,
    accent: "from-[var(--color-purple)]/22 to-transparent",
  },
  {
    title: "Photography",
    copy: "Still imagery with mood, palette discipline, and brand-safe polish.",
    icon: Camera,
    accent: "from-[var(--color-gold)]/28 to-transparent",
  },
  {
    title: "Storytelling Content",
    copy: "Voice-led narratives that connect emotion to message—without fluff.",
    icon: Mic2,
    accent: "from-[var(--color-coral)]/22 to-transparent",
  },
  {
    title: "Brand Collaborations",
    copy: "Partnerships built on communication, timelines, and creative integrity.",
    icon: Users,
    accent: "from-[var(--color-magenta)]/18 to-transparent",
  },
] as const;

export function WhatWeCreate() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <Badge tone="plum" className="mb-4">
          Capabilities
        </Badge>
        <h2 className="font-serif text-3xl text-[var(--color-plum)] sm:text-4xl">
          What we create
        </h2>
        <p className="mt-4 text-[var(--color-espresso)]/75">
          Elegant cards, serious craft—each format designed to feel bespoke to
          your brand and respectful of your customer.
        </p>
      </Reveal>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.04}>
            <Card className="relative h-full overflow-hidden p-7">
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${card.accent}`}
              />
              <card.icon className="relative mb-4 h-8 w-8 text-[var(--color-plum)]" />
              <h3 className="relative font-serif text-xl text-[var(--color-plum)]">
                {card.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-[var(--color-espresso)]/75">
                {card.copy}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
