import { BOOKING_LINK } from '@/lib/constants'

export default function BookingEmbed() {
  return (
    <div style={{ position: 'relative', borderRadius: 18, padding: '2px', overflow: 'hidden' }}>
      {/* Spinning gradient border */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      '-150%',
          background: 'conic-gradient(from 0deg, #008aa0, #2563EB, #0D9488, #F43F5E, #F59E0B, #008aa0)',
          animation:  'spin-gradient 6s linear infinite',
        }}
      />
      {/* Inner content */}
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: 'var(--background)' }}>
        <iframe
          src={BOOKING_LINK}
          title="Book a free call"
          width="100%"
          height="630"
          style={{ border: 'none', display: 'block' }}
        />
      </div>
    </div>
  )
}
