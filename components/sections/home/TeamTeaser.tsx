'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { TEAM_SECTION_LABEL, TEAM_HEADING, TEAM_TAGLINE, TEAM_MEMBERS, TEAM_CTA, TEAM_CTA_HREF } from '@/lib/constants'

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function TeamTeaser() {
  return (
    <section className="section-padding bg-[var(--background)] relative z-10" aria-label="The team">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionLabel colour="coral" center>{TEAM_SECTION_LABEL}</SectionLabel>
          <h2 className="section-heading font-clash">{TEAM_HEADING}</h2>
          <p className="text-[var(--foreground-muted)] max-w-lg mx-auto text-base mt-3">
            {TEAM_TAGLINE}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={containerVariants}
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-full aspect-square rounded-xl bg-[var(--background-alt)] flex items-center justify-center border border-[var(--border)] transition-all duration-300 hover:scale-[1.04] hover:brightness-105 cursor-pointer">
                <User size={40} className="text-[var(--foreground-faint)]" />
              </div>
              <div className="text-center">
                <h3 className="font-clash font-semibold text-lg leading-tight">{member.name}</h3>
                <p className="font-satoshi text-sm text-[var(--foreground-muted)] mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Button href={TEAM_CTA_HREF} variant="secondary">
            {TEAM_CTA}
          </Button>
        </div>
      </Container>

    </section>
  )
}
