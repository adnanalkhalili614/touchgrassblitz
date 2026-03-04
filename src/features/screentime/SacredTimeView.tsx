import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNeoStore } from '../../store/useNeoStore'
import type { Recurrence } from '../../store/useNeoStore'
import { PrimaryButton } from '../../components/PrimaryButton'

function TimeSelector({
  label, hour, minute, onHourChange, onMinuteChange,
}: {
  label: string; hour: number; minute: number
  onHourChange: (v: number) => void; onMinuteChange: (v: number) => void
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ color: '#4A4540', fontSize: '12px', marginBottom: 8, letterSpacing: '0.06em' }}>{label}</p>
      <div className="flex gap-2 items-center">
        <input
          type="number" min={0} max={23} value={hour}
          onChange={(e) => onHourChange(parseInt(e.target.value) || 0)}
          style={{
            width: 60, textAlign: 'center', background: '#1C1916',
            border: '1px solid #2C2520', borderRadius: 8,
            padding: '10px 8px', color: '#F2EDE8', fontSize: '16px',
          }}
        />
        <span style={{ color: '#4A4540' }}>:</span>
        <input
          type="number" min={0} max={59} value={minute}
          onChange={(e) => onMinuteChange(parseInt(e.target.value) || 0)}
          style={{
            width: 60, textAlign: 'center', background: '#1C1916',
            border: '1px solid #2C2520', borderRadius: 8,
            padding: '10px 8px', color: '#F2EDE8', fontSize: '16px',
          }}
        />
      </div>
    </div>
  )
}

export function SacredTimeView() {
  const setScreen       = useNeoStore((s) => s.setScreen)
  const addPeriod       = useNeoStore((s) => s.addSacredPeriod)
  const togglePeriod    = useNeoStore((s) => s.toggleSacredPeriod)
  const deletePeriod    = useNeoStore((s) => s.deleteSacredPeriod)
  const periods         = useNeoStore((s) => s.sacredPeriods)

  const [name, setName]           = useState('')
  const [startHour, setStartHour] = useState(20)
  const [startMin, setStartMin]   = useState(0)
  const [endHour, setEndHour]     = useState(22)
  const [endMin, setEndMin]       = useState(0)
  const [recurrence, setRecurrence] = useState<Recurrence>('weekly')
  const [strictMode, setStrictMode] = useState(false)
  const [intention, setIntention] = useState('')
  const [showForm, setShowForm]   = useState(false)

  const handleSave = () => {
    if (!name.trim()) return
    addPeriod({
      name: name.trim(),
      startHour, startMinute: startMin,
      endHour, endMinute: endMin,
      recurrence, blockedApps: [],
      strictMode, intention: intention.trim(),
      active: true,
    })
    setName(''); setIntention(''); setShowForm(false)
  }

  const fmt = (h: number, m: number) => `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`

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
          sacred time
        </h1>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{ background: 'none', border: 'none', color: '#C8956C', fontSize: '22px', lineHeight: 1 }}
        >
          {showForm ? '×' : '+'}
        </button>
      </div>

      <div className="flex-1 neo-scroll px-6">
        {/* New period form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: '#1C1916', borderRadius: 16, padding: 20, marginBottom: 24 }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name this time"
              style={{
                width: '100%', background: '#141210', border: '1px solid #2C2520',
                borderRadius: 8, padding: '12px', color: '#F2EDE8', fontSize: '15px',
                fontWeight: 300, marginBottom: 20,
              }}
            />

            <TimeSelector label="start" hour={startHour} minute={startMin}
              onHourChange={setStartHour} onMinuteChange={setStartMin} />
            <TimeSelector label="end" hour={endHour} minute={endMin}
              onHourChange={setEndHour} onMinuteChange={setEndMin} />

            {/* Recurrence */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#4A4540', fontSize: '12px', marginBottom: 8, letterSpacing: '0.06em' }}>REPEATS</p>
              <div className="flex gap-2">
                {(['daily', 'weekly', 'once'] as Recurrence[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRecurrence(r)}
                    style={{
                      padding: '8px 14px', borderRadius: 20,
                      background: recurrence === r ? '#C8956C' : '#141210',
                      border: `1px solid ${recurrence === r ? '#C8956C' : '#2C2520'}`,
                      color: recurrence === r ? '#0A0908' : '#8A7F78',
                      fontSize: '12px',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Strict mode */}
            <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
              <div>
                <p style={{ color: '#F2EDE8', fontSize: '14px' }}>strict mode</p>
                <p style={{ color: '#4A4540', fontSize: '12px' }}>no override during this period</p>
              </div>
              <div
                onClick={() => setStrictMode((v) => !v)}
                style={{
                  width: 44, height: 26, borderRadius: 13,
                  background: strictMode ? '#C8956C' : '#2C2520',
                  cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                }}
              >
                <div style={{
                  position: 'absolute', top: 3,
                  left: strictMode ? 21 : 3,
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#F2EDE8', transition: 'left 0.2s',
                }} />
              </div>
            </div>

            {/* Intention */}
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="why does this time matter to you?"
              rows={2}
              style={{
                width: '100%', background: '#141210', border: '1px solid #2C2520',
                borderRadius: 8, padding: '12px', color: '#F2EDE8',
                fontSize: '14px', fontWeight: 300, resize: 'none', marginBottom: 16,
              }}
            />

            <PrimaryButton title="save" onClick={handleSave} disabled={!name.trim()} />
          </motion.div>
        )}

        {/* Existing periods */}
        {periods.length === 0 && !showForm && (
          <p style={{ color: '#4A4540', fontSize: '14px', textAlign: 'center', marginTop: 48 }}>
            no sacred time periods yet.
            <br />tap + to create one.
          </p>
        )}

        {periods.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: '#1C1916', borderRadius: 14, padding: '16px',
              marginBottom: 12, border: p.active ? '1px solid rgba(200,149,108,0.3)' : '1px solid #2C2520',
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p style={{ color: '#F2EDE8', fontSize: '15px', fontWeight: 400 }}>{p.name}</p>
                <p style={{ color: '#8A7F78', fontSize: '12px', marginTop: 2 }}>
                  {fmt(p.startHour, p.startMinute)} – {fmt(p.endHour, p.endMinute)} · {p.recurrence}
                  {p.strictMode && ' · strict'}
                </p>
                {p.intention && (
                  <p style={{ color: '#4A4540', fontSize: '12px', marginTop: 4, fontStyle: 'italic' }}>
                    "{p.intention}"
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div
                  onClick={() => togglePeriod(p.id)}
                  style={{
                    width: 40, height: 22, borderRadius: 11,
                    background: p.active ? '#C8956C' : '#2C2520',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 2,
                    left: p.active ? 19 : 2,
                    width: 18, height: 18, borderRadius: '50%',
                    background: '#F2EDE8', transition: 'left 0.2s',
                  }} />
                </div>
                <button
                  onClick={() => deletePeriod(p.id)}
                  style={{ background: 'none', border: 'none', color: '#4A4540', fontSize: '16px' }}
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
