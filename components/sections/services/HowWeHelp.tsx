'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

const TAGS = ['Strategy', 'Implementation', 'Maintenance', 'Consulting']

export default function HowWeHelp() {
  return (
    <section className="relative z-10 pb-2" style={{ paddingTop: 'clamp(32px, 4vw, 48px)', paddingBottom: 'clamp(32px, 4vw, 48px)' }} aria-label="How we help">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <span
            className="section-label"
            style={{ color: 'var(--foreground-muted)' }}
          >
            HOW WE HELP
          </span>
          <div className="flex flex-wrap gap-3">
            {TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="font-satoshi text-sm cursor-default transition-all duration-200"
                style={{
                  color:        'var(--foreground-muted)',
                  border:       '1px solid var(--border)',
                  borderRadius: 9999,
                  padding:      '8px 20px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--accent-blue)'
                  el.style.color       = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border)'
                  el.style.color       = 'var(--foreground-muted)'
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
