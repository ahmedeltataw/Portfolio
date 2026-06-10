"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
  minimumDuration?: number;
}

export function Preloader({ onComplete, minimumDuration = 2500 }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const subtext = subtextRef.current;
    const bar = barRef.current;
    if (!container || !text || !subtext || !bar) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      },
    });

    tl.fromTo(
      text,
      { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.9 },
      { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      subtext,
      { opacity: 0, y: 10 },
      { opacity: 0.6, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
      "-=0.2"
    )
    .to({}, { duration: 0.6 })
    .to(container, {
      opacity: 0,
      scale: 1.02,
      filter: "blur(4px)",
      duration: 0.8,
      ease: "power3.inOut",
    }, `+=${Math.max(0, minimumDuration - 2000)}`);

    return () => {
      tl.kill();
    };
  }, [minimumDuration, onComplete]);

  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity ${
        isComplete ? "pointer-events-none" : ""
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 50%, hsl(var(--background)) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-purple-500/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tr from-accent/5 to-primary/5 blur-2xl animate-float-slower" />
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="preloader-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#preloader-grid)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl shadow-primary/20">
              <span className="text-3xl font-bold text-white">AE</span>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl rounded-full -z-10" />
          </div>
        </div>

        <h1
          ref={textRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground opacity-0"
        >
          Ahmed Eltatawy
        </h1>

        <p
          ref={subtextRef}
          className="mt-3 text-sm sm:text-base text-muted-foreground/60 tracking-[0.15em] uppercase font-light opacity-0"
        >
          UI/UX Designer &amp; Frontend Developer
        </p>

        <div className="mt-10 w-48 h-[2px] bg-border/30 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full bg-gradient-to-r from-primary to-purple-500 rounded-full origin-left scale-x-0"
          />
        </div>
      </div>
    </div>
  );
}
