import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { SkillsSnapshot } from "@/components/sections/skills-snapshot";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { ScrollProgress } from "@/components/shared/scroll-progress";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <StatsSection />
      <FeaturedProjects />
      <SkillsSnapshot />
      <Testimonials />
      <CTASection />
    </>
  );
}
