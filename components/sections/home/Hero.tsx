'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
import HighlightText from '@/components/ui/HighlightText'
import { HERO_HEADLINE, HERO_SUBHEADLINE, HERO_CTA, HERO_CTA_LINK, HERO_REASSURANCE } from '@/lib/constants'

export default function Hero() {
  const [hideChevron, setHideChevron] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const titleY    = useTransform(scrollY, [0, 700], [0, isMobile ? 0 : -105])
  const subtitleY = useTransform(scrollY, [0, 700], [0, isMobile ? 0 : -56])
  const videoY    = useTransform(scrollY, [0, 700], [0, isMobile ? 0 : -350])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    vid.defaultMuted = true
    vid.volume = 0

    let started = false
    const tryPlay = () => {
      if (started || (!vid.paused && vid.currentTime > 0)) return
      started = true
      vid.play().catch(() => {
        // Autoplay blocked — hide silently, no play button
        vid.style.opacity = '0'
      })
    }

    // If already playing (browser autoplay kicked in), do nothing
    if (!vid.paused && vid.currentTime > 0) return

    if (vid.readyState >= 3) {
      // Small delay lets Safari's autoplay policy settle after hydration
      setTimeout(tryPlay, 50)
    } else {
      vid.addEventListener('canplay', tryPlay, { once: true })
      vid.addEventListener('loadeddata', tryPlay, { once: true })
    }

    // Safety net: if nothing fires within 800ms, try anyway
    const fallback = setTimeout(tryPlay, 800)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    const onScroll = () => setHideChevron(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'max(100vh, 700px)', background: '#0A0A0F' }}
      aria-label="Hero"
    >
      {/* Video background with parallax */}
      <motion.div
        className="absolute z-0"
        style={{ top: '-5vh', left: 0, right: 0, bottom: 0, y: videoY }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/poster.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'blur(1px)' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay - fades video into the section below */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to top, #0A0A0F, transparent)' }}
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,15,0.45)' }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center" style={{ paddingTop: '15vh' }}>
        <Container>
          {/* Title with parallax */}
          <motion.div style={{ y: titleY }}>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hero-headline max-w-5xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, #E8E8ED 0%, #008aa0 25%, #2563EB 55%, #2e2c73 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {HERO_HEADLINE}
            </motion.h1>
          </motion.div>

          {/* Gradient line + subheadline with parallax */}
          <motion.div style={{ y: subtitleY }}>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 150, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                height: 3,
                background: 'linear-gradient(90deg, #008aa0, #00abb1, #2563EB, #2e2c73)',
                borderRadius: 2,
                marginTop: 24,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 font-satoshi text-xl md:text-2xl text-[var(--foreground-muted)] max-w-lg mx-auto"
            >
              <HighlightText text={HERO_SUBHEADLINE} highlightColour="teal" />
            </motion.p>
          </motion.div>

          {/* CTA button - static (1x scroll speed) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10"
          >
            <MagneticButton>
              <Button href={HERO_CTA_LINK} size="lg">{HERO_CTA}</Button>
            </MagneticButton>
          </motion.div>

          {/* Reassurance - static */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-4 font-satoshi text-sm text-[var(--foreground-faint)]"
          >
            {HERO_REASSURANCE}
          </motion.p>
        </Container>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300"
        style={{ opacity: hideChevron ? 0 : 0.4 }}
        aria-hidden="true"
      >
        <ChevronDown size={24} className="scroll-indicator text-[var(--foreground-faint)]" />
      </div>
    </section>
  )
}
