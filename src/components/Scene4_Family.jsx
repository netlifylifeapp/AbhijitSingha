import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import gsap from 'gsap'

const familyMoments = [
  { title: 'dinner table', memory: 'Four people in the same room. Three different screens. Not one real conversation.', time: '8:30 PM, every night', feeling: 'invisible' },
  { title: 'the question', memory: 'How are you? they asked. He said fine. They nodded and looked away. Fine was always enough for them.', time: 'countless mornings', feeling: 'unheard' },
  { title: 'the room', memory: 'He would sit in his room for hours. No one knocked. No one wondered. Silence was the loudest thing in the house.', time: 'late nights', feeling: 'alone' },
  { title: 'the birthday', memory: 'They forgot what mattered to him. He smiled anyway. He had practiced that smile for years.', time: 'one october', feeling: 'forgotten' }
]

const feelingColors = { invisible: '#c42d42', unheard: '#4a7ab5', alone: '#8a6a2a', forgotten: '#c9a84c' }

function GlitchPhoto({ index }) {
  return (
    <div className="relative vhs-effect w-full aspect-square rounded-sm overflow-hidden" style={{ background: 'rgba(18,18,42,0.8)', border: '1px solid rgba(201,168,76,0.08)' }}>
      {[...Array(3)].map((_, i) => (
        <motion.div key={i} className="absolute left-0 right-0" style={{ top: `${25 + i * 20}%`, height: '8%', background: 'rgba(201,168,76,0.03)' }}
          animate={{ x: [0, -3, 2, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 2.5, repeatDelay: 7 }}
        />
      ))}
      <div className="absolute inset-4 flex flex-col gap-2 opacity-15">
        <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(201,168,76,0.4)' }} />
        <div className="h-2 rounded-full w-1/2" style={{ background: 'rgba(201,168,76,0.3)' }} />
        <div className="flex-1 rounded-sm" style={{ background: 'rgba(201,168,76,0.08)' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[7px] tracking-wider" style={{ color: 'rgba(160,140,100,0.25)' }}>[corrupted]</span>
      </div>
    </div>
  )
}

export default function Scene4_Family() {
  const { ref, isInView } = useInView()
  const cardsRef = useRef(null)

  useEffect(() => {
    if (!isInView || !cardsRef.current) return
    gsap.fromTo(cardsRef.current.children,
      { opacity: 0, y: 50, rotationX: 10 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15, delay: 0.3 }
    )
  }, [isInView])

  return (
    <section ref={ref} className="scene-section relative z-10 py-20">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(13,13,26,0.97) 0%, transparent 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-14">
          <div className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(155,35,53,0.45)' }}>chapter four</div>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-5" style={{ color: 'rgba(235,225,205,0.65)' }}>emotional distance</h2>
          <p className="font-sans text-sm" style={{ color: 'rgba(160,140,100,0.45)' }}>same house. different worlds.</p>
        </motion.div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {familyMoments.map((moment, i) => (
            <motion.div key={i} whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }} className="memory-card p-5 flex gap-5 transition-all duration-500">
              <div className="w-20 flex-shrink-0"><GlitchPhoto index={i} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(201,168,76,0.5)' }}>{moment.title}</span>
                  <span className="font-mono text-[7px] px-2 py-0.5 rounded-full" style={{ background: `${feelingColors[moment.feeling]}15`, border: `1px solid ${feelingColors[moment.feeling]}40`, color: feelingColors[moment.feeling] }}>{moment.feeling}</span>
                </div>
                <p className="font-serif text-[13px] italic leading-relaxed mb-2" style={{ color: 'rgba(210,195,165,0.6)' }}>{moment.memory}</p>
                <div className="font-mono text-[7px]" style={{ color: 'rgba(130,110,80,0.35)' }}>{moment.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1, duration: 1 }} className="mt-12 glass-panel p-6">
          <div className="font-mono text-[8px] tracking-wider uppercase mb-5" style={{ color: 'rgba(160,140,100,0.4)' }}>emotional proximity — family</div>
          {[
            { label: 'Physical distance', value: 5, note: 'same roof' },
            { label: 'Emotional distance', value: 92, note: 'galaxies apart' },
            { label: 'Conversations that matter', value: 4, note: 'per year' },
            { label: 'Times he felt truly seen', value: 2, note: 'ever' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mb-4 last:mb-0">
              <div className="w-40 flex-shrink-0 font-sans text-[11px]" style={{ color: 'rgba(180,160,120,0.5)' }}>{item.label}</div>
              <div className="flex-1 h-px relative" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div className="absolute left-0 top-0 h-full" initial={{ width: 0 }} animate={isInView ? { width: `${item.value}%` } : {}} transition={{ delay: 1.2 + i * 0.15, duration: 1.5, ease: 'power2.out' }} style={{ background: 'linear-gradient(90deg, rgba(155,35,53,0.6), rgba(201,168,76,0.5))' }} />
              </div>
              <div className="w-24 flex-shrink-0 font-mono text-[7px] text-right" style={{ color: 'rgba(130,110,80,0.4)' }}>{item.note}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
