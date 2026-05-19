import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CORRECT_PASSWORD = 'Kokoshibo'
const WHATSAPP_NUMBER = '919678791736'

export default function PasswordGate({ onUnlock }) {
  const [mode, setMode] = useState('idle')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (mode === 'password' || mode === 'request') {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [mode])

  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      onUnlock()
    } else {
      setShake(true)
      setError('wrong password.')
      setPassword('')
      setTimeout(() => { setShake(false); setError('') }, 1200)
    }
  }

  const handleRequestAccess = () => {
    if (!name.trim()) { setError('please enter your name.'); return }
    const msg = encodeURIComponent('Hello, I am ' + name.trim() + '. I would like to access your world — Abhijit Singha.')
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank')
    setMode('sent')
  }

  return (
    <motion.div className="fixed inset-0 z-[99999] flex items-center justify-center" style={{ background: '#f2ebe0' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
      <div className="grain-overlay" />
      <div className="scanlines" />
      <div className="vignette" />
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[rgba(138,106,0,0.3)]" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[rgba(138,106,0,0.3)]" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[rgba(138,106,0,0.3)]" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[rgba(138,106,0,0.3)]" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="font-mono text-[8px] tracking-[0.5em] text-[rgba(138,106,0,0.4)] uppercase">restricted access</div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm w-full">
        <motion.div animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 4, repeat: Infinity }} className="mb-8">
          <div className="w-16 h-16 rounded-full border border-[rgba(138,106,0,0.2)] flex items-center justify-center mx-auto" style={{ boxShadow: '0 0 40px rgba(139,26,26,0.06)' }}>
            <div className="w-10 h-10 rounded-full border border-[rgba(139,26,26,0.25)] flex items-center justify-center">
              <span className="text-[rgba(138,106,0,0.7)] text-lg">⊗</span>
            </div>
          </div>
        </motion.div>
        <h1 className="font-serif text-4xl italic mb-2" style={{ color: 'rgba(25,12,8,0.8)', textShadow: '0 0 30px rgba(139,26,26,0.1)' }}>Abhijit Singha</h1>
        <p className="font-mono text-[9px] tracking-[0.4em] text-[rgba(120,80,40,0.45)] uppercase mb-10">a mind left behind</p>
        <AnimatePresence mode="wait">
          {mode === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="flex flex-col items-center gap-4 w-full">
              <p className="font-serif text-sm italic mb-4 leading-relaxed" style={{ color: 'rgba(100,60,30,0.55)' }}>"This world is not open to everyone. You need permission to enter."</p>
              <button onClick={() => setMode('password')} className="w-full py-3 px-6 font-mono text-[10px] tracking-[0.35em] uppercase transition-all duration-300" style={{ background: 'rgba(139,26,26,0.08)', border: '1px solid rgba(139,26,26,0.25)', color: 'rgba(139,26,26,0.8)' }}>I have a password</button>
              <button onClick={() => setMode('request')} className="w-full py-3 px-6 font-mono text-[10px] tracking-[0.35em] uppercase transition-all duration-300" style={{ background: 'rgba(26,47,94,0.06)', border: '1px solid rgba(26,47,94,0.2)', color: 'rgba(26,47,94,0.7)' }}>Request Access</button>
            </motion.div>
          )}
          {mode === 'password' && (
            <motion.div key="password" initial={{ opacity: 0, y: 16 }} animate={shake ? { x: [-8,8,-6,6,-4,4,0] } : { opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="flex flex-col items-center gap-4 w-full">
              <p className="font-mono text-[9px] tracking-widest text-[rgba(120,80,40,0.45)] uppercase mb-2">enter password</p>
              <input ref={inputRef} type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()} placeholder="••••••••" className="w-full py-3 px-4 text-center font-mono text-sm outline-none" style={{ border: '1px solid rgba(138,106,0,0.25)', color: 'rgba(25,12,8,0.9)', background: 'rgba(255,250,240,0.8)', letterSpacing: '0.3em' }} />
              {error && <p className="font-mono text-[9px] text-[rgba(139,26,26,0.7)] tracking-wider">{error}</p>}
              <button onClick={handlePasswordSubmit} className="w-full py-3 font-mono text-[10px] tracking-[0.35em] uppercase" style={{ background: 'rgba(139,26,26,0.1)', border: '1px solid rgba(139,26,26,0.3)', color: 'rgba(139,26,26,0.85)' }}>Enter</button>
              <button onClick={() => { setMode('idle'); setError(''); setPassword('') }} className="font-mono text-[8px] tracking-widest text-[rgba(120,80,40,0.35)] uppercase">← back</button>
            </motion.div>
          )}
          {mode === 'request' && (
            <motion.div key="request" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="flex flex-col items-center gap-4 w-full">
              <p className="font-mono text-[9px] tracking-widest text-[rgba(120,80,40,0.45)] uppercase mb-2">who are you?</p>
              <input ref={inputRef} type="text" value={name} onChange={e => { setName(e.target.value); setError('') }} onKeyDown={e => e.key === 'Enter' && handleRequestAccess()} placeholder="your name" className="w-full py-3 px-4 text-center font-serif text-base outline-none italic" style={{ border: '1px solid rgba(26,47,94,0.2)', color: 'rgba(25,12,8,0.85)', background: 'rgba(240,245,255,0.6)' }} />
              {error && <p className="font-mono text-[9px] text-[rgba(139,26,26,0.7)] tracking-wider">{error}</p>}
              <button onClick={handleRequestAccess} className="w-full py-3 font-mono text-[10px] tracking-[0.35em] uppercase" style={{ background: 'rgba(26,47,94,0.08)', border: '1px solid rgba(26,47,94,0.25)', color: 'rgba(26,47,94,0.8)' }}>Send Request via WhatsApp</button>
              <button onClick={() => { setMode('idle'); setError(''); setName('') }} className="font-mono text-[8px] tracking-widest text-[rgba(120,80,40,0.35)] uppercase">← back</button>
            </motion.div>
          )}
          {mode === 'sent' && (
            <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-5 w-full">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl" style={{ color: 'rgba(138,106,0,0.7)' }}>✦</motion.div>
              <p className="font-serif text-lg italic leading-relaxed" style={{ color: 'rgba(100,60,30,0.7)' }}>"Your request has been sent. Wait to be let in."</p>
              <p className="font-mono text-[8px] tracking-widest text-[rgba(120,80,40,0.35)] uppercase">he will decide.</p>
              <button onClick={() => setMode('password')} className="mt-4 font-mono text-[9px] tracking-widest text-[rgba(120,80,40,0.4)] uppercase">I received the password →</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="font-mono text-[7px] tracking-[0.4em] text-[rgba(120,80,40,0.25)] uppercase">private memory archive</div>
      </div>
    </motion.div>
  )
}
