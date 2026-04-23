import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type HeroProps = {
  imageUrl: string;
};

export function HomeHero({ imageUrl }: HeroProps) {
  return (
    <section className="relative isolate min-h-[min(100dvh,880px)] overflow-hidden">
      <Image
        src={imageUrl}
        alt="Hippy Chick Life — hero lifestyle photograph"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Neutral → soft sunshine (full-bleed scrim over photo) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-900/60 from-[8%] via-stone-500/10 via-[42%] to-amber-50/58 to-[96%]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-800/28 from-0% via-transparent via-[52%] to-amber-100/38 to-[100%]" />

      <div className="relative mx-auto flex min-h-[min(100dvh,880px)] max-w-6xl flex-col justify-end gap-10 px-5 pb-16 pt-24 md:justify-center md:px-8 md:pb-24 md:pt-20">
        <Reveal className="max-w-xl space-y-6">
          <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.28em] text-teal-100 [text-shadow:_0_2px_22px_rgba(0,0,0,0.4)] md:text-xs">
            Creativity, life experience
            <br className="hidden sm:block" />
            <span className="text-white/50"> &amp; </span>
            business wisdom
          </p>

          <h1 className="font-serif text-[2.05rem] font-semibold leading-[1.15] tracking-tight [text-shadow:_0_2px_26px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-[2.65rem]">
            <span className="block text-white">Wise Enough to Know Better,</span>
            <span className="mt-1 block text-[#ffd0ea]">
              Bold Enough to Begin Again
            </span>
          </h1>

          <p className="max-w-lg rounded-2xl border border-white/60 bg-white/88 px-5 py-4 text-sm leading-relaxed text-black shadow-sm backdrop-blur-sm sm:text-base">
            We’re blending creativity, life experience, and years of business
            wisdom to build a colorful new life through content creation,
            connection, and passive-income possibilities.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              href="/journey"
              variant="groovyPink"
              size="lg"
              className="min-w-[11rem] font-bold uppercase tracking-[0.12em] shadow-lg"
            >
              Our Journey
            </Button>
            <Button
              href="/work-with-us"
              variant="groovyTeal"
              size="lg"
              className="min-w-[11rem] font-bold uppercase tracking-[0.12em] shadow-lg"
            >
              Work With Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
