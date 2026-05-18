import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const familyMoments = [
  {
    title: 'dinner table',
    memory: 'Four people in the same room. Three different screens. Not one real conversation.',
    time: '8:30 PM, every night',
    feeling: 'invisible'
  },
  {
    title: 'the question',
    memory: '"How are you?" they asked. He said "fine." They nodded and looked away. Fine was always enough for them.',
    time: 'countless mornings',
    feeling: 'unheard'
  },
  {
    title: 'the room',
    memory: 'He would sit in his room for hours. No one knocked. No one wondered. Silence was the loudest thing in the house.',
    time: 'late nights',
    feeling: 'alone'
  },
  {
    title: 'the birthday',
    memory: 'They forgot what mattered to him. He smiled anyway. He had practiced that smile for years.',
    time: 'one october',
    feeling: 'forgotten'
  }
]

function GlitchPhoto({ index }) {
  const colors = ['rgba(26,111,255,0.06)', 'rgba(255,107,157,0.05)', 'rgba(255,179,71,0.05)', 'rgba(167,139,250,0.05)']

  return (
    <div className="relative vhs-effect">
      <div
        className="w-full aspect-square rounded-sm flex items-center justify-center overflow-hidden"
        style={{ background: colors[index % colors.length], border: '1px solid rgba(255,255,255,0.04)' }}
      >
        {/* Distorted photo placeholder */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Glitch bars */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 bg-[rgba(255,255,255,0.02)]"
              style={{
                top: `${20 + i * 18}%`,
                height: `${Math.random() * 8 + 3}%`,
              }}
              animate={{
                x: [0, -3, 2, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 2,
                repeatDelay: 8,
              }}
            />
          ))}

          {/* Abstract "photo" shapes */}
          <div className="absolute inset-4 flex flex-col gap-3 opacity-20">
            <div className="h-2 bg-[rgba(180,200,255,0.3)] rounded-full w-3/4" />
            <div className="h-2 bg-[rgba(180,200,255,0.2)] rounded-full w-1/2" />
            <div className="flex-1 bg-[rgba(180,200,255,0.06)] rounded-sm" />
            <div className="h-1 bg-[rgba(180,200,255,0.1)] rounded-full w-2/3 mt-auto" />
          </div>

          <div
            className="font-mono text-[8px] tracking-wider text-center z-10"
            style={{ color: 'rgba(150,170,220,0.25)' }}
          >
            [corrupted]
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Scene4_Family() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="scene-section relative z-10 py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(8,4,18,0.97) 0%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <div className="font-mono text-[9px] tracking-[0.5em] text-[rgba(0,212,255,0.3)] uppercase mb-4">
            chapter four
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[rgba(200,215,255,0.65)] italic mb-5">
            emotional distance
          </h2>
          <p className="font-sans text-sm text-[rgba(120,150,200,0.4)] max-w-xs mx-auto">
            same house. different worlds.
          </p>
        </motion.div>

        {/* Memory grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {familyMoments.map((moment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 + 0.3, duration: 0.9, ease: 'easeOut' }}
              className="memory-card p-5 flex gap-5"
            >
              {/* Corrupted photo */}
              <div className="w-20 flex-shrink-0">
                <GlitchPhoto index={i} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[rgba(0,212,255,0.4)] tracking-wider">
                    {moment.title}
                  </span>
                  <span
                    className="font-mono text-[8px] px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'rgba(150,170,220,0.4)'
                    }}
                  >
                    {moment.feeling}
                  </span>
                </div>
                <p className="font-serif text-[14px] text-[rgba(180,200,240,0.6)] leading-relaxed italic mb-3">
                  {moment.memory}
                </p>
                <div className="font-mono text-[8px] text-[rgba(80,110,160,0.35)]">
                  {moment.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emotional bar chart — distance meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 glass-panel p-6"
        >
          <div className="font-mono text-[9px] tracking-wider text-[rgba(100,140,200,0.4)] mb-6 uppercase">
            emotional proximity — family
          </div>
          {[
            { label: 'Physical distance', value: 5, note: 'same roof' },
            { label: 'Emotional distance', value: 92, note: 'galaxies apart' },
            { label: 'Conversations that matter', value: 4, note: 'per year' },
            { label: 'Times he felt truly seen', value: 2, note: 'ever' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mb-4 last:mb-0">
              <div className="w-40 flex-shrink-0 font-sans text-[11px] text-[rgba(150,175,220,0.5)]">
                {item.label}
              </div>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.04)] relative">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.value}%` } : {}}
                  transition={{ delay: 1.5 + i * 0.15, duration: 1.2, ease: 'easeOut' }}
                  style={{ background: 'linear-gradient(90deg, rgba(26,111,255,0.6), rgba(0,212,255,0.4))' }}
                />
              </div>
              <div className="w-28 flex-shrink-0 font-mono text-[8px] text-[rgba(80,110,160,0.4)] text-right">
                {item.note}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
