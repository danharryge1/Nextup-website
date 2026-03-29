'use client'

import { useEffect, useRef } from 'react'

/**
 * Fixed overlay that transitions a subtle accent-colour radial glow
 * as the user scrolls through sections: blue → teal → coral → amber.
 * Each tint fades in, peaks, then fades out - overlapping smoothly.
 */

const TINTS = [
  { r: 37,  g: 99,  b: 235, maxOp: 0.055, from: 0,    peak: 0.12, to: 0.35 }, // blue
  { r: 13,  g: 148, b: 136, maxOp: 0.045, from: 0.22, peak: 0.42, to: 0.62 }, // teal
  { r: 244, g: 63,  b: 94,  maxOp: 0.035, from: 0.50, peak: 0.65, to: 0.82 }, // coral
  { r: 245, g: 158, b: 11,  maxOp: 0.035, from: 0.72, peak: 0.87, to: 1.00 }, // amber
]

function tintOpacity(prog: number, from: number, peak: number, to: number): number {
  if (prog <= from || prog >= to) return 0
  if (prog <= peak) return (prog - from) / (peak - from)
  return 1 - (prog - peak) / (to - peak)
}

export default function ScrollTint() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onScroll() {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight
      const prog = scrollH > 0 ? Math.min(1, window.scrollY / scrollH) : 0

      TINTS.forEach((tint, i) => {
        const el = refs.current[i]
        if (!el) return
        const alpha = tintOpacity(prog, tint.from, tint.peak, tint.to) * tint.maxOp
        el.style.opacity = alpha > 0.001 ? '1' : '0'
        if (alpha > 0.001) {
          el.style.background = `radial-gradient(ellipse 90% 70% at 50% 50%, rgba(${tint.r},${tint.g},${tint.b},${alpha.toFixed(3)}), transparent)`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {TINTS.map((_, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el }}
          className="absolute inset-0"
          style={{ opacity: 0, transition: 'opacity 0.9s ease, background 0.9s ease' }}
        />
      ))}
    </div>
  )
}
