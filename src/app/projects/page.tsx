"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/shared/text-reveal";
import { Parallax } from "@/components/shared/parallax";
import { useLanguage } from "@/contexts/language-context";

export default function ProjectsPage() {
  const { t } = useLanguage();

  const CATEGORIES = [
    { value: "all", label: t.projects.all },
    { value: "ui-ux", label: "UI/UX" },
    { value: "frontend", label: "Frontend" },
    { value: "fullstack", label: "Full Stack" },
    { value: "branding", label: "Branding" },
  ];
  const [activeCategory, setActiveCategory] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    document.title = `${t.projects.title} | احمد`;
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, [activeCategory, t.projects.title]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <div className="mb-12 text-center">
        <TextReveal
          className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight"
          as="h1"
        >
          {t.projects.title}
        </TextReveal>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          {t.projects.subtitle}
        </p>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "px-4 py-2 text-sm rounded-full border transition-colors",
              activeCategory === cat.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project, index) => (
          <div key={project.id} className="project-card">
            <Parallax speed={0.1}>
              <ProjectCard project={project} index={index} />
            </Parallax>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          {t.projects.no_projects}
        </div>
      )}
    </div>
  );
}
