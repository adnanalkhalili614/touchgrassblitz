import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'
import { useNeoStore } from '../../store/useNeoStore'
import type { AlarmRecord } from '../../store/useNeoStore'
import { sendToNeo, alarmSystemPrompt } from '../../services/anthropicService'

interface Props {
  alarm: AlarmRecord | null
}

type Phase = 'awaitingReason' | 'evaluating' | 'pushback' | 'snoozed' | 'dismissed'

function nowString() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function AlarmInterventionView({ alarm }: Props) {
  const profile    = useNeoStore((s) => s.profile)
  const setScreen  = useNeoStore((s) => s.setScreen)
  const addSnooze  = useNeoStore((s) => s.addSnoozeAttempt)

  const [phase, setPhase] = useState<Phase>('awaitingReason')
  const [reason, setReason] = useState('')
  const [neoMessage, setNeoMessage] = useState('')
  const [allowedByNeo, setAllowedByNeo] = useState(false)
  const [openingText, setOpeningText] = useState('')

  const label    = alarm?.label ?? 'your alarm'
  const time     = nowString()
  const identity = profile?.identityStatement ?? 'your best self'
  const name     = profile?.name ?? 'you'

  // Typewriter opening
  useEffect(() => {
    const target = `you set this alarm for a reason. what is it?`
    let i = 0
    setOpeningText('')
    const iv = setInterval(() => {
      i++
      setOpeningText(target.slice(0, i))
      if (i >= target.length) clearInterval(iv)
    }, 36)
    return () => clearInterval(iv)
  }, [])

  const handleSubmit = async () => {
    if (!reason.trim() || phase !== 'awaitingReason') return
    setPhase('evaluating')
    const system = alarmSystemPrompt(name, label, time, identity)
    const messages = [{ role: 'user' as const, content: reason }]

    try {
      const raw = await sendToNeo(system, messages, 120)
      let parsed: { allow: boolean; message: string }
      try {
        const jsonMatch = raw.match(/\{[\s\S]*\}/)
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { allow: false, message: raw }
      } catch {
        parsed = { allow: false, message: raw }
      }

      setAllowedByNeo(parsed.allow)
      setNeoMessage(parsed.message)

      if (alarm) {
        addSnooze(alarm.id, { reason, wasAllowed: parsed.allow })
      }

      if (parsed.allow) {
        setPhase('snoozed')
        setTimeout(() => setScreen('home'), 2500)
      } else {
        setPhase('pushback')
      }
    } catch {
      setNeoMessage("say that again — i didn't catch it.")
      setPhase('pushback')
    }
  }

  const handleOverride = () => {
    if (alarm) addSnooze(alarm.id, { reason: '[override]', wasAllowed: true })
    setPhase('snoozed')
    setTimeout(() => setScreen('home'), 1800)
  }

  const handleDismiss = () => {
    setPhase('dismissed')
    setTimeout(() => setScreen('home'), 800)
  }

  return (
    <div
      className="flex flex-col items-center h-full"
      style={{ background: '#0A0908', paddingTop: 80 }}
    >
      <NeoAvatar size="large" isActive={phase === 'evaluating'} />

      {/* Time */}
      <p
        style={{
          color: '#F2EDE8', fontSize: '52px', fontWeight: 600,
          letterSpacing: '-0.05em', marginTop: 24, lineHeight: 1,
        }}
      >
        {time}
      </p>

      {/* Alarm label */}
      <p style={{ color: '#4A4540', fontSize: '13px', marginTop: 6, marginBottom: 32 }}>
        {label}
      </p>

      {/* Neo opening */}
      <p
        style={{
          color: '#E8C4A0', fontSize: '17px', fontWeight: 300,
          textAlign: 'center', maxWidth: 280, lineHeight: 1.6,
          letterSpacing: '-0.01em', marginBottom: 28,
        }}
      >
        {openingText}
      </p>

      <AnimatePresence mode="wait">
        {/* Reason input */}
        {phase === 'awaitingReason' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full px-6 flex flex-col gap-3"
          >
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="why snooze?"
              rows={3}
              style={{
                width: '100%', background: '#1C1916',
                border: '1px solid #2C2520', borderRadius: 12,
                padding: '14px 16px', color: '#F2EDE8',
                fontSize: '15px', fontWeight: 300, resize: 'none',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!reason.trim()}
              style={{
                padding: '14px', borderRadius: 28,
                background: reason.trim() ? '#C8956C' : '#1C1916',
                border: 'none', color: '#0A0908', fontSize: '14px',
                opacity: reason.trim() ? 1 : 0.4,
              }}
            >
              submit
            </button>
          </motion.div>
        )}

        {/* Evaluating */}
        {phase === 'evaluating' && (
          <motion.p
            key="eval"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#8A7F78', fontSize: '14px' }}
          >
            thinking...
          </motion.p>
        )}

        {/* Pushback */}
        {phase === 'pushback' && (
          <motion.div
            key="pushback"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5 px-6"
          >
            <p
              style={{
                color: '#E8C4A0', fontSize: '16px', fontWeight: 300,
                textAlign: 'center', lineHeight: 1.6, maxWidth: 280,
              }}
            >
              {neoMessage}
            </p>
            <button
              onClick={handleOverride}
              style={{
                padding: '12px 32px', borderRadius: 24,
                background: 'transparent', border: '1px solid #2C2520',
                color: '#4A4540', fontSize: '13px',
              }}
            >
              snooze anyway
            </button>
            <button
              onClick={handleDismiss}
              style={{ background: 'none', border: 'none', color: '#C8956C', fontSize: '13px' }}
            >
              i'm up
            </button>
          </motion.div>
        )}

        {/* Snoozed */}
        {phase === 'snoozed' && (
          <motion.p
            key="snoozed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#8A7F78', fontSize: '15px' }}
          >
            {allowedByNeo ? 'okay. snoozing.' : 'fine. 9 more minutes.'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
