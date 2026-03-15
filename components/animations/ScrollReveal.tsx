'use client'

import { useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  scale?: boolean
}

const directionMap = {
  up:    { y: 32, x: 0 },
  left:  { y: 0,  x: -48 },
  right: { y: 0,  x: 48 },
  none:  { y: 0,  x: 0 },
}

/**
 * Scroll-driven reveal using Framer Motion's whileInView.
 * Reliable in Next.js App Router — no async GSAP loading needed.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  scale = false,
}: ScrollRevealProps) {
  const { x, y } = directionMap[direction]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale: scale ? 0.92 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
