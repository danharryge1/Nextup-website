'use client'

import { useEffect, useRef } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  stagger?: number
}

/**
 * Splits text by word and animates each word up on mount (no ScrollTrigger).
 * Used for hero headlines.
 */
export default function TextReveal({ text, className, stagger = 0.06 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.style.opacity = '1'
      return
    }

    let cleanup: (() => void) | undefined

    async function init() {
      const gsap = (await import('gsap')).default

      const words = container!.querySelectorAll<HTMLSpanElement>('.word')
      gsap.set(words, { opacity: 0, y: 30 })

      const tl = gsap.timeline()
      tl.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger,
      })

      cleanup = () => tl.kill()
    }

    init()
    return () => cleanup?.()
  }, [stagger, text])

  const words = text.split(' ')

  return (
    <div ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block" style={{ willChange: 'transform, opacity' }}>
          {word}
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  )
}
