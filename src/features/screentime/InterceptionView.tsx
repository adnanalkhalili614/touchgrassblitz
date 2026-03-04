import { motion } from 'framer-motion'
import { NeoAvatar } from '../../components/NeoAvatar'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useNeoStore } from '../../store/useNeoStore'

export function InterceptionView() {
  const profile      = useNeoStore((s) => s.profile)
  const blockedApp   = useNeoStore((s) => s.blockedAppName)
  const setScreen    = useNeoStore((s) => s.setScreen)
  const openIntervention = useNeoStore((s) => s.openIntervention)
  const strictMode   = useNeoStore((s) =>
    s.sacredPeriods.some((p) => p.active && p.strictMode && s.sacredTimeActive())
  )

  return (
    <div
      className="flex flex-col items-center justify-center h-full px-8"
      style={{
        background: '#0A0908',
        backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(200,149,108,0.05) 0%, transparent 50%)',
      }}
    >
      {/* Blocked app name */}
      {blockedApp && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: 52, height: 52, borderRadius: 14,
            background: '#1C1916', border: '1px solid #2C2520',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#4A4540', fontSize: '22px' }}>🚫</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: 40 }}
      >
        <NeoAvatar size="large" isActive />
      </motion.div>

      {/* Identity statement */}
      {profile?.identityStatement && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            color: '#F2EDE8',
            fontSize: '22px',
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: 1.4,
            letterSpacing: '-0.02em',
            marginBottom: 12,
            maxWidth: 300,
          }}
        >
          you're becoming {profile.identityStatement}
        </motion.p>
      )}

      {/* Why statement */}
      {profile?.whyStatement && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            color: '#8A7F78',
            fontSize: '14px',
            fontWeight: 300,
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: 260,
            marginBottom: 48,
          }}
        >
          {profile.whyStatement}
        </motion.p>
      )}

      {/* CTAs */}
      <motion.div
        className="w-full flex flex-col gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <PrimaryButton
          title="i need neo"
          onClick={() => openIntervention('appInterception', blockedApp)}
        />
        {!strictMode && (
          <PrimaryButton
            title="i'm good"
            onClick={() => setScreen('home')}
            variant="ghost"
          />
        )}
      </motion.div>
    </div>
  )
}
