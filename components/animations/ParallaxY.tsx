'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Fraction of viewport height to shift over full scroll through element (default 0.12) */
  speed?: number
  className?: string
}

/**
 * Wraps children with a GSAP ScrollTrigger scrub that drifts the element
 * upward slightly as it scrolls through the viewport — creating parallax depth.
 */
export default function ParallaxY({ children, speed = 0.12, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let st: any

    async function init() {
      const { loadGSAP } = await import('@/lib/gsap')
      const { ScrollTrigger } = await loadGSAP()

      st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate(self: { progress: number }) {
          if (ref.current) {
            ref.current.style.transform = `translateY(${self.progress * -window.innerHeight * speed}px)`
          }
        },
      })
    }

    init()
    return () => st?.kill()
  }, [speed])

  return (
    <div ref={ref} style={{ willChange: 'transform' }} className={className}>
      {children}
    </div>
  )
}
