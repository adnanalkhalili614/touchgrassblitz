import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'

interface Props { onDone: () => void }

const LINES = [
  "i'll be in the background.",
  "you won't hear from me unless it matters.",
  "put your phone down.",
]

export function FinaleView({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setTimeout(onDone, 2000)
      return
    }
    const target = LINES[lineIndex]
    let i = 0
    setCurrentLine('')
    const iv = setInterval(() => {
      i++
      setCurrentLine(target.slice(0, i))
      if (i >= target.length) {
        clearInterval(iv)
        const pauses = [800, 600, 2000]
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, target])
          setCurrentLine('')
          setLineIndex((n) => n + 1)
        }, pauses[lineIndex] ?? 800)
      }
    }, 40)
    return () => clearInterval(iv)
  }, [lineIndex, onDone])

  return (
    <div
      className="flex flex-col items-center justify-center h-full px-8"
      style={{ background: '#0A0908' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <NeoAvatar size="large" />
      </motion.div>

      <div className="text-center" style={{ maxWidth: 280 }}>
        {visibleLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: i === LINES.length - 1 ? '#C8956C' : '#8A7F78',
              fontSize: '17px',
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '-0.01em',
              marginBottom: 4,
            }}
          >
            {line}
          </motion.p>
        ))}
        {currentLine && (
          <p
            style={{
              color: lineIndex === LINES.length - 1 ? '#C8956C' : '#8A7F78',
              fontSize: '17px',
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '-0.01em',
              marginBottom: 4,
            }}
          >
            {currentLine}
          </p>
        )}
      </div>
    </div>
  )
}
