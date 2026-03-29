export default function AnimatedTrend() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Grid lines */}
      <line x1="12" y1="62" x2="68" y2="62" stroke="var(--accent-teal)" strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="46" x2="68" y2="46" stroke="var(--accent-teal)" strokeWidth="1" opacity="0.2" />
      <line x1="12" y1="30" x2="68" y2="30" stroke="var(--accent-teal)" strokeWidth="1" opacity="0.2" />
      {/* Y axis */}
      <line x1="12" y1="14" x2="12" y2="62" stroke="var(--accent-teal)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Animated trending polyline - draws itself */}
      <polyline
        points="12,58 28,50 40,42 52,32 68,18"
        stroke="var(--accent-teal)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          strokeDasharray: 120,
          strokeDashoffset: 0,
          animation: 'draw-trend 2s ease-in-out infinite alternate',
        }}
      />
      {/* Dot at the tip */}
      <circle cx="68" cy="18" r="3" fill="var(--accent-teal)" />

      <style>{`
        @keyframes draw-trend {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  )
}
