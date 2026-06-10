import type { Experience, Skill } from "@/types";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Ahmed Eltatawy",
  nameAr: "احمد التطاوي",
  title: "UI/UX Designer & Frontend Developer",
  description: "A passionate UI/UX designer and frontend developer crafting exceptional digital experiences that combine beautiful design with clean, efficient code.",
  descriptionAr: "مصمم واجهات مستخدم ومطور واجهات أمامية شغوف بتصميم تجارب رقمية مميزة تجمع بين التصميم الجميل والكود النظيف المتقن",
  url: "https://portfolio-sigma-beige-82.vercel.app",
  ogImage: "/og.jpg",
  links: {
    github: "https://github.com/ahmedeltataw",
    linkedin: "https://www.linkedin.com/in/ahmed-eltatawy/",
    behance: "#",
  },
  email: "eltatawea@gmail.com",
  location: "Egypt",
  locationAr: "مصر",
  availability: "Open for opportunities",
  availabilityAr: "متاح للفرص",
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    year: "2025 – Present",
    company: "Freelance",
    role: "UI/UX Designer & Frontend Developer",
    description: "Designing and developing user interfaces for web applications using Next.js, Tailwind CSS, and GSAP. Delivering end-to-end digital experiences for diverse clients.",
    descriptionAr: "تصميم وتطوير واجهات مستخدم لتطبيقات الويب باستخدام Next.js و Tailwind CSS و GSAP. تقديم تجارب رقمية متكاملة لعملاء متنوعين.",
  },
  {
    id: "exp-2",
    year: "2024 – 2025",
    company: "TechVault Solutions",
    role: "Frontend Developer",
    description: "Developed a comprehensive content management platform with a team of developers using React and TypeScript. Implemented responsive designs and optimized performance.",
    descriptionAr: "تطوير منصة إدارة محتوى متكاملة مع فريق من المطورين باستخدام React و TypeScript. تطبيق تصاميم responsive وتحسين الأداء.",
  },
  {
    id: "exp-3",
    year: "2023 – 2024",
    company: "PixelCraft Studio",
    role: "UI/UX Designer",
    description: "Designed user experiences and developed interactive prototypes using Figma and Framer. Conducted user research and usability testing.",
    descriptionAr: "تصميم تجارب مستخدم وتطوير نماذج تفاعلية باستخدام Figma و Framer. إجراء أبحاث المستخدم واختبارات قابلية الاستخدام.",
  },
  {
    id: "exp-4",
    year: "2022 – 2023",
    company: "CodeBridge Agency",
    role: "Junior Frontend Developer",
    description: "Built responsive user interfaces and integrated REST APIs using React and Tailwind CSS. Collaborated with design team on component library.",
    descriptionAr: "بناء واجهات مستخدم responsive وتكامل مع REST APIs باستخدام React و Tailwind CSS. التعاون مع فريق التصميم في بناء مكتبة مكونات.",
  },
];

export const skills: Skill[] = [
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "GSAP", level: 80, category: "frontend" },
  { name: "Three.js", level: 70, category: "frontend" },
  { name: "Framer Motion", level: 75, category: "frontend" },
  { name: "Figma", level: 90, category: "design" },
  { name: "UI/UX Design", level: 85, category: "design" },
  { name: "Design Systems", level: 80, category: "design" },
  { name: "Prototyping", level: 85, category: "design" },
  { name: "Node.js", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "REST APIs", level: 75, category: "backend" },
];
