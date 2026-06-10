"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const overlay = imageRef.current?.querySelector(".project-image-overlay");
    if (!overlay) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  };

  const tiltX = mousePos.y * -12;
  const tiltY = mousePos.x * 12;

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div
        ref={cardRef}
        className="project-card relative overflow-hidden rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm transition-all duration-500"
        style={{
          transform: isHovering
            ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovering ? "none" : "transform 0.5s ease, box-shadow 0.5s ease",
          boxShadow: isHovering
            ? "0 20px 60px -10px hsl(var(--primary) / 0.15), 0 0 40px -20px hsl(var(--primary) / 0.1)"
            : "0 4px 20px rgba(0,0,0,0.05)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={imageRef} className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="project-image-overlay absolute inset-0 bg-card origin-right" />

          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-background/60 backdrop-blur-md text-foreground/80 border border-border/30"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-background/40 backdrop-blur-md text-muted-foreground">
                +{project.tags.length - 2}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 px-2.5 py-1 text-[10px] font-mono rounded-full bg-background/40 backdrop-blur-md text-muted-foreground border border-border/20">
            {project.year}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary/70 group-hover:text-primary transition-colors duration-300">
            <span>View Project</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.15)",
          }}
        />
      </div>
    </Link>
  );
}
