'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { PROJECTS, CAROUSEL_LABEL, type AccentColour } from '@/lib/constants'

const TOTAL = PROJECTS.length

const SECTION_BG: Record<AccentColour, string> = {
  blue:  '#0a1a38',
  teal:  '#082220',
  coral: '#200a14',
  amber: '#201a0a',
}

const CARD_BG: Record<AccentColour, string> = {
  blue:  'linear-gradient(160deg, #0a1a38 0%, #0D1117 40%, #1a2744 100%)',
  teal:  'linear-gradient(160deg, #0a2928 0%, #0D1117 40%, #0a2e2c 100%)',
  coral: 'linear-gradient(160deg, #2a1520 0%, #0D1117 40%, #2e1018 100%)',
  amber: 'linear-gradient(160deg, #2a2010 0%, #0D1117 40%, #2e2208 100%)',
}

const ACCENT_HEX: Record<AccentColour, string> = {
  blue:  '#2563EB',
  teal:  '#0D9488',
  coral: '#F43F5E',
  amber: '#F59E0B',
}

const ACCENT_RGB: Record<AccentColour, string> = {
  blue:  '37,99,235',
  teal:  '13,148,136',
  coral: '244,63,94',
  amber: '245,158,11',
}

function wrap(i: number) { return ((i % TOTAL) + TOTAL) % TOTAL }

function displayDiff(index: number, active: number): number {
  let d = index - active
  if (d > TOTAL / 2)  d -= TOTAL
  if (d < -TOTAL / 2) d += TOTAL
  return d
}

function cardPositionTransform(diff: number): string {
  const abs = Math.abs(diff)
  const tx  = diff * 240
  const tz  = -abs * 120
  const ry  = diff * -28
  const sc  = Math.max(0.55, 1 - abs * 0.14)
  return `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`
}

function cardOpacity(diff: number): number {
  return Math.max(0, 1 - Math.abs(diff) * 0.3)
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function ProjectCarousel() {
  const [active, setActive]             = useState(0)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile]         = useState(false)

  const autoRef      = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHoveredRef = useRef(false)
  const touchStartX  = useRef(0)
  const tiltRefs     = useRef<(HTMLDivElement | null)[]>([])
  const glowRefs     = useRef<(HTMLDivElement | null)[]>([])

  // Per-card lerp state
  const targetRot  = useRef(PROJECTS.map(() => ({ x: 0, y: 0 })))
  const currentRot = useRef(PROJECTS.map(() => ({ x: 0, y: 0 })))
  const glowPos    = useRef(PROJECTS.map(() => ({ x: 50, y: 50 })))
  const frameIds   = useRef<(number | undefined)[]>(PROJECTS.map(() => undefined))

  useEffect(() => { setIsMobile(window.innerWidth < 640) }, [])

  // Stable animate function via ref so recursive RAF always calls latest version
  const animateFnRef = useRef<(i: number) => void>()
  animateFnRef.current = (i: number) => {
    const el     = tiltRefs.current[i]
    const glowEl = glowRefs.current[i]
    if (!el || !glowEl) return

    const cur  = currentRot.current[i]
    const tgt  = targetRot.current[i]
    const glow = glowPos.current[i]

    cur.x = lerp(cur.x, tgt.x, 0.12)
    cur.y = lerp(cur.y, tgt.y, 0.12)

    el.style.transform = `perspective(800px) rotateX(${cur.x}deg) rotateY(${cur.y}deg) scale(1.02)`
    glowEl.style.background = `radial-gradient(circle 180px at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12), transparent)`

    if (Math.abs(cur.x - tgt.x) > 0.01 || Math.abs(cur.y - tgt.y) > 0.01) {
      frameIds.current[i] = requestAnimationFrame(() => animateFnRef.current!(i))
    } else {
      frameIds.current[i] = undefined
    }
  }

  const CARD_W = isMobile ? 180 : 240
  const CARD_H = isMobile ? 280 : 360

  const go = useCallback((dir: 1 | -1) => {
    setActive(prev => wrap(prev + dir))
    setFlippedIndex(null)
  }, [])

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    if (isHoveredRef.current) return
    autoRef.current = setInterval(() => go(1), 1875)
  }, [go])

  const pauseAuto = useCallback(() => {
    isHoveredRef.current = true
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = null
  }, [])

  const resumeAuto = useCallback(() => {
    isHoveredRef.current = false
    startAuto()
  }, [startAuto])

  useEffect(() => {
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [startAuto])

  const handlePrev = () => { go(-1); startAuto() }
  const handleNext = () => { go(1);  startAuto() }

  const handleCardClick = (i: number, diff: number) => {
    if (diff !== 0) {
      setActive(i)
      setFlippedIndex(null)
    } else {
      setFlippedIndex(prev => prev === i ? null : i)
    }
    pauseAuto()
  }

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { go(diff > 0 ? 1 : -1); startAuto() }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number, diff: number) => {
    if (Math.abs(diff) > 3) return
    const el = tiltRefs.current[i]
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    targetRot.current[i] = {
      x: ((y - rect.height / 2) / (rect.height / 2)) * -10,
      y: ((x - rect.width  / 2) / (rect.width  / 2)) *  10,
    }
    glowPos.current[i] = {
      x: (x / rect.width)  * 100,
      y: (y / rect.height) * 100,
    }

    const glowEl = glowRefs.current[i]
    if (glowEl) glowEl.style.opacity = '1'

    if (!frameIds.current[i]) {
      frameIds.current[i] = requestAnimationFrame(() => animateFnRef.current!(i))
    }
  }

  const handleMouseLeave = (i: number) => {
    const fid = frameIds.current[i]
    if (fid) cancelAnimationFrame(fid)
    frameIds.current[i] = undefined

    targetRot.current[i]  = { x: 0, y: 0 }
    currentRot.current[i] = { x: 0, y: 0 }

    const el     = tiltRefs.current[i]
    const glowEl = glowRefs.current[i]
    if (el) {
      el.style.transition = 'transform 0.4s ease'
      el.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
    }
    if (glowEl) {
      glowEl.style.transition = 'opacity 0.3s ease'
      glowEl.style.opacity    = '0'
    }
    setTimeout(() => {
      if (el)     el.style.transition     = ''
      if (glowEl) glowEl.style.transition = ''
    }, 400)
  }

  const activeAccent = PROJECTS[active].colour

  return (
    <section
      className="section-padding relative z-10 overflow-hidden"
      style={{ background: SECTION_BG[activeAccent], transition: 'background 0.8s ease' }}
      aria-label="Our work"
      onMouseLeave={resumeAuto}
    >
      <Container>
        <div className="text-center mb-10">
          <SectionLabel colour="teal" center>{CAROUSEL_LABEL}</SectionLabel>
        </div>

        <div
          className="carousel-perspective relative mx-auto"
          style={{ height: CARD_H + 40, maxWidth: 900 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {PROJECTS.map((project, i) => {
            const diff      = displayDiff(i, active)
            const visible   = Math.abs(diff) <= 3
            const accent    = project.colour
            const rgb       = ACCENT_RGB[accent]
            const hex       = ACCENT_HEX[accent]
            const isFlipped = flippedIndex === i

            return (
              <div
                key={project.name}
                className="absolute top-0"
                style={{
                  left:        '50%',
                  marginLeft:  -(CARD_W / 2),
                  width:       CARD_W,
                  height:      CARD_H,
                  transform:   cardPositionTransform(diff),
                  opacity:     cardOpacity(diff),
                  zIndex:      10 - Math.abs(diff),
                  transition:  'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s ease',
                  cursor:      Math.abs(diff) <= 3 ? 'pointer' : 'default',
                  visibility:  visible ? 'visible' : 'hidden',
                  perspective: '1000px',
                }}
                onClick={() => handleCardClick(i, diff)}
                aria-label={project.name}
              >
                {/* Flip wrapper */}
                <div
                  style={{
                    width:                '100%',
                    height:               '100%',
                    transformStyle:       'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transform:            isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition:           'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                  } as React.CSSProperties}
                >
                  {/* Front face — tilt target */}
                  <div
                    ref={el => { tiltRefs.current[i] = el }}
                    style={{
                      position:                 'absolute',
                      inset:                    0,
                      backfaceVisibility:       'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      willChange:               'transform',
                    } as React.CSSProperties}
                    onMouseMove={(e) => !isFlipped && handleMouseMove(e, i, diff)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    {/* Card face */}
                    <div
                      className="flex flex-col items-center justify-center"
                      style={{
                        position:     'absolute',
                        inset:        0,
                        borderRadius: 20,
                        overflow:     'hidden',
                        background:   CARD_BG[accent],
                        border:       `1.5px solid rgba(${rgb},0.25)`,
                        boxShadow:    `0 0 0 1px rgba(${rgb},0.1), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 pointer-events-none"
                        style={{
                          height:     '60%',
                          background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${rgb},0.10), transparent)`,
                        }}
                      />
                      {project.logo ? (
                        <>
                          <div className="relative z-10" style={{ width: '80%', height: '55%' }}>
                            <Image
                              src={project.logo}
                              alt={project.name}
                              fill
                              className="object-contain"
                              sizes="192px"
                            />
                          </div>
                          {/* Name */}
                          <span
                            className="font-clash text-center px-4 relative z-10 mt-3"
                            style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}
                          >
                            {project.name}
                          </span>
                          {/* Niche — smaller muted label */}
                          <span
                            className="text-center px-4 relative z-10 mt-1"
                            style={{
                              fontSize:   '0.72rem',
                              fontFamily: 'Satoshi, sans-serif',
                              fontWeight: 500,
                              color:      `rgba(${rgb},0.85)`,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {project.niche}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="font-clash font-bold text-center px-4 relative z-10"
                            style={{ fontSize: '1.5rem', lineHeight: 1.1, color: '#ffffff' }}
                          >
                            {project.name}
                          </span>
                          <span
                            className="text-center px-4 relative z-10 mt-2"
                            style={{
                              fontSize:   '0.72rem',
                              fontFamily: 'Satoshi, sans-serif',
                              fontWeight: 500,
                              color:      `rgba(${rgb},0.85)`,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {project.niche}
                          </span>
                          <div
                            className="mt-3 relative z-10"
                            style={{ width: 40, height: 2, background: hex, borderRadius: 2 }}
                          />
                        </>
                      )}
                    </div>

                    {/* Mouse-following glow overlay */}
                    <div
                      ref={el => { glowRefs.current[i] = el }}
                      style={{
                        position:      'absolute',
                        inset:         0,
                        borderRadius:  20,
                        opacity:       0,
                        pointerEvents: 'none',
                        zIndex:        20,
                      }}
                    />
                  </div>

                  {/* Back face */}
                  <div
                    style={{
                      position:                 'absolute',
                      inset:                    0,
                      backfaceVisibility:       'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform:                'rotateY(180deg)',
                      borderRadius:             20,
                      overflow:                 'hidden',
                      background:               CARD_BG[accent],
                      border:                   `1.5px solid rgba(${rgb},0.25)`,
                      boxShadow:                `0 0 0 1px rgba(${rgb},0.1), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      display:                  'flex',
                      flexDirection:            'column',
                      alignItems:               'center',
                      justifyContent:           'center',
                      padding:                  '20px',
                      gap:                      10,
                    } as React.CSSProperties}
                  >
                    <div
                      style={{
                        background:    `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${rgb},0.10), transparent)`,
                        position:      'absolute',
                        top: 0, left: 0, right: 0,
                        height:        '60%',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Niche — heading at top */}
                    <span
                      className="relative z-10 text-center"
                      style={{
                        fontSize:      '0.68rem',
                        fontFamily:    'Satoshi, sans-serif',
                        fontWeight:    700,
                        letterSpacing: '0.12em',
                        color:         hex,
                        textTransform: 'uppercase',
                      }}
                    >
                      {project.niche}
                    </span>
                    {/* Project name */}
                    <span
                      className="relative z-10 text-center font-clash"
                      style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.1 }}
                    >
                      {project.name}
                    </span>
                    {/* Description */}
                    <p
                      className="relative z-10 text-center"
                      style={{
                        fontSize:   '0.82rem',
                        fontFamily: 'Satoshi, sans-serif',
                        color:      'rgba(255,255,255,0.72)',
                        lineHeight: 1.55,
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-dark)] transition-all duration-200"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-1.5 items-center">
            {PROJECTS.map((p, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setFlippedIndex(null); startAuto() }}
                className="rounded-full transition-all duration-300"
                style={{
                  width:     i === active ? 20 : 6,
                  height:    6,
                  minHeight: 24,
                  background: i === active ? ACCENT_HEX[p.colour] : 'var(--border-dark)',
                }}
                aria-label={`Go to ${p.name}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-dark)] transition-all duration-200"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  )
}
