'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
import { CTA_HEADING, CTA_SUBTEXT, CTA_BUTTON, CTA_LINK } from '@/lib/constants'

export default function FinalCTA() {
  return (
    <section
      className="relative z-10 overflow-hidden"
      style={{
        background:    'var(--background-dark)',
        paddingTop:    'clamp(100px, 12vw, 160px)',
        paddingBottom: 'clamp(100px, 12vw, 160px)',
      }}
      aria-label="Call to action"
    >
      {/* Ambient orb */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          width:         600,
          height:        600,
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(0,138,160,0.18) 0%, rgba(37,99,235,0.12) 40%, rgba(46,44,115,0.08) 70%, transparent 100%)',
          filter:        'blur(80px)',
          transform:     'translate(-50%, -50%)',
          pointerEvents: 'none',
          animation:     'orb-pulse 5s ease-in-out infinite',
        }}
      />

      <Container>
        <motion.div
          className="text-center max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative gradient line */}
          <div
            aria-hidden="true"
            style={{
              width:        80,
              height:       2,
              margin:       '0 auto 28px',
              background:   'linear-gradient(90deg, #008aa0, #2563EB)',
              borderRadius: 1,
            }}
          />

          <h2
            className="font-clash font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {CTA_HEADING}
          </h2>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {CTA_SUBTEXT}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <MagneticButton>
              <Button href={CTA_LINK} size="lg">
                {CTA_BUTTON}
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
