'use client'

import { useEffect, useRef } from 'react'

// ── Node positions [x, y] in a 0-100 × 0-100 SVG viewBox ──────────────────
const NODES: [number, number][] = [
  // Row 1 (y 6-14) — 7 nodes
  [5, 8],   [18, 6],  [33, 12], [50, 7],  [66, 11], [82, 6],  [95, 10],  // 0-6
  // Row 2 (y 22-30) — 6 nodes
  [11, 25], [27, 22], [43, 28], [58, 24], [74, 29], [90, 23],            // 7-12
  // Row 3 (y 37-47) — 7 nodes
  [4, 40],  [20, 37], [36, 44], [52, 39], [68, 45], [84, 40], [97, 43], // 13-19
  // Row 4 (y 52-61) — 6 nodes
  [9, 55],  [25, 52], [41, 58], [57, 53], [72, 60], [88, 54],            // 20-25
  // Row 5 (y 67-76) — 7 nodes
  [6, 70],  [22, 67], [39, 74], [55, 69], [71, 75], [87, 68], [98, 72], // 26-32
  // Row 6 (y 83-91) — 6 nodes
  [14, 85], [30, 88], [47, 83], [62, 90], [78, 84], [93, 89],            // 33-38
  // Interior density nodes
  [35, 33], [55, 47], [20, 48],                                           // 39-41
]

// ── Connections [nodeA, nodeB] ─────────────────────────────────────────────
const CONNECTIONS_RAW: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
  [0,7],[1,7],[1,8],[2,8],[2,9],[3,9],[3,10],[4,10],[4,11],[5,11],[5,12],[6,12],
  [7,8],[8,9],[9,10],[10,11],[11,12],
  [7,14],[8,14],[8,15],[9,15],[9,16],[10,16],[10,17],[11,17],[11,18],[12,18],[12,19],
  [13,14],[14,15],[15,16],[16,17],[17,18],[18,19],
  [13,20],[14,20],[15,21],[16,22],[17,23],[18,24],[19,25],
  [20,21],[21,22],[22,23],[23,24],[24,25],
  [20,26],[21,27],[22,28],[23,29],[24,30],[25,31],
  [26,27],[27,28],[28,29],[29,30],[30,31],[31,32],
  [26,33],[27,34],[28,34],[29,35],[30,36],[31,37],[32,38],
  [33,34],[34,35],[35,36],[36,37],[37,38],
  [2,39],[3,39],[39,9],[39,16],
  [9,40],[40,16],[40,22],[40,17],
  [8,41],[14,41],[41,21],
  [3,11],[10,18],[16,23],
]

// Mobile subset
const MOBILE_CONNECTIONS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [0,7],[1,8],[2,9],[3,10],[4,11],[5,12],
  [7,8],[8,9],[9,10],[10,11],[11,12],
  [7,14],[8,15],[9,16],[10,17],[11,18],[12,19],
  [13,14],[14,15],[15,16],[16,17],[17,18],
]

const COLOURS = [
  'rgba(37,99,235,0.18)',
  'rgba(37,99,235,0.18)',
  'rgba(37,99,235,0.18)',
  'rgba(13,148,136,0.12)',
  'rgba(37,99,235,0.18)',
  'rgba(37,99,235,0.18)',
  'rgba(37,99,235,0.18)',
  'rgba(13,148,136,0.12)',
  'rgba(37,99,235,0.18)',
  'rgba(37,99,235,0.18)',
  'rgba(37,99,235,0.18)',
  'rgba(244,63,94,0.10)',
  'rgba(13,148,136,0.12)',
]

// Node rows — for zone pulse targeting
const ZONE_NODES = [
  [0, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, 32],
  [33, 34, 35, 36, 37, 38],
]

function dist(a: [number, number], b: [number, number]) {
  return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)
}

interface ConnData {
  a: number; b: number
  length: number
  threshold: number
  colour: string
  key: string
}

function buildConns(rawConns: [number, number][]): ConnData[] {
  const conns = rawConns.map(([a, b], i) => ({
    a, b,
    length: dist(NODES[a], NODES[b]),
    threshold: 0,
    colour: COLOURS[i % COLOURS.length],
    key: `${a}-${b}`,
  }))
  conns.sort((ca, cb) => {
    const ya = (NODES[ca.a][1] + NODES[ca.b][1]) / 2
    const yb = (NODES[cb.a][1] + NODES[cb.b][1]) / 2
    const ha = ((ca.a * 31 + ca.b * 17) % 10) * 0.3
    const hb = ((cb.a * 31 + cb.b * 17) % 10) * 0.3
    return (ya + ha) - (yb + hb)
  })
  const total = conns.length
  conns.forEach((c, i) => { c.threshold = 0.02 + (i / total) * 0.73 })
  return conns
}

// Pre-build at module level so render & effect share same order
const SORTED_DESKTOP = buildConns(CONNECTIONS_RAW)
const SORTED_MOBILE  = buildConns(MOBILE_CONNECTIONS)

const DRAW_SPAN = 0.10

export default function BlueprintAnimation() {
  // Use a Map keyed by "a-b" so refs always match regardless of render order
  const lineRefMap = useRef<Map<string, SVGLineElement>>(new Map())
  const nodeRefs   = useRef<SVGCircleElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const conns = isMobile ? SORTED_MOBILE : SORTED_DESKTOP

    // Initialise lines
    conns.forEach((c) => {
      const line = lineRefMap.current.get(c.key)
      if (!line) return
      line.style.strokeDasharray  = `${c.length}`
      line.style.strokeDashoffset = prefersReduced ? '0' : `${c.length}`
      line.style.opacity          = prefersReduced ? '1' : '0'
    })

    nodeRefs.current.forEach((n) => {
      if (n) n.style.opacity = prefersReduced ? '0.35' : '0'
    })

    if (prefersReduced) return

    let rafId = 0
    let lastProg = -1
    let lastFrameMs = 0
    const FRAME_MS = 1000 / 30

    let initialised = false
    let lastZone = -1
    let activePulse: { nodes: number[]; startMs: number } | null = null

    function getZone(p: number) {
      return Math.min(ZONE_NODES.length - 1, Math.floor(p * ZONE_NODES.length))
    }

    function update(ts: number) {
      rafId = requestAnimationFrame(update)
      if (document.hidden) return
      if (ts - lastFrameMs < FRAME_MS) return
      lastFrameMs = ts

      const scrollH = document.documentElement.scrollHeight - window.innerHeight
      const prog = scrollH > 0 ? Math.min(1, window.scrollY / scrollH) : 0
      if (Math.abs(prog - lastProg) < 0.0005) return
      lastProg = prog

      // Zone-transition pulse
      const zone = getZone(prog)
      if (!initialised) {
        lastZone = zone
        initialised = true
      } else if (zone !== lastZone) {
        activePulse = { nodes: ZONE_NODES[zone], startMs: ts }
        lastZone = zone
      }

      // Compute node progress from connection draws
      const nodeProgress = new Float32Array(NODES.length)
      conns.forEach((c) => {
        const line = lineRefMap.current.get(c.key)
        if (!line) return
        const lp = Math.max(0, Math.min(1, (prog - c.threshold) / DRAW_SPAN))
        line.style.strokeDashoffset = `${c.length * (1 - lp)}`
        line.style.opacity = `${Math.min(1, lp / 0.4)}`
        if (lp > 0) {
          nodeProgress[c.a] = Math.max(nodeProgress[c.a], lp)
          nodeProgress[c.b] = Math.max(nodeProgress[c.b], lp)
        }
      })

      // Base node opacities
      const nodeOpacities = new Float32Array(NODES.length)
      for (let i = 0; i < NODES.length; i++) {
        const np = nodeProgress[i]
        nodeOpacities[i] = np > 0 ? 0.15 + np * 0.2 : 0
      }

      // Pulse bonus
      if (activePulse) {
        const t = Math.min(1, (ts - activePulse.startMs) / 1200)
        if (t >= 1) {
          activePulse = null
        } else {
          const bonus = Math.sin(t * Math.PI) * 0.55
          activePulse.nodes.forEach((ni) => {
            nodeOpacities[ni] = Math.min(0.9, nodeOpacities[ni] + bonus)
          })
        }
      }

      nodeRefs.current.forEach((node, i) => {
        if (node) node.style.opacity = `${nodeOpacities[i]}`
      })
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Lines — rendered in sorted desktop order so Map keys are consistent */}
        {SORTED_DESKTOP.map((conn) => (
          <line
            key={`l${conn.key}`}
            ref={(el) => { if (el) lineRefMap.current.set(conn.key, el) }}
            x1={NODES[conn.a][0]} y1={NODES[conn.a][1]}
            x2={NODES[conn.b][0]} y2={NODES[conn.b][1]}
            stroke={conn.colour}
            strokeWidth="0.3"
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
        ))}
        {/* Nodes */}
        {NODES.map(([x, y], i) => (
          <circle
            key={`n${i}`}
            ref={(el) => { if (el) nodeRefs.current[i] = el }}
            cx={x} cy={y} r="0.7"
            fill="#2563EB"
            style={{ opacity: 0 }}
          />
        ))}
      </svg>
    </div>
  )
}
