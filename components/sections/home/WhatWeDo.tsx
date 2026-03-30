'use client'

import { motion } from 'framer-motion'
import { Compass, TrendingUp, Settings } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import HighlightText from '@/components/ui/HighlightText'
import { WHATWEDO_LABEL, WHATWEDO_HEADING, WHATWEDO_DESCRIPTOR, SERVICE_CARDS } from '@/lib/constants'

const ICONS = [Compass, TrendingUp, Settings]

const ACCENT = {
  blue:  { border: 'var(--accent-blue)',  hex: '#2563EB', highlight: 'blue'  as const },
  teal:  { border: 'var(--accent-teal)',  hex: '#0D9488', highlight: 'teal'  as const },
  coral: { border: 'var(--accent-coral)', hex: '#F43F5E', highlight: 'coral' as const },
}

export default function WhatWeDo() {
  return (
    <section
      className="section-padding relative z-10"
      style={{ background: '#0A0A0F' }}
      aria-label="What we do"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionLabel colour="blue" center>{WHATWEDO_LABEL}</SectionLabel>
          <h2 className="section-heading font-clash mt-3 mb-4">{WHATWEDO_HEADING}</h2>
          <p className="text-[var(--foreground-muted)] max-w-lg mx-auto text-base">
            {WHATWEDO_DESCRIPTOR}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICE_CARDS.map((card, i) => {
            const Icon = ICONS[i]
            const { border, hex, highlight } = ACCENT[card.colour]
            return (
              <motion.div
                key={card.title}
                className="h-full"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="card group relative overflow-hidden h-full"
              >
                {/* Top border on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: border }}
                />
                <div
                  className="mb-5 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: `${border}20` }}
                >
                  <Icon size={20} style={{ color: border }} />
                </div>
                <h3
                  className="font-clash font-bold mb-3"
                  style={{ fontSize: '1.4rem', color: hex }}
                >
                  {card.title}
                </h3>
                <p className="text-[var(--foreground-muted)] text-base leading-relaxed">
                  <HighlightText text={card.description} highlightColour={highlight} />
                </p>
              </motion.div>
              </motion.div>
            )
          })}
        </div>
      </Container>

    </section>
  )
}
