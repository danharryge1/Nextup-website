'use client'

import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen() {
  const [show, setShow]         = useState(true)
  const [fadeOut, setFadeOut]   = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Skip on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShow(false)
      return
    }
    // Skip if already played
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('intro')) {
      setShow(false)
      return
    }

    const vid = videoRef.current
    if (!vid) { setShow(false); return }

    // Force muted
    vid.muted = true
    vid.defaultMuted = true
    vid.volume = 0

    // Try to play
    const playAttempt = vid.play()
    if (playAttempt) {
      playAttempt.then(() => {
        if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('intro', '1')
      }).catch(() => {
        // Can't autoplay, just hide
        setShow(false)
      })
    }

    // When video ends, fade out
    vid.onended = () => {
      setFadeOut(true)
      setTimeout(() => setShow(false), 500)
    }

    // Safety timeout — hide after 5 seconds no matter what
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setShow(false), 500)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div style={{
      position:   'fixed',
      inset:      0,
      zIndex:     99999,
      background: '#0A0A0F',
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity:    fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease',
    }}>
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        preload="auto"
        style={{
          width:      '100vw',
          height:     '100vh',
          objectFit:  'cover',
        }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
