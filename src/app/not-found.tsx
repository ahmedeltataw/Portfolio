"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "الصفحة مش موجودة | احمد";
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".not-found-animate",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="not-found-animate text-8xl sm:text-9xl font-display tracking-tight text-muted-foreground/20 select-none">
        404
      </div>
      <h1 className="not-found-animate mt-4 font-display text-2xl sm:text-3xl tracking-tight">
        الصفحة مش موجودة
      </h1>
      <p className="not-found-animate mt-3 text-muted-foreground text-center max-w-sm">
        الصفحة اللي بتدور عليها مش موجودة أو اتشالت. تأكد من الرابط أو ارجع للرئيسية.
      </p>
      <Link
        href="/"
        className="not-found-animate mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        رجوع للرئيسية
      </Link>
    </div>
  );
}
