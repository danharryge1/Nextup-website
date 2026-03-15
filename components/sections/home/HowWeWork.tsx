'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import HighlightText from '@/components/ui/HighlightText'
import { PROCESS_LABEL, PROCESS_HEADING, PROCESS_STEPS } from '@/lib/constants'

const STEP_CONFIG = {
  blue: {
    gradient:   'linear-gradient(180deg, #2563EB 0%, #008aa0 100%)',
    glow:       'rgba(37,99,235,0.15)',
    titleColor: '#2563EB',
    highlight:  'blue' as const,
  },
  teal: {
    gradient:   'linear-gradient(180deg, #0D9488 0%, #00abb1 100%)',
    glow:       'rgba(13,148,136,0.15)',
    titleColor: '#0D9488',
    highlight:  'teal' as const,
  },
  coral: {
    gradient:   'linear-gradient(180deg, #F43F5E 0%, #F59E0B 100%)',
    glow:       'rgba(244,63,94,0.15)',
    titleColor: '#F43F5E',
    highlight:  'coral' as const,
  },
}

const ARROW_COLOURS = ['#0D9488', '#F43F5E']


export default function HowWeWork() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section
      className="section-padding relative z-10"
      style={{ background: 'var(--background-dark)' }}
      aria-label="How we work"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionLabel colour="teal" center>{PROCESS_LABEL}</SectionLabel>
          <h2 className="section-heading font-clash text-white">{PROCESS_HEADING}</h2>
        </motion.div>

        {/* Desktop: horizontal 3-column */}
        <div
          className="hidden md:grid items-start"
          style={{ gridTemplateColumns: '1fr 80px 1fr 80px 1fr' }}
        >
          {PROCESS_STEPS.flatMap((step, i) => {
            const cfg = STEP_CONFIG[step.colour]
            const isHovered = hoveredStep === i
            const isDimmed  = hoveredStep !== null && !isHovered

            const stepEl = (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center px-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  style={{
                    opacity:    isDimmed ? 0.5 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div className="relative flex items-center justify-center mb-6">
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width:      200,
                        height:     200,
                        background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
                        opacity:    isHovered ? 0.30 : 0.15,
                        transition: 'opacity 0.3s ease',
                        animation:  'glow-pulse 3s ease-in-out infinite',
                        animationDelay: `${i * -1}s`,
                      }}
                    />
                    <motion.div
                      animate={{ scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                      className="font-clash font-bold select-none relative z-10"
                      style={{
                        fontSize:            'clamp(6rem, 15vw, 12rem)',
                        lineHeight:          0.85,
                        background:          cfg.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip:      'text',
                      }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  <h3 className="font-clash font-bold mb-3" style={{ fontSize: '1.5rem', color: cfg.titleColor }}>
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed max-w-xs mx-auto">
                    <HighlightText text={step.description} highlightColour={cfg.highlight} />
                  </p>
                </div>
              </motion.div>
            )

            if (i < 2) {
              return [
                stepEl,
                <div key={`arrow-${i}`} className="flex items-start justify-center" style={{ paddingTop: '5.5rem' }}>
                  <svg width="80" height="50" viewBox="0 0 80 50" fill="none" overflow="visible">
                    <defs>
                      <marker id={`hw-arrow-${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill={ARROW_COLOURS[i]} />
                      </marker>
                    </defs>
                    <path
                      d="M 5 35 C 20 15, 60 15, 75 35"
                      stroke={ARROW_COLOURS[i]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                      markerEnd={`url(#hw-arrow-${i})`}
                      opacity={0.5}
                    />
                  </svg>
                </div>,
              ]
            }
            return [stepEl]
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col gap-12">
          {PROCESS_STEPS.map((step, i) => {
            const cfg = STEP_CONFIG[step.colour]
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative flex items-center justify-center mb-4">
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 150, height: 150,
                      background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
                      animation: 'glow-pulse 3s ease-in-out infinite',
                      animationDelay: `${i * -1}s`,
                    }}
                  />
                  <div
                    className="font-clash font-bold select-none relative z-10"
                    style={{
                      fontSize:            'clamp(4rem, 12vw, 7rem)',
                      lineHeight:          0.85,
                      background:          cfg.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip:      'text',
                    }}
                  >
                    {step.number}
                  </div>
                </div>
                <h3 className="font-clash font-bold mb-2" style={{ fontSize: '1.4rem', color: cfg.titleColor }}>
                  {step.title}
                </h3>
                <p className="text-white/70 text-base leading-relaxed max-w-sm">
                  <HighlightText text={step.description} highlightColour={cfg.highlight} />
                </p>
                {i < 2 && (
                  <div className="mt-8" style={{ opacity: 0.5 }}>
                    <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                      <path d="M12 0 L12 26 M5 19 L12 26 L19 19" stroke={ARROW_COLOURS[i]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </Container>

    </section>
  )
}
