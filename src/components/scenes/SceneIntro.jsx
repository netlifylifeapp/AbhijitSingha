import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TypewriterText from '../ui/TypewriterText'
import { useMouseParallax } from '../../hooks/useMouseParallax'

gsap.registerPlugin(ScrollTrigger)

// ─── SceneIntro ───────────────────────────────────────────────────────────────
// Scene 1: The opening — a lonely soul, a rainy night, a name in the dark
// Full-screen cinematic hero with:
//   - Mouse-reactive parallax layers
//   - Emotional typewriter reveal
//   - Breathing atmosphere

export default function SceneIntro() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const mouse = useMouseParallax(0.04)

  // GSAP scroll-based fade out as user scrolls away
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -60,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene-section relative flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Deep background radial glow ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${50 + mouse.x * 8}% ${50 + mouse.y * 6}%, rgba(10,31,61,0.9) 0%, #020408 100%)`,
          transition: 'background 0.1s ease',
        }}
      />

      {/* ── Fog / mist layer ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 40% at ${48 + mouse.x * 4}% 70%, rgba(26,107,255,0.06) 0%, transparent 70%)`,
        }}
      />

      {/* ── Parallax text layer ────────────────────────────────────────── */}
      <div
        ref={textRef}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{
          transform: `translate(${mouse.x * 18}px, ${mouse.y * 10}px)`,
          transition: 'transform 0.1s ease',
        }}
      >
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 0.4, letterSpacing: '0.4em' }}
          transition={{ delay: 0.5, duration: 1.5, ease: [0.16,1,0.3,1] }}
          className="font-mono text-xs text-ghost uppercase mb-8 tracking-[0.4em]"
        >
          an inner world
        </motion.p>

        {/* Main name — glitch on hover */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-6xl md:text-8xl lg:text-[7rem] text-mist leading-none mb-6 tracking-wide"
          style={{ textShadow: '0 0 80px rgba(26,107,255,0.15), 0 0 160px rgba(26,107,255,0.06)' }}
        >
          Abhijit
          <br />
          <span className="font-light italic text-ghost">Singha</span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-ghost opacity-40" />
          <div className="w-1 h-1 rounded-full bg-soul opacity-60 animate-heartbeat" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-ghost opacity-40" />
        </motion.div>

        {/* Typewriter emotional line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="font-serif italic text-lg md:text-xl text-ash max-w-xl mx-auto leading-relaxed"
        >
          <TypewriterText
            text="A soul quietly walking through life, feeling invisible to everyone around him."
            delay={2200}
            speed={38}
          />
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.35, y: 0 }}
          transition={{ delay: 4.5, duration: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <p className="font-mono text-xs text-ash tracking-widest uppercase">enter his world</p>
          <div className="flex flex-col items-center gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-px h-4 bg-ghost opacity-40"
                animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [1, 1.3, 1] }}
                transition={{ delay: i * 0.2, duration: 1.6, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Corner atmospheric text ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 3, duration: 2 }}
        className="absolute bottom-8 left-8 font-mono text-xs text-ash"
      >
        <p>3:17 AM</p>
        <p className="mt-1 opacity-60">raining outside</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 3.2, duration: 2 }}
        className="absolute bottom-8 right-8 font-mono text-xs text-ash text-right"
      >
        <p>memories: intact</p>
        <p className="mt-1 opacity-60">feelings: unresolved</p>
      </motion.div>
    </section>
  )
}
