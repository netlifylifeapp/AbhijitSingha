import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FADED_CONVERSATIONS } from '../../data/storyData'

// ─── SceneMessages ────────────────────────────────────────────────────────────
// Scene 3: Unread messages — a digital graveyard of conversations
// Interactive fake chat UI with emotional context

function MessageStatus({ status }) {
  const icons = {
    read:      { symbol: '✓✓', color: '#4a7ab5'  },
    delivered: { symbol: '✓✓', color: '#4a5568'  },
    unread:    { symbol: '✓',  color: '#4a5568'  },
  }
  const s = icons[status] || icons.unread
  return (
    <span className="text-xs ml-1" style={{ color: s.color }}>{s.symbol}</span>
  )
}

function ChatConversation({ convo, isActive, onClick }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 transition-all duration-500 border ${
        isActive
          ? 'border-ghost/30 bg-ink/80'
          : 'border-dim/50 bg-abyss/40 hover:border-ghost/20'
      } ${convo.isHer ? 'border-soul/20' : ''}`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display flex-shrink-0"
          style={{
            background: convo.isHer
              ? 'rgba(200, 168, 224, 0.1)'
              : 'rgba(26, 107, 255, 0.08)',
            border: convo.isHer
              ? '1px solid rgba(200, 168, 224, 0.2)'
              : '1px solid rgba(74, 122, 181, 0.15)',
            color: convo.isHer ? '#c8a8e0' : '#8badd4',
          }}
        >
          {convo.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-body text-sm ${convo.isHer ? 'text-soul' : 'text-mist'}`}>
            {convo.name}
          </p>
          <p className="font-mono text-xs text-ash truncate">{convo.lastSeen}</p>
        </div>
        {convo.status === 'unread' && (
          <div className="w-2 h-2 rounded-full bg-ember opacity-70 flex-shrink-0 animate-pulse" />
        )}
      </div>

      {/* Messages */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 overflow-hidden"
          >
            {convo.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.from === 'me' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-xs ${
                    msg.from === 'me' ? 'chat-bubble-sent' : 'chat-bubble-recv'
                  }`}
                >
                  <p className="font-mono text-xs text-mist leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="font-mono text-xs text-ash opacity-60">{msg.time}</span>
                    {msg.from === 'me' && <MessageStatus status={convo.status} />}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Faded note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: convo.messages.length * 0.15 + 0.3 }}
              className="font-serif italic text-xs text-ash text-center pt-3 pb-1 opacity-60 border-t border-dim/30"
            >
              {convo.fadedNote}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SceneMessages() {
  const sectionRef = useRef(null)
  const [activeConvo, setActiveConvo] = useState(null)

  const toggle = (id) => setActiveConvo(prev => prev === id ? null : id)

  return (
    <section
      ref={sectionRef}
      className="scene-section relative flex flex-col items-center justify-center py-32 px-6"
    >
      {/* Background: giant "delivered" text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <p
          className="font-display text-[10vw] font-light text-ghost leading-none select-none tracking-widest"
          style={{ opacity: 0.025, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          UNREAD
        </p>
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 relative z-10"
      >
        <p className="font-mono text-xs tracking-[0.4em] text-ghost uppercase mb-4">Scene II</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-mist mb-6">
          Delivered. Never Replied.
        </h2>
        <p className="font-serif italic text-ash text-lg max-w-lg mx-auto leading-relaxed">
          "The hardest part isn't being forgotten. It's watching people forget slowly, one unanswered message at a time."
        </p>
        <p className="font-mono text-xs text-ash mt-4 opacity-50">tap a conversation</p>
      </motion.div>

      {/* Conversation list */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 w-full max-w-md space-y-3"
      >
        {FADED_CONVERSATIONS.map((convo, i) => (
          <motion.div
            key={convo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatConversation
              convo={convo}
              isActive={activeConvo === convo.id}
              onClick={() => toggle(convo.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Emotional note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.45 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="relative z-10 font-serif italic text-sm text-ash text-center mt-16 max-w-sm leading-relaxed"
      >
        He still hasn't deleted any of them. He tells himself it's because he might need to look something up.
      </motion.p>
    </section>
  )
}
