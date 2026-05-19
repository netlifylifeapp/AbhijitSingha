import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GHOST_NOTIFICATIONS } from '../../data/storyData'

// ─── GhostNotifications ───────────────────────────────────────────────────────
// Floating ghost notifications that appear briefly and fade away
// Like memories of attention that never quite arrived

export default function GhostNotifications() {
  const [visible, setVisible] = useState([])
  const [index, setIndex]     = useState(0)

  useEffect(() => {
    // Show notifications with random intervals for realism
    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 8000 // 6–14 seconds between notifications

      const timer = setTimeout(() => {
        const notif = GHOST_NOTIFICATIONS[index % GHOST_NOTIFICATIONS.length]
        const id = Date.now()

        setVisible(prev => [...prev, { ...notif, id }])
        setIndex(i => i + 1)

        // Remove after display time
        setTimeout(() => {
          setVisible(prev => prev.filter(n => n.id !== id))
        }, 4000)

        scheduleNext()
      }, delay)

      return timer
    }

    const timer = scheduleNext()
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none max-w-xs">
      <AnimatePresence>
        {visible.map(notif => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 0.5, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl px-4 py-3"
          >
            <div className="flex items-start gap-3">
              {/* App dot */}
              <div className="w-2 h-2 rounded-full bg-ghost/40 flex-shrink-0 mt-1 animate-pulse" />

              <div>
                <p className="font-mono text-xs text-ghost/70 uppercase tracking-wider mb-0.5">
                  {notif.app}
                </p>
                <p className="font-body text-xs text-ash leading-relaxed">
                  {notif.text}
                </p>
                <p className="font-mono text-xs text-ash/30 mt-1">
                  {notif.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
