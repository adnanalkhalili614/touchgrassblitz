import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNeoStore } from '../../store/useNeoStore'

const GOAL = 250

export function StepChallengeView() {
  const setScreen = useNeoStore((s) => s.setScreen)
  const [steps, setSteps] = useState(0)
  const [completed, setCompleted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Simulate step counting (real app would use Device Motion or Health API in native)
  // In web, we simulate with a timer that increments on activity
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSteps((prev) => {
        const next = prev + Math.floor(Math.random() * 3)
        if (next >= GOAL) {
          setCompleted(true)
          if (timerRef.current) clearInterval(timerRef.current)
          return GOAL
        }
        return next
      })
    }, 1200)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const progress = Math.min(steps / GOAL, 1)
  const circumference = 2 * Math.PI * 70

  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      style={{ background: '#0A0908' }}
    >
      <button
        onClick={() => setScreen('home')}
        style={{
          position: 'absolute', top: 56, left: 20,
          background: 'none', border: 'none', color: '#4A4540', fontSize: '13px',
        }}
      >
        ← back
      </button>

      {/* Progress ring + orb */}
      <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 32 }}>
        <svg
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
          width={180} height={180}
        >
          <circle cx={90} cy={90} r={70} fill="none" stroke="#1C1916" strokeWidth={4} />
          <motion.circle
            cx={90} cy={90} r={70}
            fill="none"
            stroke="#C8956C"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, #E8C4A0 0%, #C8956C 35%, #8B5E3C 65%, #4A3020 100%)',
              boxShadow: '0 0 30px rgba(200,149,108,0.35)',
            }}
          />
        </div>
      </div>

      {/* Step count */}
      <motion.p
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 0.4 }}
        style={{
          color: '#F2EDE8',
          fontSize: '40px',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {steps}
      </motion.p>
      <p style={{ color: '#4A4540', fontSize: '13px', marginBottom: 40 }}>/ {GOAL} steps</p>

      <AnimatePresence>
        {!completed ? (
          <motion.p
            key="moving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ color: '#8A7F78', fontSize: '15px', fontWeight: 300 }}
          >
            keep moving.
          </motion.p>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5 px-8"
          >
            <p style={{ color: '#E8C4A0', fontSize: '16px', fontWeight: 300 }}>
              nice. go back to what matters.
            </p>
            <button
              onClick={() => setScreen('home')}
              style={{
                padding: '14px 40px', borderRadius: 28,
                background: '#C8956C', border: 'none',
                color: '#0A0908', fontSize: '14px', fontWeight: 500,
              }}
            >
              done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
