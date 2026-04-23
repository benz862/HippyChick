import {
  HeartHandshake,
  LineChart,
  MessageCircle,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

const reasons = [
  {
    title: "Authenticity",
    body: "Mature perspective reads as trustworthy—never performative.",
    icon: HeartHandshake,
  },
  {
    title: "Experience",
    body: "Business fluency keeps projects smooth, kind, and on-brief.",
    icon: LineChart,
  },
  {
    title: "Communication",
    body: "Clear updates, thoughtful questions, and respectful timelines.",
    icon: MessageCircle,
  },
  {
    title: "Creativity",
    body: "Editorial taste with color confidence and modern composition.",
    icon: Palette,
  },
  {
    title: "Mature audience connection",
    body: "Relatable storytelling for grown-up customers who buy with intent.",
    icon: Users,
  },
  {
    title: "Business understanding",
    body: "We speak KPIs and creative—so your team feels supported end-to-end.",
    icon: Sparkles,
  },
] as const;

export function WhyWorkWithUs() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <Badge tone="gold">Why partner here</Badge>
          <h2 className="mt-4 font-serif text-3xl text-[var(--color-plum)] sm:text-4xl">
            Why brands choose Hippy Chick Life
          </h2>
          <p className="mt-4 text-[var(--color-espresso)]/75">
            A calm, confident collaborator who treats your brand like it matters—
            because it does.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <div className="h-full rounded-[1.5rem] border border-white/70 bg-white/55 p-7 shadow-[var(--shadow-soft)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)]">
                <item.icon className="mb-4 h-7 w-7 text-[var(--color-teal)]" />
                <h3 className="font-serif text-lg text-[var(--color-plum)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-espresso)]/75">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
