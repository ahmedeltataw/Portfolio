"use client";

import { siteConfig, experiences, skills } from "@/lib/constants";
import { TimelineItem } from "@/components/shared/timeline-item";
import { SkillBar } from "@/components/shared/skill-bar";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Parallax } from "@/components/shared/parallax";
import { useLanguage } from "@/contexts/language-context";

const SKILL_CATEGORIES = [
  { key: "frontend" as const, label: "Frontend" },
  { key: "design" as const, label: "Design" },
  { key: "backend" as const, label: "Backend" },
];

export function AboutClient() {
  const { t } = useLanguage();
  const initials = siteConfig.name.slice(0, 2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <div className="flex flex-col items-center text-center mb-16">
        <Parallax speed={0.2}>
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-2xl font-display text-primary-foreground mb-6">
            {initials}
          </div>
        </Parallax>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{siteConfig.title}</p>
        <p className="mt-6 max-w-lg text-muted-foreground leading-relaxed">
          {t.about.description}
        </p>
        <a
          href="/cv.pdf"
          download
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-6 text-sm font-medium transition-colors hover:bg-accent gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t.about.download_cv}
        </a>
      </div>

      <div className="mb-20">
        <h2 className="font-display text-2xl mb-8 text-center">{t.about.experiences_title}</h2>
        <div className="max-w-2xl mx-auto">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl mb-8 text-center">
          {t.about.skills_title} <AnimatedCounter from={0} to={12} suffix="+" className="text-primary" />
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.key}>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wider uppercase">
                {cat.label}
              </h3>
              <div className="flex flex-col gap-4">
                {skills
                  .filter((s) => s.category === cat.key)
                  .map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
