import type { Testimonial } from "@/types/database";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

type Props = {
  testimonials: Testimonial[];
};

const FALLBACK: Testimonial[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    quote:
      "The team delivered elevated UGC that felt on-brand within days—warm, polished, and refreshingly professional.",
    author_name: "Creative Director",
    author_title: "Beauty & wellness brand",
    company: "Publish testimonials in Supabase to replace this sample.",
    avatar_url: null,
    sort_order: 0,
    is_published: true,
    created_at: new Date().toISOString(),
  },
];

export function TestimonialsSection({ testimonials }: Props) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK;

  return (
    <section className="border-y border-white/60 bg-white/45 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <Badge tone="purple">Testimonials</Badge>
          <h2 className="mt-4 font-serif text-3xl text-[var(--color-plum)] sm:text-4xl">
            Kind words from collaborators
          </h2>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <figure className="h-full rounded-[1.75rem] border border-white/80 bg-[var(--color-cream)]/80 p-8 shadow-inner shadow-white/40">
                <blockquote className="font-serif text-lg leading-relaxed text-[var(--color-plum)]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 text-sm text-[var(--color-espresso)]/70">
                  <span className="font-semibold text-[var(--color-espresso)]">
                    {t.author_name}
                  </span>
                  {t.author_title ? (
                    <span className="block text-xs uppercase tracking-wide text-[var(--color-plum)]/55">
                      {t.author_title}
                    </span>
                  ) : null}
                  {t.company ? (
                    <span className="mt-1 block text-xs text-[var(--color-espresso)]/55">
                      {t.company}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
