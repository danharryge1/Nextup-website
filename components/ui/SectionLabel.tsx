import { clsx } from 'clsx'

type Colour = 'blue' | 'teal' | 'coral' | 'amber'

interface SectionLabelProps {
  children: React.ReactNode
  colour?: Colour
  className?: string
  center?: boolean
}

const colourClass: Record<Colour, string> = {
  blue:  'text-accent-blue',
  teal:  'text-accent-teal',
  coral: 'text-accent-coral',
  amber: 'text-accent-amber',
}

const underlineGradient: Record<Colour, string> = {
  blue:  'linear-gradient(90deg, #008aa0, #2563EB)',
  teal:  'linear-gradient(90deg, #0D9488, #00abb1)',
  coral: 'linear-gradient(90deg, #F43F5E, #F59E0B)',
  amber: 'linear-gradient(90deg, #F59E0B, #2563EB)',
}

export default function SectionLabel({ children, colour = 'blue', className, center }: SectionLabelProps) {
  return (
    <div className={clsx('mb-6', className)}>
      <p className={clsx('section-label mb-2', colourClass[colour])}>
        {children}
      </p>
      <div style={{ width: 40, height: 2, background: underlineGradient[colour], borderRadius: 1, margin: center ? '0 auto' : undefined }} />
    </div>
  )
}
