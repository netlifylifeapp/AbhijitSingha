import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const scenes = [
  { id: 's1', label: 'intro' },
  { id: 's2', label: 'messages' },
  { id: 's3', label: 'friends' },
  { id: 's4', label: 'family' },
  { id: 's5', label: 'memories' },
  { id: 's6', label: 'diary' },
  { id: 's7', label: 'love' },
  { id: 's8', label: 'acceptance' },
]

export default function NavDots() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = scenes.map(s => document.getElementById(s.id))
      const scrollY = window.scrollY + window.innerHeight / 2

      sections.forEach((section, i) => {
        if (!section) return
        const top = section.offsetTop
        const bottom = top + section.offsetHeight
        if (scrollY >= top && scrollY < bottom) {
          setActive(i)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-[9980] flex flex-col gap-4 hidden md:flex">
      {scenes.map((scene, i) => (
        <button
          key={scene.id}
          onClick={() => scrollTo(scene.id)}
          className="group flex items-center gap-3"
          title={scene.label}
        >
          <div className="relative flex items-center justify-center w-3 h-3">
            <motion.div
              animate={{
                scale: active === i ? 1.4 : 1,
                opacity: active === i ? 1 : 0.35,
              }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: active === i ? 'rgba(0,212,255,0.9)' : 'rgba(100,140,200,0.4)',
                boxShadow: active === i ? '0 0 8px rgba(0,212,255,0.6)' : 'none'
              }}
            />
          </div>
          <span className="font-mono text-[7px] tracking-wider text-[rgba(80,110,160,0.35)] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {scene.label}
          </span>
        </button>
      ))}
    </div>
  )
}
