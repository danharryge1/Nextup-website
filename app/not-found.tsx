import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="hero-headline mb-4">404</h1>
      <p className="text-[var(--foreground-muted)] mb-8">Page not found</p>
      <Link href="/" className="btn btn-primary">Back home</Link>
    </div>
  )
}
