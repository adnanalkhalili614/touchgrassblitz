import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'
import { PrimaryButton } from '../../components/PrimaryButton'

interface Props {
  onDone: (name: string) => void
}

const LINES = [
  "hey. i'm neo.",
  "i'm not an app that keeps you here. i'm here to help you leave.",
  "what's your name?",
]

export function MeetNeoView({ onDone }: Props) {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState('')
  const [ack, setAck] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Typewriter for current line
  useEffect(() => {
    const target = LINES[lineIndex] ?? ''
    setDisplayed('')
    let i = 0
    const iv = setInterval(() => {
      i++
      setDisplayed(target.slice(0, i))
      if (i >= target.length) {
        clearInterval(iv)
        // Schedule next step
        if (lineIndex === 0) setTimeout(() => setLineIndex(1), 800)
        if (lineIndex === 1) setTimeout(() => setLineIndex(2), 600)
        if (lineIndex === 2) setTimeout(() => setShowInput(true), 300)
      }
    }, 38)
    return () => clearInterval(iv)
  }, [lineIndex])

  useEffect(() => {
    if (showInput) setTimeout(() => inputRef.current?.focus(), 300)
  }, [showInput])

  const handleSubmit = async () => {
    if (!name.trim()) return
    const trimmed = name.trim()
    setAck(`good to meet you, ${trimmed}.`)
    await new Promise((r) => setTimeout(r, 1200))
    onDone(trimmed)
  }

  return (
    <div
      className="flex flex-col h-full px-8"
      style={{ background: '#0A0908', paddingTop: '80px' }}
    >
      {/* Orb */}
      <div className="flex justify-center mb-10">
        <NeoAvatar size="medium" isActive={showInput} />
      </div>

      {/* Text area */}
      <div className="flex-1 flex flex-col justify-start" style={{ minHeight: 120 }}>
        {lineIndex >= 0 && (
          <p
            style={{
              color: '#E8C4A0',
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: 1.6,
              letterSpacing: '-0.02em',
              minHeight: '1.6em',
            }}
          >
            {lineIndex === LINES.length - 1 || lineIndex < LINES.length - 1
              ? LINES.slice(0, lineIndex).join(' ') + (lineIndex > 0 ? ' ' : '') + displayed
              : displayed}
          </p>
        )}
      </div>

      {/* Input */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="pb-12"
          >
            {ack ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#8A7F78', fontSize: '15px', marginBottom: 24 }}
              >
                {ack}
              </motion.p>
            ) : (
              <>
                <input
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="your name"
                  style={{
                    width: '100%',
                    background: '#1C1916',
                    border: '1px solid #2C2520',
                    borderRadius: 12,
                    padding: '14px 16px',
                    color: '#F2EDE8',
                    fontSize: '16px',
                    fontWeight: 300,
                    marginBottom: 16,
                  }}
                />
                <PrimaryButton title="continue" onClick={handleSubmit} disabled={!name.trim()} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
