import { clsx } from 'clsx'

type ValidTag = keyof React.JSX.IntrinsicElements

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: ValidTag
}

export default function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={clsx('container', className)}>
      {children}
    </Tag>
  )
}
