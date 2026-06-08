"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Experience } from "@/types";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        scrub: 1.5,
        onEnter: () => {
          gsap.fromTo(
            el,
            { opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" }
          );
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={itemRef} className="relative flex gap-6 pb-8 opacity-0">
      <div className="flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
        <div className="mt-2 h-full w-px bg-border" />
      </div>
      <div className="flex-1 pb-4">
        <span className="text-xs font-medium text-primary">{experience.year}</span>
        <h3 className="mt-1 font-display text-lg">{experience.role}</h3>
        <p className="text-sm font-medium text-muted-foreground">{experience.company}</p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {experience.description}
        </p>
      </div>
    </div>
  );
}
