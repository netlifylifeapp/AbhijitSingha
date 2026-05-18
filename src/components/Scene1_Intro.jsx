import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

const subtitle = "somewhere between 2am and silence, this is his world."

export default function Scene1_Intro() {
  const { displayText, isDone } = useTypewriter(subtitle, 50, 1200)
  const timeRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      if (timeRef.current) {
        const now = new Date()
        const h = now.getHours().toString().padStart(2, '0')
        const m = now.getMinutes().toString().padStart(2, '0')
        const s = now.getSeconds().toString().padStart(2, '0')
        timeRef.current.textContent = `${h}:${m}:${s}`
      }
    }
    const t = setInterval(tick, 1000)
    tick()
    return () => clearInterval(t)
  }, [])

  return (
    <section className="scene-section relative z-10" style={{ minHeight: '100vh' }}>
      {/* Vertical center gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,10,50,0.95) 0%, transparent 100%)'
        }}
      />

      {/* Left edge ambient light */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.15) 40%, rgba(0,212,255,0.08) 60%, transparent)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-16">

        {/* Top metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="flex items-center justify-between mb-24"
        >
          <div className="font-mono text-[9px] tracking-[0.35em] text-[rgba(100,140,200,0.35)] uppercase">
            memory.archive / init
          </div>
          <div
            ref={timeRef}
            className="font-mono text-[9px] tracking-widest text-[rgba(0,212,255,0.3)]"
          />
        </motion.div>

        {/* Main title — glitch */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] text-[rgba(0,212,255,0.4)] mb-6 uppercase">
            &gt; a mind left behind
          </div>

          <h1
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none text-[rgba(220,230,255,0.85)] relative select-none"
            data-text="Abhijit"
            style={{ textShadow: '0 0 60px rgba(26,111,255,0.15)' }}
          >
            <span className="glitch-text" data-text="Abhijit">Abhijit</span>
          </h1>
          <h1
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none text-[rgba(160,190,255,0.5)] italic"
            style={{ marginTop: '-0.15em' }}
          >
            Singha
          </h1>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mb-20"
        >
          <p className="font-mono text-sm text-[rgba(120,160,220,0.55)] tracking-wide max-w-sm">
            {displayText}
            {!isDone && <span className="typewriter-cursor" />}
          </p>
        </motion.div>

        {/* Emotional first line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1.8, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <div className="w-8 h-px bg-[rgba(0,212,255,0.3)] mb-8" />
          <p className="font-serif text-xl md:text-2xl text-[rgba(200,215,255,0.65)] leading-relaxed italic">
            "She was never just another person to him —<br />
            she became the place his heart returned to every night."
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="font-mono text-[8px] tracking-[0.4em] text-[rgba(100,140,200,0.3)] uppercase">
            scroll to enter
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-[rgba(0,212,255,0.3)] to-transparent"
          />
        </motion.div>

        {/* Rain sound indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute top-24 right-6 md:right-12 flex flex-col items-end gap-1"
        >
          <div className="font-mono text-[8px] tracking-[0.3em] text-[rgba(80,120,180,0.3)] uppercase">
            it is raining
          </div>
          <div className="flex gap-1 items-end">
            {[3, 5, 4, 6, 3, 5].map((h, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-[rgba(0,212,255,0.25)] rounded-full"
                style={{ height: h * 2 }}
                animate={{ scaleY: [1, 1.5, 0.8, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
