import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      setProgress(total > 0 ? (current / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9988] h-[2px]" style={{ background: 'rgba(138,106,0,0.1)' }}>
      <motion.div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, rgba(139,26,26,0.7), rgba(138,106,0,0.8), rgba(26,47,94,0.6))',
          boxShadow: '0 0 8px rgba(138,106,0,0.4)'
        }}
        transition={{ ease: 'linear' }}
      />
    </div>
  )
}
