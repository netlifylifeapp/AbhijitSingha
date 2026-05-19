import { useRef } from 'react'
import { motion } from 'framer-motion'

// ─── SceneFamily ──────────────────────────────────────────────────────────────
// Scene 4b: Surrounded but alone — the emotional distance within family
// Glitched family photo concept with emotional layering

const FAMILY_MOMENTS = [
  {
    label:   "Dinner table",
    caption: "Everyone was there. No one was present.",
    icon:    "🍽",
  },
  {
    label:   "Birthday morning",
    caption: "'Happy birthday beta.' Then silence. No one asked how the year felt.",
    icon:    "🕯",
  },
  {
    label:   "The house at night",
    caption: "Every room was occupied. He was the only one awake, alone in a crowd.",
    icon:    "🌙",
  },
  {
    label:   "Family photo",
    caption: "Everyone smiled perfectly for the camera. No one noticed his eyes.",
    icon:    "📷",
  },
]

export default function SceneFamily() {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      className="scene-section relative flex flex-col items-center justify-center py-32 px-6"
    >
      {/* Background: faint family silhouette suggestion */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(4,13,26,0) 0%, rgba(2,4,8,0.4) 100%)',
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 relative z-10"
      >
        <p className="font-mono text-xs tracking-[0.4em] text-ghost uppercase mb-4">Scene IV</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-mist mb-6">
          Surrounded But Alone
        </h2>
        <p className="font-serif italic text-ash text-lg max-w-lg mx-auto leading-relaxed">
          "He never lacked people. He lacked the kind of presence that makes you feel seen."
        </p>
      </motion.div>

      {/* Family moment cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {FAMILY_MOMENTS.map((moment, i) => (
          <motion.div
            key={moment.label}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ delay: i * 0.18, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-6 group"
          >
            {/* Glitch icon on hover */}
            <div className="text-2xl mb-4 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
              {moment.icon}
            </div>

            <h3 className="font-body text-sm text-mist mb-3 font-medium tracking-wide">
              {moment.label}
            </h3>

            <p className="font-serif italic text-xs text-ash leading-relaxed">
              {moment.caption}
            </p>

            {/* Subtle bottom glitch line on hover */}
            <motion.div
              className="mt-4 h-px bg-gradient-to-r from-ghost/20 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Central emotional quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1.4 }}
        className="relative z-10 text-center mt-16 max-w-lg mx-auto px-6"
      >
        <div className="glass rounded-2xl p-8 border-soul/10">
          <p className="emotional-quote text-lg md:text-xl text-mist/70 leading-relaxed">
            "He smiles outside while silently collapsing inside —<br />
            not because he's strong, but because he doesn't want<br />
            to be anyone's burden."
          </p>
        </div>
      </motion.div>
    </section>
  )
}
