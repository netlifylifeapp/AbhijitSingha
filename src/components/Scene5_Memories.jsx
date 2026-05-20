import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import gsap from 'gsap'

const fragments = [
  { text: 'the laugh that sounded like music', x: 12, y: 15, rot: -5, opacity: 0.55, size: 'sm' },
  { text: 'her name in his contacts', x: 65, y: 8, rot: 3, opacity: 0.45, size: 'xs' },
  { text: '3am conversations', x: 30, y: 38, rot: -3, opacity: 0.6, size: 'md' },
  { text: 'that one evening near the chai stall', x: 68, y: 30, rot: 6, opacity: 0.4, size: 'sm' },
  { text: 'the screenshot he never deleted', x: 8, y: 58, rot: -8, opacity: 0.5, size: 'xs' },
  { text: 'how she had texted first sometimes', x: 50, y: 55, rot: 2, opacity: 0.65, size: 'md' },
  { text: 'rain and her voice on call', x: 76, y: 62, rot: -4, opacity: 0.38, size: 'sm' },
  { text: 'a birthday wish he read 40 times', x: 20, y: 78, rot: 5, opacity: 0.5, size: 'xs' },
  { text: 'the silence after the rejection', x: 55, y: 78, rot: -2, opacity: 0.7, size: 'md' },
  { text: 'when she still trusted him', x: 80, y: 85, rot: 7, opacity: 0.3, size: 'xs' },
]

const sizeMap = { xs: 'text-[9px]', sm: 'text-[11px]', md: 'text-[12px]' }

function MemoryFragment({ frag, index, isInView }) {
  const fragRef = useRef(null)

  useEffect(() => {
    if (!isInView || !fragRef.current) return
    gsap.fromTo(fragRef.current,
      { opacity: 0, scale: 0.7, y: 20 },
      { opacity: frag.opacity, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: index * 0.1 + 0.3 }
    )
    gsap.to(fragRef.current, {
      y: `random(-12, 12)`,
      x: `random(-6, 6)`,
      rotation: frag.rot + gsap.utils.random(-3, 3),
      duration: gsap.utils.random(5, 9),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2
    })
  }, [isInView])

  return (
    <div
      ref={fragRef}
      className="absolute cursor-default select-none"
      style={{ left: `${frag.x}%`, top: `${frag.y}%`, opacity: 0 }}
    >
      <motion.div
        whileHover={{ scale: 1.08, opacity: 1 }}
        className={`memory-card px-3 py-2 ${sizeMap[frag.size]} font-serif italic`}
        style={{
          color: `rgba(220,200,160,${frag.opacity})`,
          transform: `rotate(${frag.rot}deg)`,
          maxWidth: '160px',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(8px)'
        }}
      >
        {frag.text}
      </motion.div>
    </div>
  )
}

export default function Scene5_Memories() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const tickerRef = useRef(null)

  useEffect(() => {
    if (!isInView || !tickerRef.current) return
    gsap.to(tickerRef.current, {
      x: '-50%',
      duration: 35,
      ease: 'none',
      repeat: -1
    })
  }, [isInView])

  return (
    <section ref={ref} className="scene-section relative z-10 py-12" style={{ minHeight: '120vh' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(13,13,26,0.97) 0%, transparent 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-10">
          <div className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(155,35,53,0.45)' }}>chapter five</div>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-5" style={{ color: 'rgba(235,225,205,0.65)' }}>collapsing memories</h2>
          <p className="font-sans text-sm" style={{ color: 'rgba(160,140,100,0.45)' }}>fragments of what was. floating without weight.</p>
        </motion.div>
        <div className="relative w-full" style={{ height: '560px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 2 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="text-center px-8">
              <p className="font-serif text-2xl md:text-3xl italic leading-relaxed" style={{ color: 'rgba(220,200,160,0.3)', textShadow: '0 0 40px rgba(155,35,53,0.1)' }}>
                "He did not fear losing the world.<br />He feared losing her attention<br />for even a moment."
              </p>
            </div>
          </motion.div>
          {fragments.map((frag, i) => (
            <MemoryFragment key={i} frag={frag} index={i} isInView={isInView} />
          ))}
        </div>
        <div className="overflow-hidden border-t border-b py-3 mt-4" style={{ borderColor: 'rgba(201,168,76,0.06)' }}>
          <div ref={tickerRef} className="flex gap-10 whitespace-nowrap" style={{ width: 'max-content' }}>
            {[...Array(4)].fill([
              'unread messages', '∘', 'missed calls', '∘', 'deleted conversations',
              '∘', 'unsent texts', '∘', 'late night regrets', '∘', 'unanswered questions',
              '∘', 'broken promises', '∘', 'fading photos', '∘', 'silent birthday wishes'
            ]).flat().map((item, i) => (
              <span key={i} className="font-mono text-[8px] tracking-widest" style={{ color: 'rgba(130,110,80,0.3)' }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
