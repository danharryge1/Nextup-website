'use client'

import { useRef, useState } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export default function MagneticButton({ children, className }: MagneticButtonProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return
    const { left, top, width, height } = innerRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    setPosition({ x: deltaX * 0.25, y: deltaY * 0.25 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: 'inline-block', padding: '20px', margin: '-20px' }}
    >
      <div
        ref={innerRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
