"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/language-context";
import { skills } from "@/lib/constants";

const topSkills = skills.filter((s) => s.level >= 80).slice(0, 6);

export function SkillsSnapshot() {
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
      className="relative min-h-[80vh] flex items-center justify-center px-4 py-24 opacity-0 translate-y-8"
    >
      <div className="max-w-4xl w-full">
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-12 text-center">
          {t.home?.skills_title || "Skills & Expertise"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {topSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
