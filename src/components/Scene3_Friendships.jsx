import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const friends = [
  { name: 'Sadia', fade: 0.95, lastContact: '3 years ago', note: 'we said "let\'s meet soon" in 2021.' },
  { name: 'James', fade: 0.85, lastContact: '2 years ago', note: 'best friend for 6 years. now a stranger.' },
  { name: 'Doren', fade: 0.7, lastContact: '18 months ago', note: 'she moved cities. we never called.' },
  { name: 'Deba', fade: 0.5, lastContact: '8 months ago', note: 'he got busy. life happened.' },
  { name: 'Mani', fade: 0.3, lastContact: '4 months ago', note: 'still in the city. still drifting.' },
  { name: 'Dev', fade: 0.12, lastContact: 'last week', note: 'maybe the last one who still checks in.' },
]

function FriendNode({ friend, index, isInView }) {
  const [hovered, setHovered] = useState(false)
  const col = index % 3
  const row = Math.floor(index / 3)
  const x = col * 33 + 8 + Math.sin(index * 1.5) * 5
  const y = row * 45 + 10

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? {
        opacity: friend.fade,
        scale: 1,
      } : {}}
      transition={{ delay: index * 0.18 + 0.3, duration: 0.8, ease: 'easeOut' }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative flex flex-col items-center gap-2">
        {/* Avatar */}
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center font-serif text-xl transition-all duration-500"
          style={{
            background: `rgba(255,255,255,${0.02 * friend.fade})`,
            borderColor: `rgba(100,150,220,${friend.fade * 0.4})`,
            color: `rgba(180,210,255,${friend.fade * 0.9})`
          }}
        >
          {friend.name[0]}
        </div>
        <div
          className="font-sans text-[11px] transition-all duration-300"
          style={{ color: `rgba(160,190,240,${friend.fade * 0.8})` }}
        >
          {friend.name}
        </div>
        <div
          className="font-mono text-[8px]"
          style={{ color: `rgba(100,130,180,${friend.fade * 0.6})` }}
        >
          {friend.lastContact}
        </div>

        {/* Hover tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-44 text-center"
          >
            <p className="font-mono text-[9px] text-[rgba(120,160,220,0.6)] italic leading-relaxed">
              {friend.note}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Scene3_Friendships() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="scene-section relative z-10 py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(5,5,22,0.96) 0%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-[9px] tracking-[0.5em] text-[rgba(0,212,255,0.3)] uppercase mb-4">
            chapter three
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[rgba(200,215,255,0.65)] italic mb-5">
            fading friendships
          </h2>
          <p className="font-sans text-sm text-[rgba(120,150,200,0.45)] max-w-xs mx-auto leading-relaxed">
            "The people who were once his entire world slowly became usernames he no longer checked."
          </p>
        </motion.div>

        {/* Opacity legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-px bg-[rgba(0,212,255,0.7)]" />
            <span className="font-mono text-[8px] text-[rgba(100,140,200,0.45)]">present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-px" style={{ background: 'rgba(100,140,200,0.2)' }} />
            <span className="font-mono text-[8px] text-[rgba(100,140,200,0.45)]">lost</span>
          </div>
        </motion.div>

        {/* Friend grid — relative container */}
        <div className="relative w-full" style={{ height: '360px' }}>
          {friends.map((f, i) => (
            <FriendNode key={f.name} friend={f} index={i} isInView={isInView} />
          ))}

          {/* Connecting lines (faint web) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
            <line x1="25%" y1="20%" x2="58%" y2="20%" stroke="rgba(100,150,220,1)" strokeWidth="0.5" />
            <line x1="58%" y1="20%" x2="91%" y2="20%" stroke="rgba(100,150,220,1)" strokeWidth="0.5" />
            <line x1="25%" y1="20%" x2="25%" y2="65%" stroke="rgba(100,150,220,1)" strokeWidth="0.5" />
            <line x1="58%" y1="20%" x2="58%" y2="65%" stroke="rgba(100,150,220,1)" strokeWidth="0.5" />
            <line x1="91%" y1="20%" x2="91%" y2="65%" stroke="rgba(100,150,220,1)" strokeWidth="0.5" />
            <line x1="25%" y1="65%" x2="58%" y2="65%" stroke="rgba(100,150,220,1)" strokeWidth="0.5" />
            <line x1="58%" y1="65%" x2="91%" y2="65%" stroke="rgba(100,150,220,1)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="text-center mt-16"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[rgba(0,212,255,0.15)] to-transparent mx-auto mb-8" />
          <p className="font-serif text-xl md:text-2xl text-[rgba(160,185,230,0.5)] italic max-w-lg mx-auto leading-relaxed">
            "He did not lose friends all at once.<br />
            He lost them in the slow silence<br />
            between messages never sent."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
