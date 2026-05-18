import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useTypewriter } from '../hooks/useTypewriter'

const diaryEntries = [
  {
    date: 'October 12 — late night',
    entry: `I keep replaying that conversation in my head. The one where I said too much, or maybe not enough. I do not know which is worse. I told myself I would not care this much. I am still caring.`,
    mood: 'restless'
  },
  {
    date: 'November 3 — 2:17 AM',
    entry: `She went quiet today. Not the comfortable kind of quiet. The kind that tells you something has shifted and you cannot ask why without making it worse. So I said nothing too. Two silences across a screen.`,
    mood: 'hollow'
  },
  {
    date: 'December 28 — after midnight',
    entry: `I know I became too much. I could feel myself getting too much. I just did not know how to stop. Every time I tried to be less, it felt like disappearing. Maybe disappearing was what she needed from me.`,
    mood: 'regret'
  },
  {
    date: 'February 14 — alone',
    entry: `The worst part is not loving someone who does not love you back. The worst part is knowing you were the reason their warmth toward you slowly turned to distance. I did that. I became that to her.`,
    mood: 'broken'
  },
  {
    date: 'April 7 — 4am again',
    entry: `I do not blame her. I want to, because it would be easier. But I know what I did. I know how many times I chose my own insecurity over her comfort. I am the villain in her story. That's the part that stays.`,
    mood: 'honest'
  }
]

const moodColors = {
  restless: 'rgba(0,212,255,0.3)',
  hollow: 'rgba(167,139,250,0.3)',
  regret: 'rgba(255,107,157,0.3)',
  broken: 'rgba(251,191,36,0.25)',
  honest: 'rgba(100,200,150,0.3)'
}

function DiaryPage({ entry, isActive, onClick, index }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={!isActive ? { x: 4, opacity: 0.7 } : {}}
      className={`diary-paper p-5 rounded-sm cursor-pointer transition-all duration-500 ${
        isActive ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[9px] tracking-wider text-[rgba(255,179,71,0.5)]">
          {entry.date}
        </div>
        <div
          className="font-mono text-[8px] px-2 py-0.5 rounded-full"
          style={{
            background: `${moodColors[entry.mood]}20`,
            border: `1px solid ${moodColors[entry.mood]}`,
            color: moodColors[entry.mood]
          }}
        >
          {entry.mood}
        </div>
      </div>
      {isActive && (
        <p className="font-serif text-sm text-[rgba(210,225,255,0.65)] leading-relaxed italic">
          {entry.entry}
        </p>
      )}
      {!isActive && (
        <div className="space-y-1.5">
          {[80, 65, 70, 45].map((w, i) => (
            <div key={i} className="h-px rounded-full bg-[rgba(150,175,220,0.1)]" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function ActivePageContent({ entry }) {
  const { displayText } = useTypewriter(entry.entry, 22, 200)

  return (
    <motion.div
      key={entry.date}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="font-mono text-[10px] tracking-wider text-[rgba(255,179,71,0.6)] uppercase">
          {entry.date}
        </div>
        <div
          className="font-mono text-[9px] px-2.5 py-1 rounded-full"
          style={{
            background: `${moodColors[entry.mood]}15`,
            border: `1px solid ${moodColors[entry.mood]}50`,
            color: moodColors[entry.mood]
          }}
        >
          {entry.mood}
        </div>
      </div>

      {/* Ruled lines */}
      <div className="flex-1 relative">
        <div className="space-y-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-px bg-[rgba(255,179,71,0.05)]" />
          ))}
        </div>
        <div className="absolute inset-0">
          <p className="font-serif text-base md:text-lg text-[rgba(210,225,255,0.7)] leading-loose italic typewriter-cursor">
            {displayText}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ background: moodColors[entry.mood] }} />
        <div className="font-mono text-[8px] text-[rgba(100,130,180,0.35)] tracking-wider">
          — abhijit singha
        </div>
      </div>
    </motion.div>
  )
}

export default function Scene6_Diary() {
  const { ref, isInView } = useInView()
  const [activePage, setActivePage] = useState(0)

  return (
    <section ref={ref} className="scene-section relative z-10 py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(8,5,20,0.97) 0%, transparent 100%)'
        }}
      />

      {/* Warm amber ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '10%',
          top: '30%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,179,71,0.04) 0%, transparent 70%)',
          borderRadius: '50%'
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
          <div className="font-mono text-[9px] tracking-[0.5em] text-[rgba(255,179,71,0.3)] uppercase mb-4">
            chapter six
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[rgba(200,215,255,0.65)] italic mb-5">
            the abandoned diary
          </h2>
          <p className="font-sans text-sm text-[rgba(120,150,200,0.4)] max-w-xs mx-auto">
            "things he wrote but never sent."
          </p>
        </motion.div>

        {/* Two-panel diary */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          {/* Page list — sidebar */}
          <div className="md:col-span-2 space-y-3">
            {diaryEntries.map((entry, i) => (
              <DiaryPage
                key={i}
                entry={entry}
                index={i}
                isActive={activePage === i}
                onClick={() => setActivePage(i)}
              />
            ))}
          </div>

          {/* Active page */}
          <div
            className="md:col-span-3 diary-paper p-8 rounded-sm"
            style={{ minHeight: '480px' }}
          >
            <AnimatePresence mode="wait">
              <ActivePageContent key={activePage} entry={diaryEntries[activePage]} />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-16 text-center"
        >
          <p className="font-serif text-xl md:text-2xl text-[rgba(160,185,230,0.5)] italic max-w-lg mx-auto leading-relaxed">
            "The saddest thing was not rejection —<br />
            it was realizing he became another painful memory in her life."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
