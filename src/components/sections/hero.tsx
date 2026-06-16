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
      {/* Warm dark charcoal background with subtle amber undertone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 80% 30%, hsl(45 100% 50% / 0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, hsl(30 100% 50% / 0.04) 0%, transparent 50%),
            linear-gradient(180deg, hsl(30 20% 8%) 0%, hsl(240 15% 6%) 50%, hsl(240 20% 5%) 100%)
          `,
        }}
      />

      {/* Canvas3D warm blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas3D />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen max-w-7xl mx-auto">
        {/* Left content */}
        <div className="flex flex-col justify-center lg:pr-8 order-1 pb-8 lg:pb-0">
          <p className="hero-subtitle mb-6 inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2 text-xs font-medium tracking-[0.15em] uppercase w-fit text-muted-foreground border border-border/20">
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
              <TextReveal className="font-display tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent" as="span">
                {siteConfig.name}
              </TextReveal>
            </span>
          </div>

          <span className="hero-title-sub block mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wider">
            {siteConfig.title}
            <span className="inline-block w-[3px] h-[1em] bg-primary/70 animate-pulse-glow ml-1 align-middle" />
          </span>

          <p className="hero-description mt-6 text-base sm:text-lg text-foreground/80 max-w-lg leading-[1.8] tracking-wide">
            {siteConfig.description}
          </p>

          <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-4">
            <MagneticButton as="a" href="/projects">
              <span className="relative inline-flex h-12 items-center justify-center rounded-xl bg-primary px-10 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 gap-2.5 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                {t.hero.cta_work}
              </span>
            </MagneticButton>
            <MagneticButton as="a" href="/contact">
              <span className="inline-flex h-12 items-center justify-center rounded-xl border border-rose-500/30 bg-card/50 backdrop-blur-sm px-10 text-sm font-medium text-foreground/90 transition-all duration-300 hover:bg-card hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10 gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {t.hero.cta_contact}
              </span>
            </MagneticButton>
          </div>

          {/* Mobile profile indicator */}
          <div className="lg:hidden mt-12 flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/10">
              <span className="text-2xl font-serif text-amber-500/60">AE</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-xl px-3 py-1 text-xs font-medium border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Next.js 14
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-xl px-3 py-1 text-xs font-medium border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                TypeScript
              </span>
            </div>
          </div>
        </div>

        {/* Right profile visual — hidden on mobile */}
        <div className="hidden lg:flex relative items-center justify-center min-h-screen order-2">
          <div className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[480px] lg:w-[420px] lg:h-[520px]">
            {/* Arch background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none">
              <path
                d="M0 500 C0 200, 100 0, 200 0 C300 0, 400 200, 400 500 Z"
                fill="hsl(45 100% 50% / 0.15)"
              />
            </svg>

            {/* Profile placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/10">
                  <span className="text-6xl sm:text-7xl font-serif text-amber-500/40">AE</span>
                </div>
                <div className="absolute -inset-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-2xl rounded-full -z-10" />
              </div>
            </div>

            {/* Floating tech badges around the profile photo */}
            <div className="hero-badge hero-badge-1 absolute -top-2 right-8 sm:right-12 z-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-4 py-2 text-xs font-semibold border border-white/20 shadow-lg shadow-black/20">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse-glow" />
                Next.js 14
              </span>
            </div>
            <div className="hero-badge hero-badge-2 absolute top-[28%] -left-2 sm:-left-6 z-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-4 py-2 text-xs font-semibold border border-white/20 shadow-lg shadow-black/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" />
                TypeScript
              </span>
            </div>
            <div className="hero-badge hero-badge-3 absolute bottom-[28%] -right-2 sm:-right-4 z-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-4 py-2 text-xs font-semibold border border-white/20 shadow-lg shadow-black/20">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse-glow" />
                Tailwind CSS
              </span>
            </div>
            <div className="hero-badge hero-badge-4 absolute bottom-10 left-6 sm:left-10 z-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-4 py-2 text-xs font-semibold border border-white/20 shadow-lg shadow-black/20">
                <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse-glow" />
                GSAP
              </span>
            </div>
          </div>

          {/* Soft fade edge blending into the background */}
          <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent z-10 pointer-events-none lg:left-0" />
        </div>
      </div>

      <div className="hero-scroll hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-foreground/50 z-20">
        <span className="text-[11px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-foreground/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-primary/70 animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}
