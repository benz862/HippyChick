import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Services, collaboration process, and how to engage Hippy Chick Life for UGC, demos, lifestyle, and storytelling.",
};

const services = [
  "UGC Videos",
  "Product Demos",
  "Lifestyle Photography",
  "Voice-led Storytelling",
  "Social Creative",
  "Mature Audience Content",
] as const;

const steps = [
  {
    title: "Discovery",
    body: "We align on goals, audience, deliverables, and the emotional tone your brand deserves.",
  },
  {
    title: "Creative direction",
    body: "Mood, palette, shot list, and narrative beats—shared early so teams feel confident.",
  },
  {
    title: "Production",
    body: "Filming, photography, and voice work with calm energy and polished execution.",
  },
  {
    title: "Delivery & iteration",
    body: "Organized handoffs, captions, and thoughtful revisions within scope.",
  },
] as const;

export default function WorkWithUsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <Reveal className="mx-auto mb-16 max-w-3xl text-center space-y-5">
        <Badge tone="teal">Work With Us</Badge>
        <h1 className="font-serif text-4xl text-[var(--color-plum)] sm:text-5xl">
          Collaboration that feels capable—and kind
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-espresso)]/75">
          We partner with brands that value warmth, clarity, and creative courage.
          If that is you, we would love to hear what you are building.
        </p>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <Card>
            <h2 className="font-serif text-2xl text-[var(--color-plum)]">Services</h2>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-espresso)]/80">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-magenta)]" />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card>
            <h2 className="font-serif text-2xl text-[var(--color-plum)]">
              Ideal brand fit
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-espresso)]/75">
              Wellness, home, thoughtful lifestyle, premium beauty, and mission-led
              products shine here. We love partners who appreciate detail, inclusive
              storytelling, and creative trust.
            </p>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <Card>
          <h2 className="font-serif text-2xl text-[var(--color-plum)]">Process</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {steps.map((step, i) => (
              <div key={step.title} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-plum)]/55">
                  Step {i + 1}
                </p>
                <h3 className="font-serif text-lg text-[var(--color-plum)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-espresso)]/75">{step.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal className="mt-14 text-center">
        <Button href="/contact" size="lg">
          Request a project
        </Button>
      </Reveal>
    </div>
  );
}
