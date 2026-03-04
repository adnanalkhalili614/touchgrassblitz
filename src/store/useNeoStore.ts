import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TriggerType = 'agentic' | 'selfReport' | 'appInterception' | 'alarm'
export type Recurrence  = 'daily' | 'weekly' | 'custom' | 'once'
export type AgentMode   = 'idle' | 'monitoring' | 'intervening' | 'alarmActive'
export type AppScreen   =
  | 'splash' | 'onboarding'
  | 'home'
  | 'intervention' | 'breathing' | 'stepChallenge'
  | 'alarmIntervention'
  | 'blockSetup' | 'sacredTime' | 'interception'
  | 'settings'

export interface UserProfile {
  name: string
  age: number
  whyStatement: string
  identityStatement: string
  streakCount: number
  totalInterventions: number
  interventionSuccessRate: number
  onboardingComplete: boolean
  createdAt: string
}

export interface SnoozeAttempt {
  timestamp: string
  reason: string
  wasAllowed: boolean
}

export interface AlarmRecord {
  id: string
  label: string
  hour: number
  minute: number
  active: boolean
  snoozeRequiresNeo: boolean
  snoozeHistory: SnoozeAttempt[]
}

export interface SacredTimePeriod {
  id: string
  name: string
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  recurrence: Recurrence
  blockedApps: string[]
  strictMode: boolean
  intention: string
  active: boolean
}

export interface InterventionRecord {
  id: string
  timestamp: string
  triggerType: TriggerType
  riskScoreAtTrigger: number
  userEngaged: boolean
  sessionDurationSeconds: number
  userReportedHelped?: boolean
}

export interface HourlyRiskProfile {
  hour: number            // 0-23
  baseRiskScore: number
  sampleCount: number
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface NeoState {
  // Navigation
  screen: AppScreen
  pendingTrigger: TriggerType
  blockedAppName: string

  // Profile
  profile: UserProfile | null

  // Agent
  agentMode: AgentMode
  interventionThreshold: number
  hourlyRisk: HourlyRiskProfile[]

  // Data
  alarms: AlarmRecord[]
  sacredPeriods: SacredTimePeriod[]
  interventionHistory: InterventionRecord[]

  // Actions
  setScreen: (s: AppScreen) => void
  openIntervention: (trigger: TriggerType, appName?: string) => void
  setProfile: (p: UserProfile) => void
  updateProfile: (partial: Partial<UserProfile>) => void
  completeOnboarding: () => void

  addAlarm: (a: Omit<AlarmRecord, 'id' | 'snoozeHistory'>) => void
  toggleAlarm: (id: string) => void
  deleteAlarm: (id: string) => void
  addSnoozeAttempt: (alarmId: string, attempt: Omit<SnoozeAttempt, 'timestamp'>) => void

  addSacredPeriod: (p: Omit<SacredTimePeriod, 'id'>) => void
  toggleSacredPeriod: (id: string) => void
  deleteSacredPeriod: (id: string) => void

  recordIntervention: (r: Omit<InterventionRecord, 'id' | 'timestamp'>) => string
  resolveIntervention: (id: string, engaged: boolean, duration: number, helped: boolean) => void

  updateHourlyRisk: (hour: number, engaged: boolean, helped: boolean) => void
  computeRiskScore: () => number
  sacredTimeActive: () => boolean
}

function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36) }

export const useNeoStore = create<NeoState>()(
  persist(
    (set, get) => ({
      screen: 'splash',
      pendingTrigger: 'selfReport',
      blockedAppName: '',
      profile: null,
      agentMode: 'idle',
      interventionThreshold: 0.65,
      hourlyRisk: Array.from({ length: 24 }, (_, h) => ({
        hour: h, baseRiskScore: 0.3, sampleCount: 0,
      })),
      alarms: [],
      sacredPeriods: [],
      interventionHistory: [],

      setScreen: (screen) => set({ screen }),

      openIntervention: (trigger, appName = '') => set({
        pendingTrigger: trigger,
        blockedAppName: appName,
        screen: trigger === 'appInterception' ? 'interception' : 'intervention',
        agentMode: 'intervening',
      }),

      setProfile: (profile) => set({ profile }),

      updateProfile: (partial) => set((s) => ({
        profile: s.profile ? { ...s.profile, ...partial } : null,
      })),

      completeOnboarding: () => set((s) => ({
        profile: s.profile ? { ...s.profile, onboardingComplete: true } : s.profile,
        screen: 'home',
      })),

      addAlarm: (a) => set((s) => ({
        alarms: [...s.alarms, { ...a, id: uid(), snoozeHistory: [] }],
      })),

      toggleAlarm: (id) => set((s) => ({
        alarms: s.alarms.map((a) => a.id === id ? { ...a, active: !a.active } : a),
      })),

      deleteAlarm: (id) => set((s) => ({
        alarms: s.alarms.filter((a) => a.id !== id),
      })),

      addSnoozeAttempt: (alarmId, attempt) => set((s) => ({
        alarms: s.alarms.map((a) =>
          a.id === alarmId
            ? { ...a, snoozeHistory: [...a.snoozeHistory, { ...attempt, timestamp: new Date().toISOString() }] }
            : a
        ),
      })),

      addSacredPeriod: (p) => set((s) => ({
        sacredPeriods: [...s.sacredPeriods, { ...p, id: uid() }],
      })),

      toggleSacredPeriod: (id) => set((s) => ({
        sacredPeriods: s.sacredPeriods.map((p) =>
          p.id === id ? { ...p, active: !p.active } : p
        ),
      })),

      deleteSacredPeriod: (id) => set((s) => ({
        sacredPeriods: s.sacredPeriods.filter((p) => p.id !== id),
      })),

      recordIntervention: (r) => {
        const id = uid()
        set((s) => ({
          interventionHistory: [
            ...s.interventionHistory,
            { ...r, id, timestamp: new Date().toISOString() },
          ],
          profile: s.profile
            ? { ...s.profile, totalInterventions: s.profile.totalInterventions + 1 }
            : s.profile,
        }))
        return id
      },

      resolveIntervention: (id, engaged, duration, helped) => {
        set((s) => ({
          interventionHistory: s.interventionHistory.map((r) =>
            r.id === id
              ? { ...r, userEngaged: engaged, sessionDurationSeconds: duration, userReportedHelped: helped }
              : r
          ),
          agentMode: 'idle',
        }))
        get().updateHourlyRisk(new Date().getHours(), engaged, helped)
      },

      updateHourlyRisk: (hour, engaged, helped) => {
        set((s) => {
          const delta = engaged && helped ? 0.02 : !engaged ? -0.02 : 0
          return {
            interventionThreshold: Math.max(0.3, Math.min(0.9, s.interventionThreshold - delta)),
            hourlyRisk: s.hourlyRisk.map((h) =>
              h.hour === hour
                ? {
                    ...h,
                    sampleCount: h.sampleCount + 1,
                    baseRiskScore: h.sampleCount === 0
                      ? (engaged ? 0.6 : 0.3)
                      : (h.baseRiskScore * h.sampleCount + (engaged ? 0.7 : 0.3)) / (h.sampleCount + 1),
                  }
                : h
            ),
          }
        })
      },

      computeRiskScore: () => {
        const s = get()
        const now = new Date()
        const hour = now.getHours()
        let score = 0
        const hourProfile = s.hourlyRisk.find((h) => h.hour === hour)
        if (hourProfile && hourProfile.baseRiskScore > 0.5) score += 0.30
        const last = s.interventionHistory.at(-1)
        const hoursSinceLast = last
          ? (Date.now() - new Date(last.timestamp).getTime()) / 3_600_000
          : 999
        if (hoursSinceLast > 48) score += 0.10
        if (!s.profile || s.profile.streakCount === 0) score += 0.25
        return Math.min(score, 1.0)
      },

      sacredTimeActive: () => {
        const { sacredPeriods } = get()
        const now = new Date()
        const cur = now.getHours() * 60 + now.getMinutes()
        return sacredPeriods.some((p) => {
          if (!p.active) return false
          const start = p.startHour * 60 + p.startMinute
          const end   = p.endHour * 60 + p.endMinute
          return start <= end ? cur >= start && cur < end : cur >= start || cur < end
        })
      },
    }),
    {
      name: 'neo-storage',
      partialize: (s) => ({
        profile: s.profile,
        alarms: s.alarms,
        sacredPeriods: s.sacredPeriods,
        interventionHistory: s.interventionHistory,
        hourlyRisk: s.hourlyRisk,
        interventionThreshold: s.interventionThreshold,
      }),
    }
  )
)
