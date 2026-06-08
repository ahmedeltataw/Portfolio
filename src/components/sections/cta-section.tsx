"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/language-context";
import { MagneticButton } from "@/components/shared/magnetic-button";

export function CTASection() {
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
      className="relative min-h-screen flex items-center justify-center px-4 py-24 opacity-0 translate-y-8"
    >
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6 text-gradient">
          {t.home?.cta_title || "Let's Work Together"}
        </h2>
        <p className="text-body-lg text-muted-foreground mb-10 max-w-lg mx-auto">
          {t.home?.cta_description || "Have a project or idea? I'd love to hear about it."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton as="a" href="/contact">
            <span className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-10 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              {t.hero.cta_contact}
            </span>
          </MagneticButton>
          <MagneticButton as="a" href={`mailto:${"eltatawea@gmail.com"}`}>
            <span className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-10 text-sm font-medium transition-colors hover:bg-accent">
              {t.home?.cta_email || "Send Email"}
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
