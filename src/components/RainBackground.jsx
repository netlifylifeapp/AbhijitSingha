import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function RainBackground({ intensity = 1 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const rainCount = Math.floor(2000 * intensity)
    const positions = new Float32Array(rainCount * 3)
    const velocities = new Float32Array(rainCount)

    for (let i = 0; i < rainCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      velocities[i] = 0.04 + Math.random() * 0.06
    }

    const rainGeo = new THREE.BufferGeometry()
    rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const rainMat = new THREE.PointsMaterial({
      color: 0x8a6a00,
      size: 0.02,
      transparent: true,
      opacity: 0.2,
      blending: THREE.MultiplyBlending,
      depthWrite: false
    })
    const rain = new THREE.Points(rainGeo, rainMat)
    scene.add(rain)

    const dustCount = 150
    const dustPos = new Float32Array(dustCount * 3)
    const dustVel = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 18
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 12
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 5
      dustVel[i * 3]     = (Math.random() - 0.5) * 0.002
      dustVel[i * 3 + 1] = (Math.random() - 0.5) * 0.001
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0xc49a00,
      size: 0.035,
      transparent: true,
      opacity: 0.15,
      blending: THREE.MultiplyBlending,
      depthWrite: false
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.2
      mouseY = (e.clientY / window.innerHeight - 0.5) * -0.1
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let frameId
    const pos = rainGeo.attributes.position.array
    const dPos = dustGeo.attributes.position.array

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      for (let i = 0; i < rainCount; i++) {
        pos[i * 3 + 1] -= velocities[i]
        if (pos[i * 3 + 1] < -7.5) {
          pos[i * 3 + 1] = 7.5
          pos[i * 3] = (Math.random() - 0.5) * 20
        }
      }
      for (let i = 0; i < dustCount; i++) {
        dPos[i * 3]     += dustVel[i * 3]
        dPos[i * 3 + 1] += dustVel[i * 3 + 1]
        if (Math.abs(dPos[i * 3]) > 9) dustVel[i * 3] *= -1
        if (Math.abs(dPos[i * 3 + 1]) > 6) dustVel[i * 3 + 1] *= -1
      }
      rainGeo.attributes.position.needsUpdate = true
      dustGeo.attributes.position.needsUpdate = true
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
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [intensity])

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.5 }} />
  )
}
