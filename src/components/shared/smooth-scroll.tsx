"use client";

import type { ReactNode } from "react";
import { ReactLenis, useLenisScrollTrigger } from "@/lib/lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

function LenisSync() {
  useLenisScrollTrigger();
  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
