import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const conversations = [
  {
    name: 'her',
    lastSeen: '2 years ago',
    avatar: 'S',
    color: '#ff6b9d',
    messages: [
      { from: 'them', text: 'I think we should talk.', time: '11:43 PM', read: false },
      { from: 'me', text: "About what? I've been waiting.", time: '11:44 PM', read: false },
      { from: 'them', text: "About us. About everything.", time: '11:44 PM', read: false },
      { from: 'me', text: "I'm sorry. For all of it.", time: '11:48 PM', read: false },
    ]
  },
  {
    name: 'Rohan',
    lastSeen: '8 months ago',
    avatar: 'R',
    color: '#4db8ff',
    messages: [
      { from: 'me', text: 'bhai tu kahan hai aajkal?', time: '9:12 PM', read: true },
      { from: 'me', text: 'ping me when you're free', time: '9:13 PM', read: false },
    ]
  },
  {
    name: 'Priya',
    lastSeen: '1 year ago',
    avatar: 'P',
    color: '#a78bfa',
    messages: [
      { from: 'them', text: 'we should all hang out again', time: '3:20 PM', read: true },
      { from: 'me', text: 'definitely. soon.', time: '3:22 PM', read: true },
      { from: 'them', text: '👍', time: '3:22 PM', read: true },
    ]
  },
  {
    name: 'Mom',
    lastSeen: '3 days ago',
    avatar: 'M',
    color: '#fbbf24',
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
      initial={{ opacity: 0, x: isMine ? 20 : -20, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div className={`max-w-[75%] px-4 py-2.5 relative ${isMine ? 'chat-bubble-sent' : 'chat-bubble-recv'}`}>
        <p className="font-sans text-[13px] text-[rgba(220,230,255,0.8)] leading-relaxed">
          {msg.text}
        </p>
        <div className={`flex items-center gap-1.5 mt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
          <span className="font-mono text-[9px] text-[rgba(120,150,200,0.4)]">{msg.time}</span>
          {isMine && (
            <span className={`font-mono text-[9px] ${msg.read ? 'text-[rgba(0,212,255,0.5)]' : 'text-[rgba(120,150,200,0.3)]'}`}>
              {msg.read ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 chat-bubble-recv w-fit mb-4">
      <div className="typing-dot w-1.5 h-1.5 rounded-full bg-[rgba(160,190,255,0.5)]" />
      <div className="typing-dot w-1.5 h-1.5 rounded-full bg-[rgba(160,190,255,0.5)]" />
      <div className="typing-dot w-1.5 h-1.5 rounded-full bg-[rgba(160,190,255,0.5)]" />
    </div>
  )
}

function ConversationCard({ conv, index, isActive, onClick }) {
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setShowTyping(true), 2000)
      const t2 = setTimeout(() => setShowTyping(false), 5000)
      return () => { clearTimeout(t); clearTimeout(t2) }
    }
  }, [isActive])

  const unread = conv.messages.filter(m => !m.read && m.from === 'them').length
  const lastMsg = conv.messages[conv.messages.length - 1]

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-all duration-300 border-l-2 ${
        isActive
          ? 'border-[rgba(0,212,255,0.5)] bg-[rgba(0,212,255,0.03)]'
          : 'border-transparent hover:border-[rgba(0,212,255,0.15)] hover:bg-[rgba(255,255,255,0.02)]'
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-sans font-medium text-sm"
          style={{
            background: `rgba(${conv.color.slice(1).match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}, 0.12)`,
            border: `1px solid ${conv.color}30`,
            color: conv.color,
          }}
        >
          {conv.avatar}
        </div>
        {unread > 0 && (
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[rgba(0,212,255,0.8)] flex items-center justify-center">
            <span className="font-mono text-[6px] text-void">{unread}</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-sans text-[13px] text-[rgba(220,230,255,0.7)] font-medium truncate">
            {conv.name}
          </span>
          <span className="font-mono text-[8px] text-[rgba(100,130,180,0.4)] flex-shrink-0 ml-2">
            last seen {conv.lastSeen}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {lastMsg.from === 'me' && (
            <span className="font-mono text-[8px] text-[rgba(100,140,200,0.4)]">you: </span>
          )}
          <span className="font-sans text-[11px] text-[rgba(120,150,200,0.45)] truncate">
            {lastMsg.text}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Scene2_Messages() {
  const { ref, isInView } = useInView()
  const [activeConv, setActiveConv] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [faded, setFaded] = useState(false)

  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => setShowTyping(true), 3500)
    const t2 = setTimeout(() => setShowTyping(false), 6500)
    const t3 = setTimeout(() => setFaded(true), 8000)
    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3) }
  }, [isInView, activeConv])

  useEffect(() => {
    if (isInView) {
      setShowTyping(false)
      setFaded(false)
      const t = setTimeout(() => setShowTyping(true), 3000)
      const t2 = setTimeout(() => setShowTyping(false), 6000)
      return () => { clearTimeout(t); clearTimeout(t2) }
    }
  }, [activeConv, isInView])

  const conv = conversations[activeConv]

  return (
    <section ref={ref} className="scene-section relative z-10 py-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(5,5,20,0.97) 0%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <div className="font-mono text-[9px] tracking-[0.5em] text-[rgba(0,212,255,0.3)] uppercase mb-4">
            chapter two
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[rgba(200,215,255,0.65)] italic mb-4">
            unread conversations
          </h2>
          <p className="font-sans text-sm text-[rgba(120,150,200,0.45)] max-w-sm mx-auto leading-relaxed">
            "He still reads old chats like they are places he can return to."
          </p>
        </motion.div>

        {/* Chat UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="glass-panel rounded-lg overflow-hidden"
          style={{ maxHeight: '520px', display: 'flex' }}
        >
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0 border-r border-[rgba(255,255,255,0.05)] flex flex-col">
            <div className="px-4 py-3.5 border-b border-[rgba(255,255,255,0.04)]">
              <div className="font-sans text-[11px] text-[rgba(120,150,200,0.4)] tracking-wider uppercase">
                Messages
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {conversations.map((c, i) => (
                <ConversationCard
                  key={i}
                  conv={c}
                  index={i}
                  isActive={activeConv === i}
                  onClick={() => setActiveConv(i)}
                />
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.04)]">
              <div className="font-mono text-[8px] text-[rgba(80,100,140,0.35)] tracking-wider">
                4 conversations • {conversations.reduce((acc, c) => acc + c.messages.filter(m => !m.read && m.from === 'them').length, 0)} unread
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[rgba(255,255,255,0.04)]">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-medium"
                style={{
                  background: `rgba(${conv.color.slice(1).match(/.{2}/g).map(h => parseInt(h, 16)).join(',')}, 0.12)`,
                  color: conv.color
                }}
              >
                {conv.avatar}
              </div>
              <div>
                <div className="font-sans text-[13px] text-[rgba(200,220,255,0.7)]">{conv.name}</div>
                <div className="font-mono text-[9px] text-[rgba(100,130,180,0.35)]">
                  last seen {conv.lastSeen}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeConv}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {conv.messages.map((msg, i) => (
                    <ChatBubble key={i} msg={msg} delay={i * 0.15} />
                  ))}
                  {showTyping && activeConv === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                  {faded && activeConv === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-4"
                    >
                      <span className="font-mono text-[9px] text-[rgba(80,100,140,0.35)] italic">
                        she was typing... and then she wasn't.
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input — disabled */}
            <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.04)]">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <span className="font-sans text-[12px] text-[rgba(80,100,140,0.3)] italic flex-1">
                  type something...
                </span>
                <div className="w-5 h-5 rounded-full bg-[rgba(26,111,255,0.15)] flex items-center justify-center">
                  <span className="text-[rgba(0,212,255,0.3)] text-xs">↑</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quote below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-12 text-center"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[rgba(0,212,255,0.2)] to-transparent mx-auto mb-6" />
          <p className="font-serif text-lg md:text-xl text-[rgba(160,185,230,0.5)] italic max-w-md mx-auto">
            "Some conversations never truly end.<br />
            They just stop getting replies."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
