'use client'

import { useState, useLayoutEffect, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function LoadingScreen() {
  const [show, setShow] = useState(false)
  const [wasShown, setWasShown] = useState(false)

  useLayoutEffect(() => {
    if (window.innerWidth < 768) return
    try {
      if (!sessionStorage.getItem('introPlayed')) {
        setShow(true)
      }
    } catch {
      // sessionStorage unavailable — skip intro
    }
    const blocker = document.getElementById('intro-blocker')
    if (blocker) blocker.remove()
  }, [])

  useEffect(() => {
    if (!show) return
    try { sessionStorage.setItem('introPlayed', '1') } catch { /* noop */ }
    setWasShown(true)
    const t = setTimeout(() => setShow(false), 10000)
    return () => clearTimeout(t)
  }, [show])

  useEffect(() => {
    if (wasShown && !show) {
      // Fire immediately so hero video resets as loading screen begins its fade
      window.dispatchEvent(new Event('loading-done'))
    }
  }, [wasShown, show])

  // Callback ref: imperatively play the video the moment it mounts
  const handleVideoRef = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return
    video.muted = true
    video.setAttribute('muted', '')
    video.play().catch(() => setShow(false))
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 99999, background: '#0A0A0F' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <video
            ref={handleVideoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={e => {
              const v = e.currentTarget
              v.muted = true
              v.setAttribute('muted', '')
              if (v.paused) v.play().catch(() => setShow(false))
            }}
            onEnded={() => setShow(false)}
            onError={() => setShow(false)}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              backgroundColor: '#0A0A0F',
            }}
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
