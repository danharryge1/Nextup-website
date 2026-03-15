'use client'

import { useEffect, useRef } from 'react'

// Colour pools — pre-parsed as [r,g,b] for fast alpha manipulation
const COLOUR_POOLS = [
  // 40% electric blue
  ...Array(40).fill([37, 99, 235] as [number, number, number]),
  // 25% teal
  ...Array(25).fill([13, 148, 136] as [number, number, number]),
  // 20% coral
  ...Array(20).fill([244, 63, 94] as [number, number, number]),
  // 15% amber
  ...Array(15).fill([245, 158, 11] as [number, number, number]),
]

const BASE_ALPHAS = [0.30, 0.25, 0.20, 0.18]
// Which pool index each colour belongs to (for alpha lookup)
function alphaForColour(rgb: [number, number, number]): number {
  if (rgb[0] === 37)  return BASE_ALPHAS[0]
  if (rgb[0] === 13)  return BASE_ALPHAS[1]
  if (rgb[0] === 244) return BASE_ALPHAS[2]
  return BASE_ALPHAS[3]
}

interface Particle {
  x: number
  y: number
  speed: number
  rgb: [number, number, number]
  alpha: number
  radius: number
  trail: Array<{ x: number; y: number }>
}

function flowAngle(x: number, y: number, t: number): number {
  // Sine-wave flow approximation — smooth, fast, no import needed
  return (
    Math.sin(x * 0.005 + t * 0.2) *
    Math.cos(y * 0.008 + t * 0.1) *
    Math.PI * 2
  )
}

function makeParticle(w: number, h: number): Particle {
  const rgb = COLOUR_POOLS[Math.floor(Math.random() * COLOUR_POOLS.length)]
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    speed: 0.5 + Math.random() * 2,
    rgb,
    alpha: alphaForColour(rgb),
    radius: 1.5 + Math.random() * 1.5,
    trail: [],
  }
}

export default function ParticleFlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 100 : 250

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    const particles: Particle[] = Array.from({ length: COUNT }, () => makeParticle(w, h))

    // --- Reduced motion: static scatter ---
    if (prefersReduced) {
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]},${p.alpha})`
        ctx.fill()
      }
      return
    }

    let t = 0
    let speedMult = 1
    let lastScrollY = window.scrollY
    let lastScrollMs = Date.now()
    let rafId = 0
    let lastFrameMs = 0
    const FRAME_MS = 1000 / 30  // 30 fps cap

    const onScroll = () => {
      const now = Date.now()
      const dt = now - lastScrollMs
      if (dt > 0) {
        const vel = Math.abs(window.scrollY - lastScrollY) / dt
        speedMult = 1 + Math.min(vel * 12, 0.5)
        setTimeout(() => { speedMult = 1 }, 400)
      }
      lastScrollY = window.scrollY
      lastScrollMs = now
    }

    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    function draw(ts: number) {
      rafId = requestAnimationFrame(draw)
      if (document.hidden) return
      if (ts - lastFrameMs < FRAME_MS) return
      lastFrameMs = ts

      ctx!.clearRect(0, 0, w, h)
      t += 0.016  // ~1 per second at 60fps; at 30fps increments of ~0.033

      for (const p of particles) {
        const angle = flowAngle(p.x, p.y, t)
        const spd = p.speed * speedMult

        // Store position before moving
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 4) p.trail.shift()

        // Move: follow flow angle + rightward bias
        p.x += Math.cos(angle) * spd + 0.3
        p.y += Math.sin(angle) * spd

        // Wrap edges
        if (p.x > w + 4)  { p.x = 0;   p.trail = [] }
        if (p.x < -4)     { p.x = w;   p.trail = [] }
        if (p.y > h + 4)  { p.y = 0;   p.trail = [] }
        if (p.y < -4)     { p.y = h;   p.trail = [] }

        // Draw trail (oldest = most transparent)
        const [r, g, b] = p.rgb
        for (let i = 0; i < p.trail.length; i++) {
          const trailAlpha = p.alpha * ((i + 1) / (p.trail.length + 1)) * 0.6
          ctx!.beginPath()
          ctx!.arc(p.trail[i].x, p.trail[i].y, p.radius * 0.65, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${r},${g},${b},${trailAlpha})`
          ctx!.fill()
        }

        // Draw head
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${r},${g},${b},${p.alpha})`
        ctx!.fill()
      }
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{
        zIndex: 0,
        // Tall enough to cover hero + what we do + credibility strip (~200vh)
        height: '200vh',
        maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 85%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 85%)',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100vh', position: 'sticky', top: 0 }}
      />
    </div>
  )
}
