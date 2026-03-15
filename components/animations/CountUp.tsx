'use client'

import { useEffect, useRef } from 'react'

interface CountUpProps {
  end: number
  suffix?: string
  className?: string
  duration?: number
}

export default function CountUp({ end, suffix = '', className, duration = 1.5 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${end}${suffix}`
      return
    }

    let cleanup: (() => void) | undefined

    async function init() {
      const { loadGSAP } = await import('@/lib/gsap')
      const { gsap, ScrollTrigger } = await loadGSAP()

      const obj = { val: 0 }

      const st = ScrollTrigger.create({
        trigger: el!,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          if (triggered.current) return
          triggered.current = true
          gsap.to(obj, {
            val: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              if (el) el.textContent = `${Math.round(obj.val)}${suffix}`
            },
          })
        },
        onLeaveBack: () => {
          triggered.current = false
          gsap.killTweensOf(obj)
          obj.val = 0
          if (el) el.textContent = `0${suffix}`
        },
      })

      cleanup = () => st.kill()
    }

    init()

    return () => cleanup?.()
  }, [end, suffix, duration])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
