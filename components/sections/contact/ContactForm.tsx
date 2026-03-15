'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
import { CONTACT_FORM_LABEL } from '@/lib/constants'

const inputVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  return (
    <div className="mt-16 pt-12">
      {/* Gradient accent line */}
      <div
        aria-hidden="true"
        style={{
          width:        '60%',
          height:       1,
          background:   'linear-gradient(90deg, #008aa0, #0D9488, #2563EB, #F43F5E, #F59E0B)',
          borderRadius: 1,
          margin:       '0 auto 48px',
        }}
      />

      <SectionLabel colour="blue">{CONTACT_FORM_LABEL}</SectionLabel>

      {/* TODO: Wire up to Formspree — replace action="#" with https://formspree.io/f/YOUR_FORM_ID */}
      <form action="#" method="POST" className="mt-8 flex flex-col gap-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.input
            custom={0}
            variants={inputVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            type="text" name="name" placeholder="Your name" autoComplete="name" required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-dark"
          />
          <motion.input
            custom={1}
            variants={inputVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            type="email" name="email" placeholder="Your email" autoComplete="email" required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-dark"
          />
        </div>
        <motion.textarea
          custom={2}
          variants={inputVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          name="message" placeholder="Tell us what you're working on..." rows={5} required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="input-dark"
          style={{ resize: 'vertical', minHeight: '140px' }}
        />
        <motion.div
          custom={3}
          variants={inputVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <MagneticButton>
            <Button type="submit">Send Message</Button>
          </MagneticButton>
        </motion.div>
      </form>
    </div>
  )
}
