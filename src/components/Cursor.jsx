import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const canvas = canvasRef.current
    if (!dot || !ring || !canvas) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'

      // spawn particle
      if (Math.random() < 0.35) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          size: Math.random() * 2 + 0.5
        })
      }
    }

    window.addEventListener('mousemove', onMove)

    const animate = () => {
      // smooth ring lag
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12
      ring.style.left = ringPosRef.current.x + 'px'
      ring.style.top = ringPosRef.current.y + 'px'

      // particles
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      particlesRef.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.life * 0.4})`
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9995] pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
