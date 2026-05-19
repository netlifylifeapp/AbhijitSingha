import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PasswordGate from './components/PasswordGate'
import LoadingScreen from './components/LoadingScreen'
import RainBackground from './components/RainBackground'
import Cursor from './components/Cursor'
import AudioController from './components/AudioController'
import NavDots from './components/NavDots'
import ScrollProgress from './components/ScrollProgress'
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

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [loaded, setLoaded]     = useState(false)

  // ── Lenis smooth scroll ──────────────────────────────────────────────────
  useEffect(() => {
    if (!unlocked) return

    const lenis = new Lenis({
      duration:        1.8,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:     true,
      wheelMultiplier: 0.85,
      touchMultiplier: 2,
    })

    function onTick(time) { lenis.raf(time * 1000) }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(onTick)
    }
  }, [unlocked])

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <div className="relative" style={{ background: '#000000' }}>
      <RainBackground intensity={1} />
      <div className="grain-overlay" />
      <div className="scanlines" />
      <div className="vignette" />
      <Cursor />
      <AudioController />
      <ScrollProgress />
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && <NavDots />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
      >
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
        <div className="h-16" />
      </motion.main>
    </div>
  )
}
