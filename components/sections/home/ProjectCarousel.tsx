'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
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

function cardAnimate(diff: number) {
  const abs = Math.abs(diff)
  return {
    x:        diff * 240,
    z:        -abs * 120,
    rotateY:  diff * -28,
    scale:    Math.max(0.55, 1 - abs * 0.14),
    opacity:  Math.max(0, 1 - abs * 0.3),
  }
}

export default function ProjectCarousel() {
  const [active, setActive]             = useState(0)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [delayedFlip, setDelayedFlip]   = useState<number | null>(null)
  const [isMobile, setIsMobile]         = useState(false)

  const autoRef      = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHoveredRef = useRef(false)
  const touchStartX  = useRef(0)

  useEffect(() => { setIsMobile(window.innerWidth < 640) }, [])

  // Delayed flip state for z-index swap — updates 300ms after flippedIndex changes
  // so the z-index only swaps when the card is edge-on (halfway through the flip)
  useEffect(() => {
    const timer = setTimeout(() => setDelayedFlip(flippedIndex), 300)
    return () => clearTimeout(timer)
  }, [flippedIndex])

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
              <motion.div
                key={project.name}
                className="absolute top-0"
                style={{
                  left:         '50%',
                  marginLeft:   -(CARD_W / 2),
                  width:        CARD_W,
                  height:       CARD_H,
                  zIndex:       10 - Math.abs(diff),
                  cursor:       Math.abs(diff) <= 3 ? 'pointer' : 'default',
                  pointerEvents: Math.abs(diff) > 3 ? 'none' : 'auto',
                  perspective:  '1000px',
                }}
                animate={cardAnimate(diff)}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
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
                  {/* Front face */}
                  <div
                    style={{
                      position:                 'absolute',
                      inset:                    0,
                      backfaceVisibility:       'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      zIndex:                   delayedFlip === i ? 0 : 2,
                    } as React.CSSProperties}
                  >
                    {/* Tiltable card — tilt applied here via onMouseMove */}
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
                        transition:   'transform 0.15s ease-out',
                      }}
                      onMouseMove={!isFlipped ? (e) => {
                        const card = e.currentTarget
                        const glow = card.querySelector('.card-glow') as HTMLElement | null
                        const rect = card.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const y = e.clientY - rect.top
                        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8
                        const rotateY = ((x - rect.width  / 2) / (rect.width  / 2)) *  8
                        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
                        if (glow) {
                          glow.style.opacity = '1'
                          glow.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(255,255,255,0.1), transparent)`
                        }
                      } : undefined}
                      onMouseLeave={!isFlipped ? (e) => {
                        const card = e.currentTarget
                        const glow = card.querySelector('.card-glow') as HTMLElement | null
                        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
                        if (glow) glow.style.opacity = '0'
                      } : undefined}
                    >
                      {/* Glow overlay */}
                      <div
                        className="card-glow"
                        style={{
                          position:      'absolute',
                          inset:         0,
                          borderRadius:  'inherit',
                          pointerEvents: 'none',
                          opacity:       0,
                          transition:    'opacity 0.3s ease',
                          zIndex:        10,
                        }}
                      />

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
                          <span
                            className="font-clash text-center px-4 relative z-10 mt-3"
                            style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}
                          >
                            {project.name}
                          </span>
                          <span
                            className="text-center px-4 relative z-10 mt-1"
                            style={{
                              fontSize:      '0.72rem',
                              fontFamily:    'Satoshi, sans-serif',
                              fontWeight:    500,
                              color:         `rgba(${rgb},0.85)`,
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
                              fontSize:      '0.72rem',
                              fontFamily:    'Satoshi, sans-serif',
                              fontWeight:    500,
                              color:         `rgba(${rgb},0.85)`,
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
                      justifyContent:           'flex-start',
                      padding:                  isMobile ? '20px' : '24px',
                      gap:                      8,
                      zIndex:                   delayedFlip === i ? 2 : 0,
                      overflowY:                'auto',
                      WebkitOverflowScrolling:  'touch',
                    } as React.CSSProperties}
                  >
                    <div
                      style={{
                        background:    `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${rgb},0.10), transparent)`,
                        position:      'absolute',
                        top: 0, left: 0, right: 0,
                        height:        '60%',
                        pointerEvents: 'none',
                        flexShrink:    0,
                      }}
                    />
                    <span
                      className="relative z-10 text-center"
                      style={{
                        fontSize:      '0.65rem',
                        fontFamily:    'Satoshi, sans-serif',
                        fontWeight:    700,
                        letterSpacing: '0.12em',
                        color:         hex,
                        textTransform: 'uppercase',
                        flexShrink:    0,
                        marginTop:     isMobile ? 4 : 8,
                      }}
                    >
                      {project.niche}
                    </span>
                    <span
                      className="relative z-10 text-center font-clash"
                      style={{ fontSize: isMobile ? '1rem' : '1.05rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.1, flexShrink: 0 }}
                    >
                      {project.name}
                    </span>
                    <p
                      className="relative z-10 text-center"
                      style={{
                        fontSize:   isMobile ? '0.8rem' : '0.82rem',
                        fontFamily: 'Satoshi, sans-serif',
                        color:      'rgba(255,255,255,0.72)',
                        lineHeight: 1.5,
                        overflowY:  'auto',
                        WebkitOverflowScrolling: 'touch',
                      } as React.CSSProperties}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
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
                  width:      i === active ? 20 : 6,
                  height:     6,
                  minHeight:  24,
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

        {/* Scroll down hint — mobile only */}
        {isMobile && (
          <div className="flex flex-col items-center gap-1 mt-6" aria-hidden="true">
            <span style={{ fontSize: '0.7rem', fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Scroll
            </span>
            <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.35)', animation: 'bounce-chevron 1.5s ease-in-out infinite' }} />
          </div>
        )}
      </Container>
    </section>
  )
}
