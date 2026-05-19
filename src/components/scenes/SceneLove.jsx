import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EMOTIONAL_QUOTES } from '../../data/storyData'
import { useMouseParallax } from '../../hooks/useMouseParallax'

// ─── SceneLove ────────────────────────────────────────────────────────────────
// Scene 4: The love story — the most emotionally dense scene
// Quotes reveal on scroll. A pulsing heart at the center. Layered parallax depth.

const LOVE_QUOTES = EMOTIONAL_QUOTES.filter(q => q.scene === 'love' || q.scene === 'regret')

// Floating memory fragment component
function MemoryFragment({ text, x, y, delay, opacity }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute font-serif italic text-xs text-ghost leading-relaxed max-w-32 text-center pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, opacity: 0 }}
    >
      {text}
    </motion.div>
  )
}

export default function SceneLove() {
  const sectionRef  = useRef(null)
  const mouse       = useMouseParallax(0.05)
  const [hovered, setHovered] = useState(false)

  return (
    <section
      ref={sectionRef}
      className="scene-section relative flex flex-col items-center justify-center py-40 px-6 overflow-hidden"
    >
      {/* Atmospheric soul-colored glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 60% at ${50 + mouse.x * 6}% ${45 + mouse.y * 5}%, rgba(200,168,224,0.05) 0%, transparent 70%)`,
        }}
      />

      {/* Floating background fragments */}
      <div className="absolute inset-0 pointer-events-none">
        <MemoryFragment text="she texted first once"       x={8}  y={20} delay={0.5} opacity={0.15} />
        <MemoryFragment text="he memorized her favourite song" x={72} y={15} delay={0.8} opacity={0.12} />
        <MemoryFragment text="2:34 AM — still awake thinking of her" x={5} y={65} delay={1.1} opacity={0.10} />
        <MemoryFragment text="she called him 'too much'"   x={75} y={60} delay={0.6} opacity={0.13} />
        <MemoryFragment text="he never agreed"             x={82} y={78} delay={1.3} opacity={0.09} />
        <MemoryFragment text="he was just afraid"          x={12} y={82} delay={0.9} opacity={0.11} />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20 relative z-10"
        style={{ transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)` }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-soul uppercase mb-4 opacity-70">Scene III</p>
        <h2 className="font-display text-4xl md:text-6xl font-light mb-2"
          style={{ color: '#d4b8e8' }}
        >
          She Was Everything
        </h2>
        <p className="font-display italic text-xl text-ash">And he was too aware of it.</p>
      </motion.div>

      {/* Central heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor
      >
        <motion.div
          animate={{
            scale: hovered ? [1, 1.2, 1] : [1, 1.08, 1],
            opacity: hovered ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: hovered ? 0.8 : 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(200,168,224,0.15) 0%, rgba(200,168,224,0.03) 60%, transparent 100%)',
            border: '1px solid rgba(200,168,224,0.2)',
            boxShadow: hovered
              ? '0 0 60px rgba(200,168,224,0.3), 0 0 120px rgba(200,168,224,0.1)'
              : '0 0 30px rgba(200,168,224,0.1)',
          }}
        >
          <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
            <path
              d="M14 24s-12-7.5-12-14C2 6.5 5.5 3 9.5 3c2.1 0 4.1 1 5.5 2.6C16.4 4 18.4 3 20.5 3 24.5 3 26 6.5 26 10c0 6.5-12 14-12 14z"
              stroke="#c8a8e0"
              strokeWidth="1"
              fill="rgba(200,168,224,0.08)"
            />
          </svg>
        </motion.div>

        {/* Pulse rings */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-soul/10"
            animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </motion.div>

      {/* Love quotes stack */}
      <div className="relative z-10 max-w-2xl w-full space-y-12">
        {LOVE_QUOTES.map((quote, i) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              delay: i * 0.1,
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-sm md:max-w-md p-6 glass rounded-2xl ${
                quote.scene === 'regret' ? 'border-ember/10' : 'border-soul/10'
              }`}
            >
              <div
                className="w-0.5 h-8 mb-4 rounded-full"
                style={{
                  background: quote.scene === 'regret'
                    ? 'linear-gradient(to bottom, #ff6b6b, transparent)'
                    : 'linear-gradient(to bottom, #c8a8e0, transparent)',
                }}
              />
              <p
                className="emotional-quote text-base md:text-lg leading-relaxed"
                style={{
                  color: quote.scene === 'regret' ? '#b8a0b0' : '#c0b4d4',
                }}
              >
                "{quote.text}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="relative z-10 text-center mt-20 max-w-lg mx-auto"
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-soul/30 mx-auto mb-8" />
        <p className="font-serif italic text-ash text-base leading-relaxed opacity-70">
          He confessed once. She was kind about it.<br />
          That kindness made it harder, somehow.
        </p>
      </motion.div>
    </section>
  )
}
