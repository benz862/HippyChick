import { CtaBanner } from "@/components/home/cta-banner";
import { FeaturedPortfolio } from "@/components/home/featured-portfolio";
import { HomeHero } from "@/components/home/hero";
import { StoryIntro } from "@/components/home/story-intro";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhatWeCreate } from "@/components/home/what-we-create";
import { WhyWorkWithUs } from "@/components/home/why-work-with-us";
import { getFeaturedPortfolioItems } from "@/lib/data/portfolio";
import { getHeroImageUrl } from "@/lib/data/site-settings";
import { getPublishedTestimonials } from "@/lib/data/testimonials";

export const revalidate = 120;

export default async function HomePage() {
  const [heroImage, featured, testimonials] = await Promise.all([
    getHeroImageUrl(),
    getFeaturedPortfolioItems(4),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      <HomeHero imageUrl={heroImage} />
      <StoryIntro />
      <FeaturedPortfolio items={featured} />
      <WhatWeCreate />
      <WhyWorkWithUs />
      <TestimonialsSection testimonials={testimonials} />
      <CtaBanner />
    </>
  );
}
