'use client'

import { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function LoadingScreen() {
  const [show, setShow] = useState(false)
  const [wasShown, setWasShown] = useState(false)
  const gestureCleanup = useRef<(() => void) | null>(null)

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
      if (gestureCleanup.current) {
        gestureCleanup.current()
        gestureCleanup.current = null
      }
      window.dispatchEvent(new Event('loading-done'))
    }
  }, [wasShown, show])

  const handleVideoRef = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return

    // Ensure muted in every way Safari might check
    video.muted = true
    video.defaultMuted = true
    video.volume = 0
    video.setAttribute('muted', '')

    const attemptPlay = () => {
      if (!video.paused) return // already playing
      video.muted = true
      video.play().catch((err) => {
        if (err.name === 'NotAllowedError') {
          // Safari blocked autoplay — wait for any user gesture
          const onGesture = () => {
            video.muted = true
            video.play().catch(() => {
              // Truly blocked — skip intro
              setShow(false)
            })
            cleanup()
          }
          const cleanup = () => {
            document.removeEventListener('click', onGesture)
            document.removeEventListener('touchstart', onGesture)
            document.removeEventListener('scroll', onGesture)
            gestureCleanup.current = null
          }
          document.addEventListener('click', onGesture, { once: true })
          document.addEventListener('touchstart', onGesture, { once: true })
          document.addEventListener('scroll', onGesture, { once: true, passive: true })
          gestureCleanup.current = cleanup

          // Don't wait forever — skip after 5s if no gesture
          setTimeout(() => {
            if (video.paused) {
              cleanup()
              setShow(false)
            }
          }, 5000)
        }
        // AbortError = transient (e.g. data not loaded yet) — do NOT dismiss,
        // the canplay/loadeddata handlers will retry
      })
    }

    // Try immediately
    attemptPlay()

    // Retry after a short delay — Safari sometimes needs the element to settle
    const retryTimer = setTimeout(attemptPlay, 200)

    return () => clearTimeout(retryTimer)
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
              if (v.paused) v.play().catch(() => {})
            }}
            onLoadedData={e => {
              const v = e.currentTarget
              v.muted = true
              if (v.paused) v.play().catch(() => {})
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
