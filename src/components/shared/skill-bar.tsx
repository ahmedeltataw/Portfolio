"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Skill } from "@/types";

interface SkillBarProps {
  skill: Skill;
}

export function SkillBar({ skill }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el.parentElement,
        start: "top 85%",
        scrub: 1,
        onEnter: () => {
          gsap.to(el, {
            width: `${skill.level}%`,
            duration: 1.5,
            ease: "power4.out",
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [skill.level]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-primary"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
