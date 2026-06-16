"use client"

import { useEffect, useRef } from "react"

/**
 * Grain overlay – subtle film-grain noise layered over the entire page.
 * Uses a tiny SVG data‑URI so zero JS layout cost.
 */
export function GrainOverlay() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Quick amplitude check — slow or heavy?  Bail without noise.
    let bail = false
    try {
      // requestAnimationFrame may catch low-end GPUs
      const idle = performance.now()
      requestAnimationFrame(() => {
        if (performance.now() - idle > 50) bail = true
      })
    } catch { /* fall through */ }

    if (bail && ref.current) {
      ref.current.style.display = "none"
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        opacity: 0.025,
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
  )
}
