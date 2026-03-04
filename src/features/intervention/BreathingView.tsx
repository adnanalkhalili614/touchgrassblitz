import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNeoStore } from '../../store/useNeoStore'

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest'

const PHASES: Array<{ phase: Phase; duration: number; label: string }> = [
  { phase: 'inhale', duration: 4000, label: 'breathe in' },
  { phase: 'hold',   duration: 7000, label: 'hold'       },
  { phase: 'exhale', duration: 8000, label: 'breathe out' },
  { phase: 'rest',   duration: 1000, label: 'rest'        },
]
const TOTAL_CYCLES = 4

export function BreathingView() {
  const setScreen = useNeoStore((s) => s.setScreen)

  const [phaseIndex, setPhaseIndex] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [done, setDone] = useState(false)
  const [feeling, setFeeling] = useState<'better' | 'same' | 'worse' | null>(null)

  const current = PHASES[phaseIndex]
  const orbScale = current.phase === 'inhale' ? 1.3 : current.phase === 'hold' ? 1.3 : 1.0

  useEffect(() => {
    if (done) return
    const timer = setTimeout(() => {
      const nextIndex = (phaseIndex + 1) % PHASES.length
      if (nextIndex === 0) {
        const nextCycle = cycleCount + 1
        setCycleCount(nextCycle)
        if (nextCycle >= TOTAL_CYCLES) { setDone(true); return }
      }
      setPhaseIndex(nextIndex)
    }, current.duration)
    return () => clearTimeout(timer)
  }, [phaseIndex, cycleCount, done, current.duration])

  const handleFeeling = (f: typeof feeling) => {
    setFeeling(f)
    setTimeout(() => setScreen('home'), 2200)
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      style={{ background: '#0A0908' }}
    >
      {/* Back */}
      <button
        onClick={() => setScreen('home')}
        style={{
          position: 'absolute', top: 56, left: 20,
          background: 'none', border: 'none', color: '#4A4540', fontSize: '13px',
        }}
      >
        ← back
      </button>

      {/* Orb with breathing animation */}
      <motion.div
        animate={{ scale: done ? 1 : orbScale }}
        transition={{
          duration: current.duration / 1000,
          ease: current.phase === 'inhale' ? 'easeIn' : current.phase === 'exhale' ? 'easeOut' : 'linear',
        }}
        style={{
          width: 160, height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #E8C4A0 0%, #C8956C 35%, #8B5E3C 65%, #4A3020 100%)',
          boxShadow: '0 0 60px rgba(200,149,108,0.4)',
          marginBottom: 48,
        }}
      />

      {/* Phase label */}
      <AnimatePresence mode="wait">
        {!done && (
          <motion.p
            key={current.phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              color: '#E8C4A0',
              fontSize: '18px',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              marginBottom: 48,
            }}
          >
            {current.label}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Cycle progress dots */}
      <div className="flex gap-3" style={{ marginBottom: 48 }}>
        {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i < cycleCount ? '#C8956C' : '#2C2520',
              transition: 'background 0.4s',
            }}
          />
        ))}
      </div>

      {/* Done state */}
      <AnimatePresence>
        {done && !feeling && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center px-8"
          >
            <p style={{ color: '#8A7F78', fontSize: '15px', marginBottom: 24 }}>
              how do you feel?
            </p>
            <div className="flex gap-3">
              {(['better', 'same', 'worse'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => handleFeeling(f)}
                  style={{
                    padding: '10px 18px', borderRadius: 20,
                    background: '#1C1916', border: '1px solid #2C2520',
                    color: '#E8C4A0', fontSize: '13px',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {feeling && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#8A7F78', fontSize: '15px' }}
          >
            good. put your phone down.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
