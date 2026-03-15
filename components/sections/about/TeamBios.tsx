'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { TEAM_BIOS_LABEL, ABOUT_TEAM_BIOS } from '@/lib/constants'

const ACCENT_BARS = [
  'linear-gradient(90deg, #008aa0, #2563EB)',
  'linear-gradient(90deg, #0D9488, #00abb1)',
  'linear-gradient(90deg, #F43F5E, #F59E0B)',
  'linear-gradient(90deg, #F59E0B, #2563EB)',
]

export default function TeamBios() {
  return (
    <section className="section-padding bg-[var(--background-alt)] relative z-10" aria-label="Meet the team">
      <Container>
        <SectionLabel colour="teal">{TEAM_BIOS_LABEL}</SectionLabel>

        <div className="flex flex-col gap-16 md:gap-20 mt-8">
          {ABOUT_TEAM_BIOS.map((member, i) => {
            const isEven = i % 2 === 1
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Accent bar */}
                <div
                  style={{
                    width:        100,
                    height:       3,
                    background:   ACCENT_BARS[i % 4],
                    borderRadius: 2,
                    marginBottom: 24,
                  }}
                  aria-hidden="true"
                />

                <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
                  {/* Photo */}
                  <div className="flex-shrink-0 w-full max-w-[280px] md:w-[320px] lg:w-[400px] aspect-square rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                    <User size={64} className="text-[var(--foreground-faint)]" />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="sub-heading font-clash mb-1">{member.name}</h3>
                    <p className="text-sm font-satoshi text-[var(--foreground-muted)] mb-4">{member.role}</p>
                    <p className="text-[var(--foreground)] text-base leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
