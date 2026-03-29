export default function AnimatedGears() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Large gear (left) - rotates CW */}
      <g style={{ transformOrigin: '30px 40px', animation: 'slow-rotate 6s linear infinite' }}>
        <circle cx="30" cy="40" r="14" stroke="var(--accent-coral)" strokeWidth="2" />
        <circle cx="30" cy="40" r="5" stroke="var(--accent-coral)" strokeWidth="1.5" />
        {/* Teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x1 = 30 + Math.cos(rad) * 14
          const y1 = 40 + Math.sin(rad) * 14
          const x2 = 30 + Math.cos(rad) * 19
          const y2 = 40 + Math.sin(rad) * 19
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent-coral)" strokeWidth="3" strokeLinecap="round" />
        })}
      </g>

      {/* Small gear (right) - rotates CCW */}
      <g style={{ transformOrigin: '55px 40px', animation: 'slow-rotate 4s linear infinite reverse' }}>
        <circle cx="55" cy="40" r="9" stroke="var(--accent-coral)" strokeWidth="2" opacity="0.7" />
        <circle cx="55" cy="40" r="3" stroke="var(--accent-coral)" strokeWidth="1.5" opacity="0.7" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x1 = 55 + Math.cos(rad) * 9
          const y1 = 40 + Math.sin(rad) * 9
          const x2 = 55 + Math.cos(rad) * 13
          const y2 = 40 + Math.sin(rad) * 13
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent-coral)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        })}
      </g>
    </svg>
  )
}
