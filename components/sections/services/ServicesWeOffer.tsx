'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { SERVICES_OFFER_LABEL, SERVICES_OFFER_CARDS } from '@/lib/constants'

const ACCENT: Record<string, { hex: string; rgb: string }> = {
  blue:  { hex: '#2563EB', rgb: '37,99,235' },
  teal:  { hex: '#0D9488', rgb: '13,148,136' },
  coral: { hex: '#F43F5E', rgb: '244,63,94' },
}

export default function ServicesWeOffer() {
  return (
    <section className="relative z-10" style={{ background: '#0A0A0F' }} aria-label="Services we offer">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-clash font-bold mb-10"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--foreground)' }}
        >
          {SERVICES_OFFER_LABEL}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_OFFER_CARDS.map((card, i) => {
            const { hex, rgb } = ACCENT[card.accent]
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6, boxShadow: `0 12px 48px rgba(0,0,0,0.6), 0 0 28px rgba(${rgb},0.12)` }}
                style={{
                  background:   '#14141F',
                  border:       '1.5px solid #1E1E2E',
                  borderLeft:   `4px solid ${hex}`,
                  borderRadius: 16,
                  padding:      32,
                  boxShadow:    '0 4px 24px rgba(0,0,0,0.3)',
                  cursor:       'default',
                }}
              >
                <h3
                  className="font-clash font-bold mb-4"
                  style={{ fontSize: '1.4rem', color: hex }}
                >
                  {card.title}
                </h3>
                <p className="text-[var(--foreground-muted)] text-base leading-relaxed mb-5">
                  {card.description}
                </p>
                <p
                  className="font-satoshi text-sm"
                  style={{ color: hex, opacity: 0.75 }}
                >
                  {card.note}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
