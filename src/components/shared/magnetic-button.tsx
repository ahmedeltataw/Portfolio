"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  href,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, scale: 1.03, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  };

  const content = (
    <div
      ref={btnRef}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );

  if (Tag === "a") {
    return (
      <a
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-block" }}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
      {...props}
    >
      {content}
    </button>
  );
}
