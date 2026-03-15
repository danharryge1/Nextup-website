'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'secondary' | 'secondary-dark'
type Size = 'sm' | 'default' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  children: React.ReactNode
}

const sizeClass: Record<Size, string> = {
  sm: 'btn-sm',
  default: '',
  lg: 'btn-lg',
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'secondary-dark': 'btn-secondary-dark',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', href, className, children, ...props }, ref) => {
    const classes = clsx('btn', variantClass[variant], sizeClass[size], className)

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
