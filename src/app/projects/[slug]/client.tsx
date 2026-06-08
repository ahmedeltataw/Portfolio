"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import type { Project } from "@/types";
import { projects } from "@/data/projects";
import { useLanguage } from "@/contexts/language-context";
import { ImageGallery } from "@/components/shared/image-gallery";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-animate",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [project.id]);

  return (
    <div ref={containerRef} className="mx-auto max-w-4xl px-4 py-24">
      <Link
        href="/projects"
        className="detail-animate mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {t.projects.back}
      </Link>

      <div className="detail-animate mb-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {project.year}
        </span>
      </div>

      <h1 className="detail-animate font-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
        {project.title}
      </h1>

      <p className="detail-animate mt-4 text-lg text-muted-foreground leading-relaxed">
        {project.longDescription}
      </p>

      <div className="detail-animate mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{t.projects.role}:</span> {project.role}
        <span className="mx-2">|</span>
        <span className="font-medium text-foreground">{t.projects.timeline}:</span> {project.timeline}
      </div>

      <div className="detail-animate mt-12">
        <ImageGallery images={project.images} projectTitle={project.title} />
      </div>

      <div className="detail-animate mt-12">
        <h2 className="font-display text-xl mb-4">{t.projects.tools}</h2>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center rounded-md border border-border bg-card px-3 py-1.5 text-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="detail-animate mt-12">
        <h2 className="font-display text-xl mb-4">{t.projects.highlights}</h2>
        <ul className="flex flex-col gap-3">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-animate mt-12 flex flex-wrap gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Live Site
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-6 text-sm font-medium transition-colors hover:bg-accent"
          >
            GitHub
          </a>
        )}
      </div>

      <div className="detail-animate mt-20 flex items-center justify-between border-t border-border pt-8">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col gap-1"
          >
            <span className="text-xs text-muted-foreground">{t.projects.prev}</span>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1"
          >
            <span className="text-xs text-muted-foreground">{t.projects.next}</span>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
