'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import HighlightText from '@/components/ui/HighlightText'
import { clsx } from 'clsx'

interface ServiceBlockProps {
  number: string
  title: string
  description: string
  areas: string[]
  colour: 'blue' | 'teal' | 'coral'
  bgStyle: 'light' | 'dark'
}

const ACCENT_COLOURS = {
  blue:  'var(--accent-blue)',
  teal:  'var(--accent-teal)',
  coral: 'var(--accent-coral)',
}

const ACCENT_RGB = {
  blue:  '37,99,235',
  teal:  '13,148,136',
  coral: '244,63,94',
}

const HIGHLIGHT_MAP = {
  blue:  'blue'  as const,
  teal:  'teal'  as const,
  coral: 'coral' as const,
}

export default function ServiceBlock({ number, title, description, colour, bgStyle }: Omit<ServiceBlockProps, 'areas'> & { areas?: string[] }) {
  const isDark      = bgStyle === 'dark'
  const mutedColour = isDark ? 'text-white/70' : 'text-[var(--foreground-muted)]'
  const bg          = isDark ? 'bg-[var(--background-dark)]' : 'bg-[var(--background)]'
  const rgb         = ACCENT_RGB[colour]
  const barSide     = number === '02' ? 'right' : 'left'

  return (
    <section className={clsx('section-padding relative overflow-hidden', bg)} aria-label={title}>
      {/* Side accent bar */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          [barSide]:     0,
          top:           0,
          bottom:        0,
          width:         4,
          background:    `linear-gradient(180deg, transparent 0%, rgba(${rgb},0.8) 30%, rgba(${rgb},0.8) 70%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Background number - larger and more prominent */}
      <motion.span
        className="absolute top-8 right-4 md:right-12 font-clash font-bold select-none pointer-events-none"
        style={{ opacity: 0, fontSize: 'clamp(8rem, 20vw, 14rem)', lineHeight: 1, color: ACCENT_COLOURS[colour] }}
        initial={{ opacity: 0, scale: 2, filter: 'blur(8px)' }}
        whileInView={{ opacity: isDark ? 0.14 : 0.12, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      >
        {number}
      </motion.span>

      <Container className="relative">
        {/* Heading glow */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width:      '60%',
            height:     160,
            background: `radial-gradient(ellipse 60% 80% at 10% 50%, rgba(${rgb},0.08), transparent)`,
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title row */}
          <div className="mb-6">
            <h2
              className="font-clash font-bold"
              style={{
                fontSize:   'clamp(2.5rem, 4vw, 3rem)',
                lineHeight: 1.1,
                color:      ACCENT_COLOURS[colour],
                textShadow: `0 0 40px rgba(${rgb},0.15)`,
              }}
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <p className={clsx('text-lg leading-relaxed max-w-2xl', mutedColour)}>
            <HighlightText text={description} highlightColour={HIGHLIGHT_MAP[colour]} />
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
