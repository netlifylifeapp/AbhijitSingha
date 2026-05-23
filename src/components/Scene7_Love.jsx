import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const chapters = [
  {
    id:'beginning', phase:'the beginning', number:'01', icon:'✦',
    color:'#00d4ff', glow:'rgba(0,212,255,0.15)', border:'rgba(0,212,255,0.25)',
    text:'It started quietly. Not with fireworks — but with the specific warmth of someone who made the world feel slightly less hostile. She appeared, and his internal world rearranged itself around her without asking permission.',
    detail:'He didn\'t notice it happening. That\'s how it always starts with the ones that matter most.',
    time:'11:52 PM',
  },
  {
    id:'falling', phase:'the falling', number:'02', icon:'↓',
    color:'#a78bfa', glow:'rgba(167,139,250,0.15)', border:'rgba(167,139,250,0.25)',
    text:'He fell the way most people fall — gradually, then all at once. He noticed everything. Her silences. Her laughter. The way she said goodbye like she might mean it permanently.',
    detail:'He cared not loudly, but in the quiet consuming way that slowly becomes part of someone\'s soul.',
    time:'2:14 AM',
  },
  {
    id:'confession', phase:'the confession', number:'03', icon:'◌',
    color:'#ffb347', glow:'rgba(255,179,71,0.12)', border:'rgba(255,179,71,0.25)',
    text:'He told her. She was kind about it — genuinely kind. She did not feel the same. He said he understood. He did not. He just said it because the alternative felt like losing her faster.',
    detail:'Rejection is not the end. Sometimes it is the beginning of a much slower heartbreak.',
    time:'3:41 AM',
  },
  {
    id:'unraveling', phase:'the unraveling', number:'04', icon:'⊗',
    color:'#ff6b9d', glow:'rgba(255,107,157,0.12)', border:'rgba(255,107,157,0.25)',
    text:'Even after, his feelings didn\'t disappear. They became quieter. Heavier. He started noticing things he shouldn\'t — who she spoke to, who made her laugh, who got the version of her he never could.',
    detail:'Not because he wanted control. Because he was drowning inside his own thoughts and she was the only air.',
    time:'1:07 AM',
  },
  {
    id:'damage', phase:'the damage', number:'05', icon:'×',
    color:'#ff5050', glow:'rgba(255,80,80,0.12)', border:'rgba(255,80,80,0.22)',
    text:'Some people break hearts through hatred. He broke hers while trying too hard to hold on. Slowly, the warmth she\'d shown him turned to distance. He watched it happen and could not stop it.',
    detail:'I cared too much. And in doing so, I gave her every reason to care less.',
    time:'4:58 AM',
  },
  {
    id:'after', phase:'the after', number:'06', icon:'—',
    color:'#506090', glow:'rgba(80,110,160,0.1)', border:'rgba(80,110,160,0.2)',
    text:'She moved forward with life while he stayed behind inside old conversations and unfinished feelings. She became the place his heart returned to every night — even after it had no right to.',
    detail:'She was the only person who ever made loneliness feel less heavy. And now that weight had her name.',
    time:'still',
  },
]

function FloatingParticles({ isInView }) {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 8,
    opacity: 0.06 + Math.random() * 0.12,
  }))
  if (!isInView) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size, background:'#ff6b9d', opacity:0, filter:'blur(1px)' }}
          animate={{ y:[-20,-60,-100], opacity:[0,p.opacity,0], scale:[0.5,1,0.3] }}
          transition={{ duration:p.duration, delay:p.delay, repeat:Infinity, ease:'easeOut' }}
        />
      ))}
    </div>
  )
}

function HeartbeatLine({ isInView }) {
  return (
    <div className="relative w-full overflow-hidden py-2">
      <svg width="100%" height="60" viewBox="0 0 800 60" preserveAspectRatio="none" className="opacity-60">
        <motion.path
          d="M0,30 L160,30 L185,30 L200,8 L220,52 L238,4 L256,56 L274,30 L295,30 L320,30 L338,18 L356,42 L374,30 L440,30 L800,30"
          fill="none" stroke="url(#hg)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength:0, opacity:0 }}
          animate={isInView ? { pathLength:1, opacity:1 } : {}}
          transition={{ duration:2.5, ease:'easeInOut', delay:0.3 }}
        />
        <motion.path
          d="M0,30 L160,30 L185,30 L200,8 L220,52 L238,4 L256,56 L274,30 L295,30 L320,30 L338,18 L356,42 L374,30 L440,30 L800,30"
          fill="none" stroke="rgba(255,107,157,0.3)" strokeWidth="4" strokeLinecap="round"
          style={{ filter:'blur(3px)' }}
          initial={{ pathLength:0, opacity:0 }}
          animate={isInView ? { pathLength:1, opacity:1 } : {}}
          transition={{ duration:2.5, ease:'easeInOut', delay:0.3 }}
        />
        <defs>
          <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(0,212,255,0.3)"   />
            <stop offset="40%"  stopColor="rgba(255,107,157,0.7)" />
            <stop offset="70%"  stopColor="rgba(255,80,80,0.5)"   />
            <stop offset="100%" stopColor="rgba(80,110,160,0.2)"  />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function PulsingHeart({ isInView }) {
  return (
    <div className="relative flex items-center justify-center my-8">
      {[1,2,3].map(i => (
        <motion.div key={i} className="absolute rounded-full border" style={{ borderColor:'rgba(255,107,157,0.15)' }}
          animate={isInView ? { width:[40,40+i*30], height:[40,40+i*30], opacity:[0.5,0] } : {}}
          transition={{ duration:2.5, delay:i*0.5, repeat:Infinity, ease:'easeOut' }}
        />
      ))}
      <motion.div
        animate={isInView ? { scale:[1,1.12,1,1.08,1] } : {}}
        transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
        className="relative z-10"
      >
        <svg width="36" height="34" viewBox="0 0 36 34" fill="none">
          <motion.path
            d="M18 30s-14-8.8-14-16.5C4 7.9 7.9 4 12.5 4c2.6 0 5 1.2 6.5 3.1C20.5 5.2 22.9 4 25.5 4 30.1 4 32 7.9 32 13.5 32 21.2 18 30 18 30z"
            fill="rgba(255,107,157,0.12)" stroke="rgba(255,107,157,0.6)" strokeWidth="1"
            initial={{ pathLength:0 }}
            animate={isInView ? { pathLength:1 } : {}}
            transition={{ duration:1.5, ease:'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0" style={{ background:'radial-gradient(circle, rgba(255,107,157,0.3) 0%, transparent 70%)', filter:'blur(8px)' }} />
      </motion.div>
    </div>
  )
}

function ChapterCard({ item, index, isInView }) {
  const [open, setOpen]       = useState(false)
  const [hovered, setHovered] = useState(false)
  const cardRef               = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness:150, damping:20 })
  const springY = useSpring(rotateY, { stiffness:150, damping:20 })

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const r  = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2)
    rotateX.set(-dy * 6)
    rotateY.set( dx * 6)
  }
  const onLeave = () => { rotateX.set(0); rotateY.set(0); setHovered(false) }

  return (
    <motion.div
      initial={{ opacity:0, y:40, filter:'blur(8px)' }}
      animate={isInView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
      transition={{ delay:index*0.18+0.3, duration:1, ease:[0.16,1,0.3,1] }}
    >
      <motion.div ref={cardRef} onClick={() => setOpen(!open)}
        onMouseMove={onMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={onLeave}
        style={{ rotateX:springX, rotateY:springY, transformStyle:'preserve-3d', perspective:'800px' }}
        className="relative cursor-pointer mb-4 select-none"
      >
        <motion.div
          animate={{
            borderColor: open||hovered ? item.border : 'rgba(255,255,255,0.06)',
            boxShadow: open
              ? `0 0 40px ${item.glow}, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
              : hovered ? `0 0 20px ${item.glow}, 0 8px 32px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
          }}
          transition={{ duration:0.4 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ background:'rgba(4,6,18,0.85)', border:'1px solid rgba(255,255,255,0.06)', backdropFilter:'blur(20px)' }}
        >
          <motion.div className="absolute top-0 left-0 right-0 h-px"
            animate={{ opacity: open||hovered ? 1 : 0 }} transition={{ duration:0.3 }}
            style={{ background:`linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
          />
          <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
            animate={{ opacity: open ? 1 : 0 }} transition={{ duration:0.5 }}
            style={{ background:`radial-gradient(ellipse 80% 60% at 50% 0%, ${item.glow} 0%, transparent 70%)` }}
          />
          <div className="relative flex items-center gap-4 p-5">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <motion.div
                animate={{
                  background:  open ? `${item.color}18` : 'rgba(255,255,255,0.02)',
                  borderColor: open||hovered ? item.color : 'rgba(255,255,255,0.08)',
                  boxShadow:   open ? `0 0 24px ${item.color}50` : 'none',
                  color:       open||hovered ? item.color : 'rgba(150,175,220,0.3)',
                }}
                transition={{ duration:0.35 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-base border"
              >{item.icon}</motion.div>
              <div className="font-mono text-[8px] tracking-widest" style={{ color:'rgba(80,100,140,0.4)' }}>{item.number}</div>
            </div>
            <div className="flex-1 min-w-0">
              <motion.div
                animate={{ color: open||hovered ? item.color : 'rgba(100,130,180,0.45)' }}
                transition={{ duration:0.3 }}
                className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
              >{item.phase}</motion.div>
              <p className="font-serif text-[13px] md:text-[15px] leading-relaxed italic" style={{ color:'rgba(190,210,250,0.7)' }}>{item.text}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <div className="font-mono text-[8px] tracking-widest" style={{ color:'rgba(80,100,140,0.3)' }}>{item.time}</div>
              <motion.div
                animate={{ rotate:open?45:0, color:open?item.color:'rgba(100,130,180,0.3)', borderColor:open?item.color:'rgba(255,255,255,0.08)' }}
                transition={{ duration:0.35 }}
                className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]"
              >+</motion.div>
            </div>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.5, ease:[0.16,1,0.3,1] }} className="overflow-hidden">
                <div className="mx-5 mb-5 p-4 rounded-xl" style={{ background:'rgba(0,0,0,0.3)', borderLeft:`2px solid ${item.color}`, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
                  <div className="font-serif text-3xl leading-none mb-2 opacity-20" style={{ color:item.color }}>"</div>
                  <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15, duration:0.6 }} className="font-serif text-[13px] md:text-[14px] italic leading-relaxed" style={{ color:'rgba(160,190,240,0.88)' }}>{item.detail}</motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Scene7_Love() {
  const { ref, isInView } = useInView({ threshold:0.04 })
  const [showBeat, setShowBeat] = useState(false)

  useEffect(() => {
    if (isInView) { const t = setTimeout(() => setShowBeat(true), 800); return () => clearTimeout(t) }
  }, [isInView])

  return (
    <section ref={ref} className="scene-section relative z-10 py-24">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 80% 90% at 50% 50%, rgba(8,3,18,0.97) 0%, transparent 100%)' }} />
      <motion.div className="absolute pointer-events-none" style={{ left:'5%', top:'20%', width:'40vw', height:'40vw', background:'radial-gradient(circle, rgba(255,107,157,0.05) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(40px)' }}
        animate={{ scale:[1,1.15,1], opacity:[0.5,0.8,0.5] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
      />
      <motion.div className="absolute pointer-events-none" style={{ right:'5%', bottom:'20%', width:'35vw', height:'35vw', background:'radial-gradient(circle, rgba(0,100,255,0.04) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(40px)' }}
        animate={{ scale:[1,1.1,1], opacity:[0.4,0.7,0.4] }} transition={{ duration:10, repeat:Infinity, ease:'easeInOut', delay:2 }}
      />
      <FloatingParticles isInView={isInView} />
      <div className="relative z-10 max-w-2xl mx-auto px-5 md:px-10">
        <motion.div initial={{ opacity:0, y:16 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ duration:0.9 }} className="text-center mb-2">
          <div className="font-mono text-[9px] tracking-[0.55em] uppercase mb-5" style={{ color:'rgba(255,107,157,0.4)' }}>chapter seven</div>
          <h2 className="font-serif text-4xl md:text-6xl italic leading-tight mb-2" style={{ color:'rgba(220,230,255,0.7)', textShadow:'0 0 60px rgba(255,107,157,0.12)' }}>the story that stayed</h2>
          <motion.p initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}} transition={{ delay:0.5, duration:1.2 }} className="font-serif text-sm italic mt-3" style={{ color:'rgba(150,170,220,0.35)' }}>tap each chapter to go deeper</motion.p>
        </motion.div>
        {showBeat && <PulsingHeart isInView={isInView} />}
        <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}} transition={{ delay:0.4, duration:1 }} className="mb-10">
          {showBeat && <HeartbeatLine isInView={isInView} />}
        </motion.div>
        <div>{chapters.map((item,i) => <ChapterCard key={item.id} item={item} index={i} isInView={isInView} />)}</div>
        <motion.div initial={{ opacity:0, y:24 }} animate={isInView ? { opacity:1, y:0 } : {}} transition={{ delay:1.8, duration:1.4, ease:[0.16,1,0.3,1] }} className="mt-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(255,107,157,0.3)]" />
            <div className="w-1 h-1 rounded-full bg-[rgba(255,107,157,0.5)]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[rgba(255,107,157,0.3)]" />
          </div>
          <blockquote className="font-serif text-xl md:text-2xl leading-relaxed max-w-xl mx-auto italic" style={{ color:'rgba(210,225,255,0.5)', textShadow:'0 0 40px rgba(255,107,157,0.08)' }}>
            "Some people break hearts through hatred.<br />He broke hers while trying too hard<br />to protect his own."
          </blockquote>
          <motion.div initial={{ opacity:0 }} animate={isInView ? { opacity:1 } : {}} transition={{ delay:2.5, duration:1.5 }} className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[rgba(255,107,157,0.2)]" />
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color:'rgba(120,100,140,0.35)' }}>he still means it</span>
            <div className="h-px w-8 bg-[rgba(255,107,157,0.2)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
