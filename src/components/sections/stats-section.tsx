"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useLanguage } from "@/contexts/language-context";

const stats = [
  {
    value: 6, suffix: "+", labelKey: "stats_projects" as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    value: 4, suffix: "+", labelKey: "stats_experience" as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    value: 14, suffix: "+", labelKey: "stats_tools" as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    value: 100, suffix: "%", labelKey: "stats_satisfaction" as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    gradient: "from-rose-500/20 to-pink-500/20",
  },
];

export function StatsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".stat-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/3 to-purple-500/3 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/3 to-primary/3 blur-3xl" />
      </div>

      <div ref={cardsRef} className="relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="stat-card relative group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/40 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60 group-hover:bg-primary/10 group-hover:text-primary/80 transition-all duration-300">
                    {stat.icon}
                  </div>

                  <span className="font-display text-4xl sm:text-5xl tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} duration={2} />
                  </span>

                  <span className="text-sm text-muted-foreground/70 font-medium tracking-wide">
                    {t.home?.[stat.labelKey] || stat.labelKey}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
