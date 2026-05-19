import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMouseParallax } from '../../hooks/useMouseParallax'

// ─── RainCanvas ───────────────────────────────────────────────────────────────
// Full-screen Three.js canvas with:
//   - Animated rain particles reacting to mouse
//   - Volumetric fog atmosphere
//   - Subtle floating dust particles
//   - GPU-accelerated via WebGL

export default function RainCanvas() {
  const mountRef = useRef(null)
  const mouse = useMouseParallax(0.02)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Keep mouseRef in sync (avoid stale closure in animation loop)
  useEffect(() => {
    mouseRef.current = mouse
  }, [mouse])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene Setup ──────────────────────────────────────────────────────
    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Cap at 2x for perf
    renderer.setClearColor(0x000000, 0) // Transparent — CSS bg shows through
    mount.appendChild(renderer.domElement)

    // ── Rain Geometry ────────────────────────────────────────────────────
    const RAIN_COUNT = 4000
    const rainPositions = new Float32Array(RAIN_COUNT * 3)
    const rainVelocities = new Float32Array(RAIN_COUNT)

    for (let i = 0; i < RAIN_COUNT; i++) {
      rainPositions[i * 3 + 0] = (Math.random() - 0.5) * 20  // x
      rainPositions[i * 3 + 1] = (Math.random() - 0.5) * 20  // y
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 10  // z depth variation
      rainVelocities[i] = 0.01 + Math.random() * 0.04         // fall speed
    }

    const rainGeo = new THREE.BufferGeometry()
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3))

    // Custom shader material for rain streaks
    const rainMat = new THREE.PointsMaterial({
      color:       0xb8d4f0,
      size:        0.015,
      transparent: true,
      opacity:     0.35,
      sizeAttenuation: true,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    })

    const rain = new THREE.Points(rainGeo, rainMat)
    scene.add(rain)

    // ── Floating Dust Particles ──────────────────────────────────────────
    const DUST_COUNT = 200
    const dustPositions = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3 + 0] = (Math.random() - 0.5) * 12
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 8
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dustMat = new THREE.PointsMaterial({
      color:       0x4a7ab5,
      size:        0.04,
      transparent: true,
      opacity:     0.15,
      sizeAttenuation: true,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // ── Ambient Light Sphere (volumetric glow) ───────────────────────────
    const glowGeo  = new THREE.SphereGeometry(0.8, 32, 32)
    const glowMat  = new THREE.MeshBasicMaterial({
      color:       0x1a3a6b,
      transparent: true,
      opacity:     0.04,
      wireframe:   false,
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.position.set(0, 0, -2)
    scene.add(glow)

    // ── Animation Loop ───────────────────────────────────────────────────
    let animId
    const positions = rainGeo.attributes.position.array

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const { x: mx, y: my } = mouseRef.current

      // Rain falls + drifts with mouse
      for (let i = 0; i < RAIN_COUNT; i++) {
        positions[i * 3 + 1] -= rainVelocities[i]          // fall
        positions[i * 3 + 0] += mx * 0.002                  // mouse x drift
        positions[i * 3 + 2] += my * 0.001                  // subtle z shift

        // Reset when below screen
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 10
          positions[i * 3 + 0] = (Math.random() - 0.5) * 20
        }
      }
      rainGeo.attributes.position.needsUpdate = true

      // Dust floats gently
      dust.rotation.y += 0.0003
      dust.rotation.x += 0.0001

      // Glow follows mouse slowly
      glow.position.x += (mx * 2 - glow.position.x) * 0.03
      glow.position.y += (-my * 1.5 - glow.position.y) * 0.03

      // Camera micro-parallax
      camera.position.x += (mx * 0.3 - camera.position.x) * 0.05
      camera.position.y += (-my * 0.2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize Handler ───────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
