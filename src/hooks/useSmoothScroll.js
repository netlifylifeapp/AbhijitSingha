import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── useSmoothScroll ──────────────────────────────────────────────────────────
// Lenis smooth scroll wired to GSAP's ticker so ScrollTrigger stays in sync.
// Named ticker function stored so cleanup can actually remove it (was a bug —
// anonymous arrow functions never match on gsap.ticker.remove).

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.6,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:     true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
    })

    // Named function — REQUIRED for gsap.ticker.remove() to work
    function onTick(time) {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(onTick) // now correctly removes by reference
    }
  }, [])
}
