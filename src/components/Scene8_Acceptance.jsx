import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useMultiTypewriter } from '../hooks/useTypewriter'
import gsap from 'gsap'

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
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const stars = [...Array(150)].map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.35 + 0.05,
      speed: Math.random() * 0.006 + 0.002,
      phase: Math.random() * Math.PI * 2
    }))
    let frame, t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        const o = s.opacity + Math.sin(t * s.speed + s.phase) * 0.12
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 200, 160, ${Math.max(0, o)})`
        ctx.fill()
      })
      t += 0.5
      frame = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />
}

function RotatingQuote() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % quotes.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="h-24 flex items-center justify-center overflow-hidden">
      <motion.p key={current} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.8 }}
        className="font-serif text-base md:text-lg italic text-center max-w-lg leading-relaxed" style={{ color: 'rgba(200,180,140,0.45)' }}>
        {quotes[current]}
      </motion.p>
    </div>
  )
}

export default function Scene8_Acceptance() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const { displayLines, currentText } = useMultiTypewriter(isInView ? finalThoughts : [], 30, 700)
  const terminalRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!isInView) return
    if (titleRef.current) {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15 }
      )
    }
  }, [isInView])

  useEffect(() => {
    if (!terminalRef.current) return
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [displayLines, currentText])

  return (
    <section ref={ref} className="scene-section relative z-10 py-20" style={{ minHeight: '100vh' }}>
      <StarField />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(13,13,26,0.92) 0%, transparent 100%)' }} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div ref={titleRef} className="mb-16">
          <div className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(155,35,53,0.4)' }}>chapter eight</div>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-5" style={{ color: 'rgba(235,225,205,0.55)' }}>silent acceptance</h2>
          <div className="w-px h-16 mx-auto" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 1.5 }} className="mb-16">
          <RotatingQuote />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, duration: 1 }} className="glass-panel rounded-lg p-8 mb-16 text-left">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(155,35,53,0.6)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(201,168,76,0.5)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(58,122,90,0.5)' }} />
            <div className="flex-1" />
            <div className="font-mono text-[7px] tracking-wider" style={{ color: 'rgba(130,110,80,0.35)' }}>inner.terminal — abhijit.mind</div>
          </div>
          <div ref={terminalRef} className="space-y-2 overflow-hidden" style={{ maxHeight: '200px' }}>
            {displayLines.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                <span className="font-mono text-xs mt-0.5" style={{ color: 'rgba(201,168,76,0.4)' }}>›</span>
                <span className="font-mono text-sm" style={{ color: 'rgba(210,195,165,0.7)' }}>{line}</span>
              </motion.div>
            ))}
            {currentText && (
              <div className="flex gap-3">
                <span className="font-mono text-xs mt-0.5" style={{ color: 'rgba(201,168,76,0.4)' }}>›</span>
                <span className="font-mono text-sm typewriter-cursor" style={{ color: 'rgba(210,195,165,0.7)' }}>{currentText}</span>
              </div>
            )}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 4, duration: 2 }} className="mb-12">
          <div className="font-serif select-none" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', color: 'rgba(235,225,205,0.06)', letterSpacing: '0.05em' }}>Abhijit</div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 5, duration: 2 }} className="text-center">
          <div className="w-12 h-px mx-auto mb-6" style={{ background: 'rgba(201,168,76,0.15)' }} />
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(130,110,80,0.35)' }}>end of transmission</p>
          <p className="font-serif text-sm italic mt-3" style={{ color: 'rgba(160,140,100,0.3)' }}>"some stories do not have endings. they just go quiet."</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 6, duration: 1.5 }} className="mt-20 pt-8" style={{ borderTop: '1px solid rgba(201,168,76,0.06)' }}>
          <div className="flex items-center justify-between">
            <div className="font-mono text-[7px] tracking-widest uppercase" style={{ color: 'rgba(100,80,50,0.3)' }}>abhijit singha / a mind left behind</div>
            <div className="font-mono text-[7px]" style={{ color: 'rgba(100,80,50,0.25)' }}>2024 — present</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
