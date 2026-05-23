import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useTypewriter } from '../hooks/useTypewriter'
import gsap from 'gsap'

const diaryEntries = [
  { date: 'October 12 — late night', entry: 'I keep replaying that conversation in my head. The one where I said too much, or maybe not enough. I do not know which is worse. I told myself I would not care this much. I am still caring.', mood: 'restless' },
  { date: 'November 3 — 2:17 AM', entry: 'She went quiet today. Not the comfortable kind of quiet. The kind that tells you something has shifted and you cannot ask why without making it worse. So I said nothing too. Two silences across a screen.', mood: 'hollow' },
  { date: 'December 28 — after midnight', entry: 'I know I became too much. I could feel myself getting too much. I just did not know how to stop. Every time I tried to be less, it felt like disappearing. Maybe disappearing was what she needed from me.', mood: 'regret' },
  { date: 'February 14 — alone', entry: 'The worst part is not loving someone who does not love you back. The worst part is knowing you were the reason their warmth toward you slowly turned to distance. I did that. I became that to her.', mood: 'broken' },
  { date: 'April 7 — 4am again', entry: 'I do not blame her. I want to, because it would be easier. But I know what I did. I know how many times I chose my own insecurity over her comfort. I am the villain in her story. Thats the part that stays.', mood: 'honest' },
]

const moodColors = { restless: 'rgba(74,122,181,0.6)', hollow: 'rgba(122,90,154,0.6)', regret: 'rgba(155,35,53,0.6)', broken: 'rgba(201,168,76,0.5)', honest: 'rgba(58,122,90,0.6)' }

function DiaryPage({ entry, isActive, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={!isActive ? { x: 5 } : {}}
      whileTap={{ scale: 0.98 }}
      className="diary-paper p-4 cursor-pointer transition-all duration-400"
      style={{ opacity: isActive ? 1 : 0.38 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[8px] tracking-wider" style={{ color: 'rgba(201,168,76,0.55)' }}>{entry.date}</div>
        <div className="font-mono text-[7px] px-2 py-0.5 rounded-full" style={{ background: `${moodColors[entry.mood]}20`, border: `1px solid ${moodColors[entry.mood]}`, color: moodColors[entry.mood] }}>{entry.mood}</div>
      </div>
      {isActive ? (
        <p className="font-serif text-[13px] italic leading-relaxed" style={{ color: 'rgba(220,200,160,0.88)' }}>{entry.entry}</p>
      ) : (
        <div className="space-y-1.5">
          {[80, 65, 70, 45].map((w, i) => (
            <div key={i} className="h-px rounded-full" style={{ width: `${w}%`, background: 'rgba(160,140,100,0.1)' }} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function ActivePageContent({ entry }) {
  const { displayText } = useTypewriter(entry.entry, 18, 100)
  const pageRef = useRef(null)

  useEffect(() => {
    if (!pageRef.current) return
    gsap.fromTo(pageRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
  }, [entry.date])

  return (
    <motion.div ref={pageRef} key={entry.date} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="font-mono text-[9px] tracking-wider uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>{entry.date}</div>
        <div className="font-mono text-[8px] px-2.5 py-1 rounded-full" style={{ background: `${moodColors[entry.mood]}15`, border: `1px solid ${moodColors[entry.mood]}50`, color: moodColors[entry.mood] }}>{entry.mood}</div>
      </div>
      <div className="flex-1 relative">
        <div className="space-y-5 absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-px" style={{ background: 'rgba(201,168,76,0.04)' }} />
          ))}
        </div>
        <div className="relative">
          <p className="font-serif text-base md:text-lg italic leading-loose typewriter-cursor" style={{ color: 'rgba(220,200,160,0.72)' }}>{displayText}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: moodColors[entry.mood] }} />
        <div className="font-mono text-[7px] tracking-wider" style={{ color: 'rgba(130,110,80,0.35)' }}>— abhijit singha</div>
      </div>
    </motion.div>
  )
}

export default function Scene6_Diary() {
  const { ref, isInView } = useInView()
  const [activePage, setActivePage] = useState(0)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!isInView || !titleRef.current) return
    gsap.fromTo(titleRef.current.children,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12 }
    )
  }, [isInView])

  return (
    <section ref={ref} className="scene-section relative z-10 py-20">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(13,13,26,0.97) 0%, transparent 100%)' }} />
      <div className="absolute pointer-events-none" style={{ right: '10%', top: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-14">
          <div className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,168,76,0.4)' }}>chapter six</div>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-5" style={{ color: 'rgba(235,225,205,0.88)' }}>the abandoned diary</h2>
          <p className="font-sans text-sm" style={{ color: 'rgba(190,170,130,0.75)' }}>"things he wrote but never sent."</p>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 1 }} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2 space-y-3">
            {diaryEntries.map((entry, i) => (
              <DiaryPage key={i} entry={entry} isActive={activePage === i} onClick={() => setActivePage(i)} />
            ))}
          </div>
          <div className="md:col-span-3 diary-paper p-8" style={{ minHeight: '440px' }}>
            <AnimatePresence mode="wait">
              <ActivePageContent key={activePage} entry={diaryEntries[activePage]} />
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5, duration: 1.5 }} className="mt-14 text-center">
          <p className="font-serif text-xl md:text-2xl italic max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(200,180,140,0.45)' }}>
            "The saddest thing was not rejection — it was realizing he became another painful memory in her life."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
