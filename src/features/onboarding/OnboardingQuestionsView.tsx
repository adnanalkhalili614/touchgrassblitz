import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'
import { PrimaryButton } from '../../components/PrimaryButton'

interface Props {
  name: string
  onDone: (age: number, why: string, identity: string) => void
}

interface Question {
  text: string
  placeholder: string
  keyboard: 'text' | 'number'
  ack: string
}

const QUESTIONS: Question[] = [
  {
    text: 'how old are you?',
    placeholder: 'your age',
    keyboard: 'number',
    ack: 'got it.',
  },
  {
    text: 'what do you want to break free from?',
    placeholder: 'be honest.',
    keyboard: 'text',
    ack: 'that takes courage to name.',
  },
  {
    text: "who are you trying to become? be specific.",
    placeholder: 'describe that person.',
    keyboard: 'text',
    ack: "i'm going to hold you to that.",
  },
]

export function OnboardingQuestionsView({ name: _name, onDone }: Props) {
  const [qIndex, setQIndex] = useState(0)
  const [questionText, setQuestionText] = useState('')
  const [input, setInput] = useState('')
  const [ack, setAck] = useState('')
  const [answers, setAnswers] = useState<string[]>([])

  const q = QUESTIONS[qIndex]

  // Typewriter for question
  useEffect(() => {
    setQuestionText('')
    setInput('')
    setAck('')
    let i = 0
    const iv = setInterval(() => {
      i++
      setQuestionText(q.text.slice(0, i))
      if (i >= q.text.length) clearInterval(iv)
    }, 38)
    return () => clearInterval(iv)
  }, [qIndex, q.text])

  const handleSubmit = async () => {
    if (!input.trim()) return
    const val = input.trim()
    setAck(q.ack)
    const next = [...answers, val]
    setAnswers(next)
    await new Promise((r) => setTimeout(r, 1400))

    if (qIndex < QUESTIONS.length - 1) {
      setQIndex((i) => i + 1)
    } else {
      const [ageStr, why, identity] = next
      onDone(parseInt(ageStr) || 0, why, identity)
    }
  }

  return (
    <div
      className="flex flex-col h-full px-8"
      style={{ background: '#0A0908', paddingTop: '80px' }}
    >
      <div className="flex justify-center mb-10">
        <NeoAvatar size="medium" isActive={!!ack} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {/* Question */}
          <p
            style={{
              color: '#E8C4A0',
              fontSize: '20px',
              fontWeight: 300,
              lineHeight: 1.5,
              letterSpacing: '-0.02em',
              marginBottom: 32,
              minHeight: '3em',
            }}
          >
            {questionText}
          </p>

          {/* Ack or input */}
          {ack ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#8A7F78', fontSize: '15px' }}
            >
              {ack}
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: questionText.length >= q.text.length ? 1 : 0, y: 0 }}
            >
              {q.keyboard === 'number' ? (
                <input
                  type="number"
                  inputMode="numeric"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={q.placeholder}
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
              ) : (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={q.placeholder}
                  rows={3}
                  style={{
                    width: '100%',
                    background: '#1C1916',
                    border: '1px solid #2C2520',
                    borderRadius: 12,
                    padding: '14px 16px',
                    color: '#F2EDE8',
                    fontSize: '16px',
                    fontWeight: 300,
                    lineHeight: 1.5,
                    resize: 'none',
                    marginBottom: 16,
                  }}
                />
              )}
              <PrimaryButton title="continue" onClick={handleSubmit} disabled={!input.trim()} />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 pb-10">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i <= qIndex ? '#C8956C' : '#2C2520',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
