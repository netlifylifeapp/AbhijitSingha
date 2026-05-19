import { useEffect, useRef, useState } from 'react'

// ─── useMouseParallax ─────────────────────────────────────────────────────────
// Returns normalized mouse position (-1 to 1) with inertia smoothing.
// Safe for SSR — guards against window access.

export function useMouseParallax(inertia = 0.05) {
  const mouse   = useRef({ x: 0, y: 0 })
  const smoothed = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)           // ref so cleanup always cancels the right id
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const animate = () => {
      smoothed.current.x += (mouse.current.x - smoothed.current.x) * inertia
      smoothed.current.y += (mouse.current.y - smoothed.current.y) * inertia
      setPosition({ x: smoothed.current.x, y: smoothed.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [inertia])

  return position
}
