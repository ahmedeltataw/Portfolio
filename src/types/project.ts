export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  category: "ui-ux" | "frontend" | "fullstack" | "branding";
  year: number;
  liveUrl?: string;
  githubUrl?: string;
  role: string;
  timeline: string;
  tools: string[];
  highlights: string[];
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
    behance?: string;
    dribbble?: string;
  };
  email: string;
  location: string;
  availability: string;
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  role: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "design" | "backend";
}
