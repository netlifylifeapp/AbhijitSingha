import { useEffect, useRef } from 'react'

// ─── useCursor ────────────────────────────────────────────────────────────────
// Physics cursor with inertia ring. Disabled automatically on touch devices
// (mobile/tablet) so the native cursor experience is preserved.

export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // ── Disable on touch devices ──────────────────────────────────────────
    // matchMedia pointer:coarse = touchscreen. Hide both elements and bail.
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) {
      dot.style.display  = 'none'
      ring.style.display = 'none'
      return
    }

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top  = `${mouseY}px`
    }

    const animate = () => {
      // Lerp ring toward mouse — 0.12 = subtle inertia lag
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top  = `${ringY}px`
      rafId = requestAnimationFrame(animate)
    }

    // Expand cursor on interactive elements
    const onEnter = () => {
      dot.style.width    = '12px'
      dot.style.height   = '12px'
      ring.style.width   = '52px'
      ring.style.height  = '52px'
      ring.style.borderColor = 'rgba(200, 168, 224, 0.6)'
    }
    const onLeave = () => {
      dot.style.width    = '6px'
      dot.style.height   = '6px'
      ring.style.width   = '32px'
      ring.style.height  = '32px'
      ring.style.borderColor = 'rgba(26, 107, 255, 0.4)'
    }

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return { dotRef, ringRef }
}
