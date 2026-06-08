"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = el;
    const chars = text.textContent || "";
    const wrapped = chars
      .split("")
      .map((char) => `<span class="inline-block char">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    text.innerHTML = wrapped;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text.querySelectorAll(".char"),
        { opacity: 0, y: 20, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.02,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      <Tag style={{ display: "inline" }}>{children}</Tag>
    </div>
  );
}
