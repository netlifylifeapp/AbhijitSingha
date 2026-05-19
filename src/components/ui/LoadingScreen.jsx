import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── LoadingScreen ────────────────────────────────────────────────────────────
// Cinematic emotional intro — shown for ~3.5 seconds before reveal
// Feels like booting into someone's inner world

const LOADING_PHRASES = [
  "Loading memories…",
  "Counting unanswered messages…",
  "Finding the words he never said…",
  "Entering a quiet place…",
]

export default function LoadingScreen({ onComplete }) {
  const [phrase, setPhrase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Cycle through phrases
    const phraseInterval = setInterval(() => {
      setPhrase(p => (p + 1) % LOADING_PHRASES.length)
    }, 800)

    // Fake progress bar
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval)
          clearInterval(phraseInterval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 800)
          }, 300)
          return 100
        }
        // Non-linear progress for realism
        const increment = p < 70 ? Math.random() * 8 : Math.random() * 3
        return Math.min(p + increment, 100)
      })
    }, 100)

    return () => {
      clearInterval(phraseInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Atmospheric background glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-96 h-96 rounded-full opacity-10 animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, #1a6bff 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          {/* VHS scanlines */}
          <div className="scanlines absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-8">

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-mono text-xs tracking-[0.4em] text-ghost uppercase mb-3">
                a personal archive
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-light text-mist tracking-wide">
                Abhijit Singha
              </h1>
            </motion.div>

            {/* Breathing line separator */}
            <motion.div
              className="animate-breathe"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-ghost to-transparent" />
            </motion.div>

            {/* Loading phrase */}
            <motion.p
              key={phrase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-serif italic text-sm text-ash text-center"
            >
              {LOADING_PHRASES[phrase]}
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-px bg-dim overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon to-soul"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Heartbeat pulse */}
            <motion.div
              className="animate-heartbeat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.2 }}
            >
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                <path
                  d="M0 8 L4 8 L6 2 L8 14 L10 4 L12 12 L14 8 L24 8"
                  stroke="#c8a8e0"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
