"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({
  children,
  speed = 0.3,
  className = "",
}: ParallaxProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const y = self.progress * speed * 100;
          gsap.set(el, { y: -y });
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={elRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
