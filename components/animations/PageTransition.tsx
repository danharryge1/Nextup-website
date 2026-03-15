'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const PAGE_FLASH: Record<string, string> = {
  '/about':    'rgba(37,99,235,0.12)',
  '/services': 'rgba(13,148,136,0.12)',
  '/contact':  'rgba(244,63,94,0.12)',
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const flash = PAGE_FLASH[pathname] ?? 'transparent'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          position:      'fixed',
          inset:         0,
          background:    flash,
          pointerEvents: 'none',
          zIndex:        100,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  )
}
