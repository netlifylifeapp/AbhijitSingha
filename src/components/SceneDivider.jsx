import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function SceneDivider({ label, number }) {
  const { ref, isInView } = useInView({ threshold: 0.5 })

  return (
    <div ref={ref} className="relative py-8 flex items-center justify-center overflow-hidden">
      {/* Horizontal line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(26,111,255,0.15) 20%, rgba(0,212,255,0.1) 50%, rgba(26,111,255,0.15) 80%, transparent)',
          transformOrigin: 'center'
        }}
      />

      {/* Center badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 flex items-center gap-4 px-5 py-2 glass-panel rounded-full"
      >
        <div className="w-1 h-1 rounded-full bg-[rgba(0,212,255,0.5)]" />
        <span className="font-mono text-[8px] tracking-[0.4em] text-[rgba(80,110,160,0.45)] uppercase">
          {number} — {label}
        </span>
        <div className="w-1 h-1 rounded-full bg-[rgba(0,212,255,0.5)]" />
      </motion.div>
    </div>
  )
}
