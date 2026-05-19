import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCENES } from '../../data/storyData'

// ─── SceneNavigator ───────────────────────────────────────────────────────────
// Fixed right-side scene progress dots — subtle, minimal, cinematic
// Shows which chapter the visitor is currently in

export default function SceneNavigator({ currentScene }) {
  const [hoveredScene, setHoveredScene] = useState(null)

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4">
      {SCENES.map((scene, i) => {
        const isActive = scene.id === currentScene
        return (
          <div
            key={scene.id}
            className="flex items-center gap-3"
            onMouseEnter={() => setHoveredScene(scene.id)}
            onMouseLeave={() => setHoveredScene(null)}
          >
            {/* Label — shows on hover */}
            <AnimatePresence>
              {hoveredScene === scene.id && (
                <motion.p
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-xs text-ash whitespace-nowrap"
                >
                  {scene.title}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={{
                width:  isActive ? '20px' : '4px',
                height: isActive ? '4px'  : '4px',
                background: isActive
                  ? 'rgba(200,168,224,0.8)'
                  : 'rgba(74,122,181,0.25)',
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full"
            />
          </div>
        )
      })}
    </div>
  )
}
