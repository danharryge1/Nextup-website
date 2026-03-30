'use client'

import { useState, useLayoutEffect, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Module-level flag: survives React Strict Mode double-mount within the same JS session.
let introPlayed = false

export default function LoadingScreen() {
  const [show, setShow]         = useState(false)
  const [wasShown, setWasShown] = useState(false)

  useLayoutEffect(() => {
    // Always remove the blocker so the page is never stuck invisible
    const blocker = document.getElementById('intro-blocker')
    if (blocker) blocker.remove()

    // Skip intro on mobile devices — video aspect ratio is poor below 768px
    if (window.innerWidth < 768) return

    // Skip if already played this session (sessionStorage) or this JS lifetime (module flag)
    const alreadySeen = sessionStorage.getItem('intro-seen') === '1'
    if (!introPlayed && !alreadySeen) {
      introPlayed = true
      setShow(true)
    }
  }, [])

  useEffect(() => {
    if (!show) return
    setWasShown(true)
    // Fallback dismiss after 12s if video never fires onEnded
    const t = setTimeout(() => setShow(false), 12000)
    return () => clearTimeout(t)
  }, [show])

  useEffect(() => {
    if (wasShown && !show) {
      sessionStorage.setItem('intro-seen', '1')
      window.dispatchEvent(new Event('loading-done'))
    }
  }, [wasShown, show])

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
          style={{ zIndex: 200, background: '#000000' }}
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
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          >
            <source src="/videos/intro-final.mp4" type="video/mp4" />
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
