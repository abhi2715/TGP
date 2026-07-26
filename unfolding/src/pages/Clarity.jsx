import React, { useState, useRef, useEffect } from 'react'
import { Card, Label, Textarea, Btn, Empty } from '../components/UI.jsx'

const API_URL = 'https://api.anthropic.com/v1/messages'

export default function Clarity({ state, update, showToast }) {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const text = draft.trim()
    if (!text || loading) return
    setDraft('')

    const userMsg = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setLoading(true)

    const systemPrompt = [
      'You are a warm, calm wellness companion called The Growth Project.',
      'You help people process their thoughts and feelings with gentle curiosity.',
      'Keep responses short (2–4 sentences). Be kind, grounded, and non-judgmental.',
      'Avoid clinical language. Sometimes offer a simple question back to help them explore.',
      state.userAbout ? `User context: ${state.userAbout}` : '',
    ].filter(Boolean).join(' ')

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "I'm here with you. Take a breath — would you like to try again?"
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm here with you. Something went quiet for a moment — take a breath and try again." }])
    } finally {
      setLoading(false)
    }
  }

  function saveToArchive() {
    if (messages.length < 2) return
    const summary = messages.find(m => m.role === 'user')?.content?.slice(0, 80) + '…'
    update(prev => ({
      ...prev,
      clarityArchive: [
        { id: Date.now(), summary, date: new Date().toDateString(), messages },
        ...prev.clarityArchive.slice(0, 19),
      ],
    }))
    showToast('Saved to archive')
  }

  function clearChat() {
    setMessages([])
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>

      <Card>
        <Label>Let's figure it out</Label>
        <p style={{ fontSize: '13px', color: 'var(--sub)', marginBottom: '12px', lineHeight: '1.5' }}>
          A calm thinking partner for hard moments. Say whatever is on your mind.
        </p>

        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--hint)', fontSize: '13px' }}>
            <i className="ti ti-message-circle" style={{ fontSize: '28px', display: 'block', marginBottom: '8px', opacity: .4 }} />
            Start by sharing what's on your mind
          </div>
        )}

        <div style={{ maxHeight: '340px', overflowY: 'auto', marginBottom: '10px' }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '8px',
                fontSize: '13px',
                lineHeight: '1.6',
                maxWidth: '90%',
                background: m.role === 'user' ? 'var(--sage-light)' : 'var(--bg)',
                border: m.role === 'user' ? '0.5px solid var(--sage)' : '0.5px solid var(--border)',
                color: m.role === 'user' ? 'var(--sage)' : 'var(--ink)',
                marginLeft: m.role === 'user' ? 'auto' : '0',
              }}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div style={{ fontSize: '12px', color: 'var(--hint)', fontStyle: 'italic', padding: '4px 0' }}>Thinking…</div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="What's on your mind?"
            rows={2}
            style={{ flex: 1, fontSize: '13px' }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          />
          <Btn variant="primary" size="sm" onClick={send} style={{ alignSelf: 'flex-end' }} disabled={loading}>
            <i className="ti ti-send" aria-hidden="true" />
          </Btn>
        </div>

        {messages.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Btn size="sm" onClick={saveToArchive}><i className="ti ti-bookmark" aria-hidden="true" /> Save</Btn>
            <Btn size="sm" onClick={clearChat}><i className="ti ti-refresh" aria-hidden="true" /> Clear</Btn>
          </div>
        )}
      </Card>

      {/* Clarity archive */}
      <Card>
        <Label>Clarity archive</Label>
        {state.clarityArchive.length === 0 ? (
          <Empty icon="bookmark">Saved clarity moments appear here</Empty>
        ) : (
          state.clarityArchive.map(item => (
            <div key={item.id} style={{ padding: '8px 0', borderBottom: '0.5px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--hint)', marginBottom: '2px' }}>{item.date}</div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', lineHeight: '1.4' }}>{item.summary}</p>
            </div>
          ))
        )}
      </Card>

      <div style={{ height: '8px' }} />
    </div>
  )
}
