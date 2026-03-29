'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { NAV_LINKS, NAV_CTA } from '@/lib/constants'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300',
          scrolled
            ? 'border-b border-[var(--border)]'
            : 'bg-transparent'
        )}
        style={scrolled ? { background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(12px)' } : undefined}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Next Up Co. - Home" className="flex-shrink-0">
            <img
              src="/images/logo-with-name.svg"
              alt="Next Up Co."
              style={{ height: 147, width: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <Link key={href} href={href}
                  className={clsx(
                    'relative font-satoshi text-base font-medium transition-colors duration-200 group',
                    isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  )}
                >
                  {label}
                  <span className={clsx(
                    'absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-blue transition-transform duration-200 origin-left',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )} />
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton>
              <Button href="/contact" size="sm">{NAV_CTA}</Button>
            </MagneticButton>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 relative z-50 text-[var(--foreground)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={clsx('block h-0.5 w-6 bg-current transition-all duration-300 origin-center', menuOpen ? 'translate-y-[7px] rotate-45' : '')} />
            <span className={clsx('block h-0.5 w-6 bg-current transition-all duration-300', menuOpen ? 'opacity-0 scale-x-0' : '')} />
            <span className={clsx('block h-0.5 w-6 bg-current transition-all duration-300 origin-center', menuOpen ? '-translate-y-[7px] -rotate-45' : '')} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
