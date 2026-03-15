'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={overlayRef}
      className={clsx(
        'fixed inset-0 z-40 bg-[var(--background-dark)] flex flex-col items-center justify-center',
        'transition-all duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden={!isOpen}
    >
      <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
        {NAV_LINKS.map(({ label, href }, i) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={clsx(
              'font-clash text-[2.5rem] font-semibold text-[var(--foreground-on-dark)] transition-all duration-300',
              'hover:text-accent-teal',
              pathname === href && 'text-accent-teal',
              isOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8',
            )}
            style={{ transitionDelay: isOpen ? `${i * 0.07}s` : '0s' }}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div
        className={clsx(
          'mt-12 w-full max-w-xs px-8 transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
        style={{ transitionDelay: isOpen ? `${NAV_LINKS.length * 0.07}s` : '0s' }}
      >
        <Button href="/contact" onClick={onClose} className="w-full justify-center">
          Get in Touch
        </Button>
      </div>
    </div>
  )
}
