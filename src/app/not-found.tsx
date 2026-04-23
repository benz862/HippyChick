import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for has wandered off. Let's get you back to Hippy Chick Life.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-5 py-20 text-center md:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-groovy-pink)]">
            404 — Page not found
          </p>
          <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--color-groovy-plum)] sm:text-4xl">
            This path wandered off the trail.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-stone-700">
            The link may be old, the page might have moved, or it was never
            here to begin with. Take a breath, pick a direction, and keep
            exploring.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              href="/"
              variant="groovyPink"
              size="lg"
              className="min-w-[11rem] font-bold uppercase tracking-[0.12em] shadow-lg"
            >
              Back home
            </Button>
            <Button
              href="/portfolio"
              variant="groovyTeal"
              size="lg"
              className="min-w-[11rem] font-bold uppercase tracking-[0.12em] shadow-lg"
            >
              See portfolio
            </Button>
          </div>

          <nav className="pt-6 text-sm text-stone-600">
            <span className="mr-2">Or try:</span>
            <Link className="underline hover:text-[var(--color-groovy-pink)]" href="/journey">
              Our Journey
            </Link>
            <span className="mx-2">·</span>
            <Link className="underline hover:text-[var(--color-groovy-pink)]" href="/journal">
              Journal
            </Link>
            <span className="mx-2">·</span>
            <Link className="underline hover:text-[var(--color-groovy-pink)]" href="/contact">
              Contact
            </Link>
          </nav>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
