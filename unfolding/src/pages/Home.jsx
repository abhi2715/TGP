import React, { useState } from 'react'
import { Card, Label, TextInput, Textarea, Btn, Empty } from '../components/UI.jsx'
import { sparks } from '../utils/sparks.js'

export default function Home({ state, update, showToast }) {
  const [editingOneThing, setEditingOneThing] = useState(false)
  const [oneThingDraft, setOneThingDraft] = useState('')
  const [newIntention, setNewIntention] = useState('')

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
  const spark = sparks[state.sparkIndex % sparks.length]

  function saveOneThing() {
    update({ oneThing: oneThingDraft.trim() })
    setEditingOneThing(false)
    showToast('Saved')
  }

  function addIntention() {
    const text = newIntention.trim()
    if (!text || state.intentions.length >= 3) return
    update(prev => ({
      ...prev,
      intentions: [...prev.intentions, { id: Date.now(), text, done: false }],
    }))
    setNewIntention('')
  }

  function toggleIntention(id) {
    update(prev => ({
      ...prev,
      intentions: prev.intentions.map(i => i.id === id ? { ...i, done: !i.done } : i),
    }))
  }

  function removeIntention(id) {
    update(prev => ({ ...prev, intentions: prev.intentions.filter(i => i.id !== id) }))
  }

  function setMood(m) {
    update({ todayMood: m })
  }

  function saveReflection(e) {
    update({ todayReflection: e.target.value })
  }

  function archiveReflection() {
    if (!state.todayReflection.trim()) return
    update(prev => ({
      ...prev,
      reflectionHistory: [
        { date: new Date().toDateString(), mood: prev.todayMood, text: prev.todayReflection },
        ...prev.reflectionHistory.slice(0, 29),
      ],
    }))
    showToast('Reflection saved')
  }

  const moods = [
    { key: 'great', icon: '🌿', label: 'Great' },
    { key: 'okay',  icon: '☁️', label: 'Okay' },
    { key: 'hard',  icon: '🌧️', label: 'Hard' },
  ]

  return (
    <div style={{ padding: '16px 16px 0' }}>

      {/* One thing */}
      <Card style={{ background: 'var(--sage-light)', borderColor: 'var(--sage)' }}>
        <Label>My one thing</Label>
        {!editingOneThing ? (
          <div
            style={{ fontSize: '15px', fontWeight: '500', color: state.oneThing ? 'var(--sage)' : 'var(--mist)', cursor: 'pointer', minHeight: '22px' }}
            onClick={() => { setOneThingDraft(state.oneThing); setEditingOneThing(true) }}
          >
            {state.oneThing || 'Tap to set your one thing…'}
          </div>
        ) : (
          <div>
            <TextInput
              autoFocus
              value={oneThingDraft}
              onChange={e => setOneThingDraft(e.target.value)}
              placeholder="What matters most today?"
              onKeyDown={e => e.key === 'Enter' && saveOneThing()}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Btn variant="primary" size="sm" onClick={saveOneThing}>Save</Btn>
              <Btn size="sm" onClick={() => setEditingOneThing(false)}>Cancel</Btn>
            </div>
          </div>
        )}
      </Card>

      {/* Three intentions */}
      <Card>
        <Label>Three things to accomplish</Label>
        {state.intentions.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: '0.5px solid var(--border)' }}>
            <div
              onClick={() => toggleIntention(item.id)}
              style={{
                width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, cursor: 'pointer',
                border: item.done ? 'none' : '1.5px solid var(--border-med)',
                background: item.done ? 'var(--sage)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}
            >
              {item.done && <i className="ti ti-check" style={{ fontSize: '13px' }} />}
            </div>
            <span style={{ flex: 1, fontSize: '14px', color: 'var(--ink)', textDecoration: item.done ? 'line-through' : 'none', opacity: item.done ? .5 : 1 }}>
              {item.text}
            </span>
            <button onClick={() => removeIntention(item.id)} style={{ background: 'none', border: 'none', color: 'var(--hint)', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}>
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>
        ))}
        {state.intentions.length < 3 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <TextInput
              value={newIntention}
              onChange={e => setNewIntention(e.target.value)}
              placeholder="Add an intention…"
              style={{ flex: 1, fontSize: '13px' }}
              onKeyDown={e => e.key === 'Enter' && addIntention()}
            />
            <Btn variant="primary" size="sm" onClick={addIntention}>
              <i className="ti ti-plus" aria-hidden="true" />
            </Btn>
          </div>
        )}
        {state.intentions.length === 3 && (
          <p style={{ fontSize: '12px', color: 'var(--hint)', marginTop: '8px' }}>Three is enough.</p>
        )}
      </Card>

      {/* Daily spark */}
      {state.features.spark && (
        <Card style={{ background: 'linear-gradient(135deg, var(--sage-light), var(--sand))', border: 'none' }}>
          <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '20px', fontSize: '11px', background: 'var(--sage-light)', color: 'var(--sage)', marginBottom: '8px', fontWeight: '500' }}>
            Today's spark · {spark.category}
          </span>
          {state.sparkDoneToday ? (
            <div style={{ textAlign: 'center', color: 'var(--sage)', fontSize: '13px', padding: '8px 0' }}>
              <i className="ti ti-check" style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }} />
              Spark done for today
            </div>
          ) : (
            <>
              <p style={{ fontSize: '15px', fontWeight: '500', color: 'var(--sage)', lineHeight: '1.5', marginBottom: '12px' }}>
                {spark.text}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Btn variant="primary" size="sm" onClick={() => update({ sparkDoneToday: true })}>
                  <i className="ti ti-check" aria-hidden="true" /> Done
                </Btn>
                <Btn size="sm" onClick={() => update(p => ({ ...p, sparkIndex: p.sparkIndex + 1 }))}>
                  Not today
                </Btn>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Evening check-in */}
      <Card>
        <Label>Evening check-in</Label>
        <p style={{ fontSize: '13px', color: 'var(--sub)', marginBottom: '10px' }}>How did today feel?</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {moods.map(m => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              style={{
                flex: 1, padding: '10px 4px', borderRadius: 'var(--radius-md)',
                border: state.todayMood === m.key ? '0.5px solid var(--sage)' : '0.5px solid var(--border)',
                background: state.todayMood === m.key ? 'var(--sage-light)' : 'var(--bg)',
                color: state.todayMood === m.key ? 'var(--sage)' : 'var(--sub)',
                cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font)',
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '2px' }}>{m.icon}</div>
              {m.label}
            </button>
          ))}
        </div>
        <Textarea
          value={state.todayReflection}
          onChange={saveReflection}
          placeholder="A few words about your day…"
          rows={3}
          style={{ fontSize: '13px' }}
        />
        <Btn variant="primary" size="sm" style={{ marginTop: '8px' }} onClick={archiveReflection}>
          Save reflection
        </Btn>
      </Card>

      {/* Reflection history */}
      {state.reflectionHistory.length > 0 && (
        <Card>
          <Label>Evening reflections</Label>
          {state.reflectionHistory.slice(0, 5).map((r, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: i < Math.min(4, state.reflectionHistory.length - 1) ? '0.5px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--hint)' }}>{r.date}</span>
                {r.mood && <span style={{ fontSize: '12px' }}>{moods.find(m => m.key === r.mood)?.icon}</span>}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', lineHeight: '1.5' }}>{r.text}</p>
            </div>
          ))}
        </Card>
      )}

      <div style={{ height: '8px' }} />
    </div>
  )
}
