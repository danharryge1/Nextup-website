'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="section-heading mb-4">Something went wrong</h2>
      <button className="btn btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
