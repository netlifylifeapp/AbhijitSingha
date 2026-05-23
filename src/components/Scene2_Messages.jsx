import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import gsap from 'gsap'

const conversations = [
  {
    name: 'her',
    lastSeen: '2 years ago',
    avatar: 'S',
    color: '#c42d42',
    messages: [
      { from: 'them', text: 'I think we should talk.', time: '11:43 PM', read: false },
      { from: 'me', text: "About what? I have been waiting.", time: '11:44 PM', read: false },
      { from: 'them', text: "About us. About everything.", time: '11:44 PM', read: false },
      { from: 'me', text: "I am sorry. For all of it.", time: '11:48 PM', read: false },
    ]
  },
  {
    name: 'James',
    lastSeen: '8 months ago',
    avatar: 'J',
    color: '#4a7ab5',
    messages: [
      { from: 'me', text: 'bhai tu kahan hai aajkal', time: '9:12 PM', read: true },
      { from: 'me', text: 'ping me when you are free', time: '9:13 PM', read: false },
    ]
  },
  {
    name: 'Priya',
    lastSeen: '1 year ago',
    avatar: 'P',
    color: '#8a6a2a',
    messages: [
      { from: 'them', text: 'we should all hang out again', time: '3:20 PM', read: true },
      { from: 'me', text: 'definitely. soon.', time: '3:22 PM', read: true },
      { from: 'them', text: 'ok', time: '3:22 PM', read: true },
    ]
  },
  {
    name: 'Mom',
    lastSeen: '3 days ago',
    avatar: 'M',
    color: '#c9a84c',
    messages: [
      { from: 'them', text: 'beta, kha liya?', time: '7:00 PM', read: false },
      { from: 'them', text: 'reply karo', time: '9:30 PM', read: false },
    ]
  }
]

function ChatBubble({ msg, delay }) {
  const isMine = msg.from === 'me'
  return (
    <motion.div
      initial={{ opacity: 0, x: isMine ? 30 : -30, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-[75%] px-4 py-2.5 ${isMine ? 'chat-bubble-sent' : 'chat-bubble-recv'}`}
      >
        <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'rgba(235,225,205,0.85)' }}>
          {msg.text}
        </p>
        <div className={`flex items-center gap-1.5 mt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
          <span className="font-mono text-[8px]" style={{ color: 'rgba(190,170,130,0.75)' }}>{msg.time}</span>
          {isMine && (
            <span className="font-mono text-[8px]" style={{ color: msg.read ? 'rgba(201,168,76,0.6)' : 'rgba(130,110,80,0.35)' }}>
              {msg.read ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex items-center gap-1.5 px-4 py-3 chat-bubble-recv w-fit mb-3"
    >
      <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.5)' }} />
      <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.5)' }} />
      <div className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.5)' }} />
    </motion.div>
  )
}

function ConversationCard({ conv, isActive, onClick }) {
  const unread = conv.messages.filter(m => !m.read && m.from === 'them').length
  const lastMsg = conv.messages[conv.messages.length - 1]
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 4, backgroundColor: 'rgba(201,168,76,0.03)' }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-300 border-l-2 ${
        isActive ? 'border-[rgba(155,35,53,0.6)]' : 'border-transparent'
      }`}
      style={{ background: isActive ? 'rgba(155,35,53,0.05)' : 'transparent' }}
    >
      <div className="relative flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="w-10 h-10 rounded-full flex items-center justify-center font-sans font-medium text-sm"
          style={{ background: `${conv.color}20`, border: `1px solid ${conv.color}40`, color: conv.color }}
        >
          {conv.avatar}
        </motion.div>
        {unread > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(155,35,53,0.9)' }}
          >
            <span className="font-mono text-[6px]" style={{ color: 'rgba(245,240,232,0.9)' }}>{unread}</span>
          </motion.div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-sans text-[13px] font-medium truncate" style={{ color: 'rgba(235,225,205,0.75)' }}>{conv.name}</span>
          <span className="font-mono text-[7px] flex-shrink-0 ml-2" style={{ color: 'rgba(150,130,90,0.4)' }}>last seen {conv.lastSeen}</span>
        </div>
        <span className="font-sans text-[11px] truncate block" style={{ color: 'rgba(150,130,90,0.45)' }}>{lastMsg.text}</span>
      </div>
    </motion.div>
  )
}

export default function Scene2_Messages() {
  const { ref, isInView } = useInView()
  const [activeConv, setActiveConv] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!isInView) return
    setShowTyping(false)
    const t = setTimeout(() => setShowTyping(true), 3000)
    const t2 = setTimeout(() => setShowTyping(false), 6500)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [activeConv, isInView])

  useEffect(() => {
    if (!isInView || !headerRef.current) return
    gsap.fromTo(headerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
  }, [isInView])

  const conv = conversations[activeConv]

  return (
    <section ref={ref} className="scene-section relative z-10 py-16">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(13,13,26,0.97) 0%, transparent 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div ref={headerRef} className="mb-12 text-center">
          <div className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(155,35,53,0.45)' }}>chapter two</div>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-4" style={{ color: 'rgba(235,225,205,0.88)' }}>unread conversations</h2>
          <p className="font-sans text-sm max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(190,170,130,0.75)' }}>
            "He still reads old chats like they are places he can return to."
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-lg overflow-hidden"
          style={{ maxHeight: '520px', display: 'flex' }}
        >
          <div className="w-64 flex-shrink-0 flex flex-col" style={{ borderRight: '1px solid rgba(201,168,76,0.08)' }}>
            <div className="px-4 py-3.5" style={{ borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
              <div className="font-sans text-[10px] tracking-wider uppercase" style={{ color: 'rgba(160,140,100,0.4)' }}>Messages</div>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {conversations.map((c, i) => (
                <ConversationCard key={i} conv={c} isActive={activeConv === i} onClick={() => setActiveConv(i)} />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConv}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 px-5 py-3.5"
                style={{ borderBottom: '1px solid rgba(201,168,76,0.06)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ background: `${conv.color}20`, color: conv.color }}>
                  {conv.avatar}
                </div>
                <div>
                  <div className="font-sans text-[13px]" style={{ color: 'rgba(235,225,205,0.75)' }}>{conv.name}</div>
                  <div className="font-mono text-[8px]" style={{ color: 'rgba(150,130,90,0.4)' }}>last seen {conv.lastSeen}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <AnimatePresence mode="wait">
                <motion.div key={activeConv} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {conv.messages.map((msg, i) => <ChatBubble key={i} msg={msg} delay={i * 0.12} />)}
                  <AnimatePresence>{showTyping && activeConv === 0 && <TypingIndicator />}</AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(201,168,76,0.06)' }}>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.08)' }}>
                <span className="font-sans text-[12px] italic flex-1" style={{ color: 'rgba(130,110,80,0.35)' }}>type something...</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-14 text-center"
        >
          <p className="font-serif text-lg md:text-xl italic max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(200,180,140,0.45)' }}>
            "Some conversations never truly end. They just stop getting replies."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
