import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function SceneDivider({ label, number }) {
  const { ref, isInView } = useInView({ threshold: 0.5 })
  return (
    <div ref={ref} className="relative py-8 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 30%, rgba(155,35,53,0.15) 70%, transparent)', transformOrigin: 'center' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 flex items-center gap-4 px-5 py-2 rounded-full"
        style={{ background: 'rgba(10,10,15,0.95)', border: '1px solid rgba(201,168,76,0.12)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
      >
        <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(155,35,53,0.6)' }} />
        <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(190,165,120,0.55)' }}>
          {number} — {label}
        </span>
        <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,168,76,0.6)' }} />
      </motion.div>
    </div>
  )
}
