"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import type { Project } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  "ui-ux": "UI/UX",
  frontend: "Frontend",
  fullstack: "Full Stack",
  branding: "Branding",
};

const GRADIENT_BG: Record<string, string> = {
  "ui-ux": "from-violet-500/20 to-purple-500/20",
  frontend: "from-sky-500/20 to-cyan-500/20",
  fullstack: "from-emerald-500/20 to-teal-500/20",
  branding: "from-orange-500/20 to-rose-500/20",
};

const GRADIENT_COLORS: Record<string, [string, string]> = {
  "ui-ux": ["#8B5CF6", "#A78BFA"],
  frontend: ["#0EA5E9", "#38BDF8"],
  fullstack: ["#10B981", "#34D399"],
  branding: ["#F97316", "#FB923C"],
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const colors = GRADIENT_COLORS[project.category] || ["#6366f1", "#8b5cf6"];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (imgRef.current) {
      const imgX = (x - centerX) / centerX * 10;
      const imgY = (y - centerY) / centerY * 10;
      imgRef.current.style.transform = `scale(1.05) translate(${imgX}px, ${imgY}px)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1) translate(0, 0)";
    }
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
      style={{ willChange: "transform", transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
      aria-label={project.title}
      data-cursor="card"
    >
      <div
        className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${GRADIENT_BG[project.category] || "from-muted to-muted/50"} overflow-hidden`}
      >
        <div ref={imgRef} className="absolute inset-0 transition-transform duration-500 ease-out" style={{ willChange: "transform" }}>
          <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`grad-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors[0]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={colors[1]} stopOpacity="0.1" />
              </linearGradient>
              <radialGradient id={`glow-${project.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors[0]} stopOpacity="0.15" />
                <stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill={`url(#grad-${project.id})`} />
            <circle cx="200" cy="150" r="120" fill={`url(#glow-${project.id})`} />
            <circle cx="200" cy="150" r="60" fill="none" stroke={colors[0]} strokeOpacity="0.15" strokeWidth="1" />
            <circle cx="200" cy="150" r="90" fill="none" stroke={colors[1]} strokeOpacity="0.08" strokeWidth="0.5" />
            <text x="200" y="155" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="18" fontWeight="600" fontFamily="system-ui">
              {project.title}
            </text>
          </svg>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center rounded-full glass px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-display text-lg tracking-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{project.year}</p>
      </div>
    </Link>
  );
}
