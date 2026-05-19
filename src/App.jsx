import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Hooks ─────────────────────────────────────────────────────────────────────
import { useCursor }       from './hooks/useCursor'
import { useSmoothScroll } from './hooks/useSmoothScroll'

// ── Canvas ────────────────────────────────────────────────────────────────────
import RainCanvas from './components/canvas/RainCanvas'

// ── Scenes (lazy loaded for performance) ─────────────────────────────────────
import SceneIntro   from './components/scenes/SceneIntro'
import SceneFriends from './components/scenes/SceneFriends'
import SceneMessages from './components/scenes/SceneMessages'
import SceneLove    from './components/scenes/SceneLove'
import SceneFamily  from './components/scenes/SceneFamily'
import SceneDiary   from './components/scenes/SceneDiary'
import SceneEnding  from './components/scenes/SceneEnding'

// ── UI Components ─────────────────────────────────────────────────────────────
import LoadingScreen      from './components/ui/LoadingScreen'
import SceneNavigator     from './components/ui/SceneNavigator'
import GhostNotifications from './components/effects/GhostNotifications'

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading]         = useState(true)
  const [currentScene, setCurrentScene] = useState('intro')

  // ── Custom cursor ──────────────────────────────────────────────────────────
  const { dotRef, ringRef } = useCursor()

  // ── Lenis smooth scroll + GSAP sync ───────────────────────────────────────
  useSmoothScroll()

  // ── Track current scene via Intersection Observer ─────────────────────────
  useEffect(() => {
    if (loading) return

    const scenes = document.querySelectorAll('[data-scene]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentScene(entry.target.dataset.scene)
          }
        })
      },
      { threshold: 0.4 }
    )

    scenes.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  return (
    <>
      {/* ── Loading screen ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* ── Main experience ────────────────────────────────────────────── */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Custom cursor ─────────────────────────────────────────── */}
            <div ref={dotRef}  className="cursor-dot"  aria-hidden />
            <div ref={ringRef} className="cursor-ring" aria-hidden />

            {/* ── Film grain + scanlines ────────────────────────────────── */}
            <div className="grain-overlay" aria-hidden />
            <div className="scanlines"     aria-hidden />

            {/* ── Three.js rain canvas (fixed, behind content) ──────────── */}
            <RainCanvas />

            {/* ── Ghost notifications ────────────────────────────────────── */}
            <GhostNotifications />

            {/* ── Scene navigation dots ─────────────────────────────────── */}
            <div className="hidden md:block">
              <SceneNavigator currentScene={currentScene} />
            </div>

            {/* ── Scene divider line (top of page) ──────────────────────── */}
            <div
              className="fixed top-0 left-0 right-0 h-px z-40"
              style={{ background: 'linear-gradient(to right, transparent, rgba(74,122,181,0.15), transparent)' }}
            />

            {/* ── All scenes ────────────────────────────────────────────── */}
            <main>
              <div data-scene="intro">
                <SceneIntro />
              </div>

              {/* Cinematic scene divider */}
              <SceneDivider />

              <div data-scene="friends">
                <SceneFriends />
              </div>

              <SceneDivider />

              <div data-scene="messages">
                <SceneMessages />
              </div>

              <SceneDivider />

              <div data-scene="love">
                <SceneLove />
              </div>

              <SceneDivider />

              <div data-scene="family">
                <SceneFamily />
              </div>

              <SceneDivider />

              <div data-scene="diary">
                <SceneDiary />
              </div>

              <SceneDivider />

              <div data-scene="ending">
                <SceneEnding />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Scene Divider ────────────────────────────────────────────────────────────
// Cinematic separator between scenes — subtle atmospheric break

function SceneDivider() {
  return (
    <div className="relative py-8 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div
          className="w-full h-px"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(74,122,181,0.08) 30%, rgba(74,122,181,0.12) 50%, rgba(74,122,181,0.08) 70%, transparent 100%)',
          }}
        />
      </div>
      <div
        className="relative w-1 h-1 rounded-full bg-ghost"
        style={{ opacity: 0.2, boxShadow: '0 0 8px rgba(74,122,181,0.4)' }}
      />
    </div>
  )
}
