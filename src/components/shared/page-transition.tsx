"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = wrapperRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 12, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, [pathname, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
