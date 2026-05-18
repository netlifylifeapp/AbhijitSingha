import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const timeline = [
  {
    phase: 'the beginning',
    icon: '✦',
    color: 'rgba(0,212,255,0.5)',
    text: 'It started quietly. Not with fireworks but with the specific warmth of someone who made you feel less alone in a world that never stopped moving.',
    detail: 'She appeared, and slowly his internal world rearranged itself around her without asking permission.'
  },
  {
    phase: 'the falling',
    icon: '↓',
    color: 'rgba(167,139,250,0.5)',
    text: 'He fell the way most people fall — gradually, then all at once. He noticed everything. Her silences. Her laughter. The way she said goodbye like she might mean it permanently.',
    detail: 'He cared not loudly, but in the quiet consuming way that slowly becomes part of someones soul.
  },
  {
    phase: 'the confession',
    icon: '◌',
    color: 'rgba(255,179,71,0.5)',
    text: 'He told her how he felt. She was honest with him. She did not feel the same way. He said he understood. He did not. He just said it because the alternative was worse.',
    detail: 'Rejection is not the end. Sometimes it is the beginning of a slower heartbreak.'
  },
  {
    phase: 'the unraveling',
    icon: '⌗',
    color: 'rgba(255,107,157,0.5)',
    text: 'Even after rejection, his feelings did not disappear. They just became quieter. Heavier. He started noticing things he should not have — who she talked to, who she laughed with.',
    detail: 'Not because he wanted control. But because he was drowning inside his own thoughts with no way out.'
  },
  {
    phase: 'the damage',
    icon: '×',
    color: 'rgba(255,80,80,0.4)',
    text: 'Some people break hearts through hatred. He broke hers through trying too hard to hold on. Slowly, the warmth she had shown him turned to distance. He watched it happen and could not stop it.',
    detail: '"I cared too much. And in doing so, I gave her a reason to care less." — what he never said aloud.'
  },
  {
    phase: 'the after',
    icon: '—',
    color: 'rgba(80,110,160,0.4)',
    text: 'She moved forward with life while he stayed behind inside old conversations and unfinished feelings. She was never just another person to him. She was the place his heart returned to every night.',
    detail: 'She was the only person who ever made loneliness feel less heavy. And now that weight had a name.'
  }
]

function HeartbeatLine({ isInView }) {
  return (
    <div className="w-full overflow-hidden">
      <svg width="100%" height="48" viewBox="0 0 600 48" preserveAspectRatio="none">
        <motion.polyline
          points="0,24 80,24 100,8 120,40 140,4 160,44 180,24 280,24 300,12 320,36 340,24 440,24 460,28 480,20 500,24 600,24"
          fill="none"
          stroke="rgba(255,107,157,0.3)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
        />
      </svg>
    </div>
  )
}

function TimelineCard({ item, index, isInView }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15 + 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setOpen(!open)}
      className="relative cursor-pointer"
    >
      {/* Connector dot */}
      <div className="flex items-start gap-5">
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm mt-1 transition-all duration-300"
            style={{
              background: open ? `${item.color}20` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${open ? item.color : 'rgba(255,255,255,0.08)'}`,
              color: open ? item.color : 'rgba(150,175,220,0.4)',
              boxShadow: open ? `0 0 20px ${item.color}40` : 'none'
            }}
          >
            {item.icon}
          </div>
          {index < timeline.length - 1 && (
            <div className="w-px flex-1 mt-2" style={{ background: 'rgba(255,255,255,0.05)', minHeight: '40px' }} />
          )}
        </div>

        <div className="flex-1 pb-8">
          <div className="font-mono text-[9px] tracking-[0.3em] mb-2 uppercase transition-colors duration-300"
            style={{ color: open ? item.color : 'rgba(100,130,180,0.4)' }}>
            {item.phase}
          </div>
          <p className="font-serif text-[14px] md:text-[15px] text-[rgba(190,210,250,0.65)] leading-relaxed italic mb-2">
            {item.text}
          </p>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-3 pl-4 py-3 border-l"
                  style={{ borderColor: item.color }}
                >
                  <p className="font-sans text-[12px] text-[rgba(150,180,230,0.55)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="font-mono text-[8px] text-[rgba(80,100,140,0.3)] mt-2">
            {open ? '— click to collapse' : '— click to expand'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Scene7_Love() {
  const { ref, isInView } = useInView({ threshold: 0.05 })
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShowPulse(true), 2000)
      return () => clearTimeout(t)
    }
  }, [isInView])

  return (
    <section ref={ref} className="scene-section relative z-10 py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(8,3,18,0.98) 0%, transparent 100%)'
        }}
      />

      {/* Rose glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '15%',
          top: '25%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,107,157,0.04) 0%, transparent 70%)',
          borderRadius: '50%'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-4"
        >
          <div className="font-mono text-[9px] tracking-[0.5em] text-[rgba(255,107,157,0.35)] uppercase mb-4">
            chapter seven
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[rgba(200,215,255,0.65)] italic mb-3">
            the story that stayed
          </h2>
        </motion.div>

        {/* Heartbeat line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-12"
        >
          {showPulse && <HeartbeatLine isInView={isInView} />}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {timeline.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Central quote — the most important */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 1.5 }}
          className="mt-10 text-center"
        >
          <div className="w-8 h-px bg-[rgba(255,107,157,0.3)] mx-auto mb-8" />
          <blockquote
            className="font-serif text-xl md:text-3xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'rgba(220,230,255,0.55)', textShadow: '0 0 40px rgba(255,107,157,0.1)' }}
          >
            "Some people break hearts through hatred.<br />
            He broke hers while trying too hard<br />
            to protect his own."
          </blockquote>
          <div className="mt-8 w-8 h-px bg-[rgba(255,107,157,0.3)] mx-auto" />
        </motion.div>
      </div>
    </section>
  )
}
