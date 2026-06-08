"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/constants";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { TextReveal } from "@/components/shared/text-reveal";
import { Parallax } from "@/components/shared/parallax";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.2, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      <Parallax speed={0.15} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </Parallax>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <h1 className="sr-only">{siteConfig.name}</h1>
        <p className="hero-subtitle mb-4 text-sm font-medium text-primary tracking-widest uppercase">
          {siteConfig.availability}
        </p>
        <TextReveal
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
          as="span"
        >
          {siteConfig.name}
        </TextReveal>
        <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-display">
          {siteConfig.title}
        </span>
        <p className="hero-description mt-6 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
          {siteConfig.description}
        </p>
        <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-4">
          <MagneticButton as="a" href="/projects">
            <span className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              شوف أعمالي
            </span>
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            <span className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-8 text-sm font-medium transition-colors hover:bg-accent">
              تواصل معي
            </span>
          </MagneticButton>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce-slow"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
}
