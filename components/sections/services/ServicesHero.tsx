'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import { SERVICES_HEADLINE, SERVICES_SUBHEADLINE } from '@/lib/constants'

export default function ServicesHero() {
  const [hideChevron, setHideChevron] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHideChevron(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        minHeight:  '60vh',
        paddingTop: '120px',
        paddingBottom: '80px',
        background: 'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(13,148,136,0.22) 0%, rgba(0,171,177,0.1) 40%, #0A0A0F 65%)',
      }}
      aria-label="Services hero"
    >
      {/* Static glow orb — no animation to prevent iOS GPU flicker */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '40%',
          left:          '50%',
          width:         600,
          height:        400,
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(13,148,136,0.18) 0%, rgba(37,99,235,0.1) 50%, transparent 100%)',
          filter:        'blur(60px)',
          transform:     'translate(-50%, -50%) translateZ(0)',
          WebkitTransform: 'translate(-50%, -50%) translateZ(0)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      <Container className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-clash font-bold mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
        >
          {SERVICES_HEADLINE}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-satoshi text-xl text-[var(--foreground-muted)] max-w-lg mx-auto"
        >
          {SERVICES_SUBHEADLINE}
        </motion.p>
      </Container>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        180,
          background:    'linear-gradient(to bottom, transparent, #0A0A0F)',
          pointerEvents: 'none',
          zIndex:        5,
        }}
      />

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300"
        style={{ opacity: hideChevron ? 0 : 0.4, zIndex: 10 }}
        aria-hidden="true"
      >
        <ChevronDown size={24} className="scroll-indicator" style={{ color: 'var(--accent-teal)' }} />
      </div>
    </section>
  )
}
