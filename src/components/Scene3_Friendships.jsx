import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import gsap from 'gsap'

const friends = [
  { name: 'Sadia', fade: 0.95, lastContact: '3 years ago', note: 'we said lets meet soon in 2021.', color: '#c42d42' },
  { name: 'James', fade: 0.82, lastContact: '2 years ago', note: 'best friend for 6 years. now a stranger.', color: '#4a7ab5' },
  { name: 'Doren', fade: 0.65, lastContact: '18 months ago', note: 'she moved cities. we never called.', color: '#8a6a2a' },
  { name: 'Deba', fade: 0.45, lastContact: '8 months ago', note: 'he got busy. life happened.', color: '#c9a84c' },
  { name: 'Mani', fade: 0.25, lastContact: '4 months ago', note: 'still in the city. still drifting.', color: '#7a5a9a' },
  { name: 'Dev', fade: 0.1, lastContact: 'last week', note: 'maybe the last one who still checks in.', color: '#3a7a5a' },
]

function FriendNode({ friend, index, isInView }) {
  const [hovered, setHovered] = useState(false)
  const nodeRef = useRef(null)
  const col = index % 3
  const row = Math.floor(index / 3)
  const x = col * 32 + 8 + (index % 2 === 0 ? 3 : -3)
  const y = row * 42 + 8

  useEffect(() => {
    if (!isInView || !nodeRef.current) return
    gsap.fromTo(nodeRef.current,
      { opacity: 0, scale: 0.6, y: 30 },
      { opacity: friend.fade, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)', delay: index * 0.12 + 0.3 }
    )
  }, [isInView])

  return (
    <motion.div
      ref={nodeRef}
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.1, opacity: 1 }}
      animate={{ opacity: friend.fade }}
    >
      <div className="flex flex-col items-center gap-2 relative">
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl"
          style={{
            background: `${friend.color}15`,
            border: `1px solid ${friend.color}${Math.floor(friend.fade * 60).toString(16).padStart(2, '0')}`,
            color: `rgba(235,225,205,${friend.fade * 0.9})`,
            boxShadow: hovered ? `0 0 20px ${friend.color}30` : 'none'
          }}
          animate={hovered ? { boxShadow: `0 0 25px ${friend.color}40` } : {}}
        >
          {friend.name[0]}
        </motion.div>
        <div className="font-sans text-[11px]" style={{ color: `rgba(235,225,205,${friend.fade * 0.8})` }}>{friend.name}</div>
        <div className="font-mono text-[8px]" style={{ color: `rgba(160,140,100,${friend.fade * 0.6})` }}>{friend.lastContact}</div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-48 text-center z-20 px-3 py-2 rounded"
              style={{ background: 'rgba(18,18,42,0.95)', border: '1px solid rgba(201,168,76,0.1)' }}
            >
              <p className="font-mono text-[8px] italic leading-relaxed" style={{ color: 'rgba(180,160,120,0.7)' }}>{friend.note}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Scene3_Friendships() {
  const { ref, isInView } = useInView()
  const titleRef = useRef(null)

  useEffect(() => {
    if (!isInView || !titleRef.current) return
    gsap.fromTo(titleRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }
    )
  }, [isInView])

  return (
    <section ref={ref} className="scene-section relative z-10 py-20">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(13,13,26,0.97) 0%, transparent 100%)' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-14">
          <div className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(155,35,53,0.45)' }}>chapter three</div>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-5" style={{ color: 'rgba(235,225,205,0.65)' }}>fading friendships</h2>
          <p className="font-sans text-sm max-w-xs mx-auto" style={{ color: 'rgba(160,140,100,0.45)' }}>
            "The people who were once his entire world slowly became usernames he no longer checked."
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
            <span className="font-mono text-[8px]" style={{ color: 'rgba(160,140,100,0.45)' }}>present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px" style={{ background: 'rgba(160,140,100,0.2)' }} />
            <span className="font-mono text-[8px]" style={{ color: 'rgba(160,140,100,0.45)' }}>lost</span>
          </div>
        </motion.div>

        <div className="relative w-full" style={{ height: '380px' }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
            <line x1="25%" y1="20%" x2="57%" y2="20%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
            <line x1="57%" y1="20%" x2="89%" y2="20%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
            <line x1="25%" y1="20%" x2="25%" y2="65%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
            <line x1="57%" y1="20%" x2="57%" y2="65%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
            <line x1="89%" y1="20%" x2="89%" y2="65%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
            <line x1="25%" y1="65%" x2="57%" y2="65%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
            <line x1="57%" y1="65%" x2="89%" y2="65%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
          </svg>
          {friends.map((f, i) => (
            <FriendNode key={f.name} friend={f} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="text-center mt-8"
        >
          <div className="w-px h-10 mx-auto mb-8" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
          <p className="font-serif text-xl md:text-2xl italic max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(200,180,140,0.45)' }}>
            "He did not lose friends all at once.<br />He lost them in the slow silence<br />between messages never sent."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
