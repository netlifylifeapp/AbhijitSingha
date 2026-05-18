import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useMultiTypewriter } from '../hooks/useTypewriter'

const finalThoughts = [
  'He is still here.',
  'A little quieter than before.',
  'A little more careful with his words.',
  'Still learning what it means to take up space without apology.',
  'Still working on it.',
  'That is enough, for now.',
]

const quotes = [
  '"She moved forward with life while he stayed behind inside old conversations and unfinished feelings."',
  '"She was the only person who ever made loneliness feel less heavy."',
  '"He did not lose her to someone else. He lost her to the version of himself that could not let go."',
]

function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const stars = [...Array(120)].map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.4 + 0.05,
      speed: Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2
    }))

    let frame
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        const o = s.opacity + Math.sin(t * s.speed + s.phase) * 0.15
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, ${Math.max(0, o)})`
        ctx.fill()
      })
      t += 0.5
      frame = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

function RotatingQuote() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-24 flex items-center justify-center overflow-hidden">
      <motion.p
        key={current}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.8 }}
        className="font-serif text-base md:text-lg text-[rgba(160,185,230,0.45)] italic text-center max-w-lg leading-relaxed"
      >
        {quotes[current]}
      </motion.p>
    </div>
  )
}

export default function Scene8_Acceptance() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const { displayLines, currentText } = useMultiTypewriter(
    isInView ? finalThoughts : [],
    35,
    800
  )

  return (
    <section ref={ref} className="scene-section relative z-10 py-20" style={{ minHeight: '100vh' }}>
      {/* Star field */}
      <StarField />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(3,3,12,0.9) 0%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="mb-16"
        >
          <div className="font-mono text-[9px] tracking-[0.5em] text-[rgba(0,212,255,0.25)] uppercase mb-4">
            chapter eight
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[rgba(200,215,255,0.55)] italic mb-5">
            silent acceptance
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[rgba(0,212,255,0.2)] to-transparent mx-auto" />
        </motion.div>

        {/* Rotating quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="mb-16"
        >
          <RotatingQuote />
        </motion.div>

        {/* Terminal-style final thoughts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="glass-panel rounded-lg p-8 mb-16 text-left"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,80,80,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,179,71,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(100,200,100,0.5)]" />
            <div className="flex-1" />
            <div className="font-mono text-[8px] text-[rgba(80,100,140,0.35)] tracking-wider">
              inner.terminal — abhijit.mind
            </div>
          </div>

          <div className="space-y-2">
            {displayLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3"
              >
                <span className="font-mono text-[rgba(0,212,255,0.3)] text-xs mt-0.5">›</span>
                <span className="font-mono text-sm text-[rgba(190,210,255,0.65)]">{line}</span>
              </motion.div>
            ))}
            {currentText && (
              <div className="flex gap-3">
                <span className="font-mono text-[rgba(0,212,255,0.3)] text-xs mt-0.5">›</span>
                <span className="font-mono text-sm text-[rgba(190,210,255,0.65)]">
                  {currentText}
                  <span className="typewriter-cursor" />
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Final name signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 4, duration: 2 }}
          className="mb-12"
        >
          <div
            className="font-serif text-5xl md:text-7xl text-[rgba(180,200,255,0.12)] select-none"
            style={{ letterSpacing: '0.05em' }}
          >
            Abhijit
          </div>
        </motion.div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 5, duration: 2 }}
          className="text-center"
        >
          <div className="w-12 h-px bg-[rgba(0,212,255,0.15)] mx-auto mb-6" />
          <p className="font-mono text-[10px] tracking-[0.4em] text-[rgba(80,100,140,0.35)] uppercase">
            end of transmission
          </p>
          <p className="font-serif text-sm text-[rgba(120,150,200,0.3)] italic mt-3">
            "some stories don't have endings.<br />they just go quiet."
          </p>
        </motion.div>

        {/* Corner credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 6, duration: 1.5 }}
          className="mt-20 pt-8 border-t border-[rgba(255,255,255,0.04)]"
        >
          <div className="flex items-center justify-between">
            <div className="font-mono text-[8px] tracking-widest text-[rgba(60,80,120,0.35)] uppercase">
              abhijit singha / a mind left behind
            </div>
            <div className="font-mono text-[8px] text-[rgba(60,80,120,0.3)]">
              2024 — present
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
