"use client"

import { useEffect, useState } from "react"

export function Canvas3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blob 1 — large, primary color */}
      <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full
        bg-gradient-to-br from-primary/20 via-primary/5 to-transparent
        animate-blob-slow blur-3xl"
      />

      {/* Blob 2 — middle, purple */}
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full
        bg-gradient-to-tr from-purple-500/15 via-fuchsia-500/5 to-transparent
        animate-blob-slower blur-3xl"
      />

      {/* Blob 3 — bottom, blue */}
      <div className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full
        bg-gradient-to-tl from-sky-500/10 via-primary/5 to-transparent
        animate-blob-slowest blur-3xl"
      />

      {/* Grid pattern over blobs */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[600px] h-[600px] rounded-full
        bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.06)_0%,_transparent_70%)]"
      />
    </div>
  )
}
