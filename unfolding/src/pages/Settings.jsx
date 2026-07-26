import React, { useState } from 'react'
import { Card, Label, TextInput, Textarea, Btn, Toggle, SectionHead } from '../components/UI.jsx'

const FEATURES = [
  { key: 'spark',     label: 'Daily spark',        desc: 'A tiny act to keep you curious each morning.' },
  { key: 'grounding', label: 'Grounding',           desc: 'A sensory pause to reset whenever you need it.' },
  { key: 'space',     label: 'Your space',          desc: 'Park thoughts and release what weighs on you.' },
  { key: 'clarity',   label: "Let's figure it out", desc: 'An AI thinking partner for hard moments.' },
  { key: 'settle',    label: 'Settle',              desc: 'Breathing exercises and mindful pause moments.' },
]

export default function Settings({ state, update, showToast }) {
  const [nameDraft, setNameDraft] = useState(state.userName)
  const [aboutDraft, setAboutDraft] = useState(state.userAbout)

  function saveProfile() {
    update({ userName: nameDraft.trim(), userAbout: aboutDraft.trim() })
    showToast('Saved')
  }

  function exportData() {
    const lines = [
      '# The Growth Project — My data',
      '',
      `Exported: ${new Date().toLocaleDateString()}`,
      '',
      '## My one thing',
      state.oneThing || '(not set)',
      '',
      '## Today\'s intentions',
      ...state.intentions.map(i => `- [${i.done ? 'x' : ' '}] ${i.text}`),
      '',
      '## Reflection history',
      ...state.reflectionHistory.map(r => `### ${r.date}\nMood: ${r.mood || '—'}\n${r.text}`),
      '',
      '## Jar thoughts',
      ...state.jarItems.map(j => `[${j.tag}] ${j.text}`),
      '',
      '## Kind words',
      ...state.kindWords.map(k => `- ${k.text}`),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `the-growth-project-${new Date().toISOString().slice(0,10)}.txt`
    a.click()
  }

  function clearAll() {
    if (!window.confirm('This will delete all your data. Are you sure?')) return
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <SectionHead>About you</SectionHead>
      <div style={{ padding: '0 16px' }}>
        <Card>
          <TextInput
            value={nameDraft}
            onChange={e => setNameDraft(e.target.value)}
            placeholder="Your name (optional)"
            style={{ marginBottom: '8px' }}
          />
          <Textarea
            value={aboutDraft}
            onChange={e => setAboutDraft(e.target.value)}
            placeholder="A few words about yourself — helps the AI support you better"
            rows={3}
            style={{ fontSize: '13px' }}
          />
          <Btn variant="primary" size="sm" style={{ marginTop: '8px' }} onClick={saveProfile}>Save</Btn>
        </Card>
      </div>

      <SectionHead>Features</SectionHead>
      <div style={{ padding: '0 16px' }}>
        <Card>
          {FEATURES.map((f, i) => (
            <div
              key={f.key}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < FEATURES.length - 1 ? '0.5px solid var(--border)' : 'none' }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)' }}>{f.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--sub)', marginTop: '1px' }}>{f.desc}</div>
              </div>
              <Toggle
                on={state.features[f.key]}
                onToggle={() => update(prev => ({ ...prev, features: { ...prev.features, [f.key]: !prev.features[f.key] } }))}
              />
            </div>
          ))}
        </Card>
      </div>

      <SectionHead>Privacy</SectionHead>
      <div style={{ padding: '0 16px' }}>
        <Card>
          <p style={{ fontSize: '13px', color: 'var(--sub)', lineHeight: '1.6', marginBottom: '14px' }}>
            Your reflections, intentions, and thoughts are stored in your browser's local storage — on this device only. No server. No account. No cloud.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Btn size="sm" onClick={exportData}>
              <i className="ti ti-download" aria-hidden="true" /> Export my data
            </Btn>
            <Btn size="sm" variant="danger" onClick={clearAll}>
              <i className="ti ti-trash" aria-hidden="true" /> Delete all my data
            </Btn>
          </div>
        </Card>
      </div>

      <div style={{ height: '8px' }} />
    </div>
  )
}
