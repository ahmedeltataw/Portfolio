"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useLanguage } from "@/contexts/language-context";

const stats = [
  { value: 5, suffix: "+", labelKey: "stats_projects" as const },
  { value: 4, suffix: "+", labelKey: "stats_experience" as const },
  { value: 12, suffix: "+", labelKey: "stats_tools" as const },
  { value: 100, suffix: "%", labelKey: "stats_satisfaction" as const },
];

export function StatsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        onEnter: () => {
          gsap.to(sectionRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center px-4 opacity-0 translate-y-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
        {stats.map((stat) => (
          <div key={stat.labelKey} className="flex flex-col items-center text-center gap-2">
            <span className="font-display text-4xl sm:text-5xl text-gradient-primary">
              <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} duration={2} />
            </span>
            <span className="text-sm text-muted-foreground">
              {t.home?.[stat.labelKey] || stat.labelKey}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
