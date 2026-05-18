import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function RainBackground({ intensity = 1 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── SCENE SETUP ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── RAIN PARTICLES ──
    const rainCount = Math.floor(3500 * intensity)
    const positions = new Float32Array(rainCount * 3)
    const velocities = new Float32Array(rainCount)
    const opacities = new Float32Array(rainCount)

    for (let i = 0; i < rainCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20  // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8   // z
      velocities[i] = 0.06 + Math.random() * 0.08
      opacities[i]  = 0.1 + Math.random() * 0.5
    }

    const rainGeo = new THREE.BufferGeometry()
    rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const rainMat = new THREE.PointsMaterial({
      color: 0x4488cc,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const rain = new THREE.Points(rainGeo, rainMat)
    scene.add(rain)

    // ── STREAK LINES ── (longer rain streaks)
    const streakCount = 400
    const streakPositions = new Float32Array(streakCount * 6) // 2 points per line
    for (let i = 0; i < streakCount; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 6
      streakPositions[i * 6]     = x
      streakPositions[i * 6 + 1] = y
      streakPositions[i * 6 + 2] = z
      streakPositions[i * 6 + 3] = x + 0.02
      streakPositions[i * 6 + 4] = y - 0.25
      streakPositions[i * 6 + 5] = z
    }
    const streakGeo = new THREE.BufferGeometry()
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3))
    const streakMat = new THREE.LineBasicMaterial({
      color: 0x2255aa,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    })
    const streaks = new THREE.LineSegments(streakGeo, streakMat)
    scene.add(streaks)

    // ── DUST PARTICLES ──
    const dustCount = 200
    const dustPos = new Float32Array(dustCount * 3)
    const dustVel = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 18
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 12
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 5
      dustVel[i * 3]     = (Math.random() - 0.5) * 0.002
      dustVel[i * 3 + 1] = (Math.random() - 0.5) * 0.001
      dustVel[i * 3 + 2] = 0
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0x334466,
      size: 0.04,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // ── AMBIENT LIGHT SPHERE ──
    const glowGeo = new THREE.SphereGeometry(0.3, 16, 16)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x0044ff,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.position.set(0, 1, 2)
    scene.add(glow)

    // ── MOUSE REACTION ──
    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3
      mouseY = (e.clientY / window.innerHeight - 0.5) * -0.15
    }
    window.addEventListener('mousemove', onMouse)

    // ── RESIZE ──
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── ANIMATION LOOP ──
    let frameId
    const pos = rainGeo.attributes.position.array
    const sPos = streakGeo.attributes.position.array
    const dPos = dustGeo.attributes.position.array

    const animate = () => {
      frameId = requestAnimationFrame(animate)

      // fall rain
      for (let i = 0; i < rainCount; i++) {
        pos[i * 3 + 1] -= velocities[i]
        sPos[i < streakCount ? i * 6 + 1 : 0] -= velocities[i < streakCount ? i : 0] * 0.95

        if (pos[i * 3 + 1] < -7.5) {
          pos[i * 3 + 1] = 7.5
          pos[i * 3]     = (Math.random() - 0.5) * 20
        }
        if (i < streakCount) {
          sPos[i * 6 + 1] -= velocities[i] * 0.9
          sPos[i * 6 + 4] = sPos[i * 6 + 1] - 0.25
          if (sPos[i * 6 + 1] < -7.5) {
            sPos[i * 6 + 1] = 7.5
            sPos[i * 6 + 4] = 7.5 - 0.25
            sPos[i * 6]     = (Math.random() - 0.5) * 20
            sPos[i * 6 + 3] = sPos[i * 6] + 0.02
          }
        }
      }

      // drift dust
      for (let i = 0; i < dustCount; i++) {
        dPos[i * 3]     += dustVel[i * 3]
        dPos[i * 3 + 1] += dustVel[i * 3 + 1]
        if (Math.abs(dPos[i * 3]) > 9) dustVel[i * 3] *= -1
        if (Math.abs(dPos[i * 3 + 1]) > 6) dustVel[i * 3 + 1] *= -1
      }

      rainGeo.attributes.position.needsUpdate = true
      streakGeo.attributes.position.needsUpdate = true
      dustGeo.attributes.position.needsUpdate = true

      // camera sway with mouse
      camera.position.x += (mouseX - camera.position.x) * 0.02
      camera.position.y += (mouseY - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [intensity])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}
