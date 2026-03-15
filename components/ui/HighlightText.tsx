interface HighlightTextProps {
  text: string
  highlightColour?: 'blue' | 'teal' | 'coral' | 'dark-teal'
}

const COLOURS = {
  blue:        'rgba(37,99,235,0.2)',
  teal:        'rgba(13,148,136,0.25)',
  coral:       'rgba(244,63,94,0.15)',
  'dark-teal': 'rgba(13,148,136,0.3)',
}

export default function HighlightText({ text, highlightColour = 'teal' }: HighlightTextProps) {
  const colour = COLOURS[highlightColour]
  const parts = text.split(/(==.+?==)/g)

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('==') && part.endsWith('==')) {
          return (
            <span
              key={i}
              style={{
                fontWeight: 600,
                display: 'inline',
                padding: '0 3px',
                backgroundImage: `linear-gradient(transparent 55%, ${colour} 55%)`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              {part.slice(2, -2)}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
