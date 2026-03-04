import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplashView } from './SplashView'
import { MeetNeoView } from './MeetNeoView'
import { OnboardingQuestionsView } from './OnboardingQuestionsView'
import { FinaleView } from './FinaleView'
import { useNeoStore } from '../../store/useNeoStore'

type Step = 'splash' | 'meet' | 'questions' | 'finale'

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('splash')
  const [name, setName] = useState('')
  const setProfile = useNeoStore((s) => s.setProfile)
  const completeOnboarding = useNeoStore((s) => s.completeOnboarding)

  const handleMeetDone = (n: string) => {
    setName(n)
    setStep('questions')
  }

  const handleQuestionsDone = (age: number, why: string, identity: string) => {
    setProfile({
      name,
      age,
      whyStatement: why,
      identityStatement: identity,
      streakCount: 1,
      totalInterventions: 0,
      interventionSuccessRate: 0,
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    })
    setStep('finale')
  }

  return (
    <div className="h-full w-full" style={{ background: '#0A0908' }}>
      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <SlideWrapper key="splash">
            <SplashView onDone={() => setStep('meet')} />
          </SlideWrapper>
        )}
        {step === 'meet' && (
          <SlideWrapper key="meet">
            <MeetNeoView onDone={handleMeetDone} />
          </SlideWrapper>
        )}
        {step === 'questions' && (
          <SlideWrapper key="questions">
            <OnboardingQuestionsView name={name} onDone={handleQuestionsDone} />
          </SlideWrapper>
        )}
        {step === 'finale' && (
          <SlideWrapper key="finale">
            <FinaleView onDone={completeOnboarding} />
          </SlideWrapper>
        )}
      </AnimatePresence>
    </div>
  )
}

function SlideWrapper({ children, key: _k }: { children: React.ReactNode; key: string }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
