import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from '../ui/TypewriterText'

// ─── SceneEnding ──────────────────────────────────────────────────────────────
// Final scene: quiet resolution — not hope, not despair, just existence.
// The most restrained, emotionally precise scene.

const ENDING_LINES = [
  "He is still here.",
  "Quietly.",
  "Carrying everything no one knows about.",
  "Getting through Tuesday.",
  "Hoping Wednesday is different.",
  "It usually isn't.",
  "But he shows up anyway.",
  "That, perhaps, is enough.",
]

export default function SceneEnding() {
  const sectionRef = useRef(null)
  const [lineIndex, setLineIndex] = useState(0)

  const advance = () => {
    setLineIndex(i => Math.min(i + 1, ENDING_LINES.length - 1))
  }

  return (
    <section
      ref={sectionRef}
      className="scene-section relative flex flex-col items-center justify-center py-40 px-6 min-h-screen"
    >
      {/* Deepest atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 40% 50% at 50% 50%, rgba(7,20,40,0.8) 0%, #020408 100%)',
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="text-center mb-24 relative z-10"
      >
        <p className="font-mono text-xs tracking-[0.4em] text-ghost uppercase mb-4 opacity-50">Scene VI</p>
        <h2 className="font-display text-3xl md:text-5xl font-light text-mist/60">
          He's Still Here
        </h2>
      </motion.div>

      {/* Sequential line reveal */}
      <div className="relative z-10 text-center max-w-lg mx-auto mb-16">
        <div className="space-y-6">
          {ENDING_LINES.slice(0, lineIndex + 1).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: i === lineIndex ? 1 : 0.25, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-light leading-relaxed ${
                i === lineIndex
                  ? 'text-2xl md:text-3xl text-mist'
                  : 'text-lg text-ash'
              }`}
              style={{ filter: i === lineIndex ? 'none' : 'blur(0.5px)' }}
            >
              {i === lineIndex ? (
                <TypewriterText
                  text={line}
                  speed={50}
                  delay={200}
                  onComplete={i < ENDING_LINES.length - 1 ? () => setTimeout(advance, 1200) : undefined}
                />
              ) : line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Final signature — appears after all lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: lineIndex >= ENDING_LINES.length - 1 ? 1 : 0 }}
        transition={{ duration: 2, delay: 1 }}
        className="relative z-10 text-center"
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-ghost/30 to-transparent mx-auto mb-8" />

        <p className="font-display italic text-5xl md:text-7xl font-light text-ghost/20 mb-4">
          Abhijit Singha
        </p>

        <p className="font-mono text-xs text-ash/40 tracking-widest uppercase mb-12">
          a quiet existence · ongoing
        </p>

        {/* Heartbeat at the very end */}
        <motion.div
          animate={{ opacity: lineIndex >= ENDING_LINES.length - 1 ? [0.2, 0.5, 0.2] : 0 }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center justify-center gap-2"
        >
          <div className="h-px w-8 bg-soul/20" />
          <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
            <path
              d="M0 10 L6 10 L8 3 L10 17 L12 6 L14 14 L16 10 L32 10"
              stroke="#c8a8e0"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
          <div className="h-px w-8 bg-soul/20" />
        </motion.div>
      </motion.div>

      {/* Footer metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-8 left-0 right-0 flex justify-between px-8 pointer-events-none"
      >
        <p className="font-mono text-xs text-ash">archive // personal</p>
        <p className="font-mono text-xs text-ash">some things stay unfinished</p>
      </motion.div>
    </section>
  )
}
