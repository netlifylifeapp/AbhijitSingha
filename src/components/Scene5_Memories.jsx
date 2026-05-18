import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fragments = [
  { text: 'the laugh that sounded like music', x: 12, y: 15, rot: -5, opacity: 0.55, size: 'sm' },
  { text: 'her name in his contacts', x: 65, y: 8, rot: 3, opacity: 0.45, size: 'xs' },
  { text: '3am conversations', x: 30, y: 38, rot: -3, opacity: 0.6, size: 'md' },
  { text: 'that one evening near the chai stall', x: 70, y: 30, rot: 6, opacity: 0.4, size: 'sm' },
  { text: 'the screenshot he never deleted', x: 8, y: 58, rot: -8, opacity: 0.5, size: 'xs' },
  { text: 'how she had text first sometimes', x: 50, y: 55, rot: 2, opacity: 0.65, size: 'md' },
  { text: 'rain and her voice on call', x: 78, y: 62, rot: -4, opacity: 0.38, size: 'sm' },
  { text: 'a birthday wish he read 40 times', x: 20, y: 78, rot: 5, opacity: 0.5, size: 'xs' },
  { text: 'the silence after the rejection', x: 55, y: 78, rot: -2, opacity: 0.7, size: 'md' },
  { text: 'when she still trusted him', x: 82, y: 85, rot: 7, opacity: 0.3, size: 'xs' },
]

function MemoryFragment({ frag, index, isInView }) {
  const sizeMap = { xs: 'text-[10px]', sm: 'text-[11px]', md: 'text-[12px]', lg: 'text-[13px]' }
  const duration = 6 + (index % 3) * 2
  const yAnim = index % 2 === 0 ? [-6, 4, -6] : [5, -3, 5]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? {
        opacity: frag.opacity,
        scale: 1,
        y: yAnim,
      } : {}}
      transition={{
        opacity: { delay: index * 0.12, duration: 1.2 },
        scale: { delay: index * 0.12, duration: 1.2 },
        y: { duration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }
      }}
      className="absolute cursor-default select-none"
      style={{ left: `${frag.x}%`, top: `${frag.y}%` }}
    >
      <div
        className={`memory-card px-3 py-2 ${sizeMap[frag.size]} font-serif italic`}
        style={{
          color: `rgba(180,210,255,${frag.opacity})`,
          transform: `rotate(${frag.rot}deg)`,
          maxWidth: '160px',
          backdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap'
        }}
      >
        {frag.text}
      </div>
    </motion.div>
  )
}

export default function Scene5_Memories() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section ref={ref} className="scene-section relative z-10 py-12" style={{ minHeight: '120vh' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(4,4,18,0.97) 0%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-8 md:mb-14"
        >
          <div className="font-mono text-[9px] tracking-[0.5em] text-[rgba(0,212,255,0.3)] uppercase mb-4">
            chapter five
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[rgba(200,215,255,0.65)] italic mb-5">
            collapsing memories
          </h2>
          <p className="font-sans text-sm text-[rgba(120,150,200,0.4)] max-w-xs mx-auto">
            fragments of what was. floating without weight.
          </p>
        </motion.div>

        {/* Fragment field */}
        <div className="relative w-full" style={{ height: '560px' }}>
          {/* Central emotional quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 2 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="text-center px-8">
              <div
                className="font-serif text-2xl md:text-3xl text-[rgba(220,230,255,0.35)] italic leading-relaxed"
                style={{ textShadow: '0 0 40px rgba(26,111,255,0.2)' }}
              >
                "He did not fear losing the world.<br />
                He feared losing her attention<br />
                for even a moment."
              </div>
            </div>
          </motion.div>

          {/* Floating fragments */}
          {fragments.map((frag, i) => (
            <MemoryFragment key={i} frag={frag} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Scrolling memory ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="overflow-hidden border-t border-b border-[rgba(26,111,255,0.08)] py-3 mt-6"
        >
          <motion.div
            animate={{ x: [0, -2400] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...Array(3)].fill([
              'unread messages', '∘', 'missed calls', '∘', 'deleted conversations',
              '∘', 'unsent texts', '∘', 'late night regrets', '∘', 'unanswered questions',
              '∘', 'broken promises', '∘', 'fading photos', '∘', 'silent birthday wishes'
            ]).flat().map((item, i) => (
              <span
                key={i}
                className="font-mono text-[9px] tracking-widest text-[rgba(80,110,160,0.3)]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
