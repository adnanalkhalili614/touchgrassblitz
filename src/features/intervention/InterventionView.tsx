import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'
import { MessageBubble } from '../../components/MessageBubble'
import { useNeoStore } from '../../store/useNeoStore'
import type { TriggerType } from '../../store/useNeoStore'
import { sendToNeo, interventionSystemPrompt } from '../../services/anthropicService'
import type { Message } from '../../services/anthropicService'

interface Props {
  trigger: TriggerType
}

export function InterventionView({ trigger }: Props) {
  const profile       = useNeoStore((s) => s.profile)
  const setScreen     = useNeoStore((s) => s.setScreen)
  const recordIntervention = useNeoStore((s) => s.recordIntervention)
  const resolveIntervention = useNeoStore((s) => s.resolveIntervention)

  const [messages, setMessages] = useState<Array<{ role: 'neo' | 'user'; text: string }>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [exchangeCount, setExchangeCount] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [sessionId] = useState(() =>
    recordIntervention({ triggerType: trigger, riskScoreAtTrigger: 0, userEngaged: false, sessionDurationSeconds: 0 })
  )
  const [sessionStart] = useState(() => Date.now())
  const scrollRef = useRef<HTMLDivElement>(null)

  const name     = profile?.name ?? 'you'
  const why      = profile?.whyStatement ?? ''
  const identity = profile?.identityStatement ?? ''
  const system   = interventionSystemPrompt(name, why, identity, trigger)

  // Opening message
  useEffect(() => {
    const opening = why
      ? `hey ${name}. you set out to become ${identity}. what's happening right now?`
      : `hey. what's going on right now?`
    setMessages([{ role: 'neo', text: opening }])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userText = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setLoading(true)

    const history: Message[] = [
      ...messages.map((m) => ({ role: m.role === 'neo' ? 'assistant' as const : 'user' as const, content: m.text })),
      { role: 'user', content: userText },
    ]

    try {
      const reply = await sendToNeo(system, history)
      setMessages((prev) => [...prev, { role: 'neo', text: reply }])
      const next = exchangeCount + 1
      setExchangeCount(next)
      if (next >= 3) setShowOptions(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDone = (helped: boolean) => {
    const duration = Math.round((Date.now() - sessionStart) / 1000)
    resolveIntervention(sessionId, true, duration, helped)
    setScreen('home')
  }

  const goBreathing    = () => setScreen('breathing')
  const goStepChallenge = () => setScreen('stepChallenge')

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0908' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <button
          onClick={() => handleDone(false)}
          style={{ background: 'none', border: 'none', color: '#4A4540', fontSize: '13px' }}
        >
          ← back
        </button>
        <NeoAvatar size="small" isActive />
        <div style={{ width: 40 }} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 neo-scroll px-5 py-2">
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            text={m.text}
            role={m.role}
            animateIn={m.role === 'neo' && i === messages.length - 1}
          />
        ))}
        {loading && (
          <div className="flex justify-start mb-3">
            <div
              style={{
                background: '#1C1916',
                borderRadius: 16,
                padding: '12px 16px',
                display: 'flex',
                gap: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8956C' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Activity options */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 pb-2"
          >
            <p style={{ color: '#4A4540', fontSize: '12px', textAlign: 'center', marginBottom: 10 }}>
              try one of these
            </p>
            <div className="flex gap-3">
              <button
                onClick={goBreathing}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 12,
                  background: '#1C1916', border: '1px solid #2C2520',
                  color: '#E8C4A0', fontSize: '13px', fontWeight: 400,
                }}
              >
                breathing exercise
              </button>
              <button
                onClick={goStepChallenge}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 12,
                  background: '#1C1916', border: '1px solid #2C2520',
                  color: '#E8C4A0', fontSize: '13px', fontWeight: 400,
                }}
              >
                take a walk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div
        className="flex items-end gap-3 px-4 py-4"
        style={{ borderTop: '1px solid #1C1916' }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
          placeholder="say something..."
          rows={1}
          style={{
            flex: 1,
            background: '#1C1916',
            border: '1px solid #2C2520',
            borderRadius: 12,
            padding: '12px 14px',
            color: '#F2EDE8',
            fontSize: '15px',
            fontWeight: 300,
            resize: 'none',
            lineHeight: 1.5,
          }}
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={sendMessage}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: input.trim() ? '#C8956C' : '#1C1916',
            border: 'none', color: '#0A0908', fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
        >
          ↑
        </motion.button>
      </div>

      {/* End session */}
      {exchangeCount >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-6 text-center"
        >
          <button
            onClick={() => handleDone(true)}
            style={{ background: 'none', border: 'none', color: '#4A4540', fontSize: '13px' }}
          >
            put my phone down
          </button>
        </motion.div>
      )}
    </div>
  )
}
