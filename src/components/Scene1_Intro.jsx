import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'
import gsap from 'gsap'

const subtitle = "somewhere between 2am and silence, this is his world."

export default function Scene1_Intro() {
  const { displayText, isDone } = useTypewriter(subtitle, 45, 1800)
  const timeRef = useRef(null)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const lineRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

  useEffect(() => {
    if (!mounted) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.intro-title', {
        opacity: 0, y: 80, skewY: 4
      }, {
        opacity: 1, y: 0, skewY: 0,
        duration: 1.8, ease: 'power4.out', delay: 0.8,
        stagger: 0.15
      })
      gsap.fromTo('.intro-line', {
        scaleX: 0, transformOrigin: 'left center'
      }, {
        scaleX: 1, duration: 1.5, ease: 'power3.inOut', delay: 1.2
      })
      gsap.fromTo('.intro-meta', {
        opacity: 0, y: 20
      }, {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5
      })
      // Floating particles
      gsap.to('.float-particle', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.3, from: 'random' }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [mounted])

  // Parallax on mouse move
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      gsap.to('.parallax-slow', { x: x * 0.3, y: y * 0.3, duration: 1.5, ease: 'power2.out' })
      gsap.to('.parallax-fast', { x: x * 0.8, y: y * 0.6, duration: 1, ease: 'power2.out' })
      gsap.to('.parallax-mid', { x: x * 0.5, y: y * 0.4, duration: 1.2, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section ref={containerRef} className="scene-section relative z-10" style={{ minHeight: '100vh' }}>
      {/* Ambient light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="parallax-slow absolute"
          style={{
            top: '-20%', left: '-10%', width: '60%', height: '80%',
            background: 'radial-gradient(ellipse, rgba(155,35,53,0.07) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="parallax-slow absolute"
          style={{
            bottom: '-20%', right: '-10%', width: '50%', height: '70%',
            background: 'radial-gradient(ellipse, rgba(26,26,62,0.15) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="parallax-mid absolute"
          style={{
            top: '30%', right: '20%', width: '30%', height: '40%',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="float-particle absolute"
            style={{
              left: `${10 + (i * 8) % 85}%`,
              top: `${15 + (i * 13) % 70}%`,
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(201,168,76,0.4)' : 'rgba(155,35,53,0.3)',
              boxShadow: i % 2 === 0 ? '0 0 6px rgba(201,168,76,0.3)' : '0 0 6px rgba(155,35,53,0.2)'
            }}
          />
        ))}
      </div>

      {/* Vertical gold line */}
      <div
        className="absolute left-12 top-0 bottom-0 w-px pointer-events-none hidden md:block"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.08) 70%, transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 pt-24 pb-16">
        {/* Top metadata */}
        <div className="intro-meta flex items-center justify-between mb-20 md:mb-32">
          <div className="font-mono text-[8px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.35)' }}>
            memory.archive / init
          </div>
          <div ref={timeRef} className="font-mono text-[8px] tracking-widest" style={{ color: 'rgba(155,35,53,0.4)' }} />
        </div>

        {/* Main title */}
        <div className="mb-12 overflow-hidden">
          <div className="intro-line mb-6 h-px w-12" style={{ background: 'rgba(201,168,76,0.4)' }} />
          <div className="font-mono text-[9px] tracking-[0.6em] mb-6 uppercase intro-meta" style={{ color: 'rgba(155,35,53,0.5)' }}>
            &gt; a mind left behind
          </div>
          <h1
            className="intro-title parallax-fast font-serif leading-none select-none"
            data-text="Abhijit"
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: 'rgba(245,240,232,0.88)',
              textShadow: '0 0 80px rgba(155,35,53,0.12)',
              marginBottom: '-0.1em'
            }}
          >
            <span className="glitch-text" data-text="Abhijit">Abhijit</span>
          </h1>
          <h1
            className="intro-title font-serif leading-none italic"
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: 'rgba(201,168,76,0.45)',
              textShadow: '0 0 60px rgba(201,168,76,0.1)'
            }}
          >
            Singha
          </h1>
        </div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-sm max-w-sm" style={{ color: 'rgba(180,160,120,0.5)', letterSpacing: '0.05em' }}>
            {displayText}
            {!isDone && <span className="typewriter-cursor" />}
          </p>
        </motion.div>

        {/* Emotional quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 2, ease: 'easeOut' }}
          className="max-w-2xl parallax-slow"
        >
          <div className="w-px h-16 mb-8" style={{ background: 'linear-gradient(180deg, rgba(155,35,53,0.5), transparent)' }} />
          <p className="font-serif leading-relaxed italic" style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: 'rgba(220,205,175,0.6)',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}>
            "She was never just another person to him —<br />
            she became the place his heart returned to every night."
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="font-mono text-[7px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.3)' }}>
            scroll to enter
          </div>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-14"
            style={{ background: 'linear-gradient(180deg, rgba(201,168,76,0.4), transparent)' }}
          />
        </motion.div>

        {/* Rain sound indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute top-24 right-6 md:right-16 flex flex-col items-end gap-1"
        >
          <div className="font-mono text-[7px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(155,35,53,0.3)' }}>
            it is raining
          </div>
          <div className="flex gap-1 items-end">
            {[3,5,4,6,3,5,4].map((h, i) => (
              <motion.div
                key={i}
                className="w-[2px] rounded-full"
                style={{ height: h * 2, background: 'rgba(201,168,76,0.25)' }}
                animate={{ scaleY: [1, 1.6, 0.7, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
