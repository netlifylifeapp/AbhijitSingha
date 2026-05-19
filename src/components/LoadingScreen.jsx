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
    const lineInterval = setInterval(() => {
      setLineIndex(i => (i + 1) % loadingLines.length)
    }, 900)
    const progInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progInterval)
          clearInterval(lineInterval)
          setTimeout(() => { setDone(true); setTimeout(onComplete, 800) }, 300)
          return 100
        }
        return p + 1.2
      })
    }, 38)
    return () => { clearInterval(lineInterval); clearInterval(progInterval) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#f2ebe0' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grain-overlay" />
          <div className="vignette" />
          <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-[rgba(138,106,0,0.3)]" />
          <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-[rgba(138,106,0,0.3)]" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-[rgba(138,106,0,0.3)]" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-[rgba(138,106,0,0.3)]" />
          <div className="relative z-10 flex flex-col items-center gap-12">
            <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="w-20 h-20 rounded-full border border-[rgba(138,106,0,0.2)] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-[rgba(139,26,26,0.25)] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full" style={{ background: 'rgba(139,26,26,0.5)', boxShadow: '0 0 16px rgba(139,26,26,0.3)' }} />
                </div>
              </div>
            </motion.div>
            <div className="text-center">
              <div className="font-mono text-[9px] tracking-[0.4em] text-[rgba(138,106,0,0.45)] mb-3 uppercase">memory archive</div>
              <div className="font-serif text-4xl md:text-5xl italic tracking-wide" style={{ color: 'rgba(25,12,8,0.75)', textShadow: '0 0 30px rgba(139,26,26,0.1)' }}>
                Abhijit Singha
              </div>
            </div>
            <div className="w-64 flex flex-col items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.div key={lineIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4 }} className="font-mono text-[10px] text-[rgba(120,80,40,0.45)] tracking-widest">
                  {loadingLines[lineIndex]}
                </motion.div>
              </AnimatePresence>
              <div className="w-full h-[1px] bg-[rgba(138,106,0,0.12)] relative overflow-hidden">
                <motion.div className="absolute left-0 top-0 h-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, rgba(139,26,26,0.5), rgba(138,106,0,0.7))', boxShadow: '0 0 8px rgba(138,106,0,0.3)' }} />
              </div>
              <div className="font-mono text-[9px] text-[rgba(120,80,40,0.35)] tracking-widest">{Math.floor(progress)}%</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
