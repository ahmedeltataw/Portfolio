"use client"

import { useEffect, useState } from "react"

export function Canvas3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blob 1 — large warm gold behind the profile photo (right) */}
      <div className="absolute -top-[10%] -right-[5%] w-[700px] h-[700px] rounded-full
        bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent
        animate-blob-slow blur-[80px]"
        style={{ willChange: 'transform, border-radius' }}
      />

      {/* Blob 2 — warm rose/amber in the middle-left */}
      <div className="absolute top-[40%] left-[10%] w-[300px] h-[300px] rounded-full
        bg-gradient-to-tr from-rose-500/8 via-amber-500/5 to-transparent
        animate-blob-slower blur-[60px]"
        style={{ willChange: 'transform, border-radius' }}
      />

      {/* Blob 3 — soft amber at the bottom-right */}
      <div className="absolute -bottom-[5%] right-[20%] w-[500px] h-[400px] rounded-full
        bg-gradient-to-tl from-amber-500/8 via-transparent to-transparent
        animate-blob-slowest blur-[100px]"
        style={{ willChange: 'transform, border-radius' }}
      />

      {/* Warm glow behind the profile photo */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2
        w-[500px] h-[500px] rounded-full
        bg-[radial-gradient(ellipse_at_center,_hsl(45_100%_50%/0.06)_0%,_transparent_70%)]"
      />

      {/* Grid pattern over blobs */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
