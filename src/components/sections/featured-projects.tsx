"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/language-context";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/project-card";

export function FeaturedProjects() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 3);

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
      className="relative min-h-screen flex items-center justify-center px-4 py-24 opacity-0 translate-y-8"
    >
      <div className="max-w-5xl w-full">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4">
            {t.home?.featured_title || "Featured Projects"}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t.home?.featured_subtitle || "A selection of my recent work"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <div
              key={project.id}
              className="opacity-0 translate-y-4"
              style={{ animation: `fadeInUp 0.6s ${index * 0.15}s forwards` }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            {t.home?.view_all || "View All Projects"}
          </Link>
        </div>
      </div>
    </section>
  );
}
