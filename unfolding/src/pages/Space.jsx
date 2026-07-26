import React, { useState } from 'react'
import { Card, Label, Textarea, Btn, Chip, Empty } from '../components/UI.jsx'

const THOUGHT_TAGS = ['Low mood', 'Worry', 'Anger', 'Decision', 'Idea', 'Dream']

export default function Space({ state, update, showToast }) {
  const [mode, setMode] = useState('park')
  const [tag, setTag] = useState('Worry')
  const [thoughtDraft, setThoughtDraft] = useState('')
  const [releaseDraft, setReleaseDraft] = useState('')
  const [kindDraft, setKindDraft] = useState('')

  function parkThought() {
    const text = thoughtDraft.trim()
    if (!text) return
    update(prev => ({
      ...prev,
      jarItems: [{ id: Date.now(), tag, text, createdAt: new Date().toISOString() }, ...prev.jarItems],
    }))
    setThoughtDraft('')
    showToast('Parked in the jar')
  }

  function releaseThought() {
    if (!releaseDraft.trim()) return
    setReleaseDraft('')
    showToast('Released ✦')
  }

  function addKindWord() {
    const text = kindDraft.trim()
    if (!text) return
    update(prev => ({
      ...prev,
      kindWords: [{ id: Date.now(), text }, ...prev.kindWords],
    }))
    setKindDraft('')
    showToast('Added ♥')
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>

      {/* Mode toggle */}
      <Card>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <Chip active={mode === 'park'} onClick={() => setMode('park')}>
            <i className="ti ti-archive" aria-hidden="true" /> Park it
          </Chip>
          <Chip active={mode === 'release'} onClick={() => setMode('release')}>
            <i className="ti ti-wind" aria-hidden="true" /> Let it out
          </Chip>
        </div>

        {mode === 'park' && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {THOUGHT_TAGS.map(t => (
                <Chip key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Chip>
              ))}
            </div>
            <Textarea
              value={thoughtDraft}
              onChange={e => setThoughtDraft(e.target.value)}
              placeholder="Park a thought in the jar…"
              rows={3}
              style={{ fontSize: '13px' }}
            />
            <Btn variant="primary" size="sm" style={{ marginTop: '8px' }} onClick={parkThought}>
              <i className="ti ti-archive" aria-hidden="true" /> Park it
            </Btn>
          </>
        )}

        {mode === 'release' && (
          <>
            <p style={{ fontSize: '13px', color: 'var(--sub)', marginBottom: '10px', lineHeight: '1.5' }}>
              Write it out — then let it go. This won't be saved.
            </p>
            <Textarea
              value={releaseDraft}
              onChange={e => setReleaseDraft(e.target.value)}
              placeholder="Write, release, gone…"
              rows={4}
              style={{ fontSize: '13px' }}
            />
            <Btn variant="danger" size="sm" style={{ marginTop: '8px' }} onClick={releaseThought}>
              <i className="ti ti-trash" aria-hidden="true" /> Release & clear
            </Btn>
          </>
        )}
      </Card>

      {/* The jar */}
      <Card>
        <Label>Your jar</Label>
        {state.jarItems.length === 0 ? (
          <Empty icon="jar">Your jar is empty</Empty>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {state.jarItems.map(item => (
              <div key={item.id} style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 12px', position: 'relative' }}>
                <div style={{ fontSize: '10px', color: 'var(--mist)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '4px', fontWeight: '500' }}>{item.tag}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: '1.4' }}>{item.text}</div>
                <button
                  onClick={() => update(prev => ({ ...prev, jarItems: prev.jarItems.filter(j => j.id !== item.id) }))}
                  style={{ position: 'absolute', top: '6px', right: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--hint)', fontSize: '14px', lineHeight: 1 }}
                  aria-label="Remove"
                >
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Kind words */}
      <Card>
        <Label>Kind words</Label>
        {state.kindWords.length === 0 && (
          <p style={{ fontSize: '13px', color: 'var(--sub)', marginBottom: '10px' }}>Kind words live here. Add the first one.</p>
        )}
        {state.kindWords.map(k => (
          <div key={k.id} style={{ background: 'var(--sage-light)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '8px', fontSize: '14px', color: 'var(--sage)', lineHeight: '1.5', position: 'relative' }}>
            {k.text}
            <button
              onClick={() => update(prev => ({ ...prev, kindWords: prev.kindWords.filter(w => w.id !== k.id) }))}
              style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sage)', fontSize: '14px', opacity: .5, lineHeight: 1 }}
              aria-label="Remove"
            >
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>
        ))}
        <Textarea
          value={kindDraft}
          onChange={e => setKindDraft(e.target.value)}
          placeholder="A kind word for yourself…"
          rows={2}
          style={{ fontSize: '13px', marginTop: '8px' }}
        />
        <Btn variant="primary" size="sm" style={{ marginTop: '8px' }} onClick={addKindWord}>Add</Btn>
      </Card>

      <div style={{ height: '8px' }} />
    </div>
  )
}
