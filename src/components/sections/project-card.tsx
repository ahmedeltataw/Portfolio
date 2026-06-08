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

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
      aria-label={project.title}
    >
      <div
        className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${GRADIENT_BG[project.category] || "from-muted to-muted/50"}`}
      >
        <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">
          {project.category === "ui-ux" && "🎨"}
          {project.category === "frontend" && "⚡"}
          {project.category === "fullstack" && "🛠️"}
          {project.category === "branding" && "✨"}
        </span>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
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
