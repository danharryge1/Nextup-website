'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import ContactInfo from '@/components/sections/contact/ContactInfo'
import BookingEmbed from '@/components/sections/contact/BookingEmbed'
import ContactForm from '@/components/sections/contact/ContactForm'
import { CONTACT_HEADLINE, CONTACT_SUBHEADLINE } from '@/lib/constants'

export default function ContactPage() {
  const [hideChevron, setHideChevron] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHideChevron(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: '50vh', paddingTop: '120px', paddingBottom: '80px' }}
        aria-label="Contact hero"
      >
        {/* Gradient orb — coral dominant */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '50%',
            left:          '50%',
            width:         700,
            height:        700,
            borderRadius:  '50%',
            background:    'radial-gradient(circle, rgba(244,63,94,0.25) 0%, rgba(245,158,11,0.14) 50%, rgba(37,99,235,0.10) 80%, transparent 100%)',
            filter:        'blur(80px)',
            animation:     'orb-pulse 4s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex:        0,
          }}
        />

        <Container className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-clash font-bold mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {CONTACT_HEADLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-satoshi text-xl text-[var(--foreground-muted)] max-w-lg mx-auto"
          >
            {CONTACT_SUBHEADLINE}
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
          <ChevronDown size={24} className="scroll-indicator" style={{ color: 'var(--accent-coral)' }} />
        </div>
      </section>

      {/* Two-column + form */}
      <section className="section-padding bg-[var(--background)] relative z-10" aria-label="Contact details">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-start">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ContactInfo />
            </motion.div>
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <BookingEmbed />
            </motion.div>
          </div>
          <ContactForm />
        </Container>
      </section>
    </div>
  )
}
