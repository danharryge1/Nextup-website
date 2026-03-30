'use client'

import { useEffect, useRef } from 'react'

interface Band {
  r: number; g: number; b: number
  opacity: number
  yBase: number
  bandW: number
  speed: number
  phase1: number
  phase2: number
}

const BANDS: Band[] = [
  { r: 37,  g: 99,  b: 235, opacity: 0.55, yBase: 0.15, bandW: 150, speed: 0.08, phase1: 0.0,  phase2: 1.1 },
  { r: 0,   g: 138, b: 160, opacity: 0.50, yBase: 0.25, bandW: 130, speed: 0.06, phase1: 2.1,  phase2: 0.4 },
  { r: 0,   g: 171, b: 177, opacity: 0.42, yBase: 0.40, bandW: 110, speed: 0.07, phase1: 1.4,  phase2: 2.3 },
  { r: 46,  g: 44,  b: 115, opacity: 0.52, yBase: 0.55, bandW: 140, speed: 0.05, phase1: 3.3,  phase2: 1.9 },
  { r: 13,  g: 148, b: 136, opacity: 0.40, yBase: 0.35, bandW: 120, speed: 0.09, phase1: 0.9,  phase2: 3.1 },
]

function drawBand(
  ctx: CanvasRenderingContext2D,
  band: Band,
  t: number,
  W: number,
  H: number,
  speedMult: number,
) {
  const baseY = band.yBase * H
  const sp    = band.speed * speedMult

  ctx.beginPath()
  for (let x = 0; x <= W; x += 3) {
    const topY = baseY
      + Math.sin(x * 0.003 + t * sp + band.phase1) * 40
      + Math.sin(x * 0.007 + t * sp * 0.5 + band.phase2) * 20
    if (x === 0) ctx.moveTo(x, topY)
    else         ctx.lineTo(x, topY)
  }
  for (let x = W; x >= 0; x -= 3) {
    const topY = baseY
      + Math.sin(x * 0.003 + t * sp + band.phase1) * 40
      + Math.sin(x * 0.007 + t * sp * 0.5 + band.phase2) * 20
    const botY = topY + band.bandW + Math.sin(x * 0.005 + t * sp * 0.3) * 15
    ctx.lineTo(x, botY)
  }
  ctx.closePath()

  const cy   = band.yBase * H
  const half = band.bandW / 2
  const grad = ctx.createLinearGradient(0, cy - half, 0, cy + half * 2)
  grad.addColorStop(0,    `rgba(${band.r},${band.g},${band.b},0)`)
  grad.addColorStop(0.25, `rgba(${band.r},${band.g},${band.b},${band.opacity})`)
  grad.addColorStop(0.5,  `rgba(${band.r},${band.g},${band.b},${band.opacity})`)
  grad.addColorStop(0.75, `rgba(${band.r},${band.g},${band.b},${band.opacity * 0.6})`)
  grad.addColorStop(1,    `rgba(${band.r},${band.g},${band.b},0)`)
  ctx.fillStyle = grad
  ctx.fill()
}

export default function AuroraAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      if (!canvas) return
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      ctx.fillStyle = '#0A0A0F'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      BANDS.forEach(band => {
        const cy   = band.yBase * canvas.height
        const half = band.bandW / 2
        const grad = ctx.createLinearGradient(0, cy - half, 0, cy + half)
        grad.addColorStop(0,   `rgba(${band.r},${band.g},${band.b},0)`)
        grad.addColorStop(0.5, `rgba(${band.r},${band.g},${band.b},${band.opacity})`)
        grad.addColorStop(1,   `rgba(${band.r},${band.g},${band.b},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, cy - half, canvas.width, band.bandW)
      })
      ctx.globalCompositeOperation = 'source-over'
      return () => window.removeEventListener('resize', resize)
    }

    let scrollY      = window.scrollY
    let velocity     = 0
    let lastScrollMs = performance.now()

    const onScroll = () => {
      const now = performance.now()
      const dt  = Math.max(1, now - lastScrollMs)
      velocity  = Math.abs(window.scrollY - scrollY) / dt
      scrollY   = window.scrollY
      lastScrollMs = now
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const renderCtx    = ctx
    const renderCanvas = canvas

    let rafId  = 0
    let lastMs = 0
    const FRAME_MS = 1000 / 30

    function update(ts: number) {
      rafId = requestAnimationFrame(update)
      if (ts - lastMs < FRAME_MS) return
      const dt = ts - lastMs
      lastMs = ts

      velocity *= Math.exp(-dt / 500)
      const speedMult = 1 + velocity * 0.005

      const t = ts / 1000
      const W = renderCanvas.width
      const H = renderCanvas.height

      renderCtx.globalCompositeOperation = 'source-over'
      renderCtx.fillStyle = '#0A0A0F'
      renderCtx.fillRect(0, 0, W, H)

      renderCtx.globalCompositeOperation = 'lighter'
      BANDS.forEach(band => drawBand(renderCtx, band, t, W, H, speedMult))

      renderCtx.globalCompositeOperation = 'source-over'
    }

    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2, filter: 'blur(38px)', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)', willChange: 'transform' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }} />
    </div>
  )
}
