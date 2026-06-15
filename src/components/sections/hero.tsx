"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/constants";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { TextReveal } from "@/components/shared/text-reveal";
import { useLanguage } from "@/contexts/language-context";
import { Canvas3D } from "@/components/shared/canvas-3d";

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -40, scale: 0.6, rotate: -10 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.8, stagger: 0.15 }
      )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-name",
          { opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-title-sub",
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );

      gsap.to(".hero-badge-1", {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".hero-badge-2", {
        y: -30,
        x: 20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".hero-badge-3", {
        y: -40,
        x: -15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".hero-badge-4", {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-hero-section
      className="relative min-h-screen overflow-hidden px-4 py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <Canvas3D />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-accent/[0.04]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute top-1/3 left-[5%] w-96 h-96 rounded-full bg-gradient-to-br from-primary/[0.04] to-purple-500/[0.04] blur-3xl" />
        <div className="absolute bottom-1/3 right-[5%] w-72 h-72 rounded-3xl bg-gradient-to-tr from-accent/[0.04] to-primary/[0.04] blur-2xl" />
      </div>

      <div className="hero-badge hero-badge-1 absolute top-4 left-1/2 -translate-x-1/2 hidden lg:block z-20">
        <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-xl border border-primary/10">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          Next.js 14
        </span>
      </div>
      <div className="hero-badge hero-badge-2 absolute top-[10%] right-4 md:right-8 lg:right-12 hidden lg:block z-20">
        <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse-glow" />
          TypeScript
        </span>
      </div>
      <div className="hero-badge hero-badge-3 absolute bottom-[10%] left-4 md:left-8 lg:left-12 hidden lg:block z-20">
        <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse-glow" />
          Tailwind CSS
        </span>
      </div>
      <div className="hero-badge hero-badge-4 absolute bottom-20 right-4 md:right-8 lg:right-12 hidden lg:block z-20">
        <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-xl border border-accent/10">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse-glow" />
          GSAP ScrollTrigger
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen max-w-7xl mx-auto">
        <div className="flex flex-col justify-center lg:pr-8 order-2 lg:order-1">
          <p className="hero-subtitle mb-6 inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2 text-xs font-medium tracking-[0.15em] uppercase w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            {t.hero.availability}
          </p>

          <div className="relative mb-2">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-[100px] scale-150 opacity-50 animate-pulse-glow" />
            <span
              className="hero-name block font-display tracking-tight leading-none"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6rem)",
                textShadow: "0 0 40px hsl(var(--primary) / 0.2)",
              }}
            >
              <TextReveal className="font-display tracking-tight" as="span">
                {siteConfig.name}
              </TextReveal>
            </span>
          </div>

          <span className="hero-title-sub block mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-gradient-primary">
            {siteConfig.title}
            <span className="inline-block w-1 h-8 sm:h-10 md:h-12 bg-gradient-to-b from-primary to-purple-500 animate-pulse-glow ml-2 align-middle" />
          </span>

          <p className="hero-description mt-6 text-base sm:text-lg text-muted-foreground/80 max-w-lg leading-[1.8] tracking-wide">
            {siteConfig.description}
          </p>

          <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-4">
            <MagneticButton as="a" href="/projects">
              <span className="relative inline-flex h-12 items-center justify-center rounded-xl bg-primary px-10 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 gap-2.5 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                {t.hero.cta_work}
              </span>
            </MagneticButton>
            <MagneticButton as="a" href="/contact">
              <span className="inline-flex h-12 items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-10 text-sm font-medium transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/10 gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {t.hero.cta_contact}
              </span>
            </MagneticButton>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[50vh] lg:min-h-screen order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent z-10 pointer-events-none lg:left-0" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 z-20">
        <span className="text-[10px] tracking-[0.2em] uppercase font-light">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}