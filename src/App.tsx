import { AnimatePresence, motion } from 'framer-motion'
import { useNeoStore } from './store/useNeoStore'

// Onboarding
import { OnboardingFlow } from './features/onboarding/OnboardingFlow'

// Home
import { HomeView } from './features/home/HomeView'

// Intervention
import { InterventionView } from './features/intervention/InterventionView'
import { BreathingView } from './features/intervention/BreathingView'
import { StepChallengeView } from './features/intervention/StepChallengeView'

// Alarm
import { AlarmInterventionView } from './features/alarm/AlarmInterventionView'

// Screen Time
import { InterceptionView } from './features/screentime/InterceptionView'
import { SacredTimeView } from './features/screentime/SacredTimeView'

// Settings
import { SettingsView } from './features/settings/SettingsView'

export default function App() {
  const screen        = useNeoStore((s) => s.screen)
  const profile       = useNeoStore((s) => s.profile)
  const pendingTrigger = useNeoStore((s) => s.pendingTrigger)
  const alarms        = useNeoStore((s) => s.alarms)
  const activeAlarm   = alarms.find((a) => a.active) ?? null

  // Determine initial screen
  const isOnboarding = !profile || !profile.onboardingComplete

  function renderScreen() {
    if (isOnboarding) return <OnboardingFlow key="onboarding" />

    switch (screen) {
      case 'home':
        return <HomeView key="home" />
      case 'intervention':
        return <InterventionView key="intervention" trigger={pendingTrigger} />
      case 'breathing':
        return <BreathingView key="breathing" />
      case 'stepChallenge':
        return <StepChallengeView key="steps" />
      case 'alarmIntervention':
        return <AlarmInterventionView key="alarm" alarm={activeAlarm} />
      case 'interception':
        return <InterceptionView key="interception" />
      case 'sacredTime':
        return <SacredTimeView key="sacred" />
      case 'settings':
        return <SettingsView key="settings" />
      default:
        return <HomeView key="home" />
    }
  }

  return (
    // Phone-frame wrapper — center the app in browser, constrained to phone dimensions
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: '#050403',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 390,
          height: '100%',
          maxHeight: 844,
          background: '#0A0908',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: window.innerWidth > 500 ? 48 : 0,
          boxShadow: window.innerWidth > 500 ? '0 32px 80px rgba(0,0,0,0.8)' : 'none',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOnboarding ? 'onboarding' : screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
