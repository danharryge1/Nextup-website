'use client'

import { useState, useEffect, useRef } from 'react'

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(true)
  const [fading, setFading]   = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth < 768) {
      setMounted(false)
      return
    }

    // Skip if already played this session
    if (sessionStorage.getItem('introPlayed')) {
      setMounted(false)
      return
    }

    const vid = videoRef.current
    if (!vid) return

    vid.muted = true
    vid.playsInline = true
    vid.setAttribute('muted', '')
    vid.setAttribute('playsinline', '')

    const dismiss = () => {
      setFading(true)
      setTimeout(() => setMounted(false), 300)
    }

    vid.play().then(() => {
      sessionStorage.setItem('introPlayed', 'true')
    }).catch(() => {
      // Autoplay blocked — skip intro entirely
      setMounted(false)
    })

    vid.addEventListener('ended', dismiss, { once: true })
    const fallback = setTimeout(dismiss, 4000)

    return () => {
      vid.removeEventListener('ended', dismiss)
      clearTimeout(fallback)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      style={{
        position:     'fixed',
        inset:        0,
        zIndex:       9999,
        background:   '#0A0A0F',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        opacity:      fading ? 0 : 1,
        transition:   'opacity 0.3s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ maxWidth: '60vw', maxHeight: '60vh', objectFit: 'contain' }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
