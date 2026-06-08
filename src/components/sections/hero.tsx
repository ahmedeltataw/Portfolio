"use client";

import { useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/constants";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { TextReveal } from "@/components/shared/text-reveal";
import { useLanguage } from "@/contexts/language-context";

const Canvas3D = lazy(() =>
  import("@/components/shared/canvas-3d").then((mod) => ({ default: mod.Canvas3D }))
);

export function Hero() {
  const { t } = useLanguage();
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
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, delay: 0.6, ease: "back.out(2)" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas3D />
        </Suspense>

        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/5 gradient-mesh"
          style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary) / 0.05), transparent 40%, hsl(var(--accent) / 0.05) 60%, transparent)" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="hero-badge absolute top-[18%] left-[6%] hidden lg:block">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-glow" />
          Next.js
        </span>
      </div>
      <div className="hero-badge absolute top-[65%] right-[5%] hidden lg:block">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse-glow" />
          TypeScript
        </span>
      </div>
      <div className="hero-badge absolute top-[30%] right-[4%] hidden lg:block">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse-glow" />
          GSAP
        </span>
      </div>
      <div className="hero-badge absolute top-[75%] left-[8%] hidden lg:block">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse-glow" />
          Tailwind CSS
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <h1 className="sr-only">{siteConfig.name}</h1>
        <p className="hero-subtitle mb-4 text-sm font-medium text-primary tracking-widest uppercase">
          {t.hero.availability}
        </p>
        <TextReveal
          className="font-display text-display tracking-tight text-gradient"
          as="span"
        >
          {siteConfig.name}
        </TextReveal>
        <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-display">
          {siteConfig.title}
        </span>
        <p className="hero-description mt-6 text-body-lg text-muted-foreground max-w-lg leading-relaxed">
          {siteConfig.description}
        </p>
        <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-4">
          <MagneticButton as="a" href="/projects">
            <span className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              {t.hero.cta_work}
            </span>
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            <span className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-8 text-sm font-medium transition-colors hover:bg-accent gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {t.hero.cta_contact}
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
