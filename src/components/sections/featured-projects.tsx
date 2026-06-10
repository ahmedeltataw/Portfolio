"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/language-context";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/project-card";

export function FeaturedProjects() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titles = titleRef.current?.querySelectorAll(".animate-title");
      if (titles) {
        gsap.fromTo(
          titles,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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

      const viewAll = sectionRef.current?.querySelector(".animate-view-all");
      if (viewAll) {
        gsap.fromTo(
          viewAll,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 30%",
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
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div ref={titleRef} className="mb-16 text-center">
          <div className="animate-title opacity-0">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-primary/60 mb-4 font-medium">
              {t.home?.featured_subtitle || "Selected Work"}
            </span>
          </div>
          <h2 className="animate-title opacity-0 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
            {t.home?.featured_title || "Featured Projects"}
          </h2>
          <div className="animate-title opacity-0 mt-2">
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto" />
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-14 text-center opacity-0 animate-view-all">
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center justify-center rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm px-8 text-sm font-medium transition-all duration-300 hover:border-primary/30 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/5 gap-2.5"
          >
            <span>{t.home?.view_all || "View All Projects"}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
