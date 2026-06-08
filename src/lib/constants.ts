import type { Experience, Skill } from "@/types";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "احمد",
  title: "UI/UX Designer & Frontend Developer",
  description: "Portfolio شخصي يعرض مشاريعي في UI/UX Design و Frontend Development",
  url: "https://portfolio-2026.vercel.app",
  ogImage: "https://portfolio-2026.vercel.app/og.jpg",
  links: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    behance: "https://behance.net/username",
  },
  email: "hello@example.com",
  location: "مصر",
  availability: "مفتوح للفرص",
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    year: "2025 – Present",
    company: "Freelance",
    role: "UI/UX Designer & Frontend Developer",
    description: "تصميم وتطوير واجهات مستخدم لمواقع وتطبيقات ويب باستخدام Next.js و Tailwind CSS و GSAP.",
  },
  {
    id: "exp-2",
    year: "2024 – 2025",
    company: "Tech Company",
    role: "Frontend Developer",
    description: "تطوير منصة إدارة محتوى متكاملة مع فريق من المطورين باستخدام React و TypeScript.",
  },
  {
    id: "exp-3",
    year: "2023 – 2024",
    company: "Design Agency",
    role: "UI/UX Designer",
    description: "تصميم تجارب مستخدم وتطوير prototypes تفاعلية باستخدام Figma و Framer.",
  },
  {
    id: "exp-4",
    year: "2022 – 2023",
    company: "Startup Name",
    role: "Junior Frontend Developer",
    description: "بناء واجهات مستخدم responsive وتكامل مع APIs باستخدام React و Tailwind CSS.",
  },
];

export const skills: Skill[] = [
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "GSAP", level: 80, category: "frontend" },
  { name: "Figma", level: 90, category: "design" },
  { name: "UI/UX Design", level: 85, category: "design" },
  { name: "Design Systems", level: 80, category: "design" },
  { name: "Prototyping", level: 85, category: "design" },
  { name: "Node.js", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "REST APIs", level: 75, category: "backend" },
];
