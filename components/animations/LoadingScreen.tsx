'use client'

import { useEffect } from 'react'

// On repeat visits the intro overlay is hidden instantly by the inline script.
// This component fires 'loading-done' so Hero can start its video on those visits.
export default function LoadingScreen() {
  useEffect(() => {
    const el = document.getElementById('intro-overlay')
    if (!el || el.style.display === 'none') {
      window.dispatchEvent(new Event('loading-done'))
    }
  }, [])

  return null
}
