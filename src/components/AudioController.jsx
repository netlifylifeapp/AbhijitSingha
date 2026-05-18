import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Generates soft rain/ambient tone using Web Audio API (no external files needed)
function createAmbientRain(audioCtx) {
  const bufferSize = audioCtx.sampleRate * 3
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.15
  }

  const source = audioCtx.createBufferSource()
  source.buffer = buffer
  source.loop = true

  // Low-pass filter for soft rain texture
  const lpf = audioCtx.createBiquadFilter()
  lpf.type = 'lowpass'
  lpf.frequency.value = 1200
  lpf.Q.value = 0.5

  // High-pass filter to remove rumble
  const hpf = audioCtx.createBiquadFilter()
  hpf.type = 'highpass'
  hpf.frequency.value = 200

  // Gentle reverb-like convolution using gain oscillation
  const gainNode = audioCtx.createGain()
  gainNode.gain.value = 0.08

  source.connect(hpf)
  hpf.connect(lpf)
  lpf.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  return { source, gainNode }
}

function createPianoTone(audioCtx) {
  // Simple emotional drone
  const notes = [130.81, 146.83, 174.61, 196.00] // C3, D3, F3, G3
  const gainNode = audioCtx.createGain()
  gainNode.gain.value = 0

  const oscillators = notes.map((freq, i) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    const g = audioCtx.createGain()
    g.gain.value = 0.015 - i * 0.003

    const lpf = audioCtx.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 400

    osc.connect(lpf)
    lpf.connect(gainNode)
    return osc
  })

  gainNode.connect(audioCtx.destination)
  return { oscillators, gainNode }
}

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const audioCtxRef = useRef(null)
  const rainRef = useRef(null)
  const pianoRef = useRef(null)

  const startAudio = () => {
    if (isStarted) return

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      audioCtxRef.current = ctx

      const rain = createAmbientRain(ctx)
      const piano = createPianoTone(ctx)

      rain.source.start()
      piano.oscillators.forEach(o => o.start())

      rainRef.current = rain
      pianoRef.current = piano

      // Fade in
      rain.gainNode.gain.setTargetAtTime(0.08, ctx.currentTime, 1.5)
      piano.gainNode.gain.setTargetAtTime(0.6, ctx.currentTime, 2)

      setIsStarted(true)
      setIsPlaying(true)
    } catch (e) {
      console.warn('Audio not available:', e)
    }
  }

  const toggleAudio = () => {
    if (!isStarted) {
      startAudio()
      return
    }

    const ctx = audioCtxRef.current
    if (!ctx) return

    if (isPlaying) {
      ctx.suspend()
      setIsPlaying(false)
    } else {
      ctx.resume()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-[9985] flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel hover:border-[rgba(0,212,255,0.3)] transition-all duration-300"
      title={isPlaying ? 'mute ambient audio' : 'enable ambient audio'}
    >
      <div className="relative">
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4">
            {[4, 7, 5, 8, 4].map((h, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-[rgba(0,212,255,0.6)] rounded-full"
                style={{ height: h * 2 }}
                animate={{ scaleY: [1, 1.6, 0.7, 1.4, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-end gap-0.5 h-4">
            {[4, 7, 5, 8, 4].map((h, i) => (
              <div
                key={i}
                className="w-0.5 bg-[rgba(80,100,140,0.4)] rounded-full"
                style={{ height: h }}
              />
            ))}
          </div>
        )}
      </div>
      <span className="font-mono text-[8px] tracking-widest text-[rgba(100,140,200,0.5)] uppercase">
        {isStarted ? (isPlaying ? 'ambient on' : 'muted') : 'audio off'}
      </span>
    </motion.button>
  )
}
