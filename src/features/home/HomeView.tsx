import { motion } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useNeoStore } from '../../store/useNeoStore'

export function HomeView() {
  const profile     = useNeoStore((s) => s.profile)
  const setScreen   = useNeoStore((s) => s.setScreen)
  const openIntervention = useNeoStore((s) => s.openIntervention)
  const sacredActive = useNeoStore((s) => s.sacredTimeActive())
  const activePeriod = useNeoStore((s) =>
    s.sacredPeriods.find((p) => p.active && s.sacredTimeActive())
  )

  return (
    <div
      className="flex flex-col items-center h-full"
      style={{ background: '#0A0908', paddingTop: 72, paddingBottom: 40 }}
    >
      {/* Orb */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        <NeoAvatar size="medium" isActive={sacredActive} />
      </motion.div>

      {/* Sacred time indicator */}
      {sacredActive && activePeriod && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            color: '#C8956C',
            fontSize: '11px',
            letterSpacing: '0.12em',
            marginTop: 10,
            textTransform: 'lowercase',
          }}
        >
          {activePeriod.name} active
        </motion.p>
      )}

      {/* Identity statement */}
      {profile?.identityStatement && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: '#4A4540',
            fontSize: '13px',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginTop: sacredActive ? 6 : 14,
            textAlign: 'center',
            maxWidth: 240,
          }}
        >
          becoming: {profile.identityStatement}
        </motion.p>
      )}

      {/* Streak */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          color: '#4A4540',
          fontSize: '13px',
          fontWeight: 400,
          marginTop: 12,
          letterSpacing: '0.04em',
        }}
      >
        day {profile?.streakCount ?? 0}
      </motion.p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Main CTA */}
      <motion.div
        className="w-full px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 280, damping: 28 }}
      >
        <PrimaryButton
          title="i need neo"
          onClick={() => openIntervention('selfReport')}
        />
      </motion.div>

      {/* Secondary links */}
      <motion.div
        className="flex gap-8 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        <button
          onClick={() => setScreen('blockSetup')}
          style={{
            background: 'none',
            border: 'none',
            color: '#4A4540',
            fontSize: '13px',
            padding: '4px 0',
            letterSpacing: '-0.01em',
          }}
        >
          set a block
        </button>
        <button
          onClick={() => setScreen('sacredTime')}
          style={{
            background: 'none',
            border: 'none',
            color: '#4A4540',
            fontSize: '13px',
            padding: '4px 0',
            letterSpacing: '-0.01em',
          }}
        >
          sacred time
        </button>
        <button
          onClick={() => setScreen('settings')}
          style={{
            background: 'none',
            border: 'none',
            color: '#4A4540',
            fontSize: '13px',
            padding: '4px 0',
            letterSpacing: '-0.01em',
          }}
        >
          settings
        </button>
      </motion.div>
    </div>
  )
}
