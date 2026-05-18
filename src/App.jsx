import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import RainBackground from './components/RainBackground'
import Cursor from './components/Cursor'
import AudioController from './components/AudioController'
import NavDots from './components/NavDots'
import SceneDivider from './components/SceneDivider'
import Scene1_Intro from './components/Scene1_Intro'
import Scene2_Messages from './components/Scene2_Messages'
import Scene3_Friendships from './components/Scene3_Friendships'
import Scene4_Family from './components/Scene4_Family'
import Scene5_Memories from './components/Scene5_Memories'
import Scene6_Diary from './components/Scene6_Diary'
import Scene7_Love from './components/Scene7_Love'
import Scene8_Acceptance from './components/Scene8_Acceptance'
import { motion } from 'framer-motion'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative" style={{ background: '#03030a' }}>
      {/* ── ATMOSPHERIC LAYER ── */}
      <RainBackground intensity={1} />

      {/* ── GRAIN + SCANLINES ── */}
      <div className="grain-overlay" />
      <div className="scanlines" />

      {/* ── CURSOR ── */}
      <Cursor />

      {/* ── AUDIO ── */}
      <AudioController />

      {/* ── LOADING ── */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* ── NAV DOTS ── */}
      {loaded && <NavDots />}

      {/* ── MAIN CONTENT ── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        {/* Outer vertical glow lines */}
        <div
          className="fixed left-0 top-0 bottom-0 w-px pointer-events-none z-[100]"
          style={{ background: 'linear-gradient(180deg, transparent 10%, rgba(0,212,255,0.06) 40%, rgba(0,212,255,0.03) 60%, transparent 90%)' }}
        />
        <div
          className="fixed right-0 top-0 bottom-0 w-px pointer-events-none z-[100]"
          style={{ background: 'linear-gradient(180deg, transparent 10%, rgba(0,212,255,0.04) 40%, rgba(0,212,255,0.02) 60%, transparent 90%)' }}
        />

        {/* ── SCENES ── */}
        <div id="s1"><Scene1_Intro /></div>

        <SceneDivider number="02" label="unread conversations" />
        <div id="s2"><Scene2_Messages /></div>

        <SceneDivider number="03" label="fading friendships" />
        <div id="s3"><Scene3_Friendships /></div>

        <SceneDivider number="04" label="emotional distance" />
        <div id="s4"><Scene4_Family /></div>

        <SceneDivider number="05" label="collapsing memories" />
        <div id="s5"><Scene5_Memories /></div>

        <SceneDivider number="06" label="abandoned diary" />
        <div id="s6"><Scene6_Diary /></div>

        <SceneDivider number="07" label="the story that stayed" />
        <div id="s7"><Scene7_Love /></div>

        <SceneDivider number="08" label="silent acceptance" />
        <div id="s8"><Scene8_Acceptance /></div>

        {/* Very bottom spacer */}
        <div className="h-16" />
      </motion.main>
    </div>
  )
}
