"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

type CursorVariant = "default" | "link" | "cta" | "card" | "text";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const ringSize = 40;
  const dotSize = 8;

  useEffect(() => {
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsTouchDevice(!mqHover.matches);
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mqMotion.matches);

    const handleHoverChange = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mqHover.addEventListener("change", handleHoverChange);
    mqMotion.addEventListener("change", handleMotionChange);
    return () => {
      mqHover.removeEventListener("change", handleHoverChange);
      mqMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const handleMouseEnter = useCallback(() => setVisible(true), []);
  const handleMouseLeave = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (isTouchDevice || reducedMotion) return;

    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${clientX - dotSize / 2}px, ${clientY - dotSize / 2}px)`;
      }
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: clientX - ringSize / 2,
          y: clientY - ringSize / 2,
          duration: variant === "default" ? 0.6 : 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleCursorOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='link']") || target.closest("a") || target.closest("button")) {
        setVariant("link");
      } else if (target.closest("[data-cursor='cta']")) {
        setVariant("cta");
      } else if (target.closest("[data-cursor='card']")) {
        setVariant("card");
      } else if (target.closest("[data-cursor='text']")) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mouseover", handleCursorOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleCursorOver);
      document.body.style.cursor = "";
    };
  }, [isTouchDevice, reducedMotion, variant, handleMouseEnter, handleMouseLeave]);

  if (isTouchDevice || reducedMotion) return null;

  const ringVariants: Record<CursorVariant, React.CSSProperties> = {
    default: { width: ringSize, height: ringSize, borderWidth: 1 },
    link: { width: 60, height: 60, borderWidth: 2, borderColor: "hsl(var(--primary))" },
    cta: { width: 60, height: 60, borderWidth: 0, background: "hsl(var(--primary) / 0.15)" },
    card: { width: 0, height: 0, opacity: 0 },
    text: { width: 24, height: 24, borderWidth: 1 },
  };

  const dotVariants: Record<CursorVariant, React.CSSProperties> = {
    default: { width: dotSize, height: dotSize },
    link: { width: dotSize, height: dotSize },
    cta: { width: 4, height: 4 },
    card: { width: 30, height: 30, background: "hsl(var(--primary) / 0.1)" },
    text: { width: dotSize, height: dotSize },
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" style={{ display: visible ? "block" : "none" }}>
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border border-foreground/30"
        style={{
          width: ringSize,
          height: ringSize,
          willChange: "transform",
          transition: "width 0.3s, height 0.3s, border-width 0.3s, background 0.3s, opacity 0.3s",
          ...ringVariants[variant],
        }}
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full bg-primary"
        style={{
          width: dotSize,
          height: dotSize,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s, background 0.2s",
          ...dotVariants[variant],
        }}
      />
    </div>
  );
}
