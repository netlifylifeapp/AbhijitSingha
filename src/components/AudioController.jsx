import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function createAmbientRain(audioCtx) {
  const bufferSize = audioCtx.sampleRate * 3
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.12
  const source = audioCtx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  const lpf = audioCtx.createBiquadFilter()
  lpf.type = 'lowpass'
  lpf.frequency.value = 1000
  const hpf = audioCtx.createBiquadFilter()
  hpf.type = 'highpass'
  hpf.frequency.value = 300
  const gainNode = audioCtx.createGain()
  gainNode.gain.value = 0.06
  source.connect(hpf)
  hpf.connect(lpf)
  lpf.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  return { source, gainNode }
}

function createPianoTone(audioCtx) {
  const notes = [130.81, 146.83, 174.61, 196.00]
  const gainNode = audioCtx.createGain()
  gainNode.gain.value = 0
  const oscillators = notes.map((freq, i) => {
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    const g = audioCtx.createGain()
    g.gain.value = 0.012 - i * 0.002
    const lpf = audioCtx.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 350
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
      rain.gainNode.gain.setTargetAtTime(0.06, ctx.currentTime, 1.5)
      piano.gainNode.gain.setTargetAtTime(0.5, ctx.currentTime, 2)
      setIsStarted(true)
      setIsPlaying(true)
    } catch (e) { console.warn('Audio not available:', e) }
  }

  const toggleAudio = () => {
    if (!isStarted) { startAudio(); return }
    const ctx = audioCtxRef.current
    if (!ctx) return
    if (isPlaying) { ctx.suspend(); setIsPlaying(false) }
    else { ctx.resume(); setIsPlaying(true) }
  }

  useEffect(() => {
    return () => { if (audioCtxRef.current) audioCtxRef.current.close() }
  }, [])

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-[9985] flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300"
      style={{
        background: 'rgba(255,250,240,0.85)',
        border: '1px solid rgba(138,106,0,0.2)',
        boxShadow: '0 4px 20px rgba(100,60,20,0.1)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div className="flex items-end gap-0.5 h-4">
        {[4,7,5,8,4].map((h, i) => (
          <motion.div
            key={i}
            className="w-0.5 rounded-full"
            style={{ height: isPlaying ? h * 2 : h, background: isPlaying ? 'rgba(139,26,26,0.6)' : 'rgba(138,106,0,0.3)' }}
            animate={isPlaying ? { scaleY: [1, 1.6, 0.7, 1.4, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: 'rgba(100,60,30,0.55)' }}>
        {isStarted ? (isPlaying ? 'ambient on' : 'muted') : 'audio off'}
      </span>
    </motion.button>
  )
}
