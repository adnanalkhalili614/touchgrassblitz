import { useState } from 'react'
import { useNeoStore } from '../../store/useNeoStore'
import { PrimaryButton } from '../../components/PrimaryButton'

export function SettingsView() {
  const setScreen    = useNeoStore((s) => s.setScreen)
  const alarms       = useNeoStore((s) => s.alarms)
  const addAlarm     = useNeoStore((s) => s.addAlarm)
  const toggleAlarm  = useNeoStore((s) => s.toggleAlarm)
  const deleteAlarm  = useNeoStore((s) => s.deleteAlarm)
  const profile      = useNeoStore((s) => s.profile)

  const [showAddAlarm, setShowAddAlarm] = useState(false)
  const [alarmLabel, setAlarmLabel]     = useState('')
  const [alarmHour, setAlarmHour]       = useState(7)
  const [alarmMinute, setAlarmMinute]   = useState(0)
  const [contentShield, setContentShield] = useState(false)

  const handleAddAlarm = () => {
    if (!alarmLabel.trim()) return
    addAlarm({ label: alarmLabel.trim(), hour: alarmHour, minute: alarmMinute, active: true, snoozeRequiresNeo: true })
    setAlarmLabel(''); setShowAddAlarm(false)
  }

  const fmt = (h: number, m: number) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 28 }}>
      <p style={{
        color: '#4A4540', fontSize: '11px', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4,
      }}>
        {title}
      </p>
      <div style={{ background: '#1C1916', borderRadius: 14, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )

  const Row = ({
    label, sublabel, right, onPress, destructive = false,
  }: {
    label: string; sublabel?: string; right?: React.ReactNode
    onPress?: () => void; destructive?: boolean
  }) => (
    <div
      onClick={onPress}
      style={{
        padding: '14px 16px', borderBottom: '1px solid #141210',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: onPress ? 'pointer' : 'default',
      }}
    >
      <div>
        <p style={{ color: destructive ? '#C97070' : '#F2EDE8', fontSize: '15px' }}>{label}</p>
        {sublabel && <p style={{ color: '#4A4540', fontSize: '12px', marginTop: 2 }}>{sublabel}</p>}
      </div>
      {right}
    </div>
  )

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div
      onClick={onChange}
      style={{
        width: 44, height: 26, borderRadius: 13,
        background: value ? '#C8956C' : '#2C2520',
        cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: '50%',
        background: '#F2EDE8', transition: 'left 0.2s',
      }} />
    </div>
  )

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0908' }}>
      {/* Header */}
      <div className="flex items-center px-6 pt-14 pb-5">
        <button
          onClick={() => setScreen('home')}
          style={{ background: 'none', border: 'none', color: '#4A4540', fontSize: '13px', marginRight: 16 }}
        >
          ←
        </button>
        <h1 style={{ color: '#F2EDE8', fontSize: '18px', fontWeight: 400, letterSpacing: '-0.02em' }}>
          settings
        </h1>
      </div>

      <div className="flex-1 neo-scroll px-5 pb-10">
        {/* Alarms */}
        <Section title="alarms">
          {alarms.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '14px 16px', borderBottom: '1px solid #141210',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ color: '#F2EDE8', fontSize: '15px' }}>{a.label || 'alarm'}</p>
                <p style={{ color: '#4A4540', fontSize: '12px', marginTop: 2 }}>{fmt(a.hour, a.minute)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Toggle value={a.active} onChange={() => toggleAlarm(a.id)} />
                <button
                  onClick={() => deleteAlarm(a.id)}
                  style={{ background: 'none', border: 'none', color: '#4A4540', fontSize: '16px' }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          {showAddAlarm ? (
            <div style={{ padding: '16px' }}>
              <input
                value={alarmLabel}
                onChange={(e) => setAlarmLabel(e.target.value)}
                placeholder="alarm label (e.g. 5am run)"
                style={{
                  width: '100%', background: '#141210', border: '1px solid #2C2520',
                  borderRadius: 8, padding: '10px 12px', color: '#F2EDE8', fontSize: '14px',
                  marginBottom: 12,
                }}
              />
              <div className="flex gap-2 items-center" style={{ marginBottom: 14 }}>
                <input
                  type="number" min={0} max={23} value={alarmHour}
                  onChange={(e) => setAlarmHour(parseInt(e.target.value) || 0)}
                  style={{
                    width: 56, textAlign: 'center', background: '#141210',
                    border: '1px solid #2C2520', borderRadius: 8, padding: '8px',
                    color: '#F2EDE8', fontSize: '16px',
                  }}
                />
                <span style={{ color: '#4A4540' }}>:</span>
                <input
                  type="number" min={0} max={59} value={alarmMinute}
                  onChange={(e) => setAlarmMinute(parseInt(e.target.value) || 0)}
                  style={{
                    width: 56, textAlign: 'center', background: '#141210',
                    border: '1px solid #2C2520', borderRadius: 8, padding: '8px',
                    color: '#F2EDE8', fontSize: '16px',
                  }}
                />
              </div>
              <PrimaryButton title="add alarm" onClick={handleAddAlarm} disabled={!alarmLabel.trim()} />
            </div>
          ) : (
            <div
              onClick={() => setShowAddAlarm(true)}
              style={{
                padding: '14px 16px', cursor: 'pointer',
                color: '#C8956C', fontSize: '14px',
              }}
            >
              + add alarm
            </div>
          )}
        </Section>

        {/* Content shield */}
        <Section title="content shield">
          <Row
            label="content shield"
            sublabel="blocks sites you want filtered"
            right={<Toggle value={contentShield} onChange={() => setContentShield((v) => !v)} />}
          />
        </Section>

        {/* Account */}
        <Section title="account">
          <Row
            label={profile?.name ?? 'not signed in'}
            sublabel={profile ? `day ${profile.streakCount}` : ''}
          />
        </Section>

        {/* About */}
        <Section title="about">
          <Row label="neo v1.0" sublabel="built to help you use your phone less" />
        </Section>
      </div>
    </div>
  )
}
