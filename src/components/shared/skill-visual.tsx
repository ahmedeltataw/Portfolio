"use client";

import { useEffect, useRef, useState } from "react";

interface SkillVisualProps {
  name: string;
  level: number;
  delay: number;
}

export function SkillVisual({ name, level, delay }: SkillVisualProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={containerRef} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground/80">{name}</span>
        <span className="text-xs text-muted-foreground/60 font-mono">{level}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-border/30 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
            boxShadow: isVisible ? "0 0 8px hsl(var(--primary) / 0.3)" : "none",
          }}
        />
      </div>
    </div>
  );
}
