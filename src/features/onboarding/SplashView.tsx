import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'

interface Props { onDone: () => void }

export function SplashView({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#0A0908' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <NeoAvatar size="large" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        style={{
          color: '#E8C4A0',
          fontSize: '13px',
          fontWeight: 300,
          letterSpacing: '0.55em',
          marginTop: '28px',
        }}
      >
        neo
      </motion.p>
    </div>
  )
}
