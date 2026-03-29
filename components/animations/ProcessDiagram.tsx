export default function ProcessDiagram() {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Number gradient fills */}
        <linearGradient id="pdGrad01" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#008aa0" />
        </linearGradient>
        <linearGradient id="pdGrad02" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#00abb1" />
        </linearGradient>
        <linearGradient id="pdGrad03" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Arrowhead markers */}
        <marker id="pdArrowTeal" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#0D9488" />
        </marker>
        <marker id="pdArrowCoral" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#F43F5E" />
        </marker>
        <marker id="pdArrowBlue" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#2563EB" />
        </marker>
      </defs>

      {/* ── Circle 1 - Understand (blue) ── */}
      <circle cx="85"  cy="85"  r="40" stroke="#2563EB" strokeWidth="3"
        style={{ animation: 'pdPulse 6s ease-in-out infinite', animationDelay: '0s' }} />
      <text x="85" y="93" textAnchor="middle" fontSize="15" fill="url(#pdGrad01)"
        fontFamily="'Clash Display', sans-serif" fontWeight="700">01</text>

      {/* ── Circle 2 - Design (teal) ── */}
      <circle cx="215" cy="85"  r="40" stroke="#0D9488" strokeWidth="3"
        style={{ animation: 'pdPulse 6s ease-in-out infinite', animationDelay: '2s' }} />
      <text x="215" y="93" textAnchor="middle" fontSize="15" fill="url(#pdGrad02)"
        fontFamily="'Clash Display', sans-serif" fontWeight="700">02</text>

      {/* ── Circle 3 - Deliver (coral) ── */}
      <circle cx="150" cy="215" r="40" stroke="#F43F5E" strokeWidth="3"
        style={{ animation: 'pdPulse 6s ease-in-out infinite', animationDelay: '4s' }} />
      <text x="150" y="223" textAnchor="middle" fontSize="15" fill="url(#pdGrad03)"
        fontFamily="'Clash Display', sans-serif" fontWeight="700">03</text>

      {/* ── Arrow 1 → 2 ── */}
      <path
        d="M 125 85 Q 150 62 175 85"
        stroke="#0D9488" strokeWidth="2" strokeDasharray="70" strokeDashoffset="70"
        fill="none" markerEnd="url(#pdArrowTeal)"
        style={{ animation: 'pdDraw 4s linear infinite', animationDelay: '0s' }}
      />

      {/* ── Arrow 2 → 3 ── */}
      <path
        d="M 232 120 Q 255 165 190 196"
        stroke="#F43F5E" strokeWidth="2" strokeDasharray="90" strokeDashoffset="90"
        fill="none" markerEnd="url(#pdArrowCoral)"
        style={{ animation: 'pdDraw 4s linear infinite', animationDelay: '1.33s' }}
      />

      {/* ── Arrow 3 → 1 ── */}
      <path
        d="M 110 196 Q 45 165 68 120"
        stroke="#2563EB" strokeWidth="2" strokeDasharray="90" strokeDashoffset="90"
        fill="none" markerEnd="url(#pdArrowBlue)"
        style={{ animation: 'pdDraw 4s linear infinite', animationDelay: '2.66s' }}
      />

      <style>{`
        @keyframes pdPulse {
          0%, 100% { opacity: 0.45; }
          33%       { opacity: 1; }
          66%       { opacity: 0.45; }
        }
        @keyframes pdDraw {
          0%   { stroke-dashoffset: 90; opacity: 0; }
          8%   { opacity: 1; }
          85%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </svg>
  )
}
