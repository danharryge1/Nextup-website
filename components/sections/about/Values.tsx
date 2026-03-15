'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import HighlightText from '@/components/ui/HighlightText'
import { VALUES_LABEL, VALUES } from '@/lib/constants'

const BORDER_COLOURS: Record<string, string> = {
  blue:  'var(--accent-blue)',
  teal:  'var(--accent-teal)',
  coral: 'var(--accent-coral)',
}

const ACCENT_COLOURS: Record<string, string> = {
  blue:  'var(--accent-blue)',
  teal:  'var(--accent-teal)',
  coral: 'var(--accent-coral)',
}

const ACCENT_RGB: Record<string, string> = {
  blue:  '37,99,235',
  teal:  '13,148,136',
  coral: '244,63,94',
}

export default function Values() {
  return (
    <section className="section-padding bg-[var(--background-dark)] relative z-10" aria-label="Our values">
      <Container>
        <SectionLabel colour="amber">{VALUES_LABEL}</SectionLabel>

        <div className="flex flex-col gap-8 max-w-3xl mt-8">
          {VALUES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                borderLeft:  `4px solid ${BORDER_COLOURS[item.colour]}`,
                background:  `radial-gradient(circle at top left, rgba(${ACCENT_RGB[item.colour]},0.08), transparent 60%)`,
                borderRadius: 8,
                padding:     '20px 20px 20px 24px',
              }}
            >
              <h3
                className="font-clash font-bold mb-3"
                style={{ fontSize: '1.6rem', color: ACCENT_COLOURS[item.colour] }}
              >
                {item.title}
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                <HighlightText text={item.description} highlightColour="dark-teal" />
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
