import { useState, useEffect } from 'react'

// ─── TypewriterText ───────────────────────────────────────────────────────────
// Emotional typewriter with variable speed, pauses, and cursor blink
// Props:
//   text     — string to type
//   speed    — ms per character (default 40)
//   delay    — ms before starting (default 0)
//   cursor   — show blinking cursor (default true)
//   className — additional CSS classes

export default function TypewriterText({
  text = '',
  speed = 40,
  delay = 0,
  cursor = true,
  className = '',
  onComplete,
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted]     = useState(false)
  const [finished, setFinished]   = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      setFinished(true)
      onComplete?.()
      return
    }

    // Variable speed — slower at punctuation for emotional pacing
    const char = text[displayed.length]
    const isPause = ['.', '?', '!', '—'].includes(char)
    const charDelay = isPause ? speed * 6 : speed

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, charDelay)

    return () => clearTimeout(timer)
  }, [started, displayed, text, speed, onComplete])

  return (
    <span className={className}>
      {displayed}
      {cursor && !finished && (
        <span
          className="inline-block w-px h-[1em] ml-0.5 align-middle"
          style={{
            background: 'currentColor',
            animation: 'blink-cursor 1s step-end infinite',
          }}
        />
      )}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
