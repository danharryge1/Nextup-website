'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import HighlightText from '@/components/ui/HighlightText'
import { FAQ_ITEMS } from '@/lib/constants'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding relative z-10" style={{ background: '#0F0F17' }} aria-label="FAQ">
      <Container>
        <div className="max-w-2xl mx-auto">
          <SectionLabel colour="blue">COMMON QUESTIONS</SectionLabel>

          <div className="mt-8 flex flex-col divide-y divide-[var(--border)]">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen      = openIndex === i
              const borderColour = i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-teal)'

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    borderLeft:    `3px solid ${isOpen ? borderColour : 'transparent'}`,
                    paddingLeft:   isOpen ? 12 : 0,
                    transition:    'border-color 0.2s ease, padding-left 0.2s ease',
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-satoshi font-medium text-base text-[var(--foreground)] group-hover:text-accent-blue transition-colors duration-200">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 text-accent-blue transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="pb-5 text-base text-[var(--foreground-muted)] leading-relaxed">
                          <HighlightText text={item.answer} highlightColour="blue" />
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
