import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export type MessageRole = 'neo' | 'user'

interface Props {
  text: string
  role: MessageRole
  animateIn?: boolean
}

export function MessageBubble({ text, role, animateIn = false }: Props) {
  const [displayed, setDisplayed] = useState(animateIn ? '' : text)

  useEffect(() => {
    if (!animateIn) { setDisplayed(text); return }
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 28)
    return () => clearInterval(interval)
  }, [text, animateIn])

  const isNeo = role === 'neo'

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isNeo ? 'justify-start' : 'justify-end'} mb-3`}
    >
      <div
        className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
        style={{
          background: isNeo ? '#1C1916' : '#C8956C',
          color: isNeo ? '#E8C4A0' : '#0A0908',
          fontWeight: isNeo ? 300 : 400,
          borderBottomLeftRadius: isNeo ? 4 : 16,
          borderBottomRightRadius: isNeo ? 16 : 4,
          letterSpacing: '-0.01em',
        }}
      >
        {displayed}
        {animateIn && displayed.length < text.length && (
          <span className="animate-pulse ml-0.5">▍</span>
        )}
      </div>
    </motion.div>
  )
}
