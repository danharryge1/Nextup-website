'use client'

import { useEffect } from 'react'

// The actual intro video is started by the inline script in layout.tsx
// (runs before React hydrates, so there is zero startup delay).
// This component's only job is to fire 'loading-done' on pages where
// no intro is shown (mobile / repeat visits), so the Hero video can start.
export default function LoadingScreen() {
  useEffect(() => {
    const blocker = document.getElementById('intro-blocker')
    if (!blocker) {
      // No intro showing — fire immediately so Hero starts
      window.dispatchEvent(new Event('loading-done'))
    }
    // If blocker exists the inline script will fire 'loading-done' after the
    // video ends and the fade-out completes.
  }, [])

  return null
}
