"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { skills } from "@/lib/constants";
import { useLanguage } from "@/contexts/language-context";
import { SkillVisual } from "@/components/shared/skill-visual";

const skillCategories = [
  {
    title: "Frontend",
    titleAr: "الواجهات الأمامية",
    icon: "⚛️",
    skills: skills.filter((s) => s.category === "frontend"),
  },
  {
    title: "Design",
    titleAr: "التصميم",
    icon: "🎨",
    skills: skills.filter((s) => s.category === "design"),
  },
  {
    title: "Backend",
    titleAr: "الخلفية",
    icon: "⚙️",
    skills: skills.filter((s) => s.category === "backend"),
  },
];

export function SkillsSnapshot() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const cards = gridRef.current?.querySelectorAll(".skill-category");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, rotateX: 5 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              end: "top 45%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4">
            {t.home?.skills_title || "Skills & Expertise"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto" />
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category relative opacity-0"
              style={{ perspective: "1000px" }}
            >
              <div className="rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-display text-lg tracking-tight">
                    {locale === "ar" ? category.titleAr : category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillVisual
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
