'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import HighlightText from '@/components/ui/HighlightText'
import { ABOUT_STORY_LABEL, ABOUT_STORY } from '@/lib/constants'

export default function Story() {
  return (
    <section className="section-padding bg-[var(--background)] relative z-10 overflow-hidden" aria-label="Our story">
      {/* Background node pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl opacity-[0.05]"
          viewBox="0 0 600 400"
          fill="none"
        >
          <circle cx="100" cy="100" r="20" stroke="var(--accent-blue)" strokeWidth="2" />
          <circle cx="300" cy="60" r="15" stroke="var(--accent-blue)" strokeWidth="2" />
          <circle cx="500" cy="120" r="18" stroke="var(--accent-blue)" strokeWidth="2" />
          <circle cx="200" cy="250" r="12" stroke="var(--accent-blue)" strokeWidth="2" />
          <circle cx="420" cy="300" r="22" stroke="var(--accent-blue)" strokeWidth="2" />
          <line x1="100" y1="100" x2="300" y2="60" stroke="var(--accent-blue)" strokeWidth="1" />
          <line x1="300" y1="60" x2="500" y2="120" stroke="var(--accent-blue)" strokeWidth="1" />
          <line x1="100" y1="100" x2="200" y2="250" stroke="var(--accent-blue)" strokeWidth="1" />
          <line x1="300" y1="60" x2="200" y2="250" stroke="var(--accent-blue)" strokeWidth="1" />
          <line x1="500" y1="120" x2="420" y2="300" stroke="var(--accent-blue)" strokeWidth="1" />
          <line x1="200" y1="250" x2="420" y2="300" stroke="var(--accent-blue)" strokeWidth="1" />
        </svg>
      </div>

      <Container className="relative">
        <div className="max-w-[720px] mx-auto relative">
          {/* Decorative quotation mark */}
          <div
            aria-hidden="true"
            className="absolute font-clash font-bold select-none pointer-events-none"
            style={{
              top:      -40,
              left:     -20,
              fontSize: '200px',
              lineHeight: 1,
              color:    'var(--accent-blue)',
              opacity:  0.06,
              zIndex:   0,
            }}
          >
            &ldquo;
          </div>

          <div className="relative z-10">
            <SectionLabel colour="blue">{ABOUT_STORY_LABEL}</SectionLabel>

            <div className="flex flex-col gap-6 mt-6">
              {ABOUT_STORY.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-[var(--foreground)] text-lg leading-relaxed"
                >
                  <HighlightText text={para} highlightColour="blue" />
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
