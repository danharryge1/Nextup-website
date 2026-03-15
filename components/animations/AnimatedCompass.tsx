export default function AnimatedCompass() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="40" cy="40" r="34" stroke="var(--accent-blue)" strokeWidth="2" />
      {/* Inner tick marks */}
      <line x1="40" y1="7" x2="40" y2="13" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="67" x2="40" y2="73" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="40" x2="13" y2="40" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="67" y1="40" x2="73" y2="40" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Needle — rotates */}
      <g style={{ transformOrigin: '40px 40px', animation: 'slow-rotate 5s linear infinite' }}>
        <line x1="40" y1="22" x2="40" y2="40" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="40" x2="40" y2="56" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </g>
      {/* Centre dot */}
      <circle cx="40" cy="40" r="3" fill="var(--accent-blue)" />
    </svg>
  )
}
