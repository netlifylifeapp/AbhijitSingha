import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { DIARY_ENTRIES } from '../../data/storyData'

// ─── DiaryPage ────────────────────────────────────────────────────────────────
// Individual diary entry that expands on click — like opening a journal page

function DiaryPage({ entry, index, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: index * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={onToggle}
      data-cursor
      className="cursor-pointer relative"
    >
      <motion.div
        layout
        className="glass rounded-2xl overflow-hidden"
        style={{
          borderColor: isOpen ? 'rgba(139, 173, 212, 0.15)' : 'rgba(30, 45, 64, 0.8)',
          boxShadow: isOpen
            ? '0 0 40px rgba(26, 107, 255, 0.06), inset 0 0 30px rgba(0,0,0,0.2)'
            : 'none',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Page header — always visible */}
        <div className="flex items-center justify-between p-5 md:p-6">
          <div>
            <p className="font-mono text-xs text-soul opacity-70 mb-1 tracking-widest uppercase">
              diary
            </p>
            <p className="font-serif italic text-sm text-ash">{entry.date}</p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 h-6 flex items-center justify-center opacity-30"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M1 6H11" stroke="#8badd4" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* Page body — reveals on open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6 border-t border-dim/40">
                {/* Ruled lines decoration */}
                <div className="mt-5 mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dim to-transparent opacity-50" />
                  <div className="w-1 h-1 rounded-full bg-soul opacity-30" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dim to-transparent opacity-50" />
                </div>

                {/* Entry text — rendered as paragraphs */}
                <div className="space-y-4">
                  {entry.entry.split('\n\n').map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.7 }}
                      className="font-serif text-sm md:text-base text-ash leading-[1.85] tracking-wide"
                      style={{ color: i === 0 ? '#8badd4' : '#4a5568' }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 flex justify-end"
                >
                  <p className="font-display italic text-sm text-ghost opacity-40">
                    — Abhijit
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── SceneDiary ───────────────────────────────────────────────────────────────
// Scene 5: The diary — private thoughts, never meant to be read

export default function SceneDiary() {
  const [openEntry, setOpenEntry] = useState(null)
  const sectionRef = useRef(null)

  const toggle = (i) => setOpenEntry(prev => prev === i ? null : i)

  return (
    <section
      ref={sectionRef}
      className="scene-section relative flex flex-col items-center justify-center py-32 px-6"
    >
      {/* Ruled paper texture — subtle horizontal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(139,173,212,0.5) 31px, rgba(139,173,212,0.5) 32px)',
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
        <p className="font-mono text-xs tracking-[0.4em] text-ghost uppercase mb-4">Scene V</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-mist mb-6">
          What He Never Said Aloud
        </h2>
        <p className="font-serif italic text-ash text-lg max-w-lg mx-auto leading-relaxed opacity-80">
          Private pages. Written at 3 AM. Never meant to be found.
        </p>
        <p className="font-mono text-xs text-ash mt-4 opacity-40">tap to open</p>
      </motion.div>

      {/* Diary entries */}
      <div className="relative z-10 w-full max-w-xl space-y-4">
        {DIARY_ENTRIES.map((entry, i) => (
          <DiaryPage
            key={i}
            entry={entry}
            index={i}
            isOpen={openEntry === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* Bottom emotional line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="relative z-10 text-center mt-16 max-w-md mx-auto"
      >
        <p className="font-serif italic text-xs text-ash leading-relaxed opacity-50">
          These were never published. They were never meant to be.<br />
          But some words need to exist somewhere, even if no one reads them.
        </p>
      </motion.div>
    </section>
  )
}
