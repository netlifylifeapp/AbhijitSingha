import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Friend data ──────────────────────────────────────────────────────────────
const FRIENDS = [
  { name: "Rahul",    initials: "R", memory: "Used to call every Sunday.",       opacity: 0.12, blur: 3    },
  { name: "Priya",    initials: "P", memory: "Laughed the loudest together.",    opacity: 0.18, blur: 2    },
  { name: "Arjun",    initials: "A", memory: "Best friend for three years.",     opacity: 0.22, blur: 1.5  },
  { name: "Sneha",    initials: "S", memory: "She understood everything once.",  opacity: 0.15, blur: 2.5  },
  { name: "Dev",      initials: "D", memory: "Said 'always here' and left.",     opacity: 0.10, blur: 4    },
  { name: "Meera",    initials: "M", memory: "The group trip she didn't invite him to.", opacity: 0.08, blur: 5 },
]

// ─── SceneFriends ─────────────────────────────────────────────────────────────
// Scene 2: Fading friendships — faces becoming ghosts
// Friends appear translucent and blurred, fading further as you scroll

export default function SceneFriends() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each friend fades to near-invisible as section scrolls through
      gsap.utils.toArray('.friend-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          {
            opacity: FRIENDS[i].opacity,
            y: 0,
            filter: `blur(${FRIENDS[i].blur}px)`,
            duration: 1.2,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene-section relative flex flex-col items-center justify-center py-32 px-6"
    >
      {/* Background quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <p
          className="font-display text-[12vw] font-light text-ghost leading-none select-none"
          style={{ opacity: 0.02 }}
        >
          FORGOTTEN
        </p>
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20 relative z-10"
      >
        <p className="font-mono text-xs tracking-[0.4em] text-ghost uppercase mb-4">Scene I</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-mist mb-6">
          They All Left Eventually
        </h2>
        <p className="font-serif italic text-ash text-lg max-w-lg mx-auto leading-relaxed">
          "Friends don't vanish. They just slowly stop turning around."
        </p>
      </motion.div>

      {/* Friend ghost grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full mb-20">
        {FRIENDS.map((friend, i) => (
          <div
            key={friend.name}
            className="friend-card flex flex-col items-center gap-3 p-6 glass rounded-2xl cursor-default"
            style={{ opacity: 0 }} // GSAP controls this
          >
            {/* Ghost avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-mist font-display text-xl"
              style={{
                background: `rgba(26, 107, 255, 0.08)`,
                border: '1px solid rgba(74, 122, 181, 0.15)',
              }}
            >
              {friend.initials}
            </div>
            <p className="font-body text-sm text-mist">{friend.name}</p>
            <p className="font-serif italic text-xs text-ash text-center leading-relaxed">
              {friend.memory}
            </p>
          </div>
        ))}
      </div>

      {/* Emotional line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-xl mx-auto"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-dim to-transparent mb-8" />
        <p className="font-serif italic text-base text-ash leading-relaxed">
          He never stopped caring about any of them. He just learned to stop waiting for them to care back.
        </p>
      </motion.div>

      {/* Neon reflection blur at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(26, 107, 255, 0.03) 0%, transparent 100%)',
        }}
      />
    </section>
  )
}
