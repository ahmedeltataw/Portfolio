"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useLanguage } from "@/contexts/language-context";

export default function NotFoundPage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${t.notFound.title} | احمد`;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".not-found-animate",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [t.notFound.title]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="not-found-animate text-8xl sm:text-9xl font-display tracking-tight text-muted-foreground/20 select-none">
        404
      </div>
      <h1 className="not-found-animate mt-4 font-display text-2xl sm:text-3xl tracking-tight">
        {t.notFound.title}
      </h1>
      <p className="not-found-animate mt-3 text-muted-foreground text-center max-w-sm">
        {t.notFound.description}
      </p>
      <Link
        href="/"
        className="not-found-animate mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        {t.notFound.back_home}
      </Link>
    </div>
  );
}
