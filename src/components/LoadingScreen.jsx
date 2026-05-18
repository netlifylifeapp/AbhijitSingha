import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingLines = [
  'loading memories...',
  'retrieving lost conversations...',
  'reconstructing silence...',
  'entering his world...',
]

export default function LoadingScreen({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Cycle through lines
    const lineInterval = setInterval(() => {
      setLineIndex(i => (i + 1) % loadingLines.length)
    }, 900)

    // Progress bar
    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progInterval)
          clearInterval(lineInterval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 800)
          }, 300)
          return 100
        }
        return p + 1.2
      })
    }, 38)

    return () => {
      clearInterval(lineInterval)
      clearInterval(progInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#03030a' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,111,255,0.06) 0%, transparent 70%)'
            }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-12">

            {/* Breathing circle */}
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-20 h-20 rounded-full border border-[rgba(0,212,255,0.2)] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-[rgba(0,212,255,0.3)] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#00d4ff] opacity-60"
                    style={{ boxShadow: '0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.3)' }}
                  />
                </div>
              </div>
              {/* Orbit ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[rgba(26,111,255,0.15)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-[2px] left-1/2 w-1 h-1 rounded-full bg-[rgba(0,212,255,0.6)] -translate-x-1/2" />
              </motion.div>
            </motion.div>

            {/* Name */}
            <div className="text-center">
              <div className="font-mono text-xs tracking-[0.4em] text-[rgba(0,212,255,0.4)] mb-3 uppercase">
                memory archive
              </div>
              <div
                className="font-serif text-4xl md:text-5xl text-[rgba(220,230,255,0.7)] tracking-wide"
                style={{ textShadow: '0 0 40px rgba(26,111,255,0.2)' }}
              >
                Abhijit Singha
              </div>
            </div>

            {/* Loading line */}
            <div className="w-64 flex flex-col items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lineIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-[10px] text-[rgba(100,140,200,0.5)] tracking-widest"
                >
                  {loadingLines[lineIndex]}
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="w-full h-[1px] bg-[rgba(26,111,255,0.1)] relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, rgba(26,111,255,0.5), rgba(0,212,255,0.8))',
                    boxShadow: '0 0 8px rgba(0,212,255,0.5)'
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <div className="font-mono text-[9px] text-[rgba(60,100,160,0.4)] tracking-widest">
                {Math.floor(progress)}%
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-[rgba(26,111,255,0.2)]" />
          <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-[rgba(26,111,255,0.2)]" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-[rgba(26,111,255,0.2)]" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-[rgba(26,111,255,0.2)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
