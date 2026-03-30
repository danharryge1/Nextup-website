'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import { CREDIBILITY_METRICS } from '@/lib/constants'

const COLOUR_MAP: Record<string, string> = {
  blue:  'var(--accent-blue)',
  teal:  'var(--accent-teal)',
  coral: 'var(--accent-coral)',
  amber: 'var(--accent-amber)',
}

export default function CredibilityStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section
      className="bg-[var(--background-alt)] relative z-10"
      style={{
        paddingTop: 48,
        paddingBottom: 48,
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      aria-label="Credibility metrics"
    >
      <Container>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {CREDIBILITY_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              style={{ opacity: 0 }}
              initial={{ opacity: 0, scale: 1.5, filter: 'blur(4px)' }}
              animate={inView
                ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, scale: 1.5, filter: 'blur(4px)' }
              }
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center text-center"
            >
              <span
                className="font-clash font-bold leading-none mb-2"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: COLOUR_MAP[metric.colour] }}
              >
                {metric.value}
              </span>
              <span className="font-satoshi text-sm text-[var(--foreground-muted)]">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
