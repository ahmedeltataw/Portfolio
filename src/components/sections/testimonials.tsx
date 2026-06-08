"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/language-context";

export function Testimonials() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="relative min-h-[70vh] flex items-center justify-center px-4 py-24 opacity-0 translate-y-8"
    >
      <div className="max-w-3xl w-full text-center">
        <svg
          className="mx-auto mb-8 h-12 w-12 text-primary/30"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
        <blockquote className="font-display text-xl sm:text-2xl md:text-3xl leading-relaxed text-muted-foreground">
          {t.home?.testimonial_quote || "Building exceptional digital experiences that combine beautiful design with clean, efficient code."}
        </blockquote>
        <div className="mt-8">
          <p className="font-medium">{t.home?.testimonial_author || "Client & Collaborators"}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t.home?.testimonial_role || "Design & Development"}
          </p>
        </div>
      </div>
    </section>
  );
}
