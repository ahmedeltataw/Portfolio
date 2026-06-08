"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

/** Detect if text contains Arabic/Persian/Urdu characters */
function hasRtlChars(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
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
    const rawText = text.textContent || "";
    const isRtl = hasRtlChars(rawText);

    if (isRtl) {
      // Arabic/RTL: split by words instead of characters
      // to preserve letter connections and RTL flow
      const words = rawText.split(/(\s+)/);
      const wrapped = words
        .map((word) => {
          if (word.trim() === "") return word; // preserve whitespace
          return `<span class="inline-block char word-char">${word}</span>`;
        })
        .join("");

      text.innerHTML = wrapped;
      text.setAttribute("dir", "rtl");
    } else {
      // Latin/LTR: character-level split (original behavior)
      const chars = rawText.split("");
      const wrapped = chars
        .map((char) =>
          char === " "
            ? `<span class="inline-block char">&nbsp;</span>`
            : `<span class="inline-block char">${char}</span>`
        )
        .join("");

      text.innerHTML = wrapped;
      text.removeAttribute("dir");
    }

    // Apply GSAP animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        text.querySelectorAll(".char"),
        { opacity: 0, y: 20, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: isRtl ? 0.04 : 0.02, // slightly slower stagger for words
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
