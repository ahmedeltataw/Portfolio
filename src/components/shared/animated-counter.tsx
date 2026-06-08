"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            el,
            { textContent: from },
            {
              textContent: to,
              duration,
              ease: "power2.out",
              snap: { textContent: 1 },
              onUpdate: () => {
                el.textContent = `${Math.round(Number(el.textContent))}${suffix}`;
              },
            }
          );
        },
      });
    });

    return () => ctx.revert();
  }, [from, to, suffix, duration]);

  return (
    <span ref={elRef} className={className}>
      {from}{suffix}
    </span>
  );
}
